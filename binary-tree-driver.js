const Tree = require('./binary-tree');

const randomArray = (size) => {
    return Array.from({length: size}, () => Math.floor(Math.random() * 100));
}

function prettyPrint(node, prefix = '', isLeft = true) {
    if (node) {
        console.log(prefix + (isLeft ? '├──' : '└──') + node.data);
        prettyPrint(node.left, prefix + (isLeft ? '│   ' : '    '), true);
        prettyPrint(node.right, prefix + (isLeft ? '│   ' : '    '), false);
    }
}

const binaryTree = new Tree(randomArray(20));

console.log(binaryTree.isBalanced());

console.log(binaryTree.levelOrder());
console.log(binaryTree.inorder());
console.log(binaryTree.preorder());
console.log(binaryTree.postorder());

binaryTree.insert(150);
binaryTree.insert(280);
binaryTree.insert(320);

console.log(binaryTree.isBalanced());

binaryTree.rebalance();

console.log(binaryTree.isBalanced());

console.log(binaryTree.levelOrder());
console.log(binaryTree.inorder());
console.log(binaryTree.preorder());
console.log(binaryTree.postorder());

prettyPrint(binaryTree.root);