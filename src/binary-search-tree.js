const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  root() {
    return this.rootNode ? this.rootNode : null;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }
    let currentNode = this.rootNode;
    while (currentNode) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        } else {
          currentNode = currentNode.left;
        }
      } else if (!currentNode.right) {
        currentNode.right = newNode;
        return;
      } else {
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let currentNode = this.rootNode;
    while (currentNode) {
      if (currentNode.data === data) {
        return currentNode;
      }
      currentNode =
        data < currentNode.data ? currentNode.left : currentNode.right;
    }
    return null;
  }

  remove(data) {
    let currentNode = this.rootNode;
    let parentNode = null;

    while (currentNode && currentNode.data !== data) {
      parentNode = currentNode;
      currentNode =
        data < currentNode.data ? currentNode.left : currentNode.right;
    }

    if (!currentNode) {
      return;
    }

    if (!currentNode.left || !currentNode.right) {
      const childNode = currentNode.left || currentNode.right;

      if (!parentNode) {
        this.rootNode = childNode;
      } else if (parentNode.left === currentNode) {
        parentNode.left = childNode;
      } else {
        parentNode.right = childNode;
      }
      return;
    }

    let child = currentNode.right;
    let childParent = currentNode;

    while (child.left) {
      childParent = child;
      child = child.left;
    }

    currentNode.data = child.data;

    if (childParent.left === child) {
      childParent.left = child.right;
    } else {
      childParent.right = child.right;
    }
  }

  min() {
    let currentNode = this.rootNode;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    let currentNode = this.rootNode;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
