/**
 * 下一个排列”的定义是：给定数字序列的字典序中下一个更大的排列。
 * 如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。
 * 示例 1：

    输入：nums = [1,2,3]
    输出：[1,3,2]

    示例 2：

    输入：nums = [3,2,1]
    输出：[1,2,3]
 */

// 从后向前遍历，寻找第一个nums[i]>nums[i-1]的地方,找到的话这个时候nums[i-1]就是需要交换的值，找不到就直接翻转nums返回
// 然后寻找nums[i-1]之后的数中，大于nums[i-1]中最小的一个数
// 找到后将nums[i-1]和这个数交换位置，然后将nums[i-1]以后的数升序排列

var nextPermutation = function(nums) {
    if(nums.lengt<=1){
        return nums
    }
    for(var i=nums.length-1;i>0;i--){
        if(nums[i]>nums[i-1]){
            let k=i
            let max=nums[i]
           for(var j=nums.length-1;j>i;j--){
               if(nums[j]>nums[i-1]&&nums[j]<max){
                   max = nums[j]
                   k=j
               }
           }
           nums[k]=nums[i-1]
           nums[i-1]=max
           let arr = nums.splice(i).sort((a,b)=>a-b)
           nums.splice(i,0,...arr)
           return nums
        }
    }
    return nums.reverse()
 };