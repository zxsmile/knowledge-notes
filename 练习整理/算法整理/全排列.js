/*1.给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
    思路：使用数组的splice插入元素
*/ 

var permute = function(nums) {
    if(nums.length<=1){
        return [nums]
    }
    let num = nums.splice(0,2)
    let result=[]
    let res=[]
    res.push(num.concat([]))
    res.push(num.reverse())
    
    for(let j=0;j<nums.length;j++){
       let newRes = []
       res.forEach((arr)=>{
        for(let i=0;i<=arr.length;i++){
            let newArr = arr.concat([])
            newArr.splice(i,0,nums[j])
            newRes.push(newArr)
        }
      })
      res = newRes
    }
    return res
};


/* 2. 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
      思路：使用了map键值的不可重复性和数组的splice插入元素
*/
var permuteUnique = function(nums) {
    if(nums.length<=1){
        return [nums]
    }
    nums.sort((a,b)=>{
        return a-b
    })
    let flag =nums.every(item=>{
        return item>0
    })
    let num = nums.splice(0,2)
    let map = new Map()
    if(flag){
        map.set(num.concat([]).join(''),true)
        if(!map.get(num)){
            map.set(num.reverse().join(''),true)
        }
    }else{
        map.set(num.concat([]).join(''),false)
        if(!map.get(num)){
            map.set(num.reverse().join(''),false)
        } 
    }
   
    let res = [...map.keys()]
   
    for(var i=0;i<nums.length;i++){
        let newRes = []
            res.forEach(s=>{
                if([...map.values()][0]){
                    s=s.split('')
                }else{
                    let arrs = []
                    for(var k=0;k<s.length;k++){
                       if(k<s.length-1&&s[k]==='-'){
                           arrs.push('-'+s[k+1])
                           k++
                       }else{
                           arrs.push(s[k])
                       }
                    }
                    s=arrs
                }
                 for(var j=0;j<=s.length;j++){
                        let newArr = s.concat([])
                        newArr.splice(j,0,nums[i]) 
                        if(!map.get(newArr.join(''))){
                            map.set(newArr.join(''),true)
                            newRes.push(newArr.join(''))

                        }
                    }
            })
        res = newRes
    }
    
    res = res.map(s=>{
        let arr =s.split('')
        if([...map.values()][0]){
            arr = arr.map(item=>{
                return +item
            })
        }else{
            let result = []
           for(var i=0;i<arr.length;i++){
               if(i<arr.length-1&&arr[i]==='-'){
                  result.push(+(arr[i]+arr[i+1]))
                  i++
               }else{
                   result.push(arr[i])
               }
           }
           arr = result
        }
        return arr
    })
    return res
   
};