// async function async1(){
//     await async2()
//     console.log('async1 end')
// } 

// function async2(){
//     console.log('async2 end')
// }
// async1()

// setTimeout(()=>{
//    console.log('setTimeout')
// },0)

// new Promise(reslove=>{
//     reslove()
// }).then(()=>{
//     console.log('promise')
// })
let s1 = function(){
    return 123
}
let s2 = async function(){
    return 123
}
console.log(s1(),s2())