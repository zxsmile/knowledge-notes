https://www.cnblogs.com/unclekeith/p/7679503.html

## 一、`CommonJS`

  - 对于**基本数据类型，属于复制**。即会被模块缓存。同时，在**另一个模块可以对该模块输出的变量重新赋值。**
  - 对于**复杂数据类型，属于浅拷贝**。由于**两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。**
  - 当使用`require`命令**加载某个模块时，就会运行整个模块的代码。**
  - 当使用`require`命令再次加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，**`CommonJS`模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。**
  - **循环加载时，属于加载时执行。即脚本代码在`require`的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。**

## 二、`ES6`模块

  - `ES6`模块中的值属于【**动态只读引用**】。
  - 对于只读来说，即**不允许修改引入变量的值，`import`的变量是只读的，不论是基本数据类型还是复杂数据类型。**
  - **当模块遇到`import`命令时，就会生成一个只读引用，等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。**
  - **对于动态来说，原始值发生变化，`import`加载的值也会发生变化。不论是基本数据类型还是复杂数据类型。**
  - **循环加载时，`ES6`模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行。**

## 三、上面说了一些重要区别。现在举一些例子来说明每一点吧

####  1、`CommonJS`

**（1）对于基本数据类型，属于复制，即会被模块缓存。同时，在另一个模块可以对该模块输出的变量重新赋值。**

```
// b.js
let count = 1
let plusCount = () => {
  count++
}

setTimeout(() => {
  console.log('b.js-1', count)
}, 1000)

module.exports = {
  count,
  plusCount
}
```

```
// a.js

let mod = require('./b.js')
console.log('a.js-1', mod.count)
mod.plusCount()
console.log('a.js-2', mod.count)
setTimeout(() => {
    mod.count = 3
    console.log('a.js-3', mod.count)
}, 2000)

node a.js
//输出
a.js-1 1
a.js-2 1
b.js-1 2  // 1秒后
a.js-3 3  // 2秒后
```

- 以上代码可以看出，`b`模块`export`的`count`变量，是一个复制行为。在`plusCount`方法调用之后，`a`模块中的`count`不受影响。同时，可以在`b`模块中更改`a`模块中的值。如果希望能够同步代码，可以`export`出去一个`getter`。
```
// 其他代码相同
module.exports = {
  get count () {
    return count
  },
  plusCount
}

node a.js
//输出
a.js-1 1
a.js-2 1
b.js-1 2  // 1秒后
a.js-3 2  // 2秒后， 由于没有定义setter，因此无法对值进行设置。所以还是返回2
```

**（2）对于复杂数据类型，属于浅拷贝。由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。**

```
// b.js
let obj = {
  count: 1
}

let plusCount = () => {
  obj.count++
}

setTimeout(() => {
  console.log('b.js-1', obj.count)
}, 1000)

setTimeout(() => {
  console.log('b.js-2', obj.count)
}, 3000)

module.exports = {
  obj,
  plusCount
}
	
```

```
// a.js
var mod = require('./b.js')

console.log('a.js-1', mod.obj.count)

mod.plusCount()

console.log('a.js-2', mod.obj.count)

setTimeout(() => {
  mod.obj.count = 3
  console.log('a.js-3', mod.obj.count)
}, 2000)

node a.js
//输出
a.js-1 1
a.js-2 2
b.js-1 2
a.js-3 3
b.js-2 3
```
 - 以上代码可以看出，对于对象来说属于浅拷贝。当执行`a`模块时，首先打印`obj.count`的值为1，然后通过`plusCount`方法，再次打印时为2。接着在`a`模块修改`count`的值为3，此时在`b`模块的值也为3。

**（3）当使用`require`命令加载某个模块时，就会运行整个模块的代码。**

**（4）当使用`require`命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，`CommonJS`模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。**

**（5）循环加载时，属于加载时执行。即脚本代码在`require`的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。**

- 3, 4, 5可以使用同一个例子说明：

  ```
  // b.js
  exports.done = false
  let a = require('./a.js')
  console.log('b.js-1', a.done)
  exports.done = true
  console.log('b.js-2', '执行完毕')
  ```

  ```
  // a.js
  exports.done = false
  let b = require('./b.js')
  console.log('a.js-1', b.done)
  exports.done = true
  console.log('a.js-2', '执行完毕')
  ```

  ```
  // c.js
  let a = require('./a.js')
  let b = require('./b.js')
  
  console.log('c.js-1', '执行完毕', a.done, b.done)
  
  node c.js
  //输出
  b.js-1 false
  b.js-2 执行完毕
  a.js-1 true
  a.js-2 执行完毕
  c.js-1 执行完毕 true true
  ```

- 仔细说明一下整个过程：

  - 在`Node.js`中执行`c`模块。此时遇到`require`关键字，执行`a.js`中所有代码。
  - 在`a`模块中`exports`之后，通过`require`引入了`b`模块，执行`b`模块的代码。
  - 在`b`模块中`exports`之后，又`require`引入了`a`模块，此时执行`a`模块的代码。**这里是循环引用，之前已经有输出了，不会再次加载，而是获取缓存。**
  - `a`模块只执行`exports.done = false`这条语句。
  - 回到`b`模块，打印`b.js-1  false` , `b.js-2  执行完毕`。
  - `b`模块执行完毕。
  - 回到`a`模块，接着打印`a.js-1 true`, `b.js-2 执行完毕`。
  - `a`模块执行完毕
  - 回到`c`模块，接着执行`require`，需要引入`b`模块。由于在`a`模块中已经引入过了，所以直接就可以输出值了。
  - 结束。

- 从以上结果和分析过程可以看出，当遇到`require`命令时，会执行对应的模块代码。**当循环引用时，有可能只输出某模块代码的一部分。当引用同一个模块时，不会再次加载，而是获取缓存。**

#### 2、`ES6`模块

**（1）`es6`模块中的值属于【动态只读引用】。只说明一下复杂数据类型。**

**（2）对于只读来说，即不允许修改引入变量的值，`import`的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到`import`命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。**

**（3）对于动态来说，原始值发生变化，`import`加载的值也会发生变化。不论是基本数据类型还是复杂数据类型。**

```
// b.js
export let counter = {
  count: 1
}
setTimeout(() => {
  console.log('b.js-1', counter.count)
}, 1000)
	
```

```
// a.js
import { counter } from './b.js'
counter = {}
console.log('a.js-1', counter)

// Syntax Error: "counter" is read-only


```
- 虽然不能将`counter`重新赋值一个新的对象，但是可以给对象添加属性和方法。此时不会报错。这种行为类型与关键字`const`的用法。

```
// a.js
import { counter } from './b.js'
counter.count++
console.log(counter)

//输出
// 2
```

**（4）循环加载时，`ES6`模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行。**

```
// b.js
import {foo} from './a.js';
export function bar() {
  console.log('bar');
  if (Math.random() > 0.5) {
    foo();
  }
}
```

```
// a.js
import {bar} from './b.js';
export function foo() {
  console.log('foo');
  bar();
  console.log('执行完毕');
}
foo();

node a.js
//输出
foo
bar
执行完毕

// 执行结果也有可能是
foo
bar
foo
bar
执行完毕
执行完毕
```
- 由于在两个模块之间都存在引用。因此能够正常执行。