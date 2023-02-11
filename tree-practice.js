const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
  let currentNode = rootNode;

  while (currentNode.left !== null) {
    currentNode = currentNode.left;
  }

  return currentNode.val;

}

function findMaxBST (rootNode) {
  let currentNode = rootNode;

  while (currentNode.right !== null) {
    currentNode = currentNode.right;
  }

  return currentNode.val;
}

function findMinBT (rootNode) {
  let treeVals = [];

  function arrayTraversal(currentNode = this.root) {
    treeVals.push(currentNode.val);

    if (currentNode.left !== null) {
      arrayTraversal(currentNode.left);
    }

    if (currentNode.right !== null) {
      arrayTraversal(currentNode.right);
    }

  }

  arrayTraversal(rootNode);
  let min = Infinity;
  treeVals.forEach(num => {if (num < min) min = num});

  return min;

}

// Both this function and findMinBT are O(n) instead of the O(log n) of findMin/MaxBST. Since there is no specific ordering
// for the nodes in a regular binary tree, you have to traverse every single node and then take the minimum, for an O(n) complexity.

function findMaxBT (rootNode) {
  let treeVals = [];

  function arrayTraversal(currentNode = this.root) {
    treeVals.push(currentNode.val);

    if (currentNode.left !== null) {
      arrayTraversal(currentNode.left);
    }

    if (currentNode.right !== null) {
      arrayTraversal(currentNode.right);
    }

  }

  arrayTraversal(rootNode);
  let max = -Infinity;
  treeVals.forEach(num => {if (num > max) max = num});

  return max;
}

function getHeight (rootNode) {
  if (!rootNode) {
    return -1;
  } else if (rootNode.left === null && rootNode.right === null) {
    return 0;
  }

  let totalHeights = [];

  function depthTraversal(rootNode) {
    let stack = [rootNode];
    let currentNode;
    let heights = [0];
    let currentHeight;

    while (stack.length > 0) {
      currentNode = stack[0];
      totalHeights.push(heights[0]);
      currentHeight = heights[0];
      stack.shift();
      heights.shift();

      if (currentNode.left !== null) {
        stack.unshift(currentNode.left);
        heights.unshift(currentHeight + 1);
      }

      if (currentNode.right !== null) {
        stack.unshift(currentNode.right);
        heights.unshift(currentHeight + 1);
      }

    }
  }

  depthTraversal(rootNode);
  let maxHeight = totalHeights[0];
  totalHeights.forEach(num => {if (num > maxHeight) maxHeight = num});

  return maxHeight;
}

function balancedTree (rootNode) {

  function checkBalanced(rootNode) {
    let leftHeight = getHeight(rootNode.left);
    let rightHeight = getHeight(rootNode.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return true;
  }

  function breadthFirstTraversal(rootNode) {
    let queue = [rootNode];
    let currentNode;

    while (queue.length > 0) {
      currentNode = queue[0];
      if (!checkBalanced(currentNode)) return false;
      queue.shift();

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }

    }

    return true;
  }

  return breadthFirstTraversal(rootNode);

}

function countNodes (rootNode) {
  let count = 0;

  function inOrderTraversal(currentNode = this.root) {
    if (currentNode.left !== null) {
      inOrderTraversal(currentNode.left);
    }

    count++;

    if (currentNode.right !== null) {
      inOrderTraversal(currentNode.right);
    }
  }

  inOrderTraversal(rootNode);
  return count;
}

function getParentNode (rootNode, target) {
  if (rootNode.val === target) {
    return null;
  }

  const depthFirstTraversal = function() {
    let stack = [rootNode];
    let currentNode;

    while (stack.length > 0) {
      currentNode = stack[0];
      stack.shift();

      if (currentNode.left !== null) {
        if (currentNode.left.val === target) {
          return currentNode;
        }
        stack.unshift(currentNode.left);
      }

      if (currentNode.right !== null) {
        if (currentNode.right.val === target) {
          return currentNode;
        }
        stack.unshift(currentNode.right);
      }

    }
}

return depthFirstTraversal();


}

function inOrderPredecessor (rootNode, target) {
  let vals = [];
  let predecessor = null;
  const inOrderTraversal = function(currentNode = this.root) {
    if (currentNode.left !== null) {
      inOrderTraversal(currentNode.left);
    }

    if (currentNode.val === target) {
      if (vals.length !== 0) {
        predecessor = vals[vals.length - 1];
      }
    }
    vals.push(currentNode.val);

    if (currentNode.right !== null) {
      inOrderTraversal(currentNode.right);
    }
  }

  inOrderTraversal(rootNode);
  return predecessor;
}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  let parent = getParentNode(rootNode, target);
  let child;

  // Undefined if the target cannot be found
  if (!parent) {
    return undefined;
  }

  // Set target based on parent
  if (parent.left && parent.left.val === target) {
    child = parent.left;
  } else if (parent.right && parent.right.val === target) {
    child = parent.right;
  }

  // Case 0: Zero children and no parent:
  //   return null
  if (!parent && !child.left && !child.right) {
    return null;
  }

  // Case 1: Zero children:
  //   Set the parent that points to it to null
  if (!child.left && !child.right) {
    if (parent.left === child) {
      parent.left = null;
    } else if (parent.right === child) {
      parent.right = null;
    }
    return;
  }

  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  let predecessor = inOrderPredecessor(rootNode, target);
  //  Replace target node with the left most child on its right side,
  //  or the right most child on its left side.
  let temp = child.right;
  while (temp.left !== null) {
    temp = temp.left;
  }
  //  Then delete the child that it was replaced with.

  // Case 3: One child:
  //   Make the parent point to the child
  if (child.left) {
    if (parent.left === child) {
      parent.left = child.left;
    } else if (parent.right === child) {
      parent.right = child.left;
    }
  } else if (child.right) {
    if (parent.left === child) {
      parent.left = child.right;
    } else if (parent.right) {
      parent.right = child.right;
    }
  }


}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}
