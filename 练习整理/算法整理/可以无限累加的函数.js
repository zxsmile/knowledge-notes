/*函数的toString方法，在函数被alert或用console.log打印一个函数是会被调用*/

function add(a){

    function s(b){
        a=a+b
        return s
    }
  
     s.toString=function(){
         return a
     }

     return s

}

console.log(add(1)(2)(3))

/*整个实现过程就是两个关键点。
1. 使用闭包， 同时要对JavaScript 的作用域链（原型链）有深入的理解；

2. 重写函数的 toSting()方法；

好的，对add(1)(2)(3); 一步一步分析： 

a) 执行add(1);   

　　　　　　返回的是里面的  s  函数， 通过闭包，s 函数里面可以访问到 变量 a=1;  所以 当我们 alert(add(1)); 的时候， 调用的 toSting（）方法会将作用域（原型链）里面的 a = 1 弹出来。

b) 执行add(1)(2);

　　　　　　<===等价于===> s(2);  这里面相当于 把 2 传递给 s()函数里面的 b , 让作用域（原型链）里面的 a = a+b ,此时 a = 3， 继续保存在作用域中了。 然后还是返回 s 函数。


c) 执行 add(1)(2)(3); 

　　　　　　<===等价于===> s(3);和上面 b) 中的分析一样，只是更新了作用域中的 a = 6 了，然后同样是返回 s 函数。

*/