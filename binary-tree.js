class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class tree {
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
}

function prettyPrint(node, prefix = '', isLeft = true) {
    if (node) {
        console.log(prefix + (isLeft ? '├──' : '└──') + node.data);
        prettyPrint(node.left, prefix + (isLeft ? '│   ' : '    '), true);
        prettyPrint(node.right, prefix + (isLeft ? '│   ' : '    '), false);
    }
}

const myTree = new tree([4, 2, 6, 1, 3, 5, 7]);
prettyPrint(myTree.root);

myTree.insert(8);
prettyPrint(myTree.root);

myTree.delete(4);
prettyPrint(myTree.root);