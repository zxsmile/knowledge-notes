//给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。
//假定每组输入只存在唯一答案。

//思路：

     //和三数之和类似，先对数组进行排序
     //res初始化为前三个数之和
     //固定一个值nums[i]以及双指针（指针一个指向固定值后面一个值，一个指向数组末尾值）
     //当nums[i]>0且nums[i]>target,则最接近target的值就截至到此，不再向后比较了，因为往后的值只会比target越来越大
     //当nums[nums.length-1]<0且nums[i]>target,则最接近target的值为最后三个数之和

var threeSumClosest = function(nums, target) {
    nums.sort((a,b)=>{
        return a-b
    })
    let sum = nums[0]+nums[1]+nums[2]
    let res = sum
    for(let i=0;i<nums.length;i++){
        if(i>0&&nums[i]===nums[i-1]){
            continue;
        }
        if(nums[i]>0&&nums[i]>target){
            return res
        }
        if(nums[nums.length-1]<0&&nums[i]>target){
            res = nums[nums.length-1]+nums[nums.length-2]+nums[nums.length-3]
            return res
        }
        let L = i+1
        let R = nums.length-1
        while(L<R){
            sum = nums[i]+nums[L]+nums[R]
            if(sum==target){
             return sum
            }else if(sum<target){
              res = target-sum<Math.abs(res-target)?sum:res
              L++
            }else{
              res = sum-target<Math.abs(res-target)?sum:res
              R--
            }
        }
    }
    return res
 
 };