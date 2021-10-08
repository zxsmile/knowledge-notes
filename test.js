function quick(arr){
  if(arr.length<=1){
    return arr
  }
  let mid = Math.floor(arr.length/2)
  let target  = arr.splice(mid,1)[0]
  let left  = []
  let right = []

  for(var i=0;i<arr.length;i++){
    if(arr[i]<=target){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }

  return quick(left).concat(target,quick(right))
}
var arr =[6,5,9,7,8,12,4,5,56,14,45]
 console.log(quick(arr))