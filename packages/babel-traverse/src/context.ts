import NodePath from "./path";
import { VISITOR_KEYS } from "@babel/types";
import type Scope from "./scope";
import type { ExplodedTraverseOptions } from ".";
import type * as t from "@babel/types";
import type { Visitor } from "./types";

export default class TraversalContext<S = unknown> {
  constructor(
    scope: Scope,
    opts: ExplodedTraverseOptions<S>,
    state: S,
    parentPath: NodePath,
  ) {
    this.parentPath = parentPath;
    this.scope = scope;
    this.state = state;
    this.opts = opts;
  }

  declare parentPath: NodePath;
  declare scope: Scope;
  declare state: S;
  declare opts: ExplodedTraverseOptions<S>;
  queue: Array<NodePath> | null = null;
  priorityQueue: Array<NodePath> | null = null;

  /**
   * This method does a simple check to determine whether or not we really need to attempt
   * visit a node. This will prevent us from constructing a NodePath.
   */

  shouldVisit(node: t.Node): boolean {
    const opts = this.opts as Visitor;
    if (opts.enter || opts.exit) return true;

    // check if we have a visitor for this node
    if (opts[node.type]) return true;

    // check if we're going to traverse into this node
    const keys: Array<string> | undefined = VISITOR_KEYS[node.type];
    if (!keys?.length) return false;

    // we need to traverse into this node so ensure that it has children to traverse into!
    for (const key of keys) {
      if (
        // @ts-expect-error key is from visitor keys
        node[key]
      ) {
        return true;
      }
    }

    return false;
  }

  create(
    node: t.Node,
    container: t.Node | t.Node[],
    key: string | number,
    listKey?: string,
  ): NodePath {
    //throw new Error("Unimplemented");
    //if (container.type === "ImportDefaultSpecifier") debugger;
    // We don't need to `.setContext()` here, since `.visitQueue()` already
    // calls `.pushContext`.
    return NodePath.get({
      parentPath: this.parentPath,
      parent: node,
      container,
      key: key,
      listKey,
    });
  }

  maybeQueue(path: NodePath, notPriority?: boolean) {
    if (this.isDenylisted(path.node)) return;

    if (this.queue) {
      if (notPriority) {
        this.queue.push(path);
      } else {
        this.priorityQueue.push(path);
      }
    }
  }

  visitMultiple(container: t.Node[], parent: t.Node, listKey: string) {
    // nothing to traverse!
    if (container.length === 0) return false;

    const queue = [];

    // build up initial queue
    for (let key = 0; key < container.length; key++) {
      const node = container[key];
      if (node && this.shouldVisit(node)) {
        queue.push(this.create(parent, container, key, listKey));
      }
    }

    return this.visitQueue(queue);
  }

  visitSingle(node: t.Node, key: string): boolean {
    if (
      this.shouldVisit(
        // @ts-expect-error key may not index node
        node[key],
      )
    ) {
      return this.visitQueue([this.create(node, node, key)]);
    } else {
      return false;
    }
  }

  visitQueue(queue: Array<NodePath>): boolean {
    // set queue
    this.queue = queue;
    this.priorityQueue = [];

    const visited = new WeakSet();
    let stop = false;

    // visit the queue
    for (const path of queue) {
      path.resync();

      if (
        path.contexts.length === 0 ||
        path.contexts[path.contexts.length - 1] !== this
      ) {
        // The context might already have been pushed when this path was inserted and queued.
        // If we always re-pushed here, we could get duplicates and risk leaving contexts
        // on the stack after the traversal has completed, which could break things.
        path.pushContext(this);
      }

      // this path no longer belongs to the tree
      if (path.key === null) continue;

      // ensure we don't visit the same node twice
      const { node } = path;
      if (visited.has(node)) continue;
      if (node) visited.add(node);

      if (path.visit()) {
        stop = true;
        break;
      }

      if (this.priorityQueue.length) {
        stop = this.visitQueue(this.priorityQueue);
        this.priorityQueue = [];
        this.queue = queue;
        if (stop) break;
      }
    }

    // clear queue
    for (const path of queue) {
      path.popContext();
    }

    // clear queue
    this.queue = null;

    return stop;
  }

  visit(node: t.Node, key: string) {
    // @ts-expect-error key may not index node
    const nodes = node[key] as t.Node | t.Node[] | null;
    if (!nodes) return false;

    if (Array.isArray(nodes)) {
      return this.visitMultiple(nodes, node, key);
    } else {
      return this.visitSingle(node, key);
    }
  }

  isDenylisted(node: t.Node): boolean {
    // @ts-expect-error TODO(Babel 8): Remove blacklist
    const denylist = this.opts.denylist ?? this.opts.blacklist;
    return denylist && denylist.indexOf(node.type) > -1;
  }

  visitNew(
    node: t.Node,
    key: string | null,
    skipKeys?: Record<string, boolean>,
    path?: NodePath,
  ): boolean {
    const enum Status {
      Waiting,
      Visiting,
      Visited,
    }
    const enum Status2 {
      Done,
      Continue,
      Stop,
    }
    type Stack = {
      parentPath: NodePath;
      scope: Scope;
      visited: Set<t.Node>;
      status: Status;
      paths: NodePath[];
    };

    const stacks: Stack[] = [];
    let _stackCursor = 0;

    function _alloc() {
      for (let i = 0; i < 64; i++) {
        stacks.push({
          parentPath: null,
          scope: null,
          visited: new Set(),
          status: Status.Waiting,
          paths: [],
        });
      }
    }

    function _push(parentPath: NodePath, scope: Scope, paths: NodePath[]) {
      const cursor = _stackCursor;
      if (cursor === stacks.length) {
        _alloc();
      }
      const item = stacks[cursor];
      item.parentPath = parentPath;
      item.scope = scope;
      item.status = Status.Waiting;
      item.paths = paths;

      _stackCursor++;
    }

    function add(
      this: TraversalContext,
      node: t.Node,
      maybeKey: string | null,
      parentPath: NodePath,
      scope: Scope,
      skipKeys?: Record<string, boolean>,
    ) {
      const keys = maybeKey ? [maybeKey] : VISITOR_KEYS[node.type];
      if (!keys) return;

      for (const key of keys) {
        if (skipKeys?.[key]) continue;

        // @ts-expect-error key may not index node
        const container = node[key] as t.Node | t.Node[] | null;
        if (!container) continue;

        const paths: NodePath[] = [];

        if (Array.isArray(container)) {
          for (let i = 0; i < container.length; i++) {
            const elem = container[i];
            if (elem && this.shouldVisit(elem) && !this.isDenylisted(elem)) {
              paths.push(
                NodePath.get({
                  parentPath: parentPath,
                  parent: node,
                  container,
                  key: i,
                  listKey: key,
                }),
              );
            }
          }
        } else if (
          this.shouldVisit(container) &&
          !this.isDenylisted(container)
        ) {
          paths.push(
            NodePath.get({
              parentPath: parentPath,
              parent: node,
              container: node,
              key,
            }),
          );
        }

        _push(parentPath, scope, paths);
      }
    }

    if (path) {
      _push(this.parentPath, this.scope, [path]);
    } else {
      add.call(this, node, key, this.parentPath, this.scope, skipKeys);
    }

    let status: Status2 = Status2.Done;
    while (_stackCursor) {
      const stack = stacks[_stackCursor - 1];
      const queue: NodePath[] = stack.paths;

      if (stack.status === Status.Visited || status === Status2.Stop) {
        _stackCursor--;
        stack.visited.clear();

        // clear queue
        for (const path of queue) {
          path.popContext();
        }

        continue;
      }

      status = Status2.Done;

      this.parentPath = stack.parentPath;
      this.scope = stack.scope;

      // set queue
      this.queue = queue;
      this.priorityQueue = [];

      const visited = stack.visited;

      // visit the queue
      for (const path of queue) {
        // ensure we don't visit the same node twice
        const { node } = path;
        if (!node || visited.has(node)) continue;
        visited.add(node);
        path.resync();

        if (
          path.contexts.length === 0 ||
          path.contexts[path.contexts.length - 1] !== this
        ) {
          // The context might already have been pushed when this path was inserted and queued.
          // If we always re-pushed here, we could get duplicates and risk leaving contexts
          // on the stack after the traversal has completed, which could break things.
          path.pushContext(this);
        }

        // this path no longer belongs to the tree
        if (path.key === null) continue;

        if (path.opts.shouldSkip?.(path)) {
          continue;
        }

        const currentContext = path.context;
        // Note: We need to check "this.shouldSkip" first because
        // another visitor can set it to true. Usually .shouldSkip is false
        // before calling the enter visitor, but it can be true in case of
        // a requeued node (e.g. by .replaceWith()) that is then marked
        // with .skip().
        if (path.shouldSkip || path.call("enter")) {
          path.debug("Skip...");
          continue;
        }
        restoreContext(path, currentContext);

        const stacksLen = _stackCursor;
        path.debug("Recursing into...");
        add.call(this, path.node, null, path, path.scope, path.skipKeys);
        if (stacksLen !== _stackCursor) {
          status = Status2.Continue;
          break;
        }

        restoreContext(path, currentContext);

        path.call("exit");

        if (path.shouldStop) {
          status = Status2.Stop;
          break;
        }

        if (this.priorityQueue.length) {
          // TODO: isDenylisted
          _push(path, path.scope, this.priorityQueue);
          status = Status2.Continue;
          break;
        }
      }
      if (status === Status2.Done) {
        stack.status = Status.Visited;
      }
    }
    return status === Status2.Stop;
  }
}

function restoreContext(path: NodePath, context: TraversalContext) {
  if (path.context !== context) {
    path.context = context;
    path.state = context.state;
    path.opts = context.opts;
  }
}
