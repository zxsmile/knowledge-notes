
var spiralOrder = function(matrix) {
    if(!matrix || matrix.length===0){
        return matrix
    }
    let start = 0
    let res = []
    while(start*2<matrix[0].length && start*2<matrix.length){
      let endX = matrix[0].length -start-1
      let endY = matrix.length-start-1
      //从左往右遍历
      for(var i=start;i<=endX;i++){
          res.push(matrix[start][i])
      }
  
      //从上往下遍历
      if(start<endY){
          console.log()
           for(var i=start+1;i<=endY;i++){
            res.push(matrix[i][endX])
          }
      }
     
      //从右往左遍历
      if(endX>start && endY>start){
        for(var i=endX-1;i>=start;i--){
          res.push(matrix[endY][i])
         }
      }  
     
      //从下往上遍历
       if(endY-1>start && endX>start){
           for(var i=endY-1;i>start;i--){
              res.push(matrix[i][start])
           }
       }
      
      start++
    }
  
    return res
  };