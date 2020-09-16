
function check(str){
   let arr = []
   let stack = []
   let aStr = '({[]})'

   //遍历str，将str中是括号的字符串全部push到arr数组，则arr数组就是全部的括号了
   for(var k=0;k<str.length;k++){
       if(aStr.indexOf(str[k])!==-1){
             arr.push(str[k])
       }
   }

   
   
   for(var i=0;i<arr.length;i++){

    //判断括号在aStr中的位置，如果index小于3，说明是左括号入栈
       let index = aStr.indexOf(arr[i])
       if(index<3){
           stack.push(arr[i])
       }else{

    //是右括号，栈列表出栈一个元素与之匹配
        let target = stack.pop()

    //如果出栈元素不存在，则这个右括号没有响应匹配的左括号，验证失败
           if(!target){
               return false
           }

    //出栈元素与右括号比较，这里比较利用aStr总长度减去右括号在aStr中位置再减1，就会得到和该右括号相匹配的正确的左括号，
    //如果正确的左括号和出栈元素不相等，验证失败
           let dTarget = aStr[aStr.length-index-1]
           if(target !== dTarget){
               return false
           }
       }
   }

   //循环匹配完成后，如果栈列表还有元素，则缺少与之匹配的右括号，验证失败
   if(stack.length){
       return false
   }

   return true
}
let str = '{6(66}6)66}'
console.log(check(str))

