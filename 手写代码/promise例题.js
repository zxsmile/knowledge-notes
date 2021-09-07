/*例1*/
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

// 输出 0，1，2，3，4，5，6
// 解释：
//上面代码相当于

new Promise(reslove=>{
    reslove()
}).then(()=>{
    console.log(0)
    return new Promise(reslove=>{
        reslove(4)
    })

}).then(res=>{
    console.log(res)
    return new Promise(reslove=>{
        reslove(8)
    })
}).then((res)=>{
    console.log(res)
})


new Promise(reslove=>{
    reslove()
}).then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
}).then(()=>{
    console.log(7)
}).then(()=>{
    console.log(9)
})

/*
 * 1.将上面的promise称为promise1，下面的promise称为promise2
 * 2.首先先执行宏任务promise1同步代码，遇到then，将其加入微任务队列，继续执行宏任务promise2同步代码，遇到then，将其加入微任务队列
 *   微任务队列：[0then,1then]
 * 3.执行完宏任务，开始执行微任务，执行0then输出0，发现0then返回一个promise，由于then如果返回一个promise，则会自动添加一个内层
 *   then来等待其状态改变才能执行下一个回调，所以执行完这个promise添加一个then到微任务队列
 *   微任务队列：[1then,隐形内层then]
 * 4.继续执行微任务1then，执行完之后遇到2then，将其加入微任务队列
 *   微任务队列：[隐形内层then,2then]
 * 5.继续执行隐形内层then，执行完之后发现之后没有then了，继续执行2then，执行完之后遇到3then，将其加入微任务队列
 *   微任务队列：[3then]
 * 6.这个时候发现0then在执行完隐形内层then之后终于执行完了，将4then添加到微任务队列
 *   微任务队列：[3then，4then]
 * 7.执行3then，执行完之后遇到5then，将其加入微任务队列
 *   微任务队列：[4then，5then]
 * 8.执行4then，执行5then，执行完之后遇到6then，将其加入微任务队列
 *   微任务队列：[6then]
 * 9.执行6then
 */

 /*例2*/

 new Promise((resolve, reject) => {
    console.log("外部promise");
    resolve();
  })
    .then(() => {
      console.log("外部第一个then");
      return new Promise((resolve, reject) => {
        console.log("内部promise");
        resolve()
      })
      .then(() => {
      console.log("内部第一个then");
      })
      .then(() => {
      console.log("内部第二个then");
      });
    })
    .then(() => {
      console.log("外部第二个then");
    });

    new Promise((resolve, reject) => {
        console.log("新外部promise");
        resolve();
      })
       .then(()=>{
           console.log('新外部第一个then')
       })
       .then(()=>{
        console.log('新外部第二个then')
       })
       .then(()=>{
        console.log('新外部第三个then')
       })
       .then(()=>{
        console.log('新外部第四个then')
       })
       .then(()=>{
        console.log('新外部第五个then')
       })
        
      //外部promise=>新外部promise=>外部第一个then=>内部promise=>新外部第一个then=>内部第一个then=>新外部第二个then=>
      //内部第二个then=>新外部第三个then=>新外部第四个then=>外部第二个then=>新外部第五个then
    
    /*
     * 上面的叫promise1，下面叫promise2
     * 1.执行promise1输出外部promise，遇到外部第一个then添加到微任务队列，继续执行promise2输出新外部promise，遇到新外部第一个
     *   then添加到微任务队列
     *   微任务队列：[外部第一个then,新外部第一个then]
     * 2.执行微任务队列，执行外部第一个then，输出外部第一个then，继续执行return的promise，输出内部promise，由于内部promise后
     *   有then，所以不会添加隐形then，将内部第一个then添加到微任务队列
     *   微任务队列：[新外部第一个then,内部第一个then]
     * 3.继续执行新外部第一个then，遇到新外部第二个then添加至微任务队列
     *   微任务队列：[内部第一个then，新外部第二个then]
     * 4.继续执行内部第一个then，遇到内部第二个then添加至微任务队列
     *   微任务队列：[新外部第二个then，内部第二个then]
     * 5.继续执行新外部第二个then，遇到新外部第三个then添加至微任务队列
     *   微任务队列：[内部第二个then，新外部第三个then]
     * 6.继续执行内部第二then，执行完之后发现没有then了，继续执行新外部第三个then，遇到新外部第四个then
     *   微任务队列：[新外部第四个then]
     * 7.这个时候发现外部第一个then终于执行完了，添加外部第二个then到微任务列队
     *   微任务队列：[新外部第四个then,外部第二个then]
     * 8.执行新外部第四个then，遇到新外部第五个then，添加至微任务队列
     *   微任务队列：[外部第二个then,新外部第五个then]
     * 9.执行外部第二个then，新外部第五个then,
     */
  
    /*例3*/

    Promise.resolve().then(() => {
        console.log(0);
        return Promise.resolve(4);
    })
    .then((res) => {
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
    
    // 0=>1=>undefined=>2=>3=>5=>6
    
    /*
     * 和例3相比没有0then中没有return promise
     * 1.将上面的promise称为promise1，下面的promise称为promise2
     * 2.首先先执行宏任务promise1同步代码，遇到then，将其加入微任务队列，继续执行宏任务promise2同步代码，遇到then，将其加入微任务队列
     *   微任务队列：[0then,1then]
     * 3.执行完宏任务，开始执行微任务，执行0then输出0，继续执行0then中的promise，这个时候0then全部执行完，执行完之后遇到resthen
     *   微任务队列：[1then,resthen]
     * 4.继续执行微任务1then，执行完之后遇到2then，将其加入微任务队列
     *   微任务队列：[resthen,2then]
     * 5.继续执行resthen，resthen输出传给resthen的值，由于上一个then没有return所以没有返回值，所以输出undefined继续执行2then，执行
     *   完之后遇到3then，将其加入微任务队列
     *   微任务队列：[3then]
     * 6.执行3then，执行完之后遇到5then，将其加入微任务队列
     *   微任务队列：[5then]
     * 7.执行5then，执行完之后遇到6then，将其加入微任务队列
     *   微任务队列：[6then]
     * 8.执行6then
     */

     /*例4*/

     Promise.resolve().then(() => {
        console.log(0);
        Promise.resolve(4);
        return 99
    })
    .then((res) => {
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
    
    // 0=>1=>99=>2=>3=>5=>6
    
    /*
     * 和例3相比没有0then中return 99
     * 1.将上面的promise称为promise1，下面的promise称为promise2
     * 2.首先先执行宏任务promise1同步代码，遇到then，将其加入微任务队列，继续执行宏任务promise2同步代码，遇到then，将其加入微任务队列
     *   微任务队列：[0then,1then]
     * 3.执行完宏任务，开始执行微任务，执行0then输出0，继续执行0then中的promise，0then return一个常量99，这个时候0then全部执行完，
     *   执行完之后遇到resthen
     *   微任务队列：[1then,resthen]
     * 4.继续执行微任务1then，执行完之后遇到2then，将其加入微任务队列
     *   微任务队列：[resthen,2then]
     * 5.继续执行resthen，resthen输出传给resthen的值，由于上一个0then return一个99，所以输出99继续执行2then，执行
     *   完之后遇到3then，将其加入微任务队列
     *   微任务队列：[3then]
     * 6.执行3then，执行完之后遇到5then，将其加入微任务队列
     *   微任务队列：[5then]
     * 7.执行5then，执行完之后遇到6then，将其加入微任务队列
     *   微任务队列：[6then]
     * 8.执行6then
     */