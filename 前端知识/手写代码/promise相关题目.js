/* 1.使用Promise实现每个1秒输出1,2,3 */

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

  /* 2.使用Promise实现红绿交替重复亮 */

  /*红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：*/

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


       /* 3.实现mergePromise函数 */

       /*实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。 */

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

      /* 4.封装一个异步加载图片的方法 */

      /*这个相对简单一些，只需要在图片的onload函数中，使用resolve返回一下就可以了*/

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

        /* 5.限制异步操作的并发个数并尽可能快的完成全部 */

        /*有8个图片资源的url，已经存储在数组urls中。urls类似于['https://image1.png', 'https://image2.png', ....]
        而且已经有一个函数function loadImg，输入一个url链接，返回一个Promise，该Promise在图片下载完成的时候resolve，下载失败则reject。
        但有一个要求，任何时刻同时下载的链接数量不可以超过3个。
        请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。*/

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

        /* 6.接口请求超时*/

        /*顾名思义，就是给定一个时间，如果接口请求超过这个时间的话就报错 */

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