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

## 使用 Promise 队列 + 动态调度

```
/**
 * 限制并发数的异步任务调度器
 * @param {Function[]} tasks - 异步任务函数数组（每个返回 Promise）
 * @param {number} limit - 最大并发数
 * @returns {Promise<any[]>} 所有任务的结果（按原始顺序）
 */
async function runWithConcurrency(tasks, limit) {
  if (tasks.length === 0) return [];

  const results = new Array(tasks.length); // 保持顺序
  const executing = []; // 当前正在执行的 Promise

  let index = 0;

  // 启动初始的 limit 个任务
  while (index < limit && index < tasks.length) {
    launchTask(index);
    index++;
  }

  // 等待所有任务完成
  await Promise.all(executing);

  return results;

  // 内部函数：启动一个任务
  function launchTask(i) {
    const task = tasks[i]();
    
    // 封装任务：完成后尝试启动下一个
    const promise = task
      .then(result => {
        results[i] = result;
      })
      .catch(error => {
        results[i] = error; // 或者 { error }，根据需求
      })
      .finally(() => {
        // 一个任务完成，如果还有剩余任务，立即启动下一个
        if (index < tasks.length) {
          launchTask(index);
          index++;
        }
      });

    executing.push(promise);
  }
}
```

## 使用示例：加载图片

```
// 模拟 loadImg 函数（返回 Promise）
function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

// 图片 URL 列表
const urls = [
  'https://example.com/1.jpg',
  'https://example.com/2.jpg',
  // ... 100 个 URL
];

// 构造任务函数数组（注意：是函数！不是 Promise）
const tasks = urls.map(url => () => loadImg(url));

// 限制并发为 5
runWithConcurrency(tasks, 5)
  .then(results => {
    console.log('所有图片加载完成');
    results.forEach((img, i) => {
      if (img instanceof Error) {
        console.error(`第 ${i} 张图失败:`, img.message);
      } else {
        document.body.appendChild(img); // 成功则插入页面
      }
    });
  });
```

## 带重试的并发控制器（简洁 + 健壮）

```
/**
 * 带重试的并发任务调度器
 * @param {Function[]} tasks - 任务函数数组：() => Promise
 * @param {Object} options
 *   - limit: 最大并发数（默认 5）
 *   - maxRetries: 最大重试次数（默认 3）
 *   - delay: 重试基础延迟（ms，默认 100）
 */
async function runWithConcurrencyAndRetry(tasks, {
  limit = 5,
  maxRetries = 3,
  delay = 100
} = {}) {
  if (!Array.isArray(tasks) || tasks.length === 0) return [];

  const results = new Array(tasks.length);
  const executing = [];
  let index = 0;

  // 启动初始任务
  while (index < limit && index < tasks.length) {
    launchTask(index);
    index++;
  }

  await Promise.all(executing);
  return results;

  // --- 内部函数 ---
  
  // 【核心】带重试的任务包装器
  async function runTaskWithRetry(taskFn, retries = maxRetries) {
    let lastError;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await taskFn(); // 成功直接返回
      } catch (err) {
        lastError = err;
        
        // 最后一次失败，不再重试
        if (attempt === retries) break;
      }
    }
    
    // 所有重试失败，抛出错误（由外层 catch 捕获）
    throw lastError;
  }

  // 启动单个任务（带重试 + 调度）
  function launchTask(i) {
    // 用 runTaskWithRetry 包装原始任务
    const promise = runTaskWithRetry(tasks[i])
      .then(result => {
        results[i] = result;
      })
      .catch(error => {
        results[i] = { error }; // 标记失败
      })
      .finally(() => {
        // 一个任务结束，启动下一个（如果还有）
        if (index < tasks.length) {
          launchTask(index);
          index++;
        }
      });

    executing.push(promise);
  }
}
```

