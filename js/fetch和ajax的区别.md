https://juejin.im/post/5c754d42e51d454dfd2a4b6b#%E9%85%8D%E7%BD%AE

* fetch是window的一个方法

	如：fetch(url).then(function (response) {
		    return response.json()   //执行成功第一步
		}).then(function (returnedValue) {
		    //执行成功的第二步
		}).catch(function (err) {
		    //中途的任何地方出错  都会在这里被捕获到
		})

* 上面的response有许多方法 json() text() formData()

* fetch和ajax的区别：

     * Fetch跨域的时候默认不会带cookie，如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）fetch(url, {credentials: 'include'})
	
     * 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject
