/*
给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] ：

0 <= a, b, c, d < n
a、b、c 和 d 互不相同
nums[a] + nums[b] + nums[c] + nums[d] == target
你可以按 任意顺序 返回答案 。

*/

var fourSum = function(nums, target) {
    let res = []
    if(nums===null||nums.length<4){
        return res
    }
    nums.sort((a,b)=>{
        return a-b
    })
    for(let i=0;i<nums.length-3;i++){
        if(nums[i]+nums[i+1]+nums[i+2]+nums[i+3]>target){
            break;
        }
        if(nums[i]+nums[nums.length-1]+nums[nums.length-2]+nums[nums.length-3]<target){
            continue;
        }

        if(i>0&&nums[i]===nums[i-1]){
            continue;
        }

        for(let j=i+1;j<nums.length-2;j++){
           if(nums[i]+nums[j]+nums[j+1]+nums[j+2]>target){
                break;
            }
            if(nums[i]+nums[j]+nums[nums.length-2]+nums[nums.length-1]<target){
                continue;
            }

            if(j>i+1&&nums[j]===nums[j-1]){
                continue;
            }
            let L=j+1
            let R=nums.length-1
            while(L<R){
                if(nums[i]+nums[j]+nums[L]+nums[R]<target){
                    L++
                }else if(nums[i]+nums[j]+nums[L]+nums[R]>target){
                    R--
                }else if(nums[i]+nums[j]+nums[L]+nums[R]==target){
                    res.push([nums[i],nums[j],nums[L],nums[R]])
                    while(L<R&&nums[L]===nums[L+1]){
                        L++
                    }
                    while(L<R&&nums[R]===nums[R-1]){
                        R--
                    }
                    L++
                    R--
                }
            }
 
        }
    }
    return res
};