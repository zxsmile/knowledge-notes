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
      

     