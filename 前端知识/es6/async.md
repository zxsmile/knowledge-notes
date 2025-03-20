1. 概述

        - async用于声明一个function函数是异步的，而await用于等待一个异步方法执行完成
        - await 只能出现在 async 函数中
   2. async

        - 返回值是一个promise对象
          
            - 如果函数中return一个常量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象
            
                   async function testAsync() {
                    return "hello async";
                }

                const result = testAsync();
                console.log(result);  //Promise { 'hello async' }

            - 如果无return，它会返回 Promise.resolve(undefined)
            - 如果return一个promise对象，则直接返回

        - Promise 的特点——无等待，所以在没有 await 的情况下执行 async 函数，它会立即执行，返回一个 Promise 对象，并且，绝不会阻塞后面的语句

        3. await

        - await其实是在等待一个表达式的结果
        - 正常情况下，await命令后面是一个 Promise 对象，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果
          如果不是 Promise 对象，就直接返回对应的值
        - 如果await命令后面是一个thenable对象（即定义then方法的对象），那么await会将其等同于 Promise 对象

                   class Sleep{
                       constructor(timeout) {
                       this.timeout = timeout
                       }
    
                       then(resolve,reject) {
    
                        var startTime = new Date()
                        setTimeout(()=>resolve(new Date()-startTime),this.timeout)
                       }
                    }
    
                    (async () => {
                        const sleepTime = await new Sleep(1000);
                        console.log(sleepTime); //1002
                    })();

        
        4. async/await 的优势在于处理 then 链

        - 假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。我们仍然用 setTimeout 来模拟异步操作：

             function takeLongTime(n){
                return new Promise((reslove)=>{
                    setTimeout(()=>reslove(n+200),n)
                })
            }

            function step1(n){
                console.log(`step1 with ${n}`)
                return takeLongTime(n)
            }

            function step2(n){
                console.log(`step2 with ${n}`)
                return takeLongTime(n)
            }

            function step3(n){
                console.log(`step3 with ${n}`)
                return takeLongTime(n)
            }

            用 Promise 方式来实现这三个步骤的处理

            function doIt(){

                var time1 = 300
                step1(time1)
                .then(time2=>step2(time2))
                .then(time3=>step3(time3))
                .then(result=>{
                    console.log(`result is ${result}`)
                })
            }

              doIt()

            用 async/await 来实现

            async function doIt(){
                var time1 = 300
                var time2 = await step1(time1)
                var time3 = await step2(time2)
                var result = await step3(time3)
                console.log(`result is ${result}`)
            }
            doIt()


   5. 错误处理

       - await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到
       - 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行
       - 有两种解决方案：

             - await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行
    
                async function f() {
                    try {
                        await Promise.reject('出错了');
                    } catch(e) {
                    }
                    return await Promise.resolve('hello world');
                }
    
                    f()
                    .then(v => console.log(v))
                    // hello world
         
            - await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误

                async function f() {
                    await Promise.reject('出错了')
                        .catch(e => console.log(e));
                    return await Promise.resolve('hello world');
                }

                    f()
                    .then(v => console.log(v))
                    // 出错了
                    // hello world

    6.注意点
    
        - 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发
    
             let foo = await getFoo();
             let bar = await getBar();
            
             上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发
    
                // 写法一
                let [foo, bar] = await Promise.all([getFoo(), getBar()]);
    
                // 写法二
                let fooPromise = getFoo();
                let barPromise = getBar();
                let foo = await fooPromise;
                let bar = await barPromise;
                上面两种写法，getFoo和getBar都是同时触发，这样就会缩短程序的执行时间
*/



