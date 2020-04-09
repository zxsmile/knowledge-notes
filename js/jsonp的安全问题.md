一、callback参数可自定义导致的安全问题 (防止callback参数恶意添加标签（如script），造成XSS漏洞)
二、jsonp劫持(属于CSRF范畴)

一、callback参数可自定义导致的安全问题

1.Content-type与XSS漏洞 

http://127.0.0.1/getUsers.php?callback=<script>alert(/xss/)</script>

输出时没有对callback进行过滤，再加上如果没有严格设置Content-type的值为application/json,会使得浏览器将返回数据当成HTML解析，就会造成XSS漏洞

解决方案：
         * 严格定义输出的 Content-Type: application/json，浏览器不解析恶意插入的 XSS 代码
         * 限制callback函数名长度，严格过滤callback函数名
         * 过滤JSON里数据的输出



二、jsonp劫持(属于CSRF范畴)

 jsonp劫持属于CSRF范畴，也可以说，jsonp可能会引起CSRF攻击，如果服务器的某个接口使用的时jsonp跨域，传递用户的敏感信息，那么攻击者可以构造一个恶意的jsonp调用页面，在用户登陆了目标网站之后，诱导用户访问恶意页面，利用用户的敏感信息去访问目标服务器，来达到攻击者的一些非法操作的目的

解决方案：CSRF攻击的解决方案

 