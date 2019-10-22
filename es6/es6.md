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

* macrotask和microtask
  * js中分为两种任务类型：macrotask和microtask，microtask称为jobs，macrotask可称为task
  * microtask称为jobs，macrotask可称为task
  * macrotask(又称之宏任务)，可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）
       * 每一个task会从头到尾将这个任务执行完毕，不会执行其它
       * 浏览器为了能够使得JS内部task与DOM任务能够有序的执行，会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染
  * microtask（又称为微任务），可以理解是在当前 task 执行结束后立即执行的任务
       * 也就是说，在当前task任务后，下一个task之前，在渲染之前
       * 所以它的响应速度相比setTimeout（setTimeout是task）会更快，因为无需等渲染
       * 也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）
  * 形成macrotask和microtask的场景
       * macrotask：主代码块，setTimeout，setInterval等（可以看到，事件队列中的每一个事件都是一个macrotask）
       * microtask：Promise，process.nextTick等
  * 再根据线程理解一下
       * macrotask中的事件都是放在一个事件队列中的，而这个队列由事件触发线程维护
       * microtask中的所有微任务都是添加到微任务队列（Job Queues）中，等待当前macrotask执行完毕后执行，而这个队列由JS引擎线程维护
       * 所以，总结下运行机制：
            * 执行一个宏任务（栈中没有就从事件队列中获取）
            * 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
            * 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
            * 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
            * 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）


如：console.log('script start');
   setTimeout(function() {
    console.log('setTimeout');
   }, 0);
   Promise.resolve().then(function() {
     console.log('promise1');
   }).then(function() {
     console.log('promise2');
   });
   console.log('script end');

  // script start
  // script end
  // promise1
  // promise2
  // setTimeout

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

6.class类

(1)定义

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

* 类本质上是原型链的二次包装，类相当于实例的原型，所有在类中定义的方法，都会被实例继承
* 以上就是定义了一个类，可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象
* 类的数据类型就是函数，类本身就指向构造函数。

如：class Point {
    // ...
   }

   typeof Point // "function"
   Point === Point.prototype.constructor // true

* 使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。

如：class Bar {
    doStuff() {
      console.log('stuff');
    }  
   }

  var b = new Bar();
   b.doStuff() // "stuff"

生成的实例b没有constructor属性，所以b会沿着原型链(b.__proto__)向上寻找

* 类的内部所有定义的方法，都是不可枚举的
* 类没有提升
* 不能使用字面量定义属性
类中无法像对象一样使用 prop: value 或者 prop = value 的形式定义一个类的属性，我们只能在类的构造方法或其他方法中使用 this.prop = value 的形式为类添加属性。
* 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用
* 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性，name属性总是返回紧跟在class关键字后面的类名

如：class Point {}
	Point.name // "Point"

(2)constructor方法

* constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法
* 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
 如：class Point {
	}
	
	// 等同于
	class Point {
	  constructor() {}
	}

* constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

如：class Foo {
	  constructor() {
	    return Object.create(null);
	  }
	}
	
	new Foo() instanceof Foo
	// false

上面代码中，constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。

* 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行

(3)类的实例

* 使用new命令生成类的实例，如果忘记加上new，像函数那样调用Class，将会报错
* new生成实例时，会默认调用constructor方法
* 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）

如：class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true

上面代码中，x和y都是实例对象point自身的属性（因为定义在this变量上），所以hasOwnProperty方法返回true，而toString是原型对象的属性（因为定义在Point类上），所以hasOwnProperty方法返回false

* 定义实例属性的新写法

实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层

如：class IncreasingCounter {
  _count = 0;
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}

上面代码中，实例属性_count与取值函数value()和increment()方法，处于同一个层级。这时，不需要在实例属性前面加上this

* 与 ES5 一样，类的所有实例共享一个原型对象

如：var p1 = new Point(2,3);
	var p2 = new Point(3,2);
	
	p1.__proto__ === p2.__proto__
	//true


* 可以通过实例的__proto__属性为“类”添加方法，实例的__proto__属性改写原型，必须相当谨慎，不推荐使用

(4)属性表达式

类的属性名，可以采用表达式

如：let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}

(5)class表达式

如:const MyClass = class Me {
	  getClassName() {
	    return Me.name;
	  }
	};

* 这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用

如：let inst = new MyClass();
	inst.getClassName() // Me
	Me.name // ReferenceError: Me is not defined

* 如果类的内部没用到的话，可以省略Me
* 采用 Class 表达式，可以写出立即执行的 Class
 
如：let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"

(6)Generator方法

* 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数

如：class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world

上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。

(7)this指向

* 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错

如：class Logger {
	  printName(name = 'there') {
	    this.print(`Hello ${name}`);
	  }
	
	  print(text) {
	    console.log(text);
	  }
	}
	
	const logger = new Logger();
	const { printName } = logger;
	printName(); // TypeError: Cannot read property 'print' of undefined

printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错

* 解决办法
  * 在构造方法中绑定this
   
   如：class Logger {
	  constructor() {
	    this.printName = this.printName.bind(this);
	  }
	
	  // ...
	}
   
   * 使用箭头函数
    
   如：class Obj {
	  constructor() {
	    this.getThis = () => this;
	  }
	}
	
	const myObj = new Obj();
	myObj.getThis() === myObj // true

  * 使用Proxy，获取方法的时候，自动绑定this
  
   如：function selfish (target) {
	  const cache = new WeakMap();
	  const handler = {
	    get (target, key) {
	      const value = Reflect.get(target, key);
	      if (typeof value !== 'function') {
	        return value;
	      }
	      if (!cache.has(value)) {
	        cache.set(value, value.bind(target));
	      }
	      return cache.get(value);
	    }
	  };
	  const proxy = new Proxy(target, handler);
	  return proxy;
	}
	
	const logger = selfish(new Logger());

(8)静态方法

* 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”

如：class Foo {
	  static classMethod() {
	    return 'hello';
	  }
	}
	
	Foo.classMethod() // 'hello'
	
	var foo = new Foo();
	foo.classMethod()
	// TypeError: foo.classMethod is not a function

Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法

* 如果静态方法包含this关键字，这个this指的是类，而不是实例

如：class Foo {
	  static bar() {
	    this.baz();
	  }
	  static baz() {
	    console.log('hello');
	  }
	  baz() {
	    console.log('world');
	  }
	}
	
	Foo.bar() // hello

静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名

* 父类的静态方法，可以被子类继承

如：class Foo {
	  static classMethod() {
	    return 'hello';
	  }
	}
	
	class Bar extends Foo {
	}
	
	Bar.classMethod() // 'hello'

* 静态方法也是可以从super对象上调用的
如：class Foo {
	  static classMethod() {
	    return 'hello';
	  }
	}
	
	class Bar extends Foo {
	  static classMethod() {
	    return super.classMethod() + ', too';
	  }
	}
	
	Bar.classMethod() // "hello, too"

(9)静态属性

* 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性

	如：class Foo {
		}
		
		Foo.prop = 1;
		Foo.prop // 1

* 新写法

	如：class Foo {
		  static prop = 1;
		}


7.class的继承

(1)定义

* 使用extends关键词可以实现类的继承
* es6的继承机制是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this
* es5的继承机制是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）
* 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
* 如果子类没有没有定义constructor方法，这个方法会被默认添加

	如：class ColorPoint extends Point {
	   }
		 
	   // 等同于
	   class ColorPoint extends Point {
		  constructor(...args) {
		    super(...args);
		  }
	   }

* 在子类的构造函数中只有调用super()方法后才能使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例
* 父类的静态方法也会被子类继承

(2)Object.getPrototypeOf方法可以用来从子类上获取父类

  Object.getPrototypeOf(Child) // Person

(3)super关键字

* 作为函数调用：
      * super作为函数调用时，代表父类的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)
        
        如：class A {
			  constructor() {
			    console.log(new.target.name);
			  }
			}
			class B extends A {
			  constructor() {
			    super();
			  }
			}
			new A() // A
			new B() // B

     new.target指向当前正在执行的函数。可以看到，在super()执行时，它指向的是子类B的构造函数，而不是父类A的构造函数。也就是说，super()内部的this指向的是B
     
     * 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错
     
        如：class A {}
           class B extends A {
			  m() {
			    super(); // 报错
			  }
			}

* 作为对象调用
      * 在普通方法中，super对象指向父类的原型对象
      
       如：class A {
			  p() {
			    return 2;
			  }
			}
			
			class B extends A {
			  constructor() {
			    super();
			    console.log(super.p()); // 2
			  }
			}
			
			let b = new B();

       上例中，super对象指向父类的原型对象，super.p=A.prototype.p

       * 在普通方法中,由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的
       
        如：class A {
			  constructor() {
			    this.p = 2;
			  }
			}
			
			class B extends A {
			  get m() {
			    return super.p;
			  }
			}
			
			let b = new B();
			b.m // undefined
        
      * 在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例
      
       如：class A {
			  constructor() {
			    this.x = 1;
			  }
			  print() {
			    console.log(this.x);
			  }
			}
			
			class B extends A {
			  constructor() {
			    super();
			    this.x = 2;
			  }
			  m() {
			    super.print();
			  }
			}
			
			let b = new B();
			b.m() // 2

      * 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性
      
        如:class A {
			  constructor() {
			    this.x = 1;
			  }
			}
			
			class B extends A {
			  constructor() {
			    super();
			    this.x = 2;
			    super.x = 3;
			    console.log(super.x); // undefined
			    console.log(this.x); // 3
			  }
			}
			
			let b = new B();

        上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。

     * 在静态方法中，super对象指向父类
     
      如：class Parent {
		  static myMethod(msg) {
		    console.log('static', msg);
		  }
		
		  myMethod(msg) {
		    console.log('instance', msg);
		  }
		}
		
		class Child extends Parent {
		  static myMethod(msg) {
		    super.myMethod(msg);
		  }
		
		  myMethod(msg) {
		    super.myMethod(msg);
		  }
		}
		
		Child.myMethod(1); // static 1
		
		var child = new Child();
		child.myMethod(2); // instance 2

     上面代码中，super在静态方法之中指向父类，在普通方法之中指向父类的原型对象

   * 在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例
    
     如：class A {
		  constructor() {
		    this.x = 1;
		  }
		  static print() {
		    console.log(this.x);
		  }
		}
		
		class B extends A {
		  constructor() {
		    super();
		    this.x = 2;
		  }
		  static m() {
		    super.print();
		  }
		}
		
		B.x = 3;
		B.m() // 3

* 使用super时必须显示的指定是作为对象还是函数，否则会报错
* 由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字
 
	  如：var obj = {
		  toString() {
		    return "MyObject: " + super.toString();
		  }
		};
		
		obj.toString(); // MyObject: [object Object]

(4)类的prototype属性和——proto——属性

* 子类的__proto__属性，表示构造函数的继承，总是指向父类。

* 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

	如：class A {
		}
		
		class B extends A {
		}
		
		B.__proto__ === A // true
		B.prototype.__proto__ === A.prototype // true


(5)实例的——proto__属性

* 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型


