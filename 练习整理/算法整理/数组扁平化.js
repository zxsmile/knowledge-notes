/* 1. 递归

    var newArr = []

    function flatArray(arr){

        for(var i=0;i<arr.length;i++){
            console.log(i)
            if(Array.isArray(arr[i])){
                flatArray(arr[i])
            }else{
                newArr.push(arr[i])
            }
        }
        return newArr
    }

*/

/* 2.toString

   toString() 在把数组转换成字符串时，首先要将数组的每个元素都转换为字符串。
   当每个元素都被转换为字符串时，才使用逗号进行分隔，以列表的形式输出这些字符串
   所以对于一个多维数组，JavaScript 会以迭代的方式调用 toString() 方法把所有数组都转换为字符串

      function flatArr(arr){
          return arr.toString().split(',').map(item=>{
              return +item
          })
      }

*/

/* 3.reduce

   function flatArr(arr){
        return arr.reduce(function(prev, next){
            return prev.concat(Array.isArray(next) ? flatArr(next) : next)
            }, [])
      }




*/

/* 4.rest运算符

   function flatArr(arr){
        while (arr.some(item => Array.isArray(item))) {
            arr = [].concat(...arr);
    
            }
            return arr;
      }

*/

/* 5.apply()

    function flatArr(arr){
        while (arr.some(item => Array.isArray(item))) {
            arr = [].concat.apply([],arr);
    
            }
            return arr;
      }
*/

