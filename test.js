// // Promise限制并发数
// const urls = ["1", "2", "3", "4", "5", "6", "7"];
// const loadImg = (url) => {
//   return new Promise((resolve, reject) => {
//     // 假装异步完成
//     console.log("load完成", url);
//     resolve();
//   });
// };

// const reqInLimit = (limit) => {
//     let urlArr = urls.slice(0,limit)
//     let i = limit
    
//     function racePromise(urlArr) {
//         if(urlArr.length===0){
//             return 
//         }
//         let promiseArr = urlArr.Map(item=>{
//             return loadImg(item)
//         })
//         let race = Promise.race(promiseArr)
//         race.then(res=>{
//             urlArr.push(urls[i])
//             i++
//             racePromise(urlArr)
//         })
//    }
// }


let promise1 = new Promise(function(reslove,reject){
            setTimeout(function(){
              console.log('1')
              return 1
            },3000)
            return 1
})

let promise2 = new Promise(function(reslove,reject){
  setTimeout(function(){
    console.log('2')
    return 2
  },1000)
  return 2
})

let promise = Promise.all([promise1,promise2]).then(function(){
  console.log(promise)
})
