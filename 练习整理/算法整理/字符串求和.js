var addStrings = function(num1, num2) {
    var result =[]
    var flag=0
    var i=num1.length-1
    var j=num2.length-1

    while(i>=0||j>=0){
        n1=i>=0?+num1[i]:0
        n2=j>=0?+num2[j]:0
        var num = n1+n2+flag
        flag=Math.floor(num/10)
        result.unshift(num%10)
        i--
        j--

    }

    //最后的进位
    if(flag===1){
        result.unshift(1)
    }

    return result.join('')
}


addStrings('712','523')
