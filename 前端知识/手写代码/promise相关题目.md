#### 一、使用Promise实现每个1秒输出1,2,3 ####

	const arr = [1, 2, 3]
	
	arr.reduce((prev,next) => {
	    return prev.then(() => {
	        return new Promise(resolve => {
	            setTimeout(() => {
	                console.log(next)
	                resolve()
	            },1000)
	        })
	    })
	},Promise.resolve())
	
	//伪代码
	
	// Promise.resolve()
	//   .then(() => {
	//     return new Promise(r => {
	//       setTimeout(() => {
	//         r(console.log(1))
	//       }, 1000)
	//     })
	//   })
	//   .then(() => {
	//     return new Promise(r => {
	//       setTimeout(() => {
	//         r(console.log(2))
	//       }, 1000)
	//     })
	//   })
	//   .then(() => {
	//     return new Promise(r => {
	//       setTimeout(() => {
	//         r(console.log(3))
	//       }, 1000)
	//     })
	//   })

#### 二、使用Promise实现红绿交替重复亮 ####

- 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：

    function red() {
      console.log('red');
    }
    function green() {
      console.log('green');
    }
    function yellow() {
      console.log('yellow');
    }

    //方法一：
    function light(fn,time){
    return new Promise((resolve)=>{
        setTimeout(() => {
            fn()
            resolve()
        },time)
    })
    }

    function start() {
        Promise.resolve().then(() => {
            return light(red,3000)
        }).then(() => {
            return light(green,2000)
        }).then(() => {
            return light(yellow,1000)
        }).then(() => {
            return start()
        })
    }

    start()

      //方法二：

      function start() {
        light(red,3000).then(() => {
            return light(green,2000)
        }).then(() => {
            return light(yellow,1000)
        }).then(() => {
            return start()
        })
    }

    start()

    //方法三：使用setInterval

    function inifiteLight() {
        setTimeout(() => {
          red();
          setTimeout(() => {
            yellow();
            setTimeout(() => {
              green();
              setTimeout(inifiteLight);
            }, 1000);
          }, 2000);
        }, 3000);
      }
      inifiteLight();


#### 三、实现mergePromise函数 ####

- 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。 

       const time = (timer) => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, timer)
        })
      }
      const ajax1 = () => time(2000).then(() => {
        console.log(1);
        return 1
      })
      const ajax2 = () => time(1000).then(() => {
        console.log(2);
        return 2
      })
      const ajax3 = () => time(1000).then(() => {
        console.log(3);
        return 3
      })
      
      function mergePromise () {
        // 在这里写代码
      }
      
      mergePromise([ajax1, ajax2, ajax3]).then(data => {
        console.log("done");
        console.log(data); // data 为 [1, 2, 3]
      });
      
      // 要求分别输出
      // 1
      // 2
      // 3
      // done
      // [1, 2, 3]
      
      //解法一：

      
    function mergePromise (arr) {
        let data = []
        return arr.reduce((prev,next) => {
          return prev.then(() =>{
            return next().then(res => {
              data.push(res)
            })
          })
        },Promise.resolve()).then(() => {
          return Promise.resolve(data)
        })
        // 在这里写代码
      }

            
      //解法二：
      function mergePromise (arr) {
        let data = []
        let promise = Promise.resolve()
        arr.forEach(fn => {
          promise = promise.then(fn).then(res => {
            data.push(res)
            return data
          })
        })
        return promise
      }

      //伪代码
      Promise.resolve().then(() => time(2000).then(() => {
        console.log(1);
        return 1
      }))
      .then(res => {
          data.push(res)
          return data
      })
      .then(() => time(1000).then(() => {
        console.log(2);
        return 2
      }))
      .then(res => {
        data.push(res)
        return data
      })
      .then(() => time(1000).then(() => {
        console.log(3);
        return 3
      }))
      .then(res => {
        data.push(res)
        return data
      })
      .then(data => {
        console.log("done");
        console.log(data); // data 为 [1, 2, 3]
      });

#### 四、封装一个异步加载图片的方法 ####

- 这个相对简单一些，只需要在图片的onload函数中，使用resolve返回一下就可以了*/

      function loadImg(url) {
          return new Promise((resolve,reject) => {
              let img = new Image()
              img.onload = () =>{
                  console.log('图片加载完成')
                  resolve(img)
              }
              img.onerror = () => {
                  reject(new Error('图片加载失败'))
              }

              img.src = url
          })
      }

#### 五、限制异步操作的并发个数并尽可能快的完成全部 ####

- 有8个图片资源的url，已经存储在数组urls中。urls类似于['https://image1.png', 'https://image2.png', ....]，而且已经有一个函数function loadImg，输入一个url链接，返回一个Promise，该Promise在图片下载完成的时候resolve，下载失败则reject。
     
- 但有一个要求，任何时刻同时下载的链接数量不可以超过3个。
        
- 请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。

     var urls = [
        "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
        "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
        "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
        "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
        "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
        "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
        "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
        "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png",
     ];
    
    function loadImg(url) {
	    return new Promise((resolve, reject) => {
	      const img = new Image();
	      img.onload = function() {
	        console.log("一张图片加载完成");
	        resolve(img);
	      };
	      img.onerror = function() {
	          reject(new Error('Could not load image at' + url));
	      };
	      img.src = url;
	    });
    }

    async function limitLoad(urlArr,limitCount,handler) {
        let curUrlArr = []//当前请求池里的请求数量
        let resPoolArr = [] // 存储所有的结果
        //循环所有的url
        while(urlArr.length){
          //当请求池里有剩余位置时，将请求添加到请求池里面
          if(curUrlArr.length < limitCount){
            let url = urlArr.pop()
            console.log('当前请求url',url)
            let p = handler(url).then(res => {
              //请求结束将请求从请求池里移除
              curUrlArr.splice(curUrlArr.indexOf(p),1)
              resPoolArr.push(res)
            })
            
            curUrlArr.push(p)
          }else{
            //等待请求池有余位
            await Promise.race(curUrlArr)
          }
        }
    }

    limitLoad(urls,3,loadImg)

#### 六、接口请求超时 ####

- 顾名思义，就是给定一个时间，如果接口请求超过这个时间的话就报错

    //模拟延时

    function sleep(timer) {
      return new Promise((resolve,timer) => {
          setTimeout(() => {
            reject('超时啦')
          },timer)
      })
    }

    //模拟请求

    function request(timer) {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve('请求返回啦')
              },timer)
        })
    }


    //判断是否超时(不使用Promise.race)

	function timeoutPromise(requestFn, delay) {
	    let promiseArr = [requestFn(1000),sleep(delay)]
	    return new Promise((resolve,reject) => {
	        for(let promise in promiseArr){
	            // 超时则执行失败，不超时则执行成功
	            promise.then(res=>resolve(res),err=>reject(err))
	        }
	    })
	}
	
	//判断是否超时(使用Promise.race)
	
	function timeoutPromise(requestFn, delay) {
	    return Promise.race([requestFn(1000),sleep(delay)])
	}


#### 七、转盘抽奖 ####

- 我们平时在转盘抽奖时，一般都是开始转动的同时也发起接口请求，所以有两种可能

   （1）转盘转完，接口还没请求回来，这是不正常的

   （2）转盘转完前，接口就请求完毕，这是正常的，但是需要保证请求回调跟转盘转完回调同时执行

**1.转盘转完，接口还没请求回来**

- 主要问题就是，怎么判断接口请求时间是否超过转盘转完所需时间，咱们其实可以用到上一个知识点接口请求超时，都是一样的道理。如果转盘转完所需时间是2500ms，那咱们可以限定接口请求需要提前1000ms请求回来，也就是接口请求的超时时间为2500ms - 1000ms = 1500ms

	/**
	 * 模拟延时
	 * @param {number} delay 延迟时间
	 * @returns {Promise<any>}
	 */
	function sleep(delay) {
	  return new Promise((_, reject) => {
	    setTimeout(() => reject('超时喽'), delay)
	  })
	}
	
	/**
	 * 模拟请求
	 */
	function request(delay) {
	  return new Promise(resolve => {
	    setTimeout(() => resolve('成功喽'), delay)
	  })
	}
	
	/**
	 * 判断是否超时
	 * @param {() => Promise<any>} requestFn 请求函数
	 * @param {number} delay 延迟时长
	 * @returns {Promise<any>}
	 */
	function timeoutPromise(requestFn, delay) {
	   return Promise.race([requestFn(1000), sleep(delay)])
	}


**2.转盘转完前，接口就请求完毕**

- 咱们确保了接口请求可以在转盘转完之前请求回来，但是还有一个问题，就是需要保证请求回调跟转盘转完回调同时执行，因为虽然接口请求请求回来的时候，转盘还在转着，咱们需要等转盘转完时，再一起执行这两个回调

- 听到这个描述，相信很多同学就会想到Promise.all这个方法

    // ...上面代码

	/**
	 * 模拟转盘旋转到停止的延时
	 * @param {number} delay 延迟时间
	 * @returns {Promise<any>}
	 */
	 function turntableSleep(delay) {
	  return new Promise(resolve => {
	    setTimeout(() => resolve('停止转动喽'), delay)
	  })
	}
	
	/**
	 * 判断是否超时
	 * @param {() => Promise<any>} requestFn 请求函数
	 * @param {number} turntableDelay 转盘转多久
	 * @param {number} delay 请求超时时长
	 * @returns {Promise<any>}
	 */
	
	function zhuanpanPromise(requsetFn, turntableDelay, delay) {
	  return Promise.all([timeoutPromise(requsetFn(delay), turntableDelay - delay), turntableSleep(turntableDelay)])
	}


3.测试

	// 不超时，且先于转盘停止前请求回数据
	zhuanpanPromise(request, 2500, 1500).then(res => console.log(res), err => console.log(err))


#### 八、取消重复请求 ####

- 举个例子，咱们在做表单提交时，为了防止多次重复的提交，肯定会给按钮的点击事件加上防抖措施，这确实是有效地避免了多次点击造成的重复请求，但是其实还是有弊端的

- 众所周知，为了用户更好地体验，防抖的延时是不能太长的，一般在我的项目中都是300ms，但是这只能管到请求时间 < 300ms的接口请求，如果有一个接口请求需要2000ms，那么此时防抖也做不到完全限制重复请求，所以咱们需要额外做一下取消重复请求的处理

**1.实现**

  - 实现思路：简单说就是，利用Promise.race方法，给每一次请求的身边安装一颗雷，如果第一次请求后，又接了第二次重复请求，那么就执行第一次请求身边的雷，把第一次请求给炸掉，以此类推。

	class CancelablePromise {
	  constructor() {
	    this.pendingPromise = null
	    this.reject = null
	  }
	
	  request(requestFn) {
	    if (this.pendingPromise) {
	      this.cancel('取消重复请求')
	    }
	
	    const promise = new Promise((_, reject) => (this.reject = reject))
	    this.pendingPromise = Promise.race([requestFn(), promise])
	    return this.pendingPromise
	  }
	
	  cancel(reason) {
	    this.reject(reason)
	    this.pendingPromise = null
	  }
	}
	
	function request(delay) {
	  return () => 
	    new Promise(resolve => {
	      setTimeout(() => {
	        resolve('最后赢家是我')
	      }, delay)
	    })
	}

**2.测试**

	const cancelPromise = new CancelablePromise()
	
	// 模拟频繁请求5次
	for (let i = 0; i < 5; i++) {
	  cancelPromise
	    .request(request(2000))
	    .then((res) => console.log(res)) // 最后一个 最后赢家是我
	    .catch((err) => console.error(err)); // 前四个 取消重复请求
	}


#### 九、全局请求loading ####

- 比如一个页面中，或者多个组件中都需要请求并且展示loading状态，此时我们不想要每个页面或者组件都写一遍loading，那我们可以统一管理loading，loading有两种情况

   1、全局只要有一个接口还在请求中，就展示loading
   2、全局所有接口都不在请求中，就隐藏loading

- 那我们怎么才能知道全局接口的请求状态呢？其实咱们可以利用Promise，只要某个接口请求Promise的状态不是pending那就说明他请求完成了，无论请求成功或者失败，既然是无论成功失败，那咱们就会想到Promise.prototype.finally这个方法
实现

**实现**
	
	class PromiseManager {
	  constructor() {
	    this.pendingPromise = new Set()
	    this.loading = false
	  }
	
	  generateKey() {
	    return `${new Date().getTime()}-${parseInt(Math.random() * 1000)}`
	  }
	
	  push(...requestFns) {
	    for (const requestFn of requestFns) {
	      const key = this.generateKey()
	      this.pendingPromise.add(key)
	      requestFn().finally(() => {
	        this.pendingPromise.delete(key)
	        this.loading = this.pendingPromise.size !== 0
	      })
	    }
	  }
	}


**测试**

	// 模拟请求
	function request(delay) {
	  return () => {
	    return new Promise(resolve => {
	      setTimeout(() => resolve('成功喽'), delay)
	    })
	  }
	}
	
	const manager = new PromiseManager()
	
	manager.push(request(1000), request(2000), request(800), request(2000), request(1500))
	
	const timer = setInterval(() => {
	   // 轮询查看loading状态
	   console.log(manager.loading)
	}, 300)


#### 十、串行化的三种实现方式 ####

- 使用串行化的常见场景，请求之间有依赖关系或时序关系，如红绿灯。

**1.递归法**

	  function runPromiseInSeq1(requestFns) {
	     function recursion(requestFns){
	       if(!requestFns.length){
	         return
	       }
	        
	       requestFns.shift()().finally(() => {
	        recursion(requestFns)
	       })
	
	     }
	     const _requsetFns = [...requestFns]
	     recursion(_requsetFns)
	   }

**2.迭代法**

	  async function runPromiseInSeq2(requestFns) {
	     for(const requestFn of requestFns){
	        await requestFn()
	     }
	   }

**3.reduce**

	  function runPromiseInSeq3(requestFns) {
	    requestFns.reduce((prev,cur) =>{
	      return prev.finally(() => {
	        return cur()
	      })
	    },Promise.resolve())
	   }



- **测试**

	// 模拟一个异步请求函数
	function createRequest(delay) {
	  return () =>
	    new Promise((resolve) => {
	      setTimeout(() => {
	        resolve(delay);
	      }, delay);
	    }).then((res) => {
	      console.log(res);
	    });
	}
	// 执行顺序从左至右
	const requestFns = [
	  createRequest(3000),
	  createRequest(2000),
	  createRequest(1000),
	];
	// 串行调用
	runPromiseInSeq1(requestFns);
	// runPromiseInSeq2(requestFns);
	// runPromiseInSeq3(requestFns);

#### 十一、最简实现Promise，支持异步链式调用（20行） ####
	
	function Promise(fn) {
	  // Promise resolve时的回调函数集
	  this.cbs = [];
	
	  // 传递给Promise处理函数的resolve
	  // 这里直接往实例上挂个data
	  // 然后把onResolvedCallback数组里的函数依次执行一遍就可以
	  const resolve = (value) => {
	    // 注意promise的then函数需要异步执行
	    setTimeout(() => {
	      this.data = value;
	      this.cbs.forEach((cb) => cb(value));
	    });
	  }
	
	  // 执行用户传入的函数 
	  // 并且把resolve方法交给用户执行
	  fn(resolve);
	}

   
    Promise.prototype.then = function (onResolved) {
	  // 这里叫做promise2
	  return new Promise((resolve) => {
	    this.cbs.push(() => {
	      const res = onResolved(this.data);
	      if (res instanceof Promise) {
	        // resolve的权力被交给了user promise
	        res.then(resolve);
	      } else {
	        // 如果是普通值 就直接resolve
	        // 依次执行cbs里的函数 并且把值传递给cbs
	        resolve(res);
	      }
	    });
	  });
	};
	

