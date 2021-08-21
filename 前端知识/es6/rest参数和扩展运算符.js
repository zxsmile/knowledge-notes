/*  一、rest参数

         - 形式：...变量
         - rest参数用于获取函数的剩余参数，与它搭配的变量是一个数组，该变量将多余的参数放入其中

                 function fn(...arg){
                     console.log(arg) 
                 }

                 fn(1,2,3) //[1,2,3]
         - rest参数是函数的最后一个形参，也就是说rest参数之后不能再有别的参数，否则会报错
            
                 function fn(a,...arg,b){} //报错

         - 函数的length长度不包括rest参数

                 function fn(a,...arg){} //length为1
                 function fn(...arg){}  //length为0
*/

/* 二、扩展运算符

        - 扩展运算符相当于rest参数的逆运算
        - 扩展运算符可以将数组转为将逗号隔开的参数序列
        - 任意定义了iterator（遍历器）接口的对象都可是使用扩展运算符转为真正的数组
        
                var str = 'hello'
                var array = [...str]
                console.log(array) // ['h','e','l','l','o']


*/ 