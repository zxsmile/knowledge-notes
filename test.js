async function async1(){
    await async2()
    console.log('async1 end')
} 

function async2(){
    console.log('async2 end')
}
async1()

setTimeout(()=>{
   console.log('setTimeout')
},0)

new Promise(reslove=>{
    reslove()
}).then(()=>{
    console.log('promise')
})