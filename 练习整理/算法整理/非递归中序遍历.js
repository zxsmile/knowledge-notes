var inorderTraversal = function(root){
      var res = []
      var s=[]
      var p = root

      while(p || s.length>0){
          while(p){
             s.push(p)
             p=p.left
          }

          p=s.pop()
          res.push(p.val)
          p=p.right
        } 

        return res
      }
      

// 递归

var inorderTraversal = function(root) {
  if(!root){
    return[]
  }
  let res = []
  deep(root,res)
  return res
  function deep(root,res){
    if(!root){
      return
    }
    deep(root.left,res)
    res.push(root.val)
    deep(root.right,res)
  }
}