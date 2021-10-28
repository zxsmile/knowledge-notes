let arr1 = [1,6,7,8,9,25]
let arr2 = [2,3,5,6,10,12,13,31]
console.log(fn(arr1,arr2))

//法一
function fn(arr1,arr2){
   if(arr1[0]>arr2[arr2.length-1]){
      return arr2.concat(arr1)
   }
   if(arr2[0]>arr1[arr1.length-1]){
      return arr1.concat(arr2)
   }
   let res = []
  while(arr1.length&&arr2.length){
      if(arr1[0]<arr2[0]){
         res.push(arr1.shift())
      }else{
         res.push(arr2.shift())
      }
   }
   res = res.concat(arr1,arr2)
   return res
}

//法二

var merge = function(nums1, m, nums2, n) {
    let len1 = m-1
    let len2 = n-1
    let len = m+n-1
    while(len1>=0&&len2>=0){
        nums1[len--] = nums1[len1]>nums2[len2]?nums1[len1--]:nums2[len2--]
    }
    while(len1 >=0){
        nums1[len--] = nums1[len1--]
    }
 
    while(len2>=0){
        nums1[len--] = nums2[len2--]
    }
    return nums1
 };