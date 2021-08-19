// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 
// 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。

// 思路：

       // 对数组进行排序
       // 固定一个值nums[i]以及双指针（指针一个指向固定值后面一个值，一个指向数组末尾值）
       // 当nums[i]>0时，直接返回res，因为排序之后nums[i]为最小值
       // 当i>0时，nums[i]===nums[i-1]则跳过这个值（去重）


var threeSum = function(nums) {
  let res = []
  if(nums.length<3){
      return []
  }
  let newNums = nums.sort((a,b)=>{
      return a-b
  })
  for(var i=0;i<newNums.length-2;i++){
      if(newNums[i]>0){
          return res
      }
      if(i>0&&newNums[i]===newNums[i-1]){
          continue;
      }//去重
      let L = i+1
      let R = nums.length-1
       while(L<R){
          let sum = newNums[i]+newNums[L]+newNums[R]
          if(sum===0){
               res.push([newNums[i],newNums[L],newNums[R]])
               while(L<R&&newNums[L]==newNums[L+1]){
                   L=L+1
               } //去重
               while(L<R&&newNums[R]==newNums[R-1]){
                   R=R-1
               }//去重
               L=L+1
               R=R-1
          }else if(sum<0){
               L=L+1
          }else{
              R=R-1
          }
       }

  }
  return res
};