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
