class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array.sort((a, b) => a - b))]);
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor((array.length - 1) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }

  insert(value) {
    let current = this.root;

    while (current) {
      if (value < current.data) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = new Node(value);
        }
      } else if (value > current.data) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = new Node(value);
        }
      } else {
        return;
      }
    }
  }

  deleteItem(value) {
    let current = this.root;
    let prev = null;

    while (current) {
      if (value < current.data) {
        prev = current;
        current = current.left;
      } else if (value > current.data) {
        prev = current;
        current = current.right;
      } else {
        if (current.right && current.left) {
          // has 2 children
          let succParent = current;
          let succ = current.right;
          while (succ.left) {
            succParent = succ;
            succ = succ.left;
          }

          current.data = succ.data;

          if (succParent.left === succ) {
            succParent.left = succ.right;
          } else {
            succParent.right = succ.right;
          }
          break;
        } else if (current.left || current.right) {
          // has 1 child
          if (!prev) {
            this.root = current.left || current.right;
          } else if (prev.right === current) {
            prev.right = current.left || current.right;
          } else {
            prev.left = current.left || current.right;
          }
          break;
        } else {
          // no children
          if (!prev) {
            this.root = null;
          } else if (prev.right === current) {
            prev.right = null;
          } else {
            prev.left = null;
          }
        }
        break;
      }
    }
  }

  find(value) {
    let current = this.root;

    while (current) {
      if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      } else {
        return current;
      }
    }

    return null;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required.");
    }

    const q = [this.root];
    let i = 0;
    while (i < q.length) {
      const node = q[i++];
      callback(node);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }

  levelOrderForEachRec(callback, q = [this.root], i = 0) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required.");
    }

    if (i < q.length) {
      const node = q[i++];
      callback(node);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
      this.levelOrderForEachRec(callback, q, i);
    }
  }

  inOrderForEach(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required.");
    }

    if (root === null) return;

    this.inOrderForEach(callback, root.left);
    callback(root);
    this.inOrderForEach(callback, root.right);
  }

  preOrderForEach(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required.");
    }

    if (root === null) return;

    callback(root);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  postOrderForEach(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required.");
    }

    if (root === null) return;

    this.postOrderForEachOrderForEach(callback, root.left);
    this.postOrderForEachOrderForEach(callback, root.right);
    callback(root);
  }

  height(value) {
    let node = find(value);

    if (!node) return null;

    const stack = [[node, 0]];
    let maxHeight = 0;
    while (stack.length > 0) {
      const depth = stack[stack.length - 1][1];
      const left = stack[stack.length - 1][0].left;
      const right = stack[stack.length - 1][0].right;
      maxHeight = Math.max(maxHeight, depth);
      stack.pop();
      if (left) stack.push([left, depth + 1]);
      if (right) stack.push([right, depth + 1]);
    }

    return maxHeight;
  }
}
