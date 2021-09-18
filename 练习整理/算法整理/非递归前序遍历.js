var preorderTraversal = function(root) {

      var res = []
      var s = []
      var p = root
      while(p || s.length>0){
          while(p){
            res.push(p.val)
            s.push(p)
            p=p.left
          }
          
          p= s.pop()
          p=p.right
      }

      return res
};

//递归

var preorderTraversal = function(root) {
  if(!root){
      return []
  }
  let res = []
  deep(root,res)
  return res
  function deep(root,res){
      if(!root){
          return
      }
      res.push(root.val)
      deep(root.left,res)
      deep(root.right,res)
  }
};

