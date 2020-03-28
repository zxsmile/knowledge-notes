var minimumTotal = function(triangle) {

    var res = new Array(triangle.length).fill(new Array(triangle.length))
    

    for(var i=triangle.length-1;i>-1;i--){

        for(var j=0;j<triangle[i].length;j++){

            if(i===triangle.length-1){

                res[i][j] = triangle[i][j]
            }else{

                res[i][j] = Math.min(res[i+1][j],res[i+1][j+1])+triangle[i][j]
            }
        }
    }

    return res[0][0]
};


var triangle = [
    [2],
   [3,4],
  [6,5,7],
 [4,1,8,3]
]
console.log(minimumTotal(triangle))
