- 因为localStorage是永久存储的，不支持设置过期时间，而我们有时又不希望把本地的存储一起发往服务器，所以也不会使用cookie，基于这样的业务场景，就对localStorage进行了二次封装，让它具备过期时间的特点。

		class Storage{
		   constrouctor(){
		
		   }
		   set(key,value,expire) {
		      let obj = {
		         data:value,
		         expire:expire,
		         startTime:new Date().getTime()
		      }
		      window.localStorage.setItem(key,JSON.stringify(obj))
		   }
		
		   get(key) {
		     let item = window.localStorage.getItem(key)
		     console.log(item)
		     if(!item){
		        return null
		     }
		     item = JSON.parse(item)
		     let nowTime = new Date().getTime()
		     if(item.expire && item.expire < (nowTime - item.startTime)){
		        this.remove(key)
		        return null
		     }else{
		        return item.data
		     }
		   }
		
		   remove(key) {
		      window.localStorage.removeItem(key)
		   }
		
		   clear() {
		      window.localStorage.clear()
		   }
		}
		
		let storage = new Storage()
		
		storage.set('token',556,3000)
		console.log(storage.get('token'))