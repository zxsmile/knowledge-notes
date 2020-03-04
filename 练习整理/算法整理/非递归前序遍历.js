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

