#### 一、async ####

- async是异步函数的标识符，说明该函数是个异步函数，返回值是个promise对象。

		function fn1() {
		  return 1
		}
		console.log(fn1()) //1
		
		async function fn2() {
		  return 1
		}
		console.log(fn2()) // Promise{<fulfilled>:1}

- 从上面例子可以看到，async函数的返回值是一个promise对象，既然是一个promise对象，那就自然可以使用其原型上的属性，比如then、catch等等。

		fn2()
		.then(r => {
		  console.log(r) // 1
		})

- fn2报错也能被then的第二个回调函数或者catch捕获

        fn2()
        .then(res=>{
          console.log(res)
        },err=>{
          console.log(err)
        }).catch(err=>{
          console.log(err)
        })


#### 二、await ####

1. 理解

- await是async wait的缩写，它等待返回的是一个表达式，不管是不是promise对象都可以，只是说如果返回的是promise对象执行的状态不一样而已，需要注意的是await只能在async函数中使用，看下面例子：

		function sync() {
		  setTimeout(() => {
		    console.log(666)
		  }, 3000)

		}


	   async function test(){
		  await sync() //undefined
		  console.log(888)
	   }
		
       test() 
       // 888
       // 666
       

		async function async1(){
		  return new Promise(resolve => {
		    setTimeout(() => {
              console.log('666')
		      resolve()
		    }, 2000)
		  })
		}
		
		async function test2() {
		  await async1()
		  console.log(888)
		}
		
		test2()
        //666
        //888

- 可以看出上面例子中，如果await等来的是一个promise对象，它会"阻塞"后面的代码，直到这个promise对象有返回结果，不管这个结果是成功还是失败。如果不是一个promise对象，那await后的表达式就是要等待的东西。
- 就算不是promise对象那么await后面的内容还是相当于在then执行，跟promise的区别在于如果等待的是一个promise对象，那么要等待这个对象解析完成，如果没有resolve或者reject那么后面的内容就不会执行

		// eg1
		
		function fn1() {
		  return new Promise(()=> {
		  
		  })
		}
		
		async function fn2() {
		  await fn1()
		  console.log('wait fn1') // 这里的值永远也不会打印，因为函数fn1这个promise对象的状态没有改变
		}
		fn2()


		// eg2
		
		async function fn2() {
		    await 2
		    console.log(24) 
		}
		
		fn2()
		console.log('this') 
		
		//等同于
		 async function fn2() {
		    Promise.resolve(2)
		    .then(r => {
		      console.log(24)
		    })
		 }
		 fn2()
		 console.log('this')
		
		//this
		//24

2. 关于await返回值

- await后是一个promise对象，如果是resolve状态，值就是resolve参数。如果是reject状态，会将错误抛出

		// resolve
		let p = await Promise.resolve(3)
		console.log(p) // 3

		// reject
		let p = await Promise.reject('error')
		console.log(p) // 控制台报错

- await后不是promise对象，则返回值就是该值的本身

		let p = await 3
		console.log(p) // 3

        let p = await function fn(){}
        console.log(p) // [Function: fn]


#### 三、错误捕获 ####

1. await后面如果跟的是promise

   - 可以使用await后面promise的reject或者catch捕获

		async function fn2() {
		    await Promise.reject(2).catch(e=>{
		        console.log(666)
		    })
		    .then(res=>{
		        
		    },e=>{
		       console.log(777)
		   })
		}
		
		
		
		  fn2().then(res=>{
		      console.log(888)
		  },e=>{
		      console.log(999)
		  }).catch(err=>{
		      console.log('555')
		      //console.log(err)
		  })

         //666
         //888 
         //因为错误被内部的promise捕获了，所以fn2进入了成功的回调

2. await后面无论跟的是promise还是其他值

   - 可以使用try...catch...

		async function fn2() {
		    try{
		        await a
		    }catch(e){
		        console.log(666)
		    }
		    
		}
		
		
		
		  fn2().then(res=>{
		      console.log(888)
		  },e=>{
		      console.log(999)
		  }).catch(err=>{
		      console.log('555')
		  })

         //666
         //888
         //因为错误被try...catch...捕获了，所以fn2进入了成功的回调

    - 可以使用fn2()的then第二个参数或者catch

       async function fn2() {
		   
		        await a
		    
		}
		
		
		
		  fn2().then(res=>{
		      console.log(888)
		  },e=>{
		      console.log(999)
		  }).catch(err=>{
		      console.log('555')
		  })

         //999
         //因为错误没被内部捕获，所以进入fn2的then的第二个回调
         
#### 四、实现async/await ####

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

