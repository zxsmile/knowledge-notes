
// 给定一个字符串，找出不含有重复字符的最长子串的长度。
// 示例：
 
    // 给定 "abcabcbb" ，没有重复字符的最长子串是 "abc" ，那么长度就是3。
    // 给定 "bbbbb" ，最长的子串就是 "b" ，长度是1。
    // 给定 "pwwkew" ，最长子串是 "wke" ，长度是3。请注意答案必须是一个子串，"pwke" 


    let str = 'pwwkew'

    function fn(str){
      let len = 0
      let newStr = ''
      let maxStr=''
      for(var i=0;i<str.length;i++){
          if(newStr.indexOf(str[i])===-1){
            newStr = newStr+str[i]
            len++
          }else{
             maxStr=maxStr.length<len?newStr:maxStr
             newStr = str[i]
             len=1
          }
      }
      return maxStr
    }
    
    console.log(fn(str))