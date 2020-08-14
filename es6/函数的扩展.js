/* 1.利用rest参数完成数组的push方法

rest参数之后不能再有其他参数，否则会报错

function push (array,...values){
    values.forEach((value)=>{
          array.push(value)
    })
}

var a=[2]
push(a,1,2,3)

console.log(a)
*/


/* 2.函数的length属性
      (1)返回没有指定默认值的函数参数
      (2)如果设定的默认值参数不是为参数，那么length属性也不再计入后面的参数了
      (3)函数的length属性不包括rest参数
      

      var fun = function(x,y=5,z){
      
      }

      console.log(fun.length) // 1
  
     var rest =function(x,...values){}

      console.log(rest.length) //1

*/





     
      