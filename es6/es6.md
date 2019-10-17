一、es6新特性
1.let,const

(1)let 

* 无变量提升
* 有块级作用域
* 不允许在相同作用域中重复声明同一个变量
* 定义的变量不属于顶层对象的属性

(2)const

* 无变量提升
* 有块级作用域
* 不允许在相同作用域中重复声明同一个变量
* 禁止重复赋值
* 必须赋初始值
* 定义的变量不属于顶层对象的属性

2.模板字符串

* 用反引号（`）标识。它可以当作普通字符串使用

`In JavaScript '\n' is a line-feed.`

* 可以用来定义多行字符串

`In JavaScript this is
 not legal.`

* 可以在字符串中嵌入变量

`Hello ${name}, how are you ${time}?`

* 模板字符串的大括号内部，就是执行 JavaScript 代码，大括号内部可以放字符串，js表达式，变量，函数，对象，都会把它们转换成字符串输出。

3.解构赋值

(1)数组的解构赋值

* 数组元素按次序排列，变量的取值由它的位置决定，解构不成功值为undefined

如：let [x,y,z]=[1,,2]
    x // 1
    y // undefined
    z // 2

* 只要某种数据结构具有Iterator接口(即：可遍历)，都可以采用数组形式的解构赋值

如：let [x, y, z] = new Set(['a', 'b', 'c']);
    x // "a"

* 解构赋值允许指定默认值

如：let [x, y = 'b'] = ['a', undefined];
    x // 'a'
    y // 'b'

(2)对象的解构赋值

* 对象的解构赋值与数组有不同，对象的属性没有次序，变量必须与属性同名，才能取到正确的值

如：let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
   foo // "aaa"
   bar // "bbb"

* 可以很方便地将现有对象的方法，赋值到某个变量

如：let { log, sin, cos } = Math;

   将Math.log()赋值给变量log,调用log()就相当于调用Math.log()
   将Math.sin()赋值给变量sin,调用sin()就相当于调用Math.sin()
   将Math.cos()赋值给变量cos,调用cos()就相当于调用Math.cos()

如：const { log } = console;

   将console.log()赋值给变量log,调用log()就相当于调用console.log()
   log('hello') // hello

* 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。 

如：let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
    baz // "aaa"
    foo // error: foo is not defined

* 解构赋值允许指定默认值，条件是对象的属性值严格等于undefined

如：var {x = 3} = {x: undefined};
    x // 3

如：var {x = 3} = {x: null};
    x // null

* 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

如：let arr = [1, 2, 3];
   let {0 : first, [arr.length - 1] : last} = arr;
    first // 1
    last // 3

(3)字符串的解构赋值

* 字符串具有Iterator接口，所以可以进行数组形式的解构赋值

如：const [a, b, c, d, e] = 'hello';
    a // "h"
    b // "e"
    c // "l"
    d // "l"
    e // "o"

* 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值

如：let {length : len} = 'hello';
    len // 5

(4)数组和布尔值的解构赋值

* 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象

如：let {toString: s} = 123;
    s === Number.prototype.toString // true

如：let {toString: s} = true;
    s === Boolean.prototype.toString // true

上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。

(5)函数的解构赋值

* 函数的参数也可以使用解构赋值

如：function add([x, y]){
      return x + y;
    }

    add([1, 2]); // 3

函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y

* 函数参数的解构也可以使用默认值

如：function move({x = 0, y = 0} = {}) {
      return [x, y];
   }

    move({x: 3, y: 8}); // [3, 8]
    move({x: 3}); // [3, 0]
    move({}); // [0, 0]
    move(); // [0, 0]

4.箭头函数

(1)语法

* 当箭头函数入参只有一个时可以省略入参括号；
* 当入参多余一个或没有入参时必须写括号；
* 当函数体只有一个 return 语句时可以省略函数体的花括号与 return 关键字
* 当省略{}和return时，如果返回的内容是一个对象，对象需要用括号（）括起来:，否则引擎认为大括号是代码块，只是执行了一遍返回值为undefined。
* 箭头函数可以与变量解构结合使用。

如：const full = ({ first, last }) => first + ' ' + last;

   // 等同于
   function full(person) {
     return person.first + ' ' + person.last;
   }

(2)使用注意点

* 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
   * this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
   * 在箭头函数中，函数体内部没有自己的 this，默认在其内部调用 this 的时候，会自动查找其父级上下文的 this 对象（如果父级同样是箭头函数，则会按照作用域链继续向上查找） 
* 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
* 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
   * 当函数体中有另外一个函数，并且该函数为箭头函数时，该箭头函数的函数体中可以直接访问父级函数的 arguments 对象。
   * 由于箭头函数本身没有 arguments 对象，所以如果他的上层函数都是箭头函数的话，那么 arguments 对象将不可用。
* 箭头函数没有prototype属性
* 箭头函数无法使用 call（）或 apply（）来改变其运行的作用域
* 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

5.promise

(1)promise用法

* promise新建后就会立即执行，promise构造函数是同步执行的，而then方法是异步执行的

   如：let promise = new Promise(function(resolve, reject) {
           console.log('Promise');
           resolve();
        });

        promise.then(function() {
          console.log('resolved');
        });

        console.log('Hi!');

      // Promise
      // Hi!
      // resolved

上面代码中，Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。

* promise有三种状态pending(进行中)、fulfilled(已成功)、rejected(已失败)
* promise有两个过程pending-fulfilled、pending-rejected
* 调用resolve或reject并不会终结promise的函数执行

如：new Promise((resolve, reject) => {
      resolve(1);
      console.log(2);
   }).then(r => {
      console.log(r);
   });
    // 2
    // 1

* resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
* reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去

(2)Promise.prototype.then()

* then方法是定义在原型对象promise.prototype上的
* 作用是为Promise实例添加状态改变时的回调函数
* 第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数(可选)
* then方法返回的是一个新的Promise实例，因此可以使用链式结构，即then方法后再调用另一个then方法

(3)Promise.prototype.catch()

* 用于指定错误时的回调函数
* 如果异步操作抛出错误，状态就会变为rejected，就会调用catch方法指定的回调函数，另外，then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。
* 如果catch前面的then方法里面有处理异步错误的方法，则异步错误就会被then方法里面的回调捕获，不会再被catch捕获了。
* 如果catch前面的then方法里面有处理异步错误的方法，异步操作抛出错误的同时，catch前面的then方法也抛出了错误，则异步错误就会被then方法里面的回调捕获，then方法里面错误既不会被then方法里面的回调捕获，也不会被catch捕获。
* 如果catch前面的then方法里面有处理异步错误的方法，只有catch前面的then方法抛出了错误，则then方法里面错误会被catch捕获
* catch中还会再抛出错误
* 如果 Promise 状态已经变成resolved，再抛出错误是无效的，因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了
* Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获

(4)reject和catch处理上有什么区别

* reject是用来抛出错误的，catch是用来处理错误的
* reject是Promise的方法，catch是Promise实例的方法
* reject后的东西，一定进入then的第二个回调，如果then方法里面没有写第二个回调，则进入catch
* 网络异常(比如断网则会直接进入catch)

(5)Promise.prototype.finally()

* finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

(6)Promise.all()

* Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例

如：const p = Promise.all([p1,p2,p3])

* Promise.all()方法的参数必须具有Iterator 接口，且返回的每个成员都是 Promise 实例，如果不是Promise的实例，就会调用promise.resolve()方法，将参数转为Promise的实例
* 如上例中所示，p的状态由p1,p2,p3决定：
   * 当p1,p2,p3的状态全变成fulfilled时，p的状态才是fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数
   * 只要p1,p2,p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数

(7)Promise.race()

* Promise.race()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
* 参数和Promise.all()一样
* 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

(8)Promise.allSettled()

* Promise.allSettled()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
* 参数和Promise.all()一样
* 只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束
* 该方法返回的新的Promise实例，一旦结束，状态总是fulfilled，不会变成rejected

(9)Promise.any()

* Promise.any()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
* 参数和Promise.all()一样
* 只要参数实例中有一个变成fulfilled，包装实例就会变成fulfilled状态，所有参数都变成rejected状态，包装实例才会变成rejected状态

(10)Promise.resolve()

* 将现有对象转为Promise对象

如：Promise.resolve('foo')
   // 等价于
   new Promise(resolve => resolve('foo'))

* Promise.resolve()参数有四种情况：

    * 参数是一个Promise实例
     Promise.resolve将不做任何修改、原封不动地返回这个实例
    * 参数是一个thenable对象
     thenable对象指具有then方法的对象

      如：let thenable = {
              then: function(resolve, reject) {
              resolve(42);
            }
          };

     Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法
    * 参数不是具有then方法的对象，或根本就不是对象
      如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。

        如：const p = Promise.resolve('Hello');
           p.then(function (s){
              console.log(s)
              });

          // Hello

        由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。
    
    * 不带有任何参数
     直接返回一个resolved状态的Promise对象

* 如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。
* 立即resolve()的Promise 对象，是在本轮"事件循环"的结束执行，而不是在下一轮"事件循环"的开始时

如：setTimeout(function () {
    console.log('three');
   }, 0);

   Promise.resolve().then(function () {
     console.log('two');
   });

   console.log('one');

   // one
  // two
  // three

上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。

(11)Promise.reject()

* 返回一个新的Promise实例，该实例的状态是rejected
* Promise.reject()方法的参数会原封不动的作为reject的理由，变成后续方法的参数，这点与Promise.resolve()方法不同

如：const p = Promise.reject('出错了');
    // 等同于
   const p = new Promise((resolve, reject) => reject('出错了'))

   p.then(null, function (s) {
     console.log(s)
   });

   // 出错了

如：const thenable = {
     then(resolve,reject){
        reject('出错了')
     }
   }
  
   Promise.reject(thenable)
    .catch(e=>{
      console.log(e===thenable)
    })

   // true

catch方法的参数不是reject抛出的'出错了'，而是thenable对象，这也印证了Promise.reject()方法的参数会原封不动的作为reject的理由，变成后续方法的参数