var addBinary = function(a, b) {

    var result=[]
    var flag = 0
    var l1 = a.length-1
    var l2 = b.length-1
    while(l1>-1||l2>-1){
          var i = l1>-1? +a[l1]:0
          var j = l2>-1? +b[l2]:0
          var sum = i+j+flag
          flag=Math.floor(sum/2)
          result.unshift(sum%2)
          l1--
          l2--
    }

    if(flag==1){
       result.unshift(1)
    }
    return result.join('')
};
addBinary('1010','1011')