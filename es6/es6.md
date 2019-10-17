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

* promise有三种状态pending(进行中)、fulfilled(已成功)、rejected(已失败)




