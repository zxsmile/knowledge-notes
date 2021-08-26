/*
  给一个字符串数组，返回一个数组，该数组中的每项是字母相同但排列顺序不同组成的数组
*/

var groupAnagrams = function(strs) {
    let copyStrs = strs.concat([])
    let sortStrs = copyStrs.map(str=>{
        let arr = str.split('').sort().join('')
        return arr
    }) 
    let res = []
    let map = new Map()
    sortStrs.forEach((str,index,sortStrs)=>{
          if(!map.get(str)){
              map.set(str,[strs[index]])
          }else{
              map.get(str).push(strs[index])
          }
    })
    
    res = [...map.values()]
    
    return res
 };