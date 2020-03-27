var maxArea = function(height){
    var max = 0
    var left =0
    var right =1
    while(right<height.length){
        var sum = (right-left)*Math.min(height[left],height[right])
        max = Math.max(max,sum)
        if(right==height.length-1){
            left++
            right = left+1
        }else{
            right++
        }
    }

    return max
}

var height=[1,8,6,2,5,4,8,3,7]
console.log(maxArea(height))