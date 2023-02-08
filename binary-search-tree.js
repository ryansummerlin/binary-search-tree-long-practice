// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file

// Do not change this
class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {

    constructor() {
      this.root = null;
    }

    insert(val, currentNode=this.root) {
      if (this.root === null) {
        this.root = new TreeNode(val);
        return;
      }

      if (val < currentNode.val) {
        if (!currentNode.left) {
          currentNode.left = new TreeNode(val);
        } else {
          this.insert(val, currentNode.left);
        }
      } else if (val >= currentNode.val) {
        if (!currentNode.right) {
          currentNode.right = new TreeNode(val);
        } else {
          this.insert(val, currentNode.right);
        }
      }

    }

    search(val) {
      let currentNode = this.root;
      while (currentNode !== null) {
        if (currentNode.val === val) {
          return true;
        } else if (val < currentNode.val) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
      }

      return false;
    }


    preOrderTraversal(currentNode = this.root) {
      console.log(currentNode.val);

      if (currentNode.left !== null) {
        this.preOrderTraversal(currentNode.left);
      }

      if (currentNode.right !== null) {
        this.preOrderTraversal(currentNode.right);
      }

    }


    inOrderTraversal(currentNode = this.root) {
      if (currentNode.left !== null) {
        this.inOrderTraversal(currentNode.left);
      }

      console.log(currentNode.val);

      if (currentNode.right !== null) {
        this.inOrderTraversal(currentNode.right);
      }
    }


    postOrderTraversal(currentNode = this.root) {
      if (currentNode.left !== null) {
        this.postOrderTraversal(currentNode.left);
      }

      if (currentNode.right !== null) {
        this.postOrderTraversal(currentNode.right);
      }

      console.log(currentNode.val);
    }

      // Breadth First Traversal - Iterative
    breadthFirstTraversal() {
      let queue = [this.root];
      let currentNode;

      while (queue.length > 0) {
        currentNode = queue[0];
        console.log(currentNode.val);
        queue.shift();

        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }

        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }

      }
    }

    // Depth First Traversal - Iterative
    depthFirstTraversal() {
      let stack = [this.root];
      let currentNode;

      while (stack.length > 0) {
        currentNode = stack[0];
        console.log(currentNode.val);
        stack.shift();

        if (currentNode.left !== null) {
          stack.unshift(currentNode.left);
        }

        if (currentNode.right !== null) {
          stack.unshift(currentNode.right);
        }

      }
  }
  }

  module.exports = { BinarySearchTree, TreeNode };
