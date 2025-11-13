```
//Promise限制并发数
// -每次执行limit个loadImg，当有执行完的的loadImg时就再塞一个进去，保证执行数一直是limit，直到全部执行完
const urls = ["1", "2", "3", "4", "5", "6", "7"];
const loadImg = (url) => {
  return new Promise((resolve, reject) => {
    // 假装异步完成
    console.log("load完成", url);
    resolve();
  });
};

// 1.使用promise.race实现
const reqInLimit = (limit) => {
   let pool = []
   // 先循环把并发池塞满
   while(pool.length<limit){
    let url = urls.shift()
    setTask(url)
   }
    // 利用Promise.race 方法来获得并发池中某任务完成的信号
   let raceUrl = Promise.race(pool)
   return run(raceUrl)  

   function run(raceUrl){
    raceUrl.then(res=>{
        //每当并发池跑完一个任务，就再塞入一个任务
        let url = urls.shift()
        setTask(url)
        return run(Promise.race(pool)) 
    })
  }

  function setTask(url){
    if(!url){
        return
    }
    let task = loadImg(url)
    // 将任务推入pool并发池中
    pool.push(task)
    console.log(`${url}开始`,`当前并发数${pool.length}`)
    task.then((res)=>{
        // 请求结束后将promise任务从并发池中移除
        pool.splice(pool.indexOf(task),1)
        console.log(`${url}结束`,`当前并发数${pool.length}`)
    })
  }
}





  reqInLimit(3)
```

