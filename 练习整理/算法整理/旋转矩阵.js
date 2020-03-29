var rotate = function(matrix) {

    var row = matrix.length
    var col = matrix[0].length

    for(var i=0;i<row/2;i++){

        for(var j=i;j<col-1-i;j++){

            var temp = matrix[i][j]

            matrix[i][j] = matrix[row-1-j][i]

            matrix[row-1-j][i] = matrix[row-1-i][col-1-j]

            matrix[row-1-i][col-1-j] = matrix[j][col-1-i]
             
            matrix[j][col-1-i] = temp
        }
    }
    

    

     return matrix
};