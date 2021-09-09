#### 一、实现async/await ####

- async/await实际上是对Generator（生成器）的封装，是一个语法糖

    - async/await自带执行器，不需要手动调用next()就能自动执行下一步
    - async函数返回值是Promise对象
    - await能够返回Promise的resolve/reject的值

- 我们对async/await的实现，其实也就是对应以上三点封装Generator

1. 自动执行

- 我们先来看一下，对于这样一个Generator，手动执行是怎样一个流程

		function* myGenerator() {
		  yield Promise.resolve(1);
		  yield Promise.resolve(2);
		  yield Promise.resolve(3);
		}
		
		// 手动执行迭代器
		const gen = myGenerator()
		gen.next().value.then(val => {
		  console.log(val)
		  gen.next().value.then(val => {
		    console.log(val)
		    gen.next().value.then(val => {
		      console.log(val)
		    })
		  })
		})
		
		//输出1 2 3

- 我们也可以通过给gen.next()传值的方式，让yield能返回resolve的值

		function* myGenerator() {
		  console.log(yield Promise.resolve(1))   //1
		  console.log(yield Promise.resolve(2))   //2
		  console.log(yield Promise.resolve(3))   //3
		}
		
		// 手动执行迭代器
		const gen = myGenerator()
		gen.next().value.then(val => {
		  // console.log(val)
		  gen.next(val).value.then(val => {
		    // console.log(val)
		    gen.next(val).value.then(val => {
		      // console.log(val)
		      gen.next(val)
		    })
		  })
		})

- 显然，手动执行的写法看起来既笨拙又丑陋，我们希望生成器函数能自动往下执行，且yield能返回resolve的值，基于这两个需求，我们进行一个基本的封装，这里async/await是关键字，不能重写，我们用函数来模拟

		function run(gen) {
		  var g = gen()                     //由于每次gen()获取到的都是最新的迭代器,因此获取迭代器操作要放在_next()之前,否则会进入死循环
		
		  function _next(val) {             //封装一个方法, 递归执行g.next()
		    var res = g.next(val)           //获取迭代器对象，并返回resolve的值
		    if(res.done) return res.value   //递归终止条件
		    res.value.then(val => {         //Promise的then方法是实现自动迭代的前提
		      _next(val)                    //等待Promise完成就自动执行下一个next，并传入resolve的值
		    })
		  }
		  _next()  //第一次执行
		}


- 对于我们之前的例子，我们就能这样执行：

		function* myGenerator() {
		  console.log(yield Promise.resolve(1))   //1
		  console.log(yield Promise.resolve(2))   //2
		  console.log(yield Promise.resolve(3))   //3
		}

		run(myGenerator)

- 这样我们就初步实现了一个async/await。简单来说，我们封装了一个run方法，run方法里我们把执行下一步的操作封装成_next()，每次Promise.then()的时候都去执行_next()，实现自动迭代的效果。在迭代的过程中，我们还把resolve的值传入gen.next()，使得yield得以返回Promise的resolve的值
- 这里插一句，是不是只有.then方法这样的形式才能完成我们自动执行的功能呢？答案是否定的，yield后边除了接Promise，还可以接thunk函数，thunk函数不是一个新东西，所谓thunk函数，就是单参的只接受回调的函数，无论是Promise还是thunk函数，其核心都是通过传入回调的方式来实现Generator的自动执行。

2. 返回Promise & 异常处理

- 虽然我们实现了Generator的自动执行以及让yield返回resolve的值，但上边的代码还存在着几点问题：

   - 需要兼容基本类型：这段代码能自动执行的前提是yield后面跟Promise，为了兼容后面跟着基本类型值的情况，我们需要把yield跟的内容(gen().next.value)都用Promise.resolve()转化一遍
   - 缺少错误处理：上边代码里的Promise如果执行失败，就会导致后续执行直接中断，我们需要通过调用Generator.prototype.throw()，把错误抛出来，才能被外层的try-catch捕获到
   - 返回值是Promise：async/await的返回值是一个Promise，我们这里也需要保持一致，给返回值包一个Promise

- 我们改造一下run方法：

		function run(gen) {
		  //把返回值包装成promise
		  return new Promise((resolve, reject) => {
		    var g = gen()
		
		    function _next(val) {
		      //错误处理
		      try {
		        var res = g.next(val) 
		      } catch(err) {
		        return reject(err); 
		      }
		      if(res.done) {
		        return resolve(res.value);
		      }
		      //res.value包装为promise，以兼容yield后面跟基本类型的情况
		      Promise.resolve(res.value).then(
		        val => {
		          _next(val);
		        }, 
		        err => {
		          //抛出错误
		          g.throw(err)
		        });
		    }
		    _next();
		  });
		}

