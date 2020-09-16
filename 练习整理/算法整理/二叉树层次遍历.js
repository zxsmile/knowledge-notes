var levelOrder = function(root) {
  
    var res = []
    var lv = 0
    function level(node,lv){
          if(node){
              if(!res[lv]){
                  res[lv]=[]
              }
              res[lv].push(node.val)
              lv++
              level(node.left,lv)
              level(node.right,lv)
          }
    }

    level(root,lv)
    return res
};


