---
title: meta标签
date: 2019-04-27 22:40:40
tags:
cover: /images/psb12.jpg
---
# 简介
&ensp;&ensp;&ensp;&ensp;metadata(元数据),是用于描述数据的数据。它不会显示在页面上，但是机器却可以识别。
<hr/>

# 作用
&ensp;&ensp;&ensp;&ensp;meta常用于定义页面的说明，关键字，最后修改日期，和其它的元数据。这些元数据将服务于浏览器（如何布局或重载页面），搜索引擎和其它网络服务(对于网页也来说，metadata就是通过一些字段信息来描述一下当前网页，以便浏览器和搜索引擎在访问到此网页的时候，可以通过这些描述信息来知道如何去解析此网页数据)。
<hr/>

# 位置
&ensp;&ensp;&ensp;&ensp;meta标签始终位于head元素内。
<hr/>

# 属性
* name
* http-equiv
* content
* charset
<hr/>

一 、**charset属性**     
  
.&ensp;&ensp;&ensp;&ensp;charset为HTML5中新增的，用来声明字符编码;

```php
    <meta charset="UTF-8">
```
二、 **content属性**

 &ensp;&ensp;&ensp;&ensp;content属性和name、http-equiv属性配合使用，content属性用来提供属性的值。

 三、**name属性**

&ensp;&ensp;&ensp;&ensp; name属性主要用于描述网页，比如网页的关键词，叙述等。与之对应的属性值为content，content中的内容是对name填入类型的具体描述，便于搜索引擎抓取。
  
   ```php
      <meta name="参数" content="具体的描述">
   ```
  ** name属性的参数(红色标记为常用的属性)：**
   &ensp;&ensp;&ensp;&ensp;<font color="red">1. keywords(关键字)</font>
  
   &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; **说明：** 用于告诉搜索引擎，你网页的关键字。
   
   &ensp;&ensp;&ensp;&ensp;&ensp; **用法：**
 ```php
     <meta name="keywords" content="Lxxyx,博客，文科生，前端">
 ```
 &ensp;&ensp;&ensp;&ensp;<font color="red">2.description(网站内容的描述)</font>

 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**用于告诉搜索引擎，你网站的主要内容。

&ensp;&ensp;&ensp;&ensp;&ensp; **用法：**
```php
    <meta name="description" content="文科生，热爱前端与编程。目前大二，这是我的前端博客">
```

&ensp;&ensp;&ensp;&ensp; 3. robots(定义搜索引擎爬虫的索引方式)

  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**robots用来告诉爬虫哪些页面需要索引，哪些页面不需要索引。
   
&ensp;&ensp;&ensp;&ensp;&ensp;**content的参数有：**
  
* none : 搜索引擎将忽略此网页，等价于noindex，nofollow。
* noindex : 搜索引擎不索引此网页。
* nofollow: 搜索引擎不继续通过此网页的链接索引搜索其它的网页。
* all(默认): 搜索引擎将索引此网页与继续通过此网页的链接索引，等价于index，follow。
* index : 搜索引擎索引此网页。
* follow : 搜索引擎继续通过此网页的链接索引搜索其它的网页。

   &ensp;&ensp;**用法：**
  ```php
  <meta name="robots" content="none">
  ```
 &ensp;&ensp;&ensp;&ensp; 4.author(作者)
   
   &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**用于标注网页作者。
  
  &ensp;&ensp;&ensp;&ensp;&ensp; **用法：**
   ```php
         <meta name="author" content="Lxxyx,841380530@qq.com">
   ```
  &ensp;&ensp;&ensp;&ensp; 5. generator(网页制作软件)

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**用于标明网页是什么软件做的:

&ensp;&ensp;&ensp;&ensp;&ensp; **用法：**
```php
<meta name="generator" content="Sublime Text3">
```
 &ensp;&ensp;&ensp;&ensp;6. copyright(版权)

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**用于标注版权信息举例：

&ensp;&ensp;&ensp;&ensp;&ensp; **用法：**
```php
<meta name="copyright" content="Lxxyx"> 
```
 &ensp;&ensp;&ensp;&ensp;7. revisit-after(搜索引擎爬虫重访时间)

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**如果页面不是经常更新，为了减轻搜索引擎爬虫对服务器带来的压力，可以设置一个爬虫的重访时间。如果重访时间过短，爬虫将按它们定义的默认时间来访问。
&ensp;&ensp;&ensp;&ensp;&ensp; **用法：**
```php
<meta name="revisit-after" content="7 days" >
```
 &ensp;&ensp;&ensp;&ensp;8. renderer(双核浏览器渲染方式)

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**renderer是为双核浏览器准备的，用于指定双核浏览器默认以何种方式渲染页面。比如说360浏览器。

&ensp;&ensp;&ensp;&ensp;&ensp; **用法：**
```php
<meta name="renderer" content="webkit"> //默认webkit内核
<meta name="renderer" content="ie-comp"> //默认IE兼容模式
<meta name="renderer" content="ie-stand"> //默认IE标准模式
```

**移动端的应用**

&ensp;&ensp;&ensp;&ensp;<font color="red">9.  viewport(移动端的窗口)</font>

 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**介绍：** 移动设备上的viewport是设备屏幕上用来显示网页的那部分区域，再具体一点就是浏览器上用来显示网页的那部分区域，但viewport又不局限于浏览器可视区域的大小，它可能比浏览器的可视区域大，也可能比浏览器的可视区域小。在默认情况下，移动设备上的viewport都是大于浏览器可视区域的，这是因为移动设备的分辨率相对于PC来说都比较小，所以为了能在移动设备上正常显示那些为PC浏览器设计的网站，移动设备上的浏览器都会把自己默认的viewport设为980px或1024px（也可能是其它值，由设备本身决定），但后果是浏览器出现横向滚动条，因为浏览器可视区域的宽度比默认的viewport的宽度小。
 
&ensp;&ensp;&ensp;&ensp;&ensp;**三个viewport：**

&ensp;&ensp;&ensp;&ensp;（1）layout viewport

&ensp;&ensp;&ensp;&ensp;如果把移动设备上浏览器的可视区域设为viewport的话，某些网站会因为viewport太窄而显示错乱，所以这些浏览器就默认会把viewport设为一个较宽的值，比如980px，使得即使是那些为PC浏览器设计的网站也能在移动设备浏览器上正常显示。这个浏览器默认的viewport叫做 layout viewport。layout viewport的宽度可以通过 document.documentElement.clientWidth来获取。

![](meta1.jpg)

&ensp;&ensp;&ensp;&ensp;（2）visual viewport

&ensp;&ensp;&ensp;&ensp;layout viewport的宽度是大于浏览器可视区域的宽度的，所以还需要一个viewport来代表浏览器可视区域的大小，这个viewport叫做 visual viewport。visual viewport的宽度可以通过 document.documentElement.innerWidth来获取。

![](meta2.jpg)

&ensp;&ensp;&ensp;&ensp;（3）ideal viewport

&ensp;&ensp;&ensp;&ensp;ideal viewport是一个能完美适配移动设备的viewport。首先，不需要缩放和横向滚动条就能正常查看网站的所有内容；其次，显示的文字、图片大小合适，如14px的文字不会因为在一个高密度像素的屏幕里显示得太小而无法看清，无论是在何种密度屏幕，何种分辨率下，显示出来的大小都差不多。这个viewport叫做 ideal viewport。

&ensp;&ensp;&ensp;&ensp;ideal viewport并没有一个固定的尺寸，不同的设备有不同的ideal viewport。例如，所有的iphone的ideal viewport宽度都是320px，无论它的屏幕宽度是320还是640。

&ensp;&ensp;&ensp;&ensp;ideal viewport 的意义在于，无论在何种分辨率的屏幕下，针对ideal viewport 而设计的网站，不需要缩放和横向滚动条都可以完美地呈现给用户。

 
 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明**：这个属性常用于设计移动端网页，让网页适配手机窗口，自适应页面离不开这个属性。
 
  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**利用meta标签对viewport进行控制：**
  
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;移动设备默认的viewport是layout viewport，但在进行移动设备网站的开发时，需要的是ideal viewport。要得到ideal viewport，需要用到meta标签。
  
* width：宽度（数值 / device-width）（范围从200 到10,000，默认为980 像素）
* height：高度（数值 / device-height）（范围从223 到10,000）
* initial-scale：页面的初始缩放值（范围从0 到10）
* minimum-scale：允许用户的最小缩放值(范围0.25至10.0之间)
* maximum-scale：允许用户的最大缩放值(范围0.25至10.0之间)
* user-scalable：是否允许用户进行缩放，no 不允许，yes允许

&ensp;&ensp; &ensp;&ensp;**用法：**
 ```php
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
 ```
 &ensp;&ensp; &ensp;&ensp;该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放。当然maximum-scale=1.0, user-scalable=no不是必需的，是否允许用户手动播放根据网站的需求来定，但把width设为width-device基本是必须的，这样能保证不会出现横向滚动条。
  &ensp;&ensp; &ensp;&ensp;width能控制layout viewport的宽度，如果不指定该属性，layout viewport将默认为980px或1024px（也可能是其它值，由设备本身决定），如果把layout viewport的宽度设置为移动设备的宽度，那么layout viewport将成为ideal viewport。

 &ensp;&ensp; &ensp;&ensp;其实，要把当前的viewport宽度设为ideal viewport的宽度，既可以设置width=device-width，也可以设置initial-scale=1，但有一个小缺陷，就是width=device-width会导致iphone、ipad横竖屏不分，initial-scale=1会导致IE横竖屏不分，都以竖屏的ideal viewport宽度为准。所以，最完美的写法两者都写上去， initial-scale=1 解决 iphone、ipad的缺陷，width=device-width解决IE的缺陷。
 
&ensp;&ensp; &ensp;&ensp;如果不是响应式网站，不要使用initial-scale或者禁用缩放，注意，很多人使用initial-scale=1到非响应式网站上，这会让网站以100%宽度渲染，用户需要手动移动页面或者缩放。如果和initial-scale=1同时使用user-scalable=no或maximum-scale=1，则用户将不能放大/缩小网页来看到全部的内容。

  &ensp;&ensp;&ensp;&ensp;10.format-detection

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**我们可以通过这个属性禁止自动识别电话和邮箱。

&ensp;&ensp;&ensp;&ensp;&ensp; **用法：**
```php
<meta name="format-detection" content="telephone=no,email=no"/>
```
  &ensp;&ensp;&ensp;&ensp;11.apple-mobile-web-app-capable（网站开启对web app程序的支持）

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**apple-mobile-web-app-capable的作用就是删除默认的苹果工具栏和菜单栏。content有两个值”yes”和”no”,当我们需要显示工具栏和菜单栏时，这个行meta就不用加了，默认就是显示。 
&ensp;&ensp;&ensp;&ensp;&ensp; **用法：**
```php
<meta name="app-mobile-web-app-capable" content="yes"/>
```
  &ensp;&ensp;&ensp;&ensp;12.apple-mobile-web-app-status-bar-style（改变顶部状态条的颜色）

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**在web app应用下状态条的颜色为黑色，默认值为default(白色)，可以定义为black（黑色）和black-translucent(灰色半透明)；

&ensp;&ensp;&ensp;&ensp;&ensp; **用法：**
```php
<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
```
四、**http-equiv属性**
&ensp;&ensp;&ensp;&ensp;http-equiv顾名思义，相当于http协议中文件头的作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为content，content中的内容其实就是各个参数的变量值。
```php
<meta http-equiv="参数"content="参数变量值">
```
 **http-equiv属性的参数：**
   &ensp;&ensp;&ensp;&ensp;1. content-Type(设定网页字符集)(推荐使用HTML5的方式)
  
   &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**用于设定网页字符集，便于浏览器解析与渲染页面。
   
   &ensp;&ensp;&ensp;&ensp;&ensp; **用法：**
 ```php
    <meta http-equiv="content-Type" content="text/html;charset=utf-8">  //旧的HTML，不推荐
    <meta charset="utf-8"> //HTML5设定网页字符集的方式，推荐使用UTF-8
 ```
   
   &ensp;&ensp;&ensp;&ensp;<font color="red">2.X-UA-Compatible(浏览器采取何种版本渲染当前页面)</font>
     
   &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**用于告知浏览器以何种版本来渲染页面。（一般都设置为最新模式，在各大框架中这个设置也很常见。)
   
   &ensp;&ensp;&ensp;&ensp;&ensp; **用法：**
   ```php
   <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> //指定IE和Chrome使用最新版本渲染当前页面
   ```
   
<table><tr><td bgcolor=#FAEBD7  align="left" >
<b>X-UA-Compatible 标记语法</b><br/>
    &ensp;&ensp;&ensp;&ensp;X-UA-Compatible是针对IE8新加的一个设置，是为了避免制作出的页面在IE8下面出现错误，而指定使用其他浏览器版本来渲染网页内容，对于IE8之外的浏览器是不识别的。通俗点说，这个标签可以实现 IE 浏览器版本模拟。带X-UA-Compatible属性声明的meta标签，必须放在head标签内，并且要放在除了&lt;title/> &lt;meta/>这2个元素外的任何元素前面。<br/>
     &ensp;&ensp;&ensp;&ensp;1.直接指定某个IE版本的标准文档模式。<br/>
 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;(1) 以下是要求模拟 IE8 的例子：<br/>
 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&lt;meta http-equiv="X-UA-Compatible" content="IE=8"/><br/>
 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;（<font color="red">注意：这在IE7、IE6中无效，因为 X-UA-Compatible 是 IE8 才开始支持的</font>）<br/>
 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;(2) 以下是要求模拟 IE9 的例子：<br/>
 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&lt;meta http-equiv="X-UA-Compatible" content="IE=9"/><br/>
 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;（<font color="red">注意：这不仅在IE7、IE6中无效，在 IE8 中也无效，因为不能模拟高于当前的版本</font>）<br/>
  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;(3)&lt;meta http-equiv="X-UA-Compatible" content="IE=11,IE=10,IE=9,IE=8"> <br/>
  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;意思就是强制浏览器按照特定的版本标准进行渲染，但不支持IE7及以下版本。<br/>
   &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;(4)&lt;meta http-equiv="X-UA-Compatible" content="IE=7; IE=9" /><br/>
     &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;如果用分号（；）分隔，对于不同的浏览器版本就有不同的兼容性。意思就是将IE8和IE7按照IE7标准渲染，但是IE9还是按照IE9的标准渲染。<br/>
   &ensp;&ensp;&ensp;&ensp;2.指定某个IE版本，但也允许例外。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;在IE版本号前面加上 Emulate ，代表，如果网页开头有 <!DOCTYPE> 标记就使用该IE版本的标准文档模式，否则使用怪异模式（即等同于 IE=IE5）<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;(1)以下是要求模拟 IE8 的例子：<br/>
 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&lt;meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8"/><br/>
 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;根据例子代码，如果你的网页开头带有 <!DOCTYPE> 标记(文档声明)，则模拟 IE8， 等同于：<br/>
 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&lt;meta http-equiv="X-UA-Compatible" content="IE=IE8"/><br/>
 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;如果你的网页开头没有 <!DOCTYPE> 标记，则模拟 IE6， 等同于：<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&lt;meta http-equiv="X-UA-Compatible" content="IE=IE5"/><br/>
 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;不建议使用这个语法。<br/>
&ensp;&ensp;&ensp;&ensp;3.总是使用最新版本文档模式。<br/>
 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;以下是例子：<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&lt;meta http-equiv="X-UA-Compatible" content="IE=edge"/><br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;根据例子代码，IE浏览器将总是使用最新版本的文档模式，如用 IE8 访问就是 IE8 文档<br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;模式，用 IE9 访问就是 IE9 模式，用 IE10 访问就是 IE10 模式，用 IE11 访问就是 IE11 模<br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;式。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<font color="red">注意：此声明并不是多此一举，如果你不使用 IE=edge 标记，IE浏览器会根据你的网页<br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;内容采用兼容视图，可能采用更低版本。除非不准备兼容所有旧版IE，否则也不建议使用<br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;这个语法。</font><br/>
&ensp;&ensp;&ensp;&ensp;4.除了标准用法之外，还有一些特殊用法，如：<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&lt;meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;这段代码的意思是，在不改变IE的外观情况下使用Chrome内核。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;使用条件：<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;(1)如果存在客户端Chrome Frame并启用，那么浏览器访问页面会被Chrome内核渲<br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;染；也就是说IE浏览器变身Chrome是可以的，但前提是客户端安装了Chrome Frame。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;(2)使用IE内核浏览器来访问，会渲染至该浏览器的最高版本，比如你使用IE9浏览<br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;器，那么就算在兼容模式切换至IE7，但仍会渲染成IE9的样子（当然IE7浏览器是不会渲<br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;染成IE9的）。</td></tr></table>
   &ensp;&ensp;&ensp;&ensp;3.cache-control(指定请求和响应遵循的缓存机制)
 
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**用法1.**

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**指导浏览器如何缓存某个响应以及缓存多长时间。
  
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;**用法：**
  
```php
            <meta http-equiv="cache-control" content="no-cache">
```

&ensp;&ensp;**content属性的值：**

*  no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。
* no-store: 不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）
* public : 缓存所有响应，但并非必须。因为max-age也可以做到相同效果
* private : 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应）
* maxage : 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒。


&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**用法2.**(禁止百度自动转码)

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**用于禁止当前页面在移动端浏览时，被百度自动转码。虽然百度的本意是好的，但是转码效果很多时候却不尽人意。所以可以在head中加入如下代码，就可以避免百度自动转码了。
```php
<meta http-equiv="Cache-Control" content="no-siteapp" />
```
  &ensp;&ensp;&ensp;&ensp;4.expires(网页到期时间)

   &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明:**用于设定网页的到期时间，过期后网页必须到服务器上重新传输。<font color="red">必须使用GMT的时间格式。</font>
   
   &ensp;&ensp;&ensp;&ensp;&ensp; **用法：**
```php
     <meta http-equiv="expires" content="Sunday 26 October 2016 01:00 GMT" />
```
  &ensp;&ensp;&ensp;&ensp;5. refresh(自动刷新并指向某页面)

   &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**网页将在设定的时间内，自动刷新并调向设定的网址。
&ensp;&ensp;&ensp;&ensp;&ensp;  **用法：**
```php
     <meta http-equiv="refresh" content="2；URL=http://www.lxxyx.win/"> //意思是2秒后跳转向我的博客
```
&ensp;&ensp;&ensp;&ensp;6.  Set-Cookie(cookie设定)

 &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;**说明：**如果网页过期。那么这个网页存在本地的cookies也会被自动删除。
 &ensp;&ensp;&ensp;&ensp;&ensp;  **用法：**
 ```php
     <meta http-equiv="Set-Cookie" content="name, date"> //格式
     <meta http-equiv="Set-Cookie" content="User=Lxxyx; path=/; expires=Sunday, 10-Jan-16 10:00:00 GMT"> //具体范例
```

     


 