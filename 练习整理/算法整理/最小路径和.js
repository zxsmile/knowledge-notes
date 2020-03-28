var minPathSum = function(grid) {

    var res = new Array(grid.length).fill(new Array(grid.length))
    
    for(var i=0;i<grid.length;i++){

        for(var j=0;j<grid[i].length;j++){

            if(i===0&&j===0){

                res[i][j]=grid[i][j]
            }

            if(i===0&&j!==0){
                
                res[i][j]= res[i][j-1]+grid[i][j]
            }

            if(i!==0&&j===0){

                res[i][j] = res[i-1][j]+grid[i][j]
            }

            if(i!==0&&j!==0){

                res[i][j]=Math.min(res[i-1][j],res[i][j-1])+grid[i][j]
            }
        }
    }


    return res[grid.length-1][grid[0].length-1]
}


var grid = [
    [1,3,1],
    [1,5,1],
    [4,2,1]
  ]
console.log(minPathSum(grid))