/* 1.let,const有自己单独的作用域,const禁止重复赋值

var a=[]

for(let i=0;i<=10;i++){
    a[i]=function(){
        console.log(i)
    }
}

a[6]()

*/


/* 2. let,const不存在变量提升

console.log(i) //undefind

var i=0

console.log(i)  // 报错

let i=0

*/

/* 3.暂时性死区：在代码块内，使用let和const声明变量之前，该变量都是不可用的

 var temp = 2

 if(true){
     console.log(temp) //报错
     let temp = 2
 }

 */


 /* 4. let,const不允许在同一作用域中重复声明同一个变量

 function fun(){

    var i=0 
    const i=8
 }

 fun() // 报错

 function fun(){
     let i=2

     var i=3
 }

 fun() //报错

 */

 /* 5. const声明的变量必须赋初始值

 const i //报错

 */

 /* 6. let,const 只能出现在当前作用域的顶层

 if(true)  const i=9 // 报错，因为if没有带大括号，不存在块级作用域，所以报错

 if(true){
     let i=6 //不报错
 }

 */

 /* 7.let,const定义的变量不是顶层对象的属性

var a =1
 console.log(window.a) //1

 let b=2

 console.log(window.b) //undefind

 */

console.log(String.raw({ raw: ['foo', 'bar'] }, 1 + 2,6) )










