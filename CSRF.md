一、CSRF(Cross-site request forgery 跨站请求伪造)

1.什么是CSRF?

    - 攻击者盗用用户身份，然后以用户的身份进行某些非法操作
    - CSRF通常是跨域的，因为外域通常更容易被攻击者掌控。但是如果本域下有容易被利用的功能，比如可以发图和链接的论坛和评论区，攻击可以直接在本域下进行，而且这种攻击更加危险

2.CSRF攻击原理及过程

    - 用户C打开浏览器，访问受信任网站A，输入用户名和密码请求登录网站A；
    - 在用户信息通过验证后，网站A产生Cookie信息并返回给浏览器，此时用户登录网站A成功，可以正常发送请求到网站A；
    - 用户未退出网站A之前，在同一浏览器中，打开一个TAB页访问网站B；
    - 网站B接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点A；
    - 浏览器在接收到这些攻击性代码后，根据网站B的请求，在用户不知情的情况下携带Cookie信息，向网站A发出请求。网站A并不知道该请求其实是由B发起的，所以会根据用户C的Cookie信息以C的权限处理该请求，导致来自网站B的恶意代码被执行

3.CSRF攻击必须要满足的两个条件

     - 登录受信任网站A，并在本地生成cookie
     - 在不登出A的情况下，访问危险网站B

4.常见的CSRF攻击类型

   (1)Get类型的CSRF

         - 仅仅须要一个HTTP请求。就能够构造一次简单的CSRF
         
               如:银行站点A：它以GET请求来完毕银行转账的操作，如：http://www.mybank.com/Transfer.php?toBankId=11&money=1000 
                  危急站点B：它里面有一段HTML的代码例如以下：
                  <img src=http://www.mybank.com/Transfer.php?toBankId=11&money=1000>

               首先你登录了银行网站A，然后在不登出A的情况下，又访问了B网站，B网站内有一段访问A网站转账的代码，所以你的浏览器就会带上你在A网站的cookie信息发送请求转账，服务器收到请求后会以用户的权限去处理请求
 
   (2)post类型的CSRF

          - 这种类型的CSRF利用起来通常使用的是一个自动提交的表单，如：

                <form action="http://bank.example/withdraw" method=POST>
				    <input type="hidden" name="account" value="xiaoming" />
				    <input type="hidden" name="amount" value="10000" />
				    <input type="hidden" name="for" value="hacker" />
			  </form>
			  <script> document.forms[0].submit(); </script> 

             访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作

   (3)链接类型的CSRF

          - 链接类型的CSRF并不常见，比起其他两种用户打开页面就中招的情况，这种需要用户点击链接才会触发。这种类型通常是在论坛中发布的图片中嵌入恶意链接，或者以广告的形式诱导用户中招，攻击者通常会以比较夸张的词语诱骗用户点击，例如：

			      <a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
			      重磅消息！！
			      <a/>

5.CSRF特点

       - 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生。
       - 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据。
       - 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。
       - 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。

6.防御

https://juejin.im/post/5bc009996fb9a05d0a055192#heading-20
https://www.jb51.net/article/157550.htm

      - CSRF通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对CSRF的防护能力来提升安全性。
      - 上文中讲了CSRF的两个特点：
‘
             - CSRF（通常）发生在第三方域名
             - CSRF攻击者不能获取到Cookie等信息，只是使用
		
      - 针对这两点，我们可以专门制定防护策略，如下：

            - 阻止不明外域的访问
		        
                  - 同源检测
                  - Chrome浏览器端启用SameSite cookie
		    
            - 提交时要求附加本域才能获取的信息
		        
                 - CSRF Token
                 - 双重Cookie验证 


(1)同源检测

    - 既然CSRF大多来自第三方网站，那么我们就直接禁止外域（或者不受信任的域名）对我们发起请求

    - 在http协议中，每一个异步请求都会携带两个header，用于标记来源域名：

            - origin Header:

                  - origin不存在情况：

                       - IE11同源策略： IE 11 不会在跨站CORS请求上添加Origin标头，Referer头将仍然是唯一的标识
                       - 302重定向： 在302重定向之后Origin不包含在重定向的请求中，因为Origin可能会被认为是其他来源的敏感信息。对于302重定向的情况来说都是定向到新的服务器上的URL，因此浏览器不想将Origin泄漏到新的服务器上。
                       
           - referer Header
 
                  - referer不存在情况：

                       - 根据Referer的定义，它的作用是指示一个请求是从哪里链接过来，那么当一个请求并不是由链接触发产生的，那么自然也就不需要指定这个请求的链接来源

                             如:直接在浏览器的地址栏中输入一个资源的URL地址，那么这种请求是不会包含 Referer  字段的，因为这是一个“凭空产生”的 HTTP  请求，并不是从一个地方链接过去的

(2)Chrome浏览器端启用SameSite cookie

      - 下面介绍如何启用SameSite cookie的设置，很简单
      
           - 原本的 Cookie 的 header 设置是长这样：
	
	           Set-Cookie: session_id=esadfas325
	
           - 需要在尾部增加 SameSite 就好：
	
	           Set-Cookie: session_id=esdfas32e5; SameSite
	
          - SameSite 有两种模式，Lax跟Strict模式，默认启用Strict模式，可以自己指定模式：
	
	          Set-Cookie: session_id=esdfas32e5; SameSite=StrictSet-Cookie: foo=bar; SameSite=Lax
 
               - Strict模式:规定 cookie 只允许相同的域使用，不应该在任何的跨域请求被加上去。即a标签、form表单和XMLHttpRequest提交的内容，只要是提交到不同的域去，就不会带上cookie
               - Lax模式比 Strict 放宽了点限制：假如这个请求是这种请求（改变了当前页面或者打开了新页面）且同时是个GET请求，则这个Cookie可以作为第三方Cookie
                      
                      如:<a>
						 <link rel="prerender">
						 <form method="GET">
						
						 这些都会带上cookie
      - SamesiteCookie目前有一个致命的缺陷：不支持子域。例如，种在topic.a.com下的Cookie，并不能使用a.com下种植的SamesiteCookie。这就导致了当我们网站有多个子域名时，不能使用SamesiteCookie在主域名存储用户登录信息。每个子域名都需要用户重新登录一次
         
(3)CSRF token

     - 服务器发送给客户端一个token
     - 客户端提交的表单中带着这个token
     - 如果这个 token 不合法，那么服务器拒绝这个请求

7.防止网站被利用

    - 前面所说的，都是被攻击的网站如何做好防护。而非防止攻击的发生，CSRF的攻击可以来自：
       
        - 攻击者自己的网站
        - 有文件上传漏洞的网站
        - 第三方论坛等用户内容
        - 被攻击网站自己的评论功能等

   - 对于来自黑客自己的网站，我们无法防护。但对其他情况，那么如何防止自己的网站被利用成为攻击的源头呢？

        - 严格管理所有的上传接口，防止任何预期之外的上传内容（例如HTML）
        - 添加Header X-Content-Type-Options: nosniff 防止黑客上传HTML内容的资源（例如图片）被解析为网页
        - 对于用户上传的图片，进行转存或者校验。不要直接使用用户填写的图片链接
        - 当前用户打开其他用户填写的链接时，需告知风险（这也是很多论坛不允许直接在内容中发布外域链接的原因之一，不仅仅是为了用户留存，也有安全考虑）


8.XSS和CSRF的区别

     - 区别一：

         - CSRF：需要用户先登录网站A，获取 cookie。XSS：不需要登录。

     - 区别二：（原理的区别）

         - CSRF：是利用网站A本身的漏洞，去请求网站A的api。XSS：是向网站 A 注入 JS代码，然后执行 JS 里的代码，篡改网站A的内容。

 


