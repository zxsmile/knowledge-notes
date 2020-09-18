function mergeSort(arr){
  if(arr.length<2){
      return arr
  }
  let mid = Math.floor(arr.length/2)
  let left = arr.slice(0,mid)
  let right = arr.slice(mid)
   // 递归调用自身，拆分的数组都是排好序的，最后传入merge合并处理
  return merge(mergeSort(left),mergeSort(right))
}

// 将两个排好序的数组合并成一个顺序数组
function merge(left,right){
    let res = []
    while(left.length && right.length){
        // 不断比较left和right数组的第一项，小的取出存入res
        if(left[0]<right[0]){
           res.push(left.shift())
        }else{
           res.push(right.shift())
        }
    }

   return res.concat(left,right)
}

let arr =[5,4,1,8,2,9,6]
console.log(mergeSort(arr))