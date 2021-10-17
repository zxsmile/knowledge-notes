#### 一、cookie ####

1. 原理

- 由于http是无状态的协议，一旦客户端和服务器的数据交换完毕，就会断开连接，再次请求，会重新连接，这就说明服务器单从网络连接上是没有办法知道用户身份的。怎么办呢？那就给每次新的用户请求时，给它颁发一个身份证（独一无二）吧，下次访问，必须带上身份证，这样服务器就会知道是谁来访问了，针对不同用户，做出不同的响应

2. 工作流程

   * 首先，我们假设当前域名下还是没有 Cookie 的
   * 接下来，浏览器发送了一个请求给服务器（这个请求是还没带上 Cookie 的）
   * 服务器设置 Cookie 并发送给浏览器（当然也可以不设置）
   * 浏览器将 Cookie 保存下来
   * 接下来，以后的每一次对该域的请求，都会带上这些 Cookie，发送给服务器

   - Cookie 虽然是存储在浏览器，但是通常由服务器端进行设置，当然客户端也可以设置

3. 属性介绍

   - 其实cookie是一个很小的文本文件，是浏览器储存在用户的机器上的Cookie是纯文本，没有可执行代码。储存一些服务器需要的信息，每次请求站点，会发送相应的cookie，这些cookie可以用来辨别用户身份信息等作用

     * NAME=VALUE：键值对，可以设置要保存的 Key/Value，注意这里的 NAME 不能和其他属性项的名字一样
     * Expires：过期时间，在设置的某个时间点后该 Cookie 就会失效
     * Domain：生成该 Cookie 的域名，如 domain="www.baidu.com"
     * Path：该 Cookie 是在当前的哪个路径下生成的，如 path=/wp-admin/
     * Secure：如果设置了这个属性，那么只会在 SSH 连接时才会回传该 Cookie

   - Expires

     * 该属性用来设置Cookie的有效期，必须是 GMT 格式的时间
     * 如果maxAge属性为正数，则表示该Cookie会在maxAge秒之后自动失效
     * 当maxAge属性为负数，则表示该Cookie只是一个临时Cookie，不会被持久化，仅在本浏览器窗口或者本窗口打开的子窗口中有效，关闭浏览器后该Cookie立即失效
     * 当maxAge为0时，表示立即删除Cookie
     * 如果不设置过期时间，则表示这个cookie的生命期为浏览器会话期间，只要关闭浏览器窗口，cookie就消失了。这种生命期为浏览器会话期的cookie被称为会话cookie。会话cookie一般不存储在硬盘上而是保存在内存里
     * 如果设置了过期时间，浏览器就会把cookie保存在硬盘里，关闭后再次打开浏览器，这些cookie仍然有效直到超过设定的过期时间

   - Domain

     * 该属性用来的设置cookie的域，**如果没有设置Domain，默认为该页面的域（不包含子域名），如果设置Domain=mozilla.org，则Cookie也包含在子域名中（如developer.mozilla.org）**
     * domain参数可以设置父域名以及自身，但不能设置其它域名，包括子域名，否则cookie不起作用
       * 如：网站的域名为i.xiaohan.com,那么前端cookie的domain只能设置，i.xiaohan.com和其父域名xiaohan.com，如果设置成同级域名如api.xiaohan.com或者子域名api.i.xiaohan.com 那么cookie设置将无效
    * 同样在服务端上，如果制定你的server服务的域名为server.xiaohan.com那么在服务端生成的cookie的domain只能指定为server.xiaohan.com或者xiaohan.com其他domain都无法成功设置cookie
    * cookie的作用域是domain本身以及domain下的所有子域名。例如设置xiaohan.com为domain的cookie时，只有该域名或者其子域名才能获取到这个cookie

  - Path

  * path表示cookie所在页面，**如果没有设置path值，则默认为该页面的path（不包含子页面），如果设置了path，则包含子页面**
  * 要想同域名下的所有页面都可以访问到cookie值，则可以将path设置为'/'
  * 比如path值设为'/E:/Demo/'，则在'/E:/Demo/'下的所有页面都可以访问到该cookie
  * 比如path值设为'/E:/Demo/dir'，则在'/E:/Demo/dir'下的所有页面都可以访问到该cookie,而'/E:/Demo/'下的页面不能访问

  - secure

    * secure 选项用来设置 Cookie 只在确保安全的请求中才会发送
    * 当请求是HTTPS或者其他安全协议时，包含 secure 选项的 Cookie 才能被保存到浏览器或者发送至服务器。
    * 默认情况下，Cookie 不会带 secure 选项(即为空)。所以默认情况下，不管是 HTTPS 协议还是 HTTP 协议的请求，Cookie 都会被发送至服务端

  - httpOnly

    * 这个选项用来设置 Cookie 是否能通过 js 去访问
    * 默认情况下，Cookie 不会带 httpOnly 选项(即为空)，客户端是可以通过js代码去访问（包括读取、修改、删除等）这个 Cookie 的。当 Cookie 带 httpOnly 选项时，客户端则无法通过 js 代码去访问（包括读取、修改、删除等）这个 Cookie
 
4. cookie的设置

   * cookie既可以在客户端设置又可以在服务端设置
   * 客户端设置
 
      * 设值
     
             如：document.cookie = 'name=value'

      * 自定义存、取、删除cookie函数
   
		     如：function setCookie(name,value,iDay){
				    var oDate=new Date();
				    oDate.setDate(oDate.getDate()+iDay);
				    document.cookie=name+'='+value+';expires='+oDate+';path=/E:/Demo'+';domain=www.baidu.com';
				}
				
				function getCookie(name){
				   var arr=document.cookie.split('; ');
				   for(var i=0;i<arr.length;i++){
				       var arr1=arr[i].split('=');
				       if(arr1[0]==name){
				           return arr1[1];
				       }
				   }
				    return '';
				}
				
				function removeCookie(name){
				   setCookie(name,'1',-1);
				}


#### 二、localstorage与sessionstorage ####

1. 简介

   * 在HTML5中，新加入了一个localStorage(本地存储)特性，这个特性主要是用来作为本地存储来使用的，解决了cookie存储空间不足的问题(cookie中每条cookie的存储空间为4k)，localStorage中一般浏览器支持的是5M大小，这个在不同的浏览器中localStorage会有所不同
   * localstorage在浏览器的API有两个：localStorage和sessionStorage，存在于window对象中：localStorage对应window.localStorage，sessionStorage对应window.sessionStorage
   * localstorage与sessionstorage唯一的区别是生存期不同

2. 作用域

   * localStorage只要在相同的协议、相同的主机名、相同的端口下（同源），就能读取/修改到同一份localStorage数据
   * sessionStorage比localStorage更严苛一点，除了协议、主机名、端口外，还要求在同一窗口（也就是浏览器的标签页）下

3. 生存期

   * localStorage理论上来说是永久有效的，即不主动清空的话就不会消失，即使保存的数据超出了浏览器所规定的大小，也不会把旧数据清空而只会报错。但需要注意的是，在移动设备上的浏览器或各Native App用到的WebView里，localStorage都是不可靠的，可能会因为各种原因（比如说退出App、网络切换、内存不足等原因）被清空
   * sessionStorage的生存期顾名思义，类似于session，只要关闭浏览器（也包括浏览器的标签页），就会被清空。由于sessionStorage的生存期太短，因此应用场景很有限，但从另一方面来看，不容易出现异常情况，比较可靠

4. 数据结构

   * localstorage为标准的键值对（Key-Value,简称KV）数据类型，简单但也易扩展，只要以某种编码方式把想要存储进localstorage的对象给转化成字符串，就能轻松支持。举点例子：把对象转换成json字符串，就能让存储对象了；把图片转换成DataUrl（base64），就可以存储图片了。另外对于键值对数据类型来说，“键是唯一的”这个特性也是相当重要的，重复以同一个键来赋值的话，会覆盖上次的值。LocalStorage 只能存储字符串

5. 用法

   * setItem(): "增（改）"，将数据以键值对的形式存到 LocalStorage 中
   * getItem(): "查"，从 LocalStorage 获得对应键值的数据
   * removeItem(): "删"，删除 LocalStorage 中给定键的数据条目
   * clear(): 清空 LocalStorage
   * key(): 传递一个数字 n，获取第 n 个键的数据

			如：window.localStorage.setItem('name', 'Cola Frontend');
			    const developer = {
			      name: 'Cola Frontend',
			      skills: ['React', 'Redux', 'RxJS', 'TypeScript'],
			    }
			
			   window.localStorage.setItem('developer', JSON.stringify(developer));
			   window.localStorage.getItem('developer');
    
               返回的数据是这样的：
               
               "{"name":"Cola Frontend","skills":["React","Redux","RxJS","TypeScript"]}"
       
               这显然不是我们想要的结果，要想正常的使用这个值，你需要先将它转换回对象类型。我们可以使用 JSON.parse() 来将一个 JSON 字符串转换成 JavaScript 对象：
      
               JSON.parse(window.localStorage.getItem('developer'));

               window.localStorage.removeItem('developer'); 
               window.localStorage.clear();
               var keyName = window.localStorage.key(index)

5. 使用限制

   * 浏览器的大小不统一，并且在IE8以上的IE版本才支持localStorage这个属性
   * 目前所有的浏览器中都会把localStorage的值类型限定为string类型，这个在对我们日常比较常见的JSON对象类型需要一些转换
   * localStorage在浏览器的隐私模式下面是不可读取的
   * localStorage本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡
   * localStorage不能被爬虫抓取到
   * localStorage 是同步的，这意味着任何的操作都是一个接一个执行的

#### 三、cookie,localStorage,sessionStorage三者的区别 ####

1. 存储数据大小

   * cookie：4KB左右
   * localStorage,sessionStorage:5MB左右

2. 生命周期

   * cookie：可设置失效时间，没有设置的话，默认是关闭浏览器后失效
   * localStorage：除非被手动清除，否则将会永久保存。
   * sessionStorage： 仅在当前网页会话下有效，关闭页面或浏览器后就会被清除。

3. http请求

   * cookie：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题
   * localStorage和sessionStorage：仅在客户端（即浏览器）中保存，不参与和服务器的通信

4. 作用域

   * sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面
   * localstorage在所有同源窗口中都是共享的
   * cookie也是在所有同源窗口中都是共享的

5. 易用性

    * cookie：需要程序员自己封装，源生的Cookie接口不友好
    * localStorage和sessionStorage：源生接口可以接受，亦可再次封装来对Object和Array有更好的支持


#### 四、session ####

1. 理解

   * Session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了。
   * 如果说Cookie机制是通过检查客户身上的“通行证”来确定客户身份的话，那么Session机制就是通过检查服务器上的“客户明细表”来确认客户身份。Session相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了



			var express=require("express")
			var app=express()

			//引用session
			var session=require("express-session");
			var cookieparser=require("cookie-parser")

			app.use(session({
			  secret:"dsafsafsf",//设置签名秘钥  内容可以任意填写
			  cookie:{maxAge:80*1000},//设置cookie的过期时间，例：80s后session和相应的cookie失效过期
			  resave:true,//强制保存，如果session没有被修改也要重新保存
			  saveUninitialized:false//如果原先没有session那么就设置，否则不设置
			}))

			//读取session
			app.get("/select",function(req,res){
			  //查看session
			  console.log(req.session)
			  res.send("查询成功")
			})

			//设置session里面的内容
			app.get("/add",function(req,res){
			  //往session里存储数据
			  req.session.loginok=true;//loginok:可以是任意内容，可以为true或false
			  res.send("添加成功")
			})
			app.get("/del",function(req,res){
			  req.session.destroy();
			  res.redirect("http://www.baidu.com");//删除成功后转到百度页面
			  res.send("删除成功")
			})
			
			app.listen(3000)