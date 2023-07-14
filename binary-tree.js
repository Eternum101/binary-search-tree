class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(arr) {
        arr = [...new Set(arr)].sort((a,b) => a - b);
        this.root = this.buildTree(arr, 0, arr.length - 1);
    }

    buildTree(arr, start, end) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);
        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);
        return node;
    }

    insert(value) {
        if (!this.root) {
            this.root = new Node(value);
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.data) {
                if (!current.left) {
                    current.left = new Node(value);
                    return;
                }
                current = current.left;
            } else if (value > current.data) {
                if (!current.right) {
                    current.right = new Node(value);
                    return;
                }
                current = current.right;
            } else {
                return;
            }
        }
    }

    delete(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(node, value) {
        if (!node) return null;

        if (value < node.data) {
            node.left = this.deleteNode(node.left, value);
            return node;
        } else if (value > node.data) {
            node.right = this.deleteNode(node.right, value);
            return node;
        } else {
            if (!node.left && !node.right) {
                return null;
            } else if (!node.left || !node.right) {
                return node.left || node.right;
            } else {
                let successor = node.right;
                while (successor.left) successor = successor.left;
                node.data = successor.data;
                node.right = this.deleteNode(node.right, successor.data);
                return node;
            }
        }
    }

    find(value) {
        let current = this.root;
        while (current) {
            if (value === current.data) {
                return current;
            } else if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }

    levelOrder(fn) {
        if (!this.root) return [];
        const queue = [this.root];
        const values = [];

        while (queue.length) {
            const node = queue.shift(); 
            if(fn) {
                fn(node);
            } else {
                values.push(node.data);
            }
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return values;
    }

    inorder(fn) {
        const values = [];
        this.traverseInOrder(this.root, fn, values);
        return values; 
    }

    traverseInOrder(node, fn, values) {
        if (!node) return; 
        this.traverseInOrder(node.left, fn, values);
        if (fn) {
            fn(node);
        } else {
            values.push(node.data);
        }
        this.traverseInOrder(node.right, fn, values);
    }

    preorder(fn) {
        const values = [];
        this.traversePreOrder(this.root, fn, values);
        return values;
    }

    traversePreOrder(node, fn, values) {
        if (!node) return;
        if (fn) {
            fn(node);
        } else {
            values.push(node.data);
        }
        this.traversePreOrder(node.left, fn, values);
        this.traversePreOrder(node.right, fn, values);
    }

    postorder(fn) {
        const values = [];
        this.traversePostOrder(this.root, fn, values);
        return values;
    }

    traversePostOrder(node, fn, values) {
        if (!node) return;
        this.traversePostOrder(node.left, fn, values); 
        this.traversePostOrder(node.right, fn, values);
        if (fn) {
            fn(node);
        } else {
            values.push(node.data);
        }
    }

    height(node) {
        if (!node) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(node) {
        let current = this.root; 
        let depth = 0;
        while (current) {
            if (node.data === current.data) {
                return depth;
            } else if (node.data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            depth++;
        }
        return null;
    }

    isBalanced() {
        return this.checkBalanced(this.root) !== -1; 
    }

    checkBalanced(node) {
        if (!node) return 0;
        const leftHeight = this.checkBalanced(node.left);

        if (leftHeight === -1) return -1;
        const rightHeight = this.checkBalanced(node.right);

        if (rightHeight === -1) return -1;
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
        return 1 + Math.max(leftHeight, rightHeight);
    }

    rebalance() {
        const arr = this.inorder();
        this.root = this.buildTree(arr, 0, arr.length - 1);
    }
}

function prettyPrint(node, prefix = '', isLeft = true) {
    if (node) {
        console.log(prefix + (isLeft ? '├──' : '└──') + node.data);
        prettyPrint(node.left, prefix + (isLeft ? '│   ' : '    '), true);
        prettyPrint(node.right, prefix + (isLeft ? '│   ' : '    '), false);
    }
}

const myTree = new Tree([4, 2, 6, 1, 3, 5, 7]);
prettyPrint(myTree.root);

myTree.insert(8);
prettyPrint(myTree.root);

myTree.delete(4);
prettyPrint(myTree.root);

console.log(myTree.inorder());
console.log(myTree.preorder());
console.log(myTree.postorder());

const node = myTree.find(6);
console.log(node ? node.data : null);

console.log(myTree.isBalanced());

myTree.rebalance();
prettyPrint(myTree.root);

console.log(myTree.isBalanced());