/*

后序中右起第一位1肯定是根结点，我们可以据此找到中序中根结点的位置rootin；
中序中根结点左边就是左子树结点，右边就是右子树结点，即[左子树结点，根结点，右子树结点]，我们就可以得出左子树结点个数为
int left = rootin - leftin;；
后序中结点分布应该是：[左子树结点，右子树结点，根结点]；
根据前一步确定的左子树个数，可以确定后序中左子树结点和右子树结点的范围；
如果我们要前序遍历生成二叉树的话，下一层递归应该是：
左子树：root->left = pre_order(左子树中序序列，左子树后序序列);；
右子树：root->right = pre_order(右子树中序序列，右子树后序序列);。
每一层递归都要返回当前根结点root；

*/

var buildTree = function(inorder, postorder) {
    if( !inorder.length &&!postorder.length){
        return null
    }
    let head = postorder[postorder.length-1]
    let index = inorder.indexOf(head)
    let inLeft = inorder.slice(0,index)
    let inRight = inorder.slice(index+1)
    let posRight = postorder.slice(index,postorder.length-1)
    let posLeft = postorder.slice(0,index)
    let root = new TreeNode(head)
    root.left =buildTree(inLeft,posLeft)
    root.right = buildTree(inRight,posRight)
    return root
};