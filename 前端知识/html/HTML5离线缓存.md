#### 一、什么是离线缓存？ ####

- HTML5 引入离线缓存（Application Cache），这意味着 web 应用可进行缓存，并可在没有因特网连接时进行访问。

#### 二、优势 ####

- 离线浏览 - 用户可在应用离线时使用它们。
- 速度 - 已缓存资源加载得更快。
- 减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源。

#### 三、应用场景 ####

- h5游戏及一些页面内容不经常会变动、相对较为固定的内容。

#### 四、原理 ####

- HTML5的离线存储是基于一个manifest文件(缓存清单文件，后缀为.appcache)的缓存机制(不是存储技术)，通过这个文件上的清单解析离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态时，浏览器会通过被离线存储的数据进行页面展示。

#### 五、如何使用？ ####

- 目前html5 manifest也可以纯前端开发，不需要后端和服务器端的配合。
- html5 manifest纯前端开发是如何做的呢？之前的写法是

		<html lang="en" manifest="haorooms.manifest">

- 这种写法要在web 服务器上配置正确的 MIME-type，即 "text/cache-manifest"。例如对Apache服务器进行配置的时候，需要找到 ｛apache_home｝/conf/mime.type这个文件(.htaccess)，并在文件最后添加如下所示代码：text/cache-manifest .manifest 等等。

- 新的写法：

		<html manifest="haorooms.appcache">

- 扩展名".appcache"为后缀，不需要我们再进行服务器端的配置了。就可以纯前端的进行离线缓存的操作

- 使用过程：

  - step1:在文档的demo.html标签中设置manifest 属性，引用manifest文件 。
    - demo.appcache文件名和html文件名一致
    - manifest 属性可指向绝对网址或相对路径，但绝对网址必须与相应的网络应用同源。
  
		demo.html代码如下：
		
		<!DOCTYPE html>
		<html lang="en" manifest="demo.appcache">
		<head>
		    <meta charset="UTF-8">
		    <title>demo</title>
		</head>
		<body>
		    <img src="img.jpg" height="500" width="900" alt="">
		    其它内容...
		</body>
		</html>

   - step2:配置manifest文件，在manifest文件中编写离线存储的资源。

        demo.appcache代码如下：
		
		CACHE MANIFEST
		#version 1.0
		CACHE：
		    img.jpg
		NETWORK:
		    *
		FALLBACK:
		    /demo/ /404.html

       - demo.appcache中的配置意为：demo.html中的img在首次下载后进行缓存；其他文件内容都需要因特网连接；如果无法建立因特网连接，则用 "404.html" 替代 /demo/ 目录中的所有文件。

      - manifest 文件是简单的文本文件，它告知浏览器被缓存的内容（以及不缓存的内容）。
      - CACHE MANIFEST写在第一行
      - manifest 文件可分为三个部分：

        - CACHE  
          - 在此标题下列出的文件将在首次下载后进行缓存。
          
        - NETWORK 
          - 在此标题下列出的文件需要与服务器的连接，且不会被缓存。可以使用*，表示除CACHE 外的所有其他资源/文件都需要因特网连接。
          
        - FALLBACK 
          - 在此标题下列出的文件指定了一个后备页面，当资源无法访问时，浏览器会使用该页面。
          - 该段落的每条记录都列出两个 URI。第一个表示资源， 第二个表示后备页面。
          - 两个 URI 都必须使用相对路径并且与清单文件同源。可以使用通配符。


#### 六、更新缓存 ####

- 一旦应用被缓存，它就会保持缓存直到发生下列情况：

  - manifest文件被修改：给manifest添加或删除文件，都可更新缓存，如果我们更改了js，而没有新增或删除，前面例子中注释中的版本号、时间戳或者md5码等进行修改，都可以很好的用来更新manifest文
  - 通过javascript操作：html5中引入了js操作离线缓存的方法，下面的js可以手动更新本地缓存。window.applicationCache.update();
  - 清除浏览器缓存：如果用户清除了浏览器缓存（手动或用其他一些工具）都会重新下载文件。 

#### 七、浏览器是如何对 HTML5 的离线储存资源进行管理和加载？ ####

- 在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问页面 ，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过页面并且资源已经进行离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，就会重新下载文件中的资源并进行离线存储。
- 离线的情况下，浏览器会直接使用离线存储的资源。

#### 八、注意事项 ####

- 更新清单中列出的某个文件并不意味着浏览器会重新缓存该资源，清单文件本身必须进行更改。
- 浏览器对缓存数据的容量限制可能不太一样（某些浏览器设置的限制是每个站点5MB）。
- 如果manifest文件，或者内部列举的某一个文件不能正常下载，整个更新过程都将失败，浏览器继续全部使用老的缓存。
- 引用manifest的html必须与manifest文件同源，在同一个域下。FALLBACK中的资源必须和manifest文件同源。
- 站点中的其他页面即使没有设置manifest属性，请求的资源如果在缓存中也从缓存中访问。
- 浏览器会自动缓存引用manifest文件的HTML文件，这就导致如果改了HTML内容，也需要更新manifest 文件版本或者由程序来更新应用缓存才能做到更新。

#### 九、与传统浏览器缓存区别 ####

- 离线缓存是针对整个应用，浏览器缓存是单个文件。
- 离线缓存断网了还是可以打开页面，浏览器缓存不行。
- 离线缓存可以主动通知浏览器更新资源。
