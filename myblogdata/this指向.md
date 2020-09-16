---
title: this指向
date: 2018-10-12 12:07:03
tags:
cover: /images/psb1.jpg
---

 **<font color=red>&ensp;&ensp;this的指向在一开始函数的创建时是决定不了的，在调用的时候才能决定，谁调用它，它就指向谁。</font>**（不过这种说法也不算很准确，因为可能会存在下面例三的情况）
  下面我们举例说明：
  **例一**
 ```php
 function o(){t"梦想”;
           console.log(this.user); //undefined
           console.log(this); //Window
            }
          o();
   ```
   &ensp;&ensp;例一中函数o是被Window对象所调用的，如上面我们说的this指向最终调用它的对象，所以这里的this指向Window。
   **例二**
 ```php
   var o={
       use:"梦想";
       fn:function(){
             console.log(this.use); //梦想
       }
    }
    o.fn();
 ```
 &ensp;&ensp;例二中的调用fn是通过o.fn()执行的，则this的指向就是对象o。
 **例三**
 ```php
  var o={
       use:"梦想";
       fn:function(){
             console.log(this.use); //梦想
       }
    }
    window.o.fn();
 ```
 &ensp;&ensp;上面我们说this应指向调用它的对象，例三这里this为什么没有指向window呢？ 接下来我们就用关于this的三种情况来解释例三。
<font color=red>情况一：如果一个函数中有this，但它没有被它的上一级调用，则this就指向window。</font>
<font color=red>情况二：如果一个函数中有this，但它被它的上一级调用了，则this就指向它的上一级。</font>
**例四**
```php
var o={
       a:1;
       p:{
          a:2;
          fn:function(){
                   console.log(this.a); \\ 2
                   }
            }
    }
    o.p.fn()
 ```
 **例五**
 ```php
var o={
       a:1;
       p:{
          a:2;
          fn:function(){
                   console.log(this.a); \\ undefined
                   console.log(this); \\window
                   }
            }
    }
   s=o.p.fn;
   s();
 ```
 &ensp;&ensp;例四符合情况二，函数被它的上一级调用，所以this指向它的上一级p,而例五同样是函数被它的上一级调用了，为什么this没有指向它的上一级，而是指向了window呢？其实这里有一种特殊情况。
 <font color=red>特殊情况：大家看一看例四和例五有什么不同呢，例四是调用了函数，函数直接执行了。而例五只是把函数赋给变量S，并没有执行函数，而应该是在s()语句时，函数才被调用执行。window是JS中的全局对象，我们创建变量实质上是给window增加属性，所以this最终指向window</font>。
<font color=red>情况三：如果一个函数中有this，这个函数中包含了多个对象，尽管这个函数被最外层的对象所调用，this指向的也是它的上一级。</font>
**构造函数版this** 
<font color=red>&ensp;&ensp;new关键字做了什么：
* 创建一个新的对象，这个对象的类型是object；
* 改变this的指向；
**例六**
```php
function o{
         this.use="梦想";
         }
    var a=new o();
    console.log(a.use); \\梦想
 ```
 &ensp;&ensp;例六这里为什么可以用a可以点出o函数里面的use，是因为new可以改变this的指向，使this指向a对象。a=new o()这条语句就是将o复制了一份到a里面，这时并没有执行函数，a.use语句才执行了函数，所以this指向a。
 **函数中既含有this又含有return**
 <font color=red>如果返回值是一个对象则this指向那个返回的对象，如果返回值不是一个对象，则this指向new新建的对象。特殊的若返回值是null(是对象)，this还是指向新建的对象。</font>
 **例七**
 ```php
 function o{
         this.use="梦想";
         return {};
         }
    var a=new o();
    console.log(a.use); \\undefined
 ```
 **例八**
 ```php
 function o{
         this.use="梦想";
         return 1;
         }
    var a=new o();
    console.log(a.use); \\梦想
 ```
**例九**
```php
 function o{
         this.use="梦想";
         return null;
         }
    var a=new o();
    console.log(a.use); \\梦想
 ```
     
      