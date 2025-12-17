```
/**
 * 单个请求带重试逻辑
 * @param {Function} requestFn - 返回 Promise 的请求函数
 * @param {number} maxRetries - 最大重试次数（默认 3）
 * @returns {Promise} 成功则 resolve(response)，失败则 reject(error)
 */
//async函数返回promise

async function requestWithRetry(requestFn, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await requestFn();// 调用接口，这里会等待接口返回，才会决定有没有下一次循环
      return result; // 成功直接立即 return，跳出循环
    } catch (error) {
      lastError = error;
      // 最后一次失败，不再重试
      if (attempt === maxRetries) break;
    }
  }

  // 所有重试都失败，抛出最后一次错误
  throw lastError;
}


// requestWithRetry 在 所有重试失败后会 throw 错误，这个错误会被外层的 .catch() 捕获，转为 { success: false, error }。

// 所以整个链路是安全的：

// requestWithRetry → 失败 → throw
//        ↓
// .catch() → 捕获 throw → 返回 { success: false, error }
//        ↓
// Promise.all → 收到正常值 → 不中断

```

```
/**
 * 批量请求：每 batchCount 个一组，并发执行，支持重试
 * @param {Array<Function>} requestFns - 请求函数数组（每个返回 Promise）
 * @param {Object} options
 *   - batchCount: 每组并发数（默认 10）
 *   - maxRetries: 最大重试次数（默认 3）
 * @returns {Promise<Array>} 所有响应结果（按原始顺序），失败项为 { error: Error }
 */
 
async function batchRequests(requestFns, options = {}) {
  const {
    batchCount = 10,
    maxRetries = 3
  } = options;

  const results = new Array(requestFns.length); // 保持顺序
  const total = requestFns.length;

  // 分批处理
  for (let i = 0; i < total; i += batchCount) {
    const batch = requestFns.slice(i, i + batchCount);
    const startIndex = i;

    console.log(`正在处理第 ${Math.floor(i / batchCount) + 1} 批，共 ${batch.length} 个请求`);

    // 并发执行当前批次（每个带重试）,这里是循环发送请求
    const batchPromises = batch.map((fn, idx) =>
      requestWithRetry(fn, maxRetries)
        .then(res => ({ success: true, data: res }))
        .catch(err => ({ success: false, error: err }))
    );

    //使用Promise.all去拿到每个异步请求的结果
    const batchResults = await Promise.all(batchPromises);
    
    //按顺序写入结果
    batchResults.forEach((result, idx) => {
      const globalIndex = startIndex + idx;
      if (result.status === 'fulfilled') {
        results[globalIndex] = result.value.success
          ? result.value.data
          : { error: result.value.error };
      } else {
        // 理论上不会发生，因为内部已 catch
        results[globalIndex] = { error: new Error('Unexpected batch error') };
      }
    });

    // 可选：批次间加延迟，避免触发限流
    // await new Promise(r => setTimeout(r, 100));
  }

  return results;
}
```

```
//使用

async function requestFn() {
// 构造 100 个请求（其中部分会失败）
  const urls = Array.from({ length: 100 }, (item, i) => `https://jsonplaceholder.typicode.com/posts/${i + 1}`);
  const requestFns = urls.map((url, i) =>
    createRequest(url, i % 7 === 0) // 每第 7 个故意失败
  );
  //调用并发请求函数
  const results = await batchRequests(requestFns, {
      batchCount: 10,
      maxRetries: 3
    });

   // 处理结果
    results.forEach((result, i) => {
      if (result && !result.error) {
        console.log(`请求 ${i} 成功:`, result.title || result);
      } else {
        console.error(`请求 ${i} 最终失败:`, result?.error?.message);
      }
    });
}


// 模拟一个可能失败的 API 请求
function createRequest(url, shouldFail = false) {
  return async () => {
    //模拟请求失败
    if (shouldFail) {
      throw new Error(`Failed to fetch ${url}`);
    }
    //模拟请求成功
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };
}

requestFn() 
```

简化版

```
/**
 * 单个请求重试（简化版）
 */
async function requestWithRetry(fn, retries = 3) {
  let error;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn(); // 成功就返回
    } catch (err) {
      error = err;
      if (i === retries) throw error; // 最后一次失败才抛出
     
    }
  }
}

/**
 * 批量请求：每 batch 个一组，并发执行，自动重试，错误不中断
 */
async function batchRequests(requestFns, { batchSize = 10, maxRetries = 3 } = {}) {
  const results = [];

  for (let i = 0; i < requestFns.length; i += batchSize) {
    const batch = requestFns.slice(i, i + batchSize);

    // 关键：直接用 allSettled，不手动 catch！
    const batchResults = await Promise.allSettled(
      batch.map(fn => requestWithRetry(fn, maxRetries))
    );

    // 转换结果：成功 → data，失败 → { error }
    for (const res of batchResults) {
      results.push(
        res.status === 'fulfilled' 
          ? res.value 
          : { error: res.reason }
      );
    }
  }

  return results; // 顺序保持，失败项为 { error }
}
```

