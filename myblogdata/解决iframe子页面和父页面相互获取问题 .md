---
title: 解决iframe子页面和父页面相互获取问题 
date: 2019-04-29 22:00:00
tags:
cover: /images/psb10.jpg
---
<font color="red">1.首先父页面和子页面都必须在本地架设服务器上来调试</font>

&nbsp;&nbsp; 不然会报这样的错误：Uncaught SecurityError: Blocked a frame with origin "null" from accessing a frame with origin "null"
&nbsp;&nbsp; 意思是：未捕获的安全错误：阻止了一个域为null的frame页面访问另一个域为null的页面。
&nbsp;&nbsp; 可能是因为在本地直接用浏览器打开的、地址栏是file:///的页面吧。所以，需要在本地架设服务器来调试。


```php
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>父页面</title>
    </head>
    <body>
        <iframe src="iframe-content.html" width="400px" height="150px" frameborder="1" scrolling="auto" id="frame1" name="ifr1">
       </iframe> 
       <p>hello</p>
      <script>
         var iframe = document.getElementById("frame1"); 
         var iwindow = iframe.contentWindow;
         var idocument = iframe.contentDocument;
    </script>
  </body>
</html>
```
```php
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>iframe-content</title>
    </head>
    <body>
        <p>蒹葭苍苍，白露为霜。所谓伊人，在水一方。</p>
        <p>溯洄从之，道阻且长。溯游从之，宛在水中央。</p>
        <p>蒹葭萋萋，白露未晞。所谓伊人，在水之湄。</p>
        <p>溯洄从之，道阻且跻。溯游从之，宛在水中坻。</p>
        <script>
            var iframe = window.parent;
            console.log(iframe.document);
        </script>
    </body>
</html>
```
2.父页面获取到的子页面的document中只有head和body
	
```php
   #document
	   <html>
	      <head></head>
	      <body></body>
	   </html>
```
解决办法：
&nbsp;&nbsp;&nbsp;&nbsp;原因其实是iframe加载是需要时间的，它还没加载完我就在js中直接获取对象了，所以获取为空
```php
     <script>
         var iframe = document.getElementById("frame1"); 
         iframe.onload=function(){
         var iwindow = iframe.contentWindow;
         var idocument = iframe.contentDocument;
       }
    </script>
```
让iframe加载完onload后再获取就可以正常获取到对象了
	
