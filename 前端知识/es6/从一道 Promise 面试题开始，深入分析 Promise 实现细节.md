# 一、引入

```
Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})

// 大家先思考一下
```

这道面试题是无意间在微信群里看到的，据说是某厂的面试题。一般关于 `Promise` 的面试题无非是考察宏微任务、`EventLoop` 之类的，当我认真去分析这道题的时候，越看越不对劲，感觉有诈！这是要考察啥？

不管了，先在浏览器输出一下看看 🤨

打印结果：**0、1、2、3、4、5、6** 😱

这里4怎么跑到3后面去了，不讲武德？ `Why`......

在我看来，这道题有两个 `Promise.resolve()`，相当于创建两个**状态为 `fulfilled` 的 `Promise`**。

紧随他们后面的第一个 then 方法会交替将其执行函数送入**微任务队列排队执行**，所以这里的0和1，大家都可以理解，但是接下来执行的不是 `console.log(res)` 而是 `console.log(2)`。

如果说需要等待 `return Promise.resolve(4)` 执行完并将其结果和状态同步给外部的 Promise，那么这里只需要创建一个微任务去处理就应该可以了，也就是 4 会在 2 后面才对，为啥需要**创建两个微任务**呢？ 🤔

无奈之下，决定参考 `Promise A+` 规范手写一版 `Promise`，看看能不能从实现细节中找到蛛丝马迹。

# 二、手写前需要先了解这些

如果感觉对 `Promise` 还不太熟悉的就先移步 [Promise 入门](https://link.juejin.cn?target=https%3A%2F%2Fes6.ruanyifeng.com%2F%23docs%2Fpromise)，稍微做一下知识预习，了解一下 `Promise` 的常规用法。

## 什么是宏任务与微任务？

我们都知道 `Js` 是单线程都，但是一些高耗时操作就带来了进程阻塞问题。为了解决这个问题，`Js` 有两种任务的执行模式：**同步模式（`Synchronous`）和异步模式（`Asynchronous`）**。

在异步模式下，创建**异步任务主要分为宏任务与微任务两种**。`ES6` 规范中，宏任务（`Macrotask`） 称为 `Task`， 微任务（`Microtask`） 称为 `Jobs`。宏任务是由宿主（浏览器、`Node`）发起的，而微任务由 `JS` 自身发起。

#### 宏任务与微任务的几种创建方式 👇

| 宏任务（`Macrotask`）        | 微任务（`Microtask`）             |
| ---------------------------- | --------------------------------- |
| `setTimeout`                 | `requestAnimationFrame`（有争议） |
| `setInterval`                | `MutationObserver`（浏览器环境）  |
| `MessageChannel`             | `Promise.[ then/catch/finally ]`  |
| `I/O`，事件队列              | `process.nextTick`（`Node`环境）  |
| `setImmediate`（`Node`环境） | `queueMicrotask`                  |
| `script`（整体代码块）       |                                   |

#### 如何理解 `script`（整体代码块）是个宏任务呢🤔

实际上如果同时存在两个 `script` 代码块，会首先在执行第一个 `script` 代码块中的同步代码，如果这个过程中创建了微任务并进入了微任务队列，第一个 `script` 同步代码执行完之后，会首先去清空微任务队列，再去开启第二个 `script` 代码块的执行。所以这里应该就可以理解 `script`（整体代码块）为什么会是宏任务。

### 什么是 `EventLoop` ？

先来看个图

![es6-1](.\img\es6-1.png)

1. #### 判断宏任务队列是否为空

   - 不空 --> 执行最早进入队列的任务 --> 执行下一步
   - 空 --> 执行下一步

2. #### 判断微任务队列是否为空

   - 不空 --> 执行最早进入队列的任务 --> **继续检查微任务队列空不空**
   - 空 --> 执行下一步

因为首次执行宏队列中会有 `script`（整体代码块）任务，所以实际上就是 Js 解析完成后，在异步任务中，会先执行完所有的微任务，这里也是很多面试题喜欢考察的。需要注意的是，新创建的微任务会立即进入微任务队列排队执行，不需要等待下一次轮回。

## 什么是 `Promise A+` 规范？

看到 `A+` 肯定会想到是不是还有 `A`，事实上确实有。其实 `Promise` 有多种规范，除了前面的 `Promise A`、`promise A+` 还有 `Promise/B`，`Promise/D`。**目前我们使用的 `Promise` 是基于 `Promise A+` 规范实现的**，感兴趣的移步 [Promise A+规范](https://link.juejin.cn?target=https%3A%2F%2Fpromisesaplus.com%2F)了解一下，这里不赘述。

检验一份手写 `Promise` 靠不靠谱，通过 `Promise A+` 规范自然是基本要求，这里我们可以借助 [promises-aplus-tests](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpromises-aplus-tests) 来检测我们的代码是否符合规范，后面我会讲到如何使用它。

# 三、手写开始

很多手写版本都是使用 `setTimeout` 去做异步处理，但是 `setTimeout` 属于宏任务，这与 `Promise` 是个微任务相矛盾，所以我打算选择一种创建微任务的方式去实现我们的手写代码。

这里我们有几种选择，一种就是 `Promise A+` 规范中也提到的，`process.nextTick`（ `Node` 端 ） 与`MutationObserver`（ 浏览器端 ），考虑到利用这两种方式需要做环境判断，所以在这里我们就推荐另外一种创建微任务的方式 `queueMicrotask`，了解更多 --> [在 JavaScript 中通过 queueMicrotask() 使用微任务](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTML_DOM_API%2FMicrotask_guide);

## 1、Promise 核心逻辑实现

我们先简单实现一下 `Promise` 的基础功能。先看原生 `Promise` 实现的 🌰，第一步我们要完成相同的功能。

原生🌰 👇

```js
const promise = new Promise((resolve, reject) => {
   resolve('success')
   reject('err')
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})

// 输出 resolve success
```

### 我们来分析一下基本原理：

> 1. `Promise` 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行
> 2. `Promise` 会有三种状态
>    - `Pending` 等待
>    - `Fulfilled` 完成
>    - `Rejected` 失败
> 3. 状态只能由 `Pending` --> `Fulfilled` 或者 `Pending` --> `Rejected` ，且一但发生改变便不可二次修改；
> 4. `Promise` 中使用 `resolve` 和 `reject` 两个函数来更改状态；
> 5. `then` 方法内部做但事情就是状态判断
>    - 如果状态是成功，调用成功回调函数
>    - 如果状态是失败，调用失败回调函数

### 下面开始实现：

#### 1. 新建 `MyPromise` 类，传入执行器 `executor`

```js
// 新建 MyPromise.js

// 新建 MyPromise 类
class MyPromise {
  constructor(executor){
    // executor 是一个执行器，进入会立即执行
    executor() 
  }
}
```

#### 2. `executor` 传入 `resolve` 和 `reject` 方法

```js
// MyPromise.js

// 新建 MyPromise 类
class MyPromise {
  constructor(executor){
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    executor(this.resolve, this.reject) 
  }
  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象
  // 更改成功后的状态
  resolve = () => {}
  // 更改失败后的状态
  reject = () => {}
}
```

#### 3. 状态与结果的管理

```js
// MyPromise.js

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 新建 MyPromise 类
class MyPromise {
  constructor(executor){
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    executor(this.resolve, this.reject)
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;

  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
    }
  }

  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
    }
  }
}
```

#### 4. `then` 的简单实现

```js
// MyPromise.js

then(onFulfilled, onRejected) {
  // 判断状态
  if (this.status === FULFILLED) {
    // 调用成功回调，并且把值返回
    onFulfilled(this.value);
  } else if (this.status === REJECTED) {
    // 调用失败回调，并且把原因返回
    onRejected(this.reason);
  }
}
```

#### 5. 使用 `module.exports` 对外暴露 `MyPromise` 类

```js
// MyPromise.js
module.exports = MyPromise;
```

### 看一下我们目前实现的完整代码🥳

```js
// MyPromise.js

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 新建 MyPromise 类
class MyPromise {
  constructor(executor){
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    executor(this.resolve, this.reject)
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;

  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
    }
  }

  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
    }
  }

  then(onFulfilled, onRejected) {
    // 判断状态
    if (this.status === FULFILLED) {
      // 调用成功回调，并且把值返回
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      // 调用失败回调，并且把原因返回
      onRejected(this.reason);
    }
  }
}

module.exports = MyPromise
```

使用我的手写代码执行一下上面那个🌰

```js
// 新建 test.js

// 引入我们的 MyPromise.js
const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
   resolve('success')
   reject('err')
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})

// 执行结果：resolve success
```

执行结果符合我们的预期，第一步完成了👏👏👏

## 2、在 `Promise` 类中加入异步逻辑

上面还没有经过异步处理，如果有异步逻辑加如来会带来一些问题，例如：

```js
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000); 
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})

// 没有打印信息！！！
```

**分析原因**：

> 主线程代码立即执行，`setTimeout` 是异步代码，`then` 会马上执行，这个时候判断 `Promise` 状态，状态是 `Pending`，然而之前并没有判断等待这个状态

这里就需要我们处理一下 `Pending` 状态，我们改造一下之前的代码 🤔

#### 1. 缓存成功与失败回调

```js
// MyPromise.js

// MyPromise 类中新增
// 存储成功回调函数
onFulfilledCallback = null;
// 存储失败回调函数
onRejectedCallback = null;
```

#### 2. `then` 方法中的 `Pending` 的处理

```js
// MyPromise.js

then(onFulfilled, onRejected) {
  // 判断状态
  if (this.status === FULFILLED) {
    // 调用成功回调，并且把值返回
    onFulfilled(this.value);
  } else if (this.status === REJECTED) {
    // 调用失败回调，并且把原因返回
    onRejected(this.reason);
  } else if (this.status === PENDING) {
    // ==== 新增 ====
    // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
    // 等到执行成功失败函数的时候再传递
    this.onFulfilledCallback = onFulfilled;
    this.onRejectedCallback = onRejected;
  }
}
```

#### 3. `resolve` 与 `reject` 中调用回调函数

```js
// MyPromise.js

// 更改成功后的状态
resolve = (value) => {
  // 只有状态是等待，才执行状态修改
  if (this.status === PENDING) {
    // 状态修改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // ==== 新增 ====
    // 判断成功回调是否存在，如果存在就调用
    this.onFulfilledCallback && this.onFulfilledCallback(value);
  }
}
js 体验AI代码助手 代码解读复制代码// MyPromise.js
// 更改失败后的状态
reject = (reason) => {
  // 只有状态是等待，才执行状态修改
  if (this.status === PENDING) {
    // 状态成功为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;
    // ==== 新增 ====
    // 判断失败回调是否存在，如果存在就调用
    this.onRejectedCallback && this.onRejectedCallback(reason)
  }
}
```

我们再执行一下上面的🌰

```js
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000); 
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})

// 等待 2s 输出 resolve success
```

目前已经可以简单处理异步问题了✌️

## 3、实现 `then` 方法多次调用添加多个处理函数

> `Promise` 的 `then` 方法是可以被多次调用的。这里如果有三个 `then` 的调用，如果是同步回调，那么直接返回当前的值就行；如果是异步回调，那么保存的成功失败的回调，需要用不同的值保存，因为都互不相同。之前的代码需要改进。

同样的先看一个🌰

```js
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000); 
})

promise.then(value => {
  console.log(1)
  console.log('resolve', value)
})
 
promise.then(value => {
  console.log(2)
  console.log('resolve', value)
})

promise.then(value => {
  console.log(3)
  console.log('resolve', value)
})

// 3
// resolve success
```

目前的代码只能输出：`3 resolve success`，怎么可以把 1、2 弄丢呢！

我们应该一视同仁，保证所有 `then` 中的回调函数都可以执行 🤔 继续改造

#### 1. `MyPromise` 类中新增两个数组

```js
// MyPromise.js

// 存储成功回调函数
// onFulfilledCallback = null;
onFulfilledCallbacks = [];
// 存储失败回调函数
// onRejectedCallback = null;
onRejectedCallbacks = [];
```

#### 2. 回调函数存入数组中

```js
// MyPromise.js

then(onFulfilled, onRejected) {
  // 判断状态
  if (this.status === FULFILLED) {
    // 调用成功回调，并且把值返回
    onFulfilled(this.value);
  } else if (this.status === REJECTED) {
    // 调用失败回调，并且把原因返回
    onRejected(this.reason);
  } else if (this.status === PENDING) {
    // ==== 新增 ====
    // 因为不知道后面状态的变化，这里先将成功回调和失败回调存储起来
    // 等待后续调用
    this.onFulfilledCallbacks.push(onFulfilled);
    this.onRejectedCallbacks.push(onRejected);
  }
}
```

#### 3. 循环调用成功和失败回调

```js
// MyPromise.js

// 更改成功后的状态
resolve = (value) => {
  // 只有状态是等待，才执行状态修改
  if (this.status === PENDING) {
    // 状态修改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // ==== 新增 ====
    // resolve里面将所有成功的回调拿出来执行
    while (this.onFulfilledCallbacks.length) {
      // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
      this.onFulfilledCallbacks.shift()(value)
    }
  }
}
js 体验AI代码助手 代码解读复制代码// MyPromise.js

// 更改失败后的状态
reject = (reason) => {
  // 只有状态是等待，才执行状态修改
  if (this.status === PENDING) {
    // 状态成功为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;
    // ==== 新增 ====
    // resolve里面将所有失败的回调拿出来执行
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(reason)
    }
  }
}
```

再来运行一下，看看结果👇

```js
1
resolve success
2
resolve success
3
resolve success
```

👏👏👏 完美，继续

### 4、实现 `then` 方法的链式调用

> `then` 方法要链式调用那么就需要返回一个 `Promise` 对象
>  `then` 方法里面 `return` 一个返回值作为下一个 `then` 方法的参数，如果是 `then` 一个 `Promise` 对象，那么就需要判断它的状态

举个栗子 🌰

```js
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
  // 目前这里只处理同步的问题
  resolve('success')
})

function other () {
  return new MyPromise((resolve, reject) =>{
    resolve('other')
  })
}
promise.then(value => {
  console.log(1)
  console.log('resolve', value)
  return other()
}).then(value => {
  console.log(2)
  console.log('resolve', value)
})
```

用目前的手写代码运行的时候会报错 😣 无法链式调用

```js
}).then(value => {
  ^

TypeError: Cannot read property 'then' of undefined
```

接着改 💪

```js
// MyPromise.js

class MyPromise {
  ......
  then(onFulfilled, onRejected) {
    // ==== 新增 ====
    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      // 这里的内容在执行器中，会立即执行
      if (this.status === FULFILLED) {
        // 获取成功回调函数的执行结果
        const x = onFulfilled(this.value);
        // 传入 resolvePromise 集中处理
        resolvePromise(x, resolve, reject);
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    }) 
    
    return promise2;
  }
}

function resolvePromise(x, resolve, reject) {
  // 判断x是不是 MyPromise 实例对象
  if(x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else{
    // 普通值
    resolve(x)
  }
}
```

执行一下，结果👇

```js
1
resolve success
2
resolve other
```

`resolvePromise`这个方法解决的是链式调用的“值穿透”问题：

- 当then中返回的是普通值的时候，要调用一次promise2的resolve方法，从而将promise2的value设置为then中返回的普通值，传给后面的链式结构。
- 当then中返回的是一个新的promise时，就调用它本身的then方法，根据返回的新的promise的状态来设置promise2的value或者reason的值，如果返回的新的promise状态为fulfilled，也就是说在返回的新的promise中已经调用了resolve方法，那么此时调用promise2中的resolve方法，将返回的新的promise中的value`赋值给`promise2的value。从而实现值穿透

## 5、`then` 方法链式调用识别 `Promise` 是否返回自己

> 如果 `then` 方法返回的是自己的 `Promise` 对象，则会发生循环调用，这个时候程序会报错

例如下面这种情况👇

```js
// test.js

const promise = new Promise((resolve, reject) => {
  resolve(100)
})
const p1 = promise.then(value => {
  console.log(value)
  return p1
})
```

使用原生 `Promise` 执行这个代码，会报类型错误

```js

Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
```

我们在 `MyPromise` 实现一下

```js
// MyPromise.js

class MyPromise {
  ......
  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        const x = onFulfilled(this.value);
        // resolvePromise 集中处理，将 promise2 传入
        resolvePromise(promise2, x, resolve, reject);
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    }) 
    
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if(x instanceof MyPromise) {
    x.then(resolve, reject)
  } else{
    resolve(x)
  }
}
```

执行一下，竟然报错了 😱

```js
resolvePromise(promise2, x, resolve, reject);
                       ^

ReferenceError: Cannot access 'promise2' before initialization
```

为啥会报错呢？从错误提示可以看出，我们必须要等 `promise2` 完成初始化。这个时候我们就要用上宏微任务和事件循环的知识了，这里就需要创建一个异步函数去等待 `promise2` 完成初始化，前面我们已经确认了创建微任务的技术方案 --> `queueMicrotask`

```js
// MyPromise.js

class MyPromise {
  ......
  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // ==== 新增 ====
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          // 获取成功回调函数的执行结果
          const x = onFulfilled(this.value);
          // 传入 resolvePromise 集中处理
          resolvePromise(promise2, x, resolve, reject);
        })  
      } else if (this.status === REJECTED) {
      ......
    }) 
    
    return promise2;
  }
}
```

执行一下

```js
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
    resolve('success')
})
 
// 这个时候将promise定义一个p1，然后返回的时候返回p1这个promise
const p1 = promise.then(value => {
   console.log(1)
   console.log('resolve', value)
   return p1
})
 
// 运行的时候会走reject
p1.then(value => {
  console.log(2)
  console.log('resolve', value)
}, reason => {
  console.log(3)
  console.log(reason.message)
})
```

这里得到我们的结果 👇

```js
1
resolve success
3
Chaining cycle detected for promise #<Promise>
```

哈哈，搞定 😎 开始下一步

## 6、捕获错误及 `then` 链式调用其他状态代码补充

目前还缺少重要的一个环节，就是我们的错误捕获还没有处理

#### 1. 捕获执行器错误

> 捕获执行器中的代码，如果执行器中有代码错误，那么 `Promise` 的状态要变为失败

```js
// MyPromise.js

constructor(executor){
  // ==== 新增 ====
  // executor 是一个执行器，进入会立即执行
  // 并传入resolve和reject方法
  try {
    executor(this.resolve, this.reject)
  } catch (error) {
    // 如果有错误，就直接执行 reject
    this.reject(error)
  }
}
```

验证一下：

```js
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
    // resolve('success')
    throw new Error('执行器错误')
})
 
promise.then(value => {
  console.log(1)
  console.log('resolve', value)
}, reason => {
  console.log(2)
  console.log(reason.message)
})
```

执行结果 👇

```js
2
执行器错误
```

OK，通过 😀

#### 2. `then` 执行的时错误捕获

```js
// MyPromise.js

then(onFulfilled, onRejected) {
  // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
  const promise2 = new MyPromise((resolve, reject) => {
    // 判断状态
    if (this.status === FULFILLED) {
      // 创建一个微任务等待 promise2 完成初始化
      queueMicrotask(() => {
        // ==== 新增 ====
        try {
          // 获取成功回调函数的执行结果
          const x = onFulfilled(this.value);
          // 传入 resolvePromise 集中处理
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error)
        }  
      })  
    } else if (this.status === REJECTED) {
      // 调用失败回调，并且把原因返回
      onRejected(this.reason);
    } else if (this.status === PENDING) {
      // 等待
      // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
      // 等到执行成功失败函数的时候再传递
      this.onFulfilledCallbacks.push(onFulfilled);
      this.onRejectedCallbacks.push(onRejected);
    }
  }) 
  
  return promise2;
}
```

验证一下：

```js
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
    resolve('success')
    // throw new Error('执行器错误')
 })
 
// 第一个then方法中的错误要在第二个then方法中捕获到
promise.then(value => {
  console.log(1)
  console.log('resolve', value)
  throw new Error('then error')
}, reason => {
  console.log(2)
  console.log(reason.message)
}).then(value => {
  console.log(3)
  console.log(value);
}, reason => {
  console.log(4)
  console.log(reason.message)
})
```

执行结果 👇

```js
1
resolve success
4
then error
```

这里成功打印了1中抛出的错误 `then error`

## 7、参考 `fulfilled` 状态下的处理方式，对 `rejected` 和 `pending` 状态进行改造

#### 改造内容包括：

> 1. 增加异步状态下的链式调用
> 2. 增加回调函数执行结果的判断
> 3. 增加识别 `Promise` 是否返回自己
> 4. 增加错误捕获

```js
// MyPromise.js

then(onFulfilled, onRejected) {
  // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
  const promise2 = new MyPromise((resolve, reject) => {
    // 判断状态
    if (this.status === FULFILLED) {
      // 创建一个微任务等待 promise2 完成初始化
      queueMicrotask(() => {
        try {
          // 获取成功回调函数的执行结果
          const x = onFulfilled(this.value);
          // 传入 resolvePromise 集中处理
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error)
        } 
      })  
    } else if (this.status === REJECTED) { 
      // ==== 新增 ====
      // 创建一个微任务等待 promise2 完成初始化
      queueMicrotask(() => {
        try {
          // 调用失败回调，并且把原因返回
          const x = onRejected(this.reason);
          // 传入 resolvePromise 集中处理
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error)
        } 
      }) 
    } else if (this.status === PENDING) {
      // 等待
      // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
      // 等到执行成功失败函数的时候再传递
      this.onFulfilledCallbacks.push(() => {
        // ==== 新增 ====
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          } 
        }) 
      });
      this.onRejectedCallbacks.push(() => {
        // ==== 新增 ====
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = onRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          } 
        }) 
      });
    }
  }) 
  
  return promise2;
}
```

## 8、`then` 中的参数变为可选

上面我们处理 `then` 方法的时候都是默认传入 `onFulfilled`、`onRejected` 两个回调函数，但是实际上原生 `Promise` 是可以选择参数的单传或者不传，都不会影响执行。

例如下面这种 👇

```js
// test.js

const promise = new Promise((resolve, reject) => {
  resolve(100)
})

promise
  .then()
  .then()
  .then()
  .then(value => console.log(value))

// 输出 100
```

所以我们需要对 `then` 方法做一点小小的调整

```js
// MyPromise.js

then(onFulfilled, onRejected) {
  // 如果不传，就使用默认函数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

  // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
  const promise2 = new MyPromise((resolve, reject) => {
  ......
}
```

改造完自然是需要验证一下的

#### 先看情况一：`resolve` 之后

```js
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
  resolve('succ')
})
 
promise.then().then().then(value => console.log(value))

// 打印 succ
```

#### 先看情况一：`reject` 之后

```js
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
  reject('err')
})
 
promise.then().then().then(value => console.log(value), reason => console.log(reason))

// 打印 err
```

写到这里，麻雀版的 `Promise` 基本完成了，鼓掌 👏👏👏

## 9、实现 `resolve` 与 `reject` 的静态调用

就像开头挂的那道面试题使用 `return Promise.resolve` 来返回一个 `Promise` 对象，我们用现在的手写代码尝试一下

```js
const MyPromise = require('./MyPromise')

MyPromise.resolve().then(() => {
    console.log(0);
    return MyPromise.resolve(4);
}).then((res) => {
    console.log(res)
})
```

结果它报错了 😥

```js
MyPromise.resolve().then(() => {
          ^

TypeError: MyPromise.resolve is not a function
```

除了 `Promise.resolve` 还有 `Promise.reject` 的用法，我们都要去支持，接下来我们来实现一下

```js
// MyPromise.js

MyPromise {
  ......
  // resolve 静态方法
  static resolve (parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise(resolve =>  {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}
```

这样我们再测试上面的 🌰 就不会有问题啦

执行结果 👇

```js
0
4
```

到这里手写工作就基本完成了，前面主要为了方便理解，所以有一些冗余代码，我规整一下

```js
// MyPromise.js

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 新建 MyPromise 类
class MyPromise {
  constructor(executor){
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 存储成功回调函数
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  onRejectedCallbacks = [];

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      // resolve里面将所有成功的回调拿出来执行
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }

  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
      // resolve里面将所有失败的回调拿出来执行
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () =>  {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = realOnFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          } 
        })  
      }

      const rejectedMicrotask = () => { 
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = realOnRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          } 
        }) 
      }
      // 判断状态
      if (this.status === FULFILLED) {
        fulfilledMicrotask() 
      } else if (this.status === REJECTED) { 
        rejectedMicrotask()
      } else if (this.status === PENDING) {
        // 等待
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    }) 
    
    return promise2;
  }

  // resolve 静态方法
  static resolve (parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise(resolve =>  {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 判断x是不是 MyPromise 实例对象
  if(x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else{
    // 普通值
    resolve(x)
  }
}

module.exports = MyPromise;
```

到这一步手写部分基本大功告成 🎉🎉🎉

# 四、`Promise A+` 测试

上面介绍了 `Promise A+` 规范，当然我们手写的版本也得符合了这个规范才有资格叫 `Promise`， 不然就只能是伪 `Promise` 了。

上文讲到了 `promises-aplus-tests`，现在我们正式开箱使用

#### 1. 安装一下

```ssh
npm install promises-aplus-tests -D
```

#### 2. 手写代码中加入 `deferred`

```js
// MyPromise.js

MyPromise {
  ......
}

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}
module.exports = MyPromise;
```

#### 3. 配置启动命令

```json
{
  "name": "promise",
  "version": "1.0.0",
  "description": "my promise",
  "main": "MyPromise.js",
  "scripts": {
    "test": "promises-aplus-tests MyPromise"
  },
  "author": "ITEM",
  "license": "ISC",
  "devDependencies": {
    "promises-aplus-tests": "^2.1.2"
  }
}
```

开启测试

```ssh
npm run test
```

看看我们的结果如何，走起 🐱‍🏍

![es6-2](.\img\es6-2.gif)

虽然功能上没啥问题，但是测试却失败了 😥

针对提示信息，我翻看了一下 `Promise A+` 规范，发现我们应该是在 `2.3.x` 上出现了问题，这里规范使用了不同的方式进行了 `then` 的返回值判断。

![es6-3](.\img\es6-3.png)

自红线向下的细节，我们都没有处理，这里要求判断 `x` 是否为 `object` 或者 `function`，满足则接着判断 `x.then` 是否存在，这里可以理解为判断 `x` 是否为 `promise`，这里都功能实际与我们手写版本中 `x instanceof MyPromise` 功能相似。

我们还是按照规范改造一下 `resolvePromise` 方法吧

```js
// MyPromise.js

function resolvePromise(promise, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'));
  }

  if (typeof x === 'object' || typeof x === 'function') {
    // x 为 null 直接返回，走后面的逻辑会报错
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      // 把 x.then 赋值给 then 
      then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return;
            called = true;
            reject(r);
          });
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;

        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}
```

改造后启动测试

![es6-4](.\img\es6-4.gif)

完美通过 👏👏👏

# 五、最终时刻，如何解释那道面试题的执行结果

先用我们自己的 `Promise` 运行一下那道面试题 👇

```js
// test.js

const MyPromise = require('./MyPromise.js')

MyPromise.resolve().then(() => {
  console.log(0);
  return MyPromise.resolve(4);
}).then((res) => {
  console.log(res)
})

MyPromise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})
```

执行结果：**0、1、2、4、3、5、6** 🤯

这里我们手写版本的 4 并没有和 原生 `Promise` 一样在 3 后面，而是在 2 后面

实际上我们通过上文的分析，**我们知道有一次微任务创建的位置是很清晰的。那就是在发现 `onFufilled` 回调函数执行结果是一个 `Promise` 的时候，它会调用一次 `then` 方法去处理这种情况，调用 `then` 方法那就必然会使用 queueMicrotask 创建一次微任务。**

先看一下面试题中这个 `Promise`

```js
Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})
```

我们再来回顾一下上一篇中是如何处理 `return Promise.resolve(4)` 的 👇

#### 1、`Promise.resolve()` 执行，修改 `Promise` 状态为 `fulfilled`;

```js
// 更改成功后的状态
resolve = (value) => {
  // 只有状态是等待，才执行状态修改
  if (this.status === PENDING) {
    // 状态修改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // resolve里面将所有成功的回调拿出来执行
    while (this.onFulfilledCallbacks.length) {
      // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
      this.onFulfilledCallbacks.shift()(value)
    }
  }
}
```

#### 2、`then` 初始化的时候，在这之前 `Promise.resolve()` 已经修改状态为 `fulfilled`，所以这里会立即通过 `queueMicrotask` 创建微任务将 `onFulfilled` 回调函数送入微任务队列；

```js
// onFulfilled 回调函数
onFulfilled = () => {
    console.log(0);
    return Promise.resolve(4);
}
js 体验AI代码助手 代码解读复制代码// 创建一个微任务等待 promise2 完成初始化
queueMicrotask(() => {
  try {
    // 获取成功回调函数的执行结果
    const x = realOnFulfilled(this.value);
    // 传入 resolvePromise 集中处理
    resolvePromise(promise2, x, resolve, reject);
  } catch (error) {
    reject(error)
  } 
}) 
```

#### 3、在 `then` 全部初始化完成后，同步代码执行结束，开始执行微任务列表中排队的任务，`onFulfilled` 回调函数此时会被调用，`onFulfilled` 函数的执行结果 `x` 会传入 `resolvePromise` 方法进行处理，此时 `x` 为 `Promise.resolve(4)` ；

```js
// 获取成功回调函数的执行结果
const x = realOnFulfilled(this.value);
// 传入 resolvePromise 集中处理
resolvePromise(promise2, x, resolve, reject);
```

#### 4、判断返回值 `x` 的类型，如果 `typeof x === object` 或者 `typeof x === function` ，同时判断 `x.then` 存在，此时 x 为 `Promise.resolve(4)`，符合上面的条件，则调用 `then` 方法（**这里就会创建一次微任务**），得到结果 y 继续调用  `resolvePromise` 递归判断，这里 `y = 4`，即不为 `Promise`, 调用  `resolve(4)` ，注意这里的 `resolve` 方法是外部 `Promise` 的，相当于将 `Promise.resolve(4)` 的执行状态与结果提供给外部的 `Promise`，完整代码是这样 👇

```js
function resolvePromise(promise, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'));
  }

  if (typeof x === 'object' || typeof x === 'function') {
    // x 为 null 直接返回，走后面的逻辑会报错
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      // 把 x.then 赋值给 then 
      then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return;
            called = true;
            reject(r);
          });
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;

        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}
```

通过对手写 `Promise` 回顾，我们知道在处理 `Promise.resolve(4)`的时候，调用了 `then` 方法，来修改状态并拿到 `Promise` 的结果，这里也就创建了一次微任务。回过来我们再看一下在原生 `Promise` 中是怎么处理的。

# 六、`Promise V8` 源码中关键信息在哪里？

实际上在 `Promise V8` 源码中也有类似上面的 `resolvePromise` 的处理，在 [ResolvePromise](https://link.juejin.cn?target=https%3A%2F%2Fchromium.googlesource.com%2Fv8%2Fv8.git%2F%2B%2Frefs%2Fheads%2F9.0-lkgr%2Fsrc%2Fbuiltins%2Fpromise-resolve.tq%2388) 方法中 👇

```cpp
// https://tc39.es/ecma262/#sec-promise-resolve-functions
transitioning builtin
ResolvePromise(implicit context: Context)(
    promise: JSPromise, resolution: JSAny): JSAny {
  try {
    // 8. If Type(resolution) is not Object, then
    // 8.a Return FulfillPromise(promise, resolution).
    
    // 如果 resolution 是整数/字符串
    if (TaggedIsSmi(resolution)) {      
      // FulfillPromise 把 promise 状态变为 fulfilled 状态
      return FulfillPromise(promise, resolution);
    }
    const promisePrototype =
        *NativeContextSlot(ContextSlot::PROMISE_PROTOTYPE_INDEX);
        
    // 判断 resolution 的类型是否为 Promise
    if (resolutionMap.prototype == promisePrototype) {
      // The {resolution} is a native Promise in this case.
      then = *NativeContextSlot(ContextSlot::PROMISE_THEN_INDEX);
      // Check that Torque load elimination works.
      static_assert(nativeContext == LoadNativeContext(context));
      goto Enqueue;
    }
  } label Enqueue {
    // 13. Let job be NewPromiseResolveThenableJob(promise, resolution,
    
    // 代码逻辑与规范一致，把 NewPromiseResolveThenableJob 送入微任务队列
    const task = NewPromiseResolveThenableJobTask(
        promise, UnsafeCast<JSReceiver>(resolution),
        UnsafeCast<Callable>(then));
    // 14. Perform HostEnqueuePromiseJob(job.[[Job]], job.[[Realm]]).
    // 15. Return undefined.
    
    // 插入 microtask 队列
    return EnqueueMicrotask(task.context, task);
  }
}
```

通过 `resolutionMap.prototype == promisePrototype` 判断是否为 `Promise`，发现 `onFulfilled` 执行结果是一个 `Promise` 的时候，会创建 `NewPromiseResolveThenableJob` 并插入 `microtask` 队列中。**这里实际上就是与我们手写代码存在差异的地方，也是多出的一次微任务创建的位置**。在 [ECMAScript® 2022](https://link.juejin.cn?target=https%3A%2F%2Ftc39.es%2Fecma262%2F%23sec-newpromiseresolvethenablejob) 中也有说明这一块的规范 👇

![es6-5](.\img\es6-5.png)

![es6-6](.\img\es6-6.png)

接着，我们看一下 `PromiseResolveThenableJob` [源码](https://link.juejin.cn?target=https%3A%2F%2Fchromium.googlesource.com%2Fv8%2Fv8.git%2F%2B%2Frefs%2Fheads%2F9.0-lkgr%2Fsrc%2Fbuiltins%2Fpromise-jobs.tq%2313) 里面到底是做了什么 👇

```cpp
// https://tc39.es/ecma262/#sec-promiseresolvethenablejob
transitioning builtin
PromiseResolveThenableJob(implicit context: Context)(
    promiseToResolve: JSPromise, thenable: JSReceiver, then: JSAny): JSAny {
  const nativeContext = LoadNativeContext(context);
  const promiseThen = *NativeContextSlot(ContextSlot::PROMISE_THEN_INDEX);
  const thenableMap = thenable.map;
  if (TaggedEqual(then, promiseThen) && IsJSPromiseMap(thenableMap) &&
      !IsPromiseHookEnabledOrDebugIsActiveOrHasAsyncEventDelegate() &&
      IsPromiseSpeciesLookupChainIntact(nativeContext, thenableMap)) {
      
    // PerformPromiseThen 方法也是 JS Promise then 方法的底层调用
    return PerformPromiseThen(
        UnsafeCast<JSPromise>(thenable), UndefinedConstant(),
        UndefinedConstant(), promiseToResolve);
  } else {
    const funcs =
        CreatePromiseResolvingFunctions(promiseToResolve, False, nativeContext);
    const resolve = funcs.resolve;
    const reject = funcs.reject;
    try {
      return Call(
          context, UnsafeCast<Callable>(then), thenable, resolve, reject);
    } catch (e) {
      return Call(context, UnsafeCast<Callable>(reject), Undefined, e);
    }
  }
}
```

`PerformPromiseThen` 方法实际上也是 `Promise then` 方法的底层核心方法，在 [ECMAScript® 2022](https://link.juejin.cn?target=https%3A%2F%2Ftc39.es%2Fecma262%2F%23sec-newpromiseresolvethenablejob) 中我们可以看到 👇

![es6-7](.\img\es6-7.png)



我们看一下 `PromisePrototypeThen` 的[源码](https://link.juejin.cn?target=https%3A%2F%2Fchromium.googlesource.com%2Fv8%2Fv8.git%2F%2B%2Frefs%2Fheads%2F9.0-lkgr%2Fsrc%2Fbuiltins%2Fpromise-then.tq) 👇

```cpp
transitioning javascript builtin
PromisePrototypeThen(js-implicit context: NativeContext, receiver: JSAny)(
    onFulfilled: JSAny, onRejected: JSAny): JSAny {
  // 1. Let promise be the this value.
  // 2. If IsPromise(promise) is false, throw a TypeError exception.
  const promise = Cast<JSPromise>(receiver) otherwise ThrowTypeError(
      MessageTemplate::kIncompatibleMethodReceiver, 'Promise.prototype.then',
      receiver);

  // 3. Let C be ? SpeciesConstructor(promise, %Promise%).
  const promiseFun = UnsafeCast<JSFunction>(
      context[NativeContextSlot::PROMISE_FUNCTION_INDEX]);

  // 4. Let resultCapability be ? NewPromiseCapability(C).
  let resultPromiseOrCapability: JSPromise|PromiseCapability;
  let resultPromise: JSAny;
  label AllocateAndInit {
    const resultJSPromise = NewJSPromise(promise);
    resultPromiseOrCapability = resultJSPromise;
    resultPromise = resultJSPromise;
  }
  // onFulfilled 和 onRejected 是 then 接收的两个参数
  const onFulfilled = CastOrDefault<Callable>(onFulfilled, Undefined);
  const onRejected = CastOrDefault<Callable>(onRejected, Undefined);

  // 5. Return PerformPromiseThen(promise, onFulfilled, onRejected,
  //    resultCapability).
  // 这里是上面 ECMAScript 截图中对应的第5点，Return PerformPromiseThen
  PerformPromiseThenImpl(
      promise, onFulfilled, onRejected, resultPromiseOrCapability);
  // 返回一个新的 Promise
  return resultPromise;
}
```

再来看一下 `PerformPromiseThen` 的[源码](https://link.juejin.cn?target=https%3A%2F%2Fchromium.googlesource.com%2Fv8%2Fv8.git%2F%2B%2Frefs%2Fheads%2F9.0-lkgr%2Fsrc%2Fbuiltins%2Fpromise-abstract-operations.tq) 👇

```cpp
// https://tc39.es/ecma262/#sec-performpromisethen
transitioning builtin
PerformPromiseThen(implicit context: Context)(
    promise: JSPromise, onFulfilled: Callable|Undefined,
    onRejected: Callable|Undefined, resultPromise: JSPromise|Undefined): JSAny {
    
  // 调用 PerformPromiseThenImpl 方法
  PerformPromiseThenImpl(promise, onFulfilled, onRejected, resultPromise);
  return resultPromise;
}
```

对比一下，我们发现他们实际上都是调用了 `PerformPromiseThenImpl` 方法来处理核心逻辑的，我们再看一下 `PerformPromiseThenImpl` [源码](https://link.juejin.cn?target=https%3A%2F%2Fchromium.googlesource.com%2Fv8%2Fv8.git%2F%2B%2Frefs%2Fheads%2F9.0-lkgr%2Fsrc%2Fbuiltins%2Fpromise-abstract-operations.tq%23409)中做了什么 👇

```js
transitioning macro PerformPromiseThenImpl(implicit context: Context)(
    promise: JSPromise, onFulfilled: Callable|Undefined,
    onRejected: Callable|Undefined,
    resultPromiseOrCapability: JSPromise|PromiseCapability|Undefined): void {
  if (promise.Status() == PromiseState::kPending) {
    // pending 状态的分支
    // The {promise} is still in "Pending" state, so we just record a new
    // PromiseReaction holding both the onFulfilled and onRejected callbacks.
    // Once the {promise} is resolved we decide on the concrete handler to
    // push onto the microtask queue.
    const handlerContext = ExtractHandlerContext(onFulfilled, onRejected);
    // 拿到 Promise 的 reactions_or_result 字段
    const promiseReactions =
        UnsafeCast<(Zero | PromiseReaction)>(promise.reactions_or_result);
    // 考虑一个 Promise 可能会有多个 then 的情况，reaction 是个链表
    // 存储 Promise then 中传入的回调函数
    const reaction = NewPromiseReaction(
        handlerContext, promiseReactions, resultPromiseOrCapability,
        onFulfilled, onRejected);
    // reactions_or_result 可以存 Promise 的处理函数，也可以存
    // Promise 的最终结果，因为现在 Promise 处于 pending 状态，
    // 所以存的是处理函数 reaction
    promise.reactions_or_result = reaction;
  } else {
    // fulfilled 和 rejected 状态的分支
    const reactionsOrResult = promise.reactions_or_result;
    let microtask: PromiseReactionJobTask;
    let handlerContext: Context;
    if (promise.Status() == PromiseState::kFulfilled) {
      handlerContext = ExtractHandlerContext(onFulfilled, onRejected);
      microtask = NewPromiseFulfillReactionJobTask(
          handlerContext, reactionsOrResult, onFulfilled,
          resultPromiseOrCapability);
    } else
      deferred {
        assert(promise.Status() == PromiseState::kRejected);
        handlerContext = ExtractHandlerContext(onRejected, onFulfilled);
        microtask = NewPromiseRejectReactionJobTask(
            handlerContext, reactionsOrResult, onRejected,
            resultPromiseOrCapability);
        if (!promise.HasHandler()) {
          runtime::PromiseRevokeReject(promise);
        }
      }
    
    // fulfilled 和 rejected 状态时，将 onRejected onFulfilled 放入微任务队列
    // 等待执行
    EnqueueMicrotask(handlerContext, microtask);
  }
  promise.SetHasHandler();
}
```

这里我们再次看到了熟悉的 `EnqueueMicrotask()`，它的出现意味着又有新的微任务被创建，这个与我们手写 `Promise` 实现中的处理逻辑基本一致，也就是 then 调用时所创建的那次微任务。

所以这里我们总结一下**原生 `Promise` 创建两次微任务的位置**：

- **第一次：** 在发现 `Promise.resolve(4)` 的时候，创建 `NewPromiseResolveThenableJob`，并将其送入微任务队列
- **第二次：** 在处理 `Promise.resolve(4)` 的时候，调用 `then` 方法时，内部创建了微任务来处理回调函数