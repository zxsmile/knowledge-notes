/*

前序中左起第一位1肯定是根结点，我们可以据此找到中序中根结点的位置rootin；
中序中根结点左边就是左子树结点，右边就是右子树结点，即[左子树结点，根结点，右子树结点]，我们就可以得出左子树结点个数为
int left = rootin - leftin;；
前序中结点分布应该是：[根结点，左子树结点，右子树结点]；
根据前一步确定的左子树个数，可以确定前序中左子树结点和右子树结点的范围；
如果我们要前序遍历生成二叉树的话，下一层递归应该是：
左子树：root->left = pre_order(前序左子树范围，中序左子树范围，前序序列，中序序列);；
右子树：root->right = pre_order(前序右子树范围，中序右子树范围，前序序列，中序序列);。
每一层递归都要返回当前根结点root；

*/

var buildTree = function(preorder, inorder) {
    if(!preorder.length && !inorder.length)
      return null;
    var head = preorder[0];
    var pos = inorder.indexOf(head);
    var midLeft = inorder.slice(0, pos), midRight = inorder.slice(pos+1);
    var preLeft = preorder.slice(1, pos+1), preRight = preorder.slice(pos+1);
  
    var tree = new TreeNode(head);
    tree.left = buildTree(preLeft, midLeft);
    tree.right = buildTree(preRight, midRight);
    return tree;
  };


   