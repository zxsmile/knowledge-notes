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


   