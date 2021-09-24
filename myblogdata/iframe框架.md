---
title: iframe框架
date: 2019-04-29 22:00:00
tags:
cover: /images/psb11.jpg
---
一、功能

&nbsp;&nbsp;iframe标签用于定义内联框架。

二、语法

&nbsp;&nbsp;&lt;iframe>&lt;/iframe>

三、iframe常用属性
![](iframe1.JPG)


四、父页面获取子页面iframe内的内容以及子页面获取父页面

&nbsp;&nbsp;<font color="red">我们通常使用iframe最基本的特性，就是能自由操作iframe和父框架的内容(DOM). 但前提条件是同域. 如果跨域顶多只能实现页面跳转window.location.href.</font>

&nbsp;&nbsp;1.父页面获取子页面内容

&nbsp;&nbsp;&nbsp;&nbsp;(1).主要是contentWindow和contentDocument两个API

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iframe.contentWindow, 获取iframe的window对象
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iframe.contentDocument,获取iframe的document对象

&nbsp;&nbsp;&nbsp;&nbsp;(2).结合Name属性，通过window提供的frames获取.

&nbsp;&nbsp;2.子页面获取父页面内容

&nbsp;&nbsp;&nbsp;&nbsp;<font color="red">同理，在同域下，父页面可以获取子iframe的内容，那么子iframe同样也能操作父页面内容。</font>
&nbsp;&nbsp;在iframe中，可以通过在window上挂载的几个API进行获取.

&nbsp;&nbsp;&nbsp;&nbsp;(1)window.parent 获取上一级的window对象，如果还是iframe则是该iframe的window对象
&nbsp;&nbsp;&nbsp;&nbsp;(2)window.top 获取最顶级容器的window对象，即，就是你打开页面的文档
&nbsp;&nbsp;&nbsp;&nbsp;(3)window.self 返回自身window的引用。可以理解 window===window.self


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
         iframe.onload=function(){
         var iwindow = iframe.contentWindow;
         var idocument = iframe.contentDocument;//第一种方法
         console.log(idocument.body.getElementsByTagName('p');
         console.log(window.frames['ifr1'].window);//第二种方法
       }
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
六、frame和iframe的区别
 &nbsp;&nbsp;1. frame不能脱离frameset单独使用，iframe可以； 
 &nbsp;&nbsp; 2.frame不能放在body中；
  &nbsp;&nbsp; &nbsp;&nbsp;如下可以正常显示： 
```php
<!--<body>--> 
<frameset rows="50%,*">
<frame name="frame1" src="test1.htm"/>  
<frame name="frame2" src="test2.htm"/>  
</frameset> 
<!--<body>--> 
```
  &nbsp;&nbsp; &nbsp;&nbsp;如下不能正常显示： 
```php
<body> 
<frameset rows="50%,*"> 
<frame name="frame1" src="test1.htm"/>  
<frame name="frame2" src="test2.htm"/>  
</frameset> 
<body> 
```
  &nbsp;&nbsp;3.嵌套在frameset中的iframe必需放在body中；
    &nbsp;&nbsp;  &nbsp;&nbsp;如下可以正常显示： 
   
   ```php
<body>
<frameset>  
<iframe  name="frame1"  src="test1.htm"/>  
<iframe  name="frame2"  src="test2.htm"/>  
</frameset>
</body> 
```
  &nbsp;&nbsp;  &nbsp;&nbsp;如下不能正常显示： 
```php
<!--<body>-->
<frameset>  
<iframe name="frame1" src="test1.htm"/>  
<iframe name="frame2" src="test2.htm"/>  
</frameset>
<!--</body>--> 
```
&nbsp;&nbsp; 4.不嵌套在frameset中的iframe可以随意使用；
&nbsp;&nbsp; &nbsp;&nbsp; 如下均可以正常显示： 
```php
<body>
<iframe name="frame1" src="test1.htm"/>  
<iframe name="frame2" src="test2.htm"/>  
</body> 
```
```php
<!--<body>--> 
<iframe name="frame1" src="test1.htm"/>  
<iframe name="frame2" src="test2.htm"/>  
<!--</body>--> 
```
&nbsp;&nbsp; 5.frame的高度只能通过frameset控制；iframe可以自己控制，不能通过frameSet控制，如： 
```php
<!--<body>--> 
<frameset rows="50%,*"> 
<frame name="frame1" src="test1.htm"/>  
<frame name="frame2" src="test2.htm"/>  
</frameset> 
<!--</body>--> 
```
```php
<body> 
<frameset> 
<iframe height="30%" name="frame1"  src="test1.htm"/>  
<iframe height="100" name="frame2"  src="test2.htm"/>  
</frameset> 
</body> 
```
&nbsp;&nbsp; 6.如果在同一个页面使用了两个以上的iframe，在IE中可以正常显示，在firefox中只能显示出第一个；使用两个以上的frame在IE和firefox中均可正常 。

