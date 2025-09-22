import { Tree } from "./binarySearchTree.js";

const array = [];
for (let i = 0; i < 8; i++) array.push(Math.floor(Math.random() * 100) + 1);
const tree = new Tree(array);
console.log(tree.isBalanced());

console.log("Level order");
tree.levelOrderForEach((node) => console.log(node.data));
console.log("Pre order");
tree.preOrderForEach((node) => console.log(node.data));
console.log("Post order");
tree.postOrderForEach((node) => console.log(node.data));
console.log("In order");
tree.inOrderForEach((node) => console.log(node.data));

tree.insert(101);
tree.insert(105);
tree.insert(190);
tree.insert(283);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

console.log("Level order");
tree.levelOrderForEach((node) => console.log(node.data));
console.log("Pre order");
tree.preOrderForEach((node) => console.log(node.data));
console.log("Post order");
tree.postOrderForEach((node) => console.log(node.data));
console.log("In order");
tree.inOrderForEach((node) => console.log(node.data));
