/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
    let path = [];
    let results = [];
    const dfs = function(p){
        if(!p){
            const str = path.join('');
            results.push(str);
            return;
        }
        path.push(p.val);
        if(p.left){
            dfs(p.left);
            path.pop();
        }
        if(p.right){
            dfs(p.right);
            path.pop();
        }
    };
    dfs(root);
    console.log(results);
    return results.reduce((acc,curr)=> acc += curr,0);
};

console.log(sumNumbers([1,2,3]));