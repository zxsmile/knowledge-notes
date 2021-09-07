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