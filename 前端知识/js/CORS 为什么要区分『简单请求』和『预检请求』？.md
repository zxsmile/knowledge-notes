#### 一、简单请求和复杂请求是依据什么区分的？ ####

- 如果我们看简单请求和预检请求的区分，会看到有很多的条件：

      - 简单请求的 HTTP 方法只能是 GET、HEAD 或 POST

      - 简单请求的 HTTP 头只能是 Accept/Accept-Language/Conent-Language/Content-Type 等

      - 简单请求的 Content-Type 头只能是 text/plain、multipart/form-data 或 application/x-www-form-urlencoded

- 看上去很是复杂，那么怎么理解这些限制呢？


- 其实，**简单请求就是普通 HTML Form 在不依赖脚本的情况下可以发出的请求，**比如表单的 method 如果指定为 POST ，可以用 enctype 属性指定用什么方式对表单内容进行编码，合法的值就是前述这三种。

- **非简单请求就是普通 HTML Form 无法实现的请求。**比如 PUT 方法、需要其他的内容编码方式、自定义头之类的。

### 二、HTML Form ###

- HTML本身无法直接向服务器发送信息。HTML是一种标记语言，用于描述网页的内容和结构。要向服务器发送信息，需要使用其他的技术或语言，例如JavaScript或表单提交

** 使用表单提交 **

- HTML中的<form>元素可以用于创建用户输入表单。在表单中，可以包含各种类型的输入字段（如文本框、复选框、下拉列表等）。当用户填写表单并点击提交按钮时，表单会将用户输入的数据发送到服务器。服务器端可以使用后端语言（如PHP、Python等）来处理接收到的数据。

	<form action="server.php" method="POST">
	  <input type="text" name="name" placeholder="Your Name">
	  <input type="email" name="email" placeholder="Your Email">
	  <button type="submit">Submit</button>
	</form>


** Form 表单提交时最重要的三个属性 **

1.**method**

  - 表单触发提交按钮时发送 HTTP 的方法。支持 GET 和 POST 两种，method 的值可以为别的，例如 DELETE ，虽然浏览器不会报错，但是也不起作用，**发送请求的时候默认 GET。**

2.**action **

  - 发送 HTTP 请求的 URL。

3.** enctype **
 
  - 只在 POST 请求下有效，表示对请求体的编码方式
  
 （1）application/x-www-form-urlencoded (default)

    - 数据编码成以 & 分割的键值对，同时以 = 分割键值对，字符以 URL 的方式进行编码
    
    - 浏览器的原生<form>表单，如果不设置enctype属性，那么最终就会以application/x-www-form-urlencoded (default)方式提交数据。

	    <form action="server.php" method="POST">
		  <input type="text" name="name" placeholder="Your Name">
		  <input type="email" name="email" placeholder="Your Email">
		  <button type="submit">Submit</button>
		</form>
    
     - 点击按钮之后，可以看到

         Content-Type:application/x-www-form-urlencoded;charset=utf-8
         name=ccc%E5%AD%97%E8%8A%82&email=

     - 首先，Content-Type被指定为application/x-www-form-urlencoded;
     - 其次，提交的数据按照name=ccc%E5%AD%97%E8%8A%82&email=的方式进行编码，并进行了URL转码


 （2）multipart/form-data

    - boundary 分隔符开始

    - 表单每部分的描述。

    - last boundary 结尾

    - 这个编码方式一般用来上传文件，所以在涉及到文件上传的操作时，必须将 enctype 的值设置为 multipart/form-data

 （3）text/plain

     - 空格转换为'+'，但不对特殊字符编码（很少用）



4.** application/x-www-form-urlencoded (default) VS multipart/form-data **

- 在 HTTP 上下文中，multipart/form-data 请求类型主要是用于提交 HTML 表单数据。**顾名思义，使用 multipart/form-data 作为请求类型，HTML 的主体数据将会使用分隔符（我们通常也称为边界分隔）。而由分隔符分隔的每个部分都会有自己的头部描述信息。分隔符或边界也仅作为头文件的一部分发送。**

- 但是在实际使用中，可以用于提交表单数据的还有一个 application/x-www-form-urlencoded 请求类型。

- **如果在 Form 表单中使用了 INPUT 标签，且 type="file" 时需要使用 enctype 属性明确指定 Form 表单类型为 "multipart/form-data"**。这个我们也不陌生，就是我们使用 Form 表单提交数据时，如果需要上传文件我们经常会额外使用 enctype 属性：
	
	<body>
	    <form action="/upload" enctype="multipart/form-data">
	        <div>
	            用户名<input type="text" name="username">
	        </div>
	        <div>
	            头像<input type="file" name="profilePhoto">
	        </div>
	        <div>
	            <button type="submit">提交</button>
	        </div>
	    </form>
	</body>

- **之所以这么规定的原因是 "application/x-www-form-urlencoded" 请求类型对于表单中需要提交文件或图片以及发送大量二进制数据或包含非 ASCII 字符的文本时效率是很低下的。**

- **如果只是发送简单的表单数据，请使用 application/x-www-form-urlencoded，但如果表单数据包含二进制数据，则需要使用 multipart/form-data。**但这是为什么呢？这个问题还是要归结于 application/x-www-form-urlencoded 和 multipart/form-data 两个请求类型的对数据格式的处理，了解了他们的数据格式这个问题就很好理解了。

（1）** application/x-www-form-urlencoded 数据格式 **

     - **application/x-www-form-urlencoded 请求类型会将每个非 ASCII 字符编码为3字节**。基于 application/x-www-form-urlencoded 的 Content-Type 它的请求体看起来特别大特别的冗余，这就是我们经常看到一大坨包含 % 符号的字符串。它会将请求体中的数据以 key=value 的形式进行拼接，多个数据之间使用 & 符号连接：

        key1=value1&key2=value21&key2=value22&key3=value3

     - 如果数据特别多的话咋一看头皮都要发麻！当然这还不是最主要的，最重要的是**在进行数据发送时它会将非 ASCII 的数据使用 URL 进行编码。所以你经常会看到请求数据里面有好多 % 符号**，类似如下：

        %WW

     - 其中 WW 是以十六进制格式表示的字母数字字符的 ASCII 码。**因为二进制数据中的所有非字母数字字符都是URL编码，也就导致了1个字节被转换为3个字节。**

     - **所以在实际数据传输时原本的数据基本上被放大了三倍。如果你发送的是一个文件或图像，其中有很多二进制数据，那么你的有效载荷将会非常大，即几乎是实际有效载荷的三倍。因此，它在发送大型二进制文件或大型非 ASCII 数据时效率极其之低下**，再财大气粗的公司使用 application/x-www-form-urlencoded 请求类型进行二进制数据传输浪费的带宽怎么也要伤筋动骨吧！

（2）** multipart/form-data 数据格式 **

     - **multipart/form-data 具有分隔符或边界。被分隔的每个部分都是一个单独的数据体，具有自己的请求头描述信息。**

     - multipart/form-data 数据格式如下：

		--
		Content-Disposition: form-data; name=""
		Content-Type:
		
		[DATA]
		--
		Content-Disposition: form-data; name=""; filename=""
		Content-Type:
		
		[DATA]
		----

    - 注意看上面的格式，**格式以分隔符（-- ）或边界开始，以分隔符或边界结束**。上面的示例格式分为两部分，在实际使用中需要严格遵守上面的格式，同时要牢记：

       - **每个部分都有自己分隔符或边界**

       - **每个部分都包含自己的头信息来描述数据类型**

       - **Content-Disposition 的值包括三个部分，form-data 表示是一个表单数据。name="" 指定的是字段的名称，以之前的表单为例，这个值就是 input 标签里面的 name="username"。最后，如果你要上传的数据是一个文件还要包含 filename="" 字段，这个就对应之前的 <input type="file">，它的值就是文件名。**

       - **最后，空一行然后写你自己的数据。如果是一个文件，就使用 < 指定你的文件路径即可。**

    - 还是以下面的 form 表单为例来说下：

		 <body>
		    <form action="/upload" enctype="multipart/form-data">
		        <div>
		            用户名<input type="text" name="username">
		        </div>
		        <div>
		            年龄<input type="text" name="age">
		        </div>
		        <div>
		            头像<input type="file" name="profilePhoto">
		        </div>
		        <div>
		            <button type="submit">提交</button>
		        </div>
		    </form>
		</body>

	- 上面三个 input 框值如下：
	
		username=张三
		age=18
		profilePhoto=/Users/kali/example.png

    - 注意:上面的 profilePhoto 指定的是本地的文件，那么它的值就是机器上的路径。

    - 上面示例数据对应的 multipart/form-data 请求类型数据体如下：
		
		--
		Content-Disposition: form-data; name="username"
		
		张三
		--
		Content-Disposition: form-data; name="age"
		Content-Type: text/plain
		
		18
		--
		Content-Disposition: form-data; name="profilePhoto"; filename="example.png"
		Content-Type: image/png
		
		< /Users/kali/example.png
		----

    - **由于 multipart/form-data 将按原样发送二进制数据，这就是为什么它被用于发送文件和大的二进制数据。**
    
    - **现在的问题是。为什么不一直使用 multipart/form-data 类型来提交表单数据呢? 原因是，对于小数据，边界字符串和请求头信息本身都是额外的数据，在传输时也占用一定的网络带宽**。例如，假设我们只发送如下数据：

			name=张三
			age=18

    - 如果使用 application/x-www-form-urlencoded 作为请求类型时发送的数据如下：

			username=%E5%BC%A0%E4%B8%89&age=18

    - 但是如果使用 multipart/form-data 作为请求类型的话，要发送的数据则是：

			--
			Content-Disposition: form-data; name="username"
			
			张三
			--
			Content-Disposition: form-data; name="age"
			Content-Type: text/plain
			
			18
			----

     - 得不偿失

（3）** 自定义数据边界 **

     - 前面的示例中使用的数据边界都是 --，这是 multipart/form-data 的默认数据边界，对应的请求头是：

       Content-Type: multipart/form-data

     - 但实际上，**我们可以使用 boundary 来自定义边界**，即：

	   Content-Type: multipart/form-data; boundary=WebKitFormBoundary

     - **其中 boundary 指定的值 WebKitFormBoundary 就是我们设置的边界，任意值都可，但一般使用的还是 - 和字符数字组合。但是即使你使用 boundary 指定了自定义边界数据，原本的 -- 也是不能省略的**。比如我们使用 boundary 指定了边界值为 WebKitFormBoundary，那么对应的数据体就为：

		--WebKitFormBoundary
		Content-Disposition: form-data; name=""
		Content-Type:
		
		[DATA]
		--WebKitFormBoundary
		Content-Disposition: form-data; name=""; filename=""
		Content-Type:
		
		[DATA]
		--WebKitFormBoundary--

    - 再比如，如果你设置的请求头类型为：

         Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

    - 那么你的数据边界原本的 -- 也是不能省略的：

		------WebKitFormBoundary7MA4YWxkTrZu0gW
		Content-Disposition: form-data; name=""
		Content-Type:
		
		[DATA]
		------WebKitFormBoundary7MA4YWxkTrZu0gW
		Content-Disposition: form-data; name=""; filename=""
		Content-Type:
		
		[DATA]
		------WebKitFormBoundary7MA4YWxkTrZu0gW--

（4）** 多文件上传 **

  - 同时上传 pdf 和头像对应的 Form 表单如下：

	<body>
	    <form action="/upload" enctype="multipart/form-data">
	        <div>
	            PDF文件<input type="file" name="contract" accept="application/pdf">
	        </div>
	        <div>
	            头像<input type="file" name="profilePhoto" accept="image/*">
	        </div>
	        <div>
	            <button type="submit">提交</button>
	        </div>
	    </form>
	</body>

  - 以 Java 语言为例，对应的后台代码为：

	@PostMapping("/upload")
	public void upload(@RequestParam("contract") MultipartFile contract,
	                   @RequestParam("profilePhoto") MultipartFile profilePhoto) {
	
	    // ......
	}

  - 同时上传身份证正反面的 Form 表单如下：

		<body>
		    <form action="/upload" enctype="multipart/form-data">
		        <div>
		            证件照<input type="file" name="identityCard" multiple accept="image/*">
		        </div>
		        <div>
		            <button type="submit">提交</button>
		        </div>
		    </form>
		</body>
		
		<!-- 或 -->
		
		<body>
		    <form action="/upload" enctype="multipart/form-data">
		        <div>
		            证件照1<input type="file" name="identityCard" accept="image/*">
		            证件照2<input type="file" name="identityCard" accept="image/*">
		        </div>
		        <div>
		            <button type="submit">提交</button>
		        </div>
		    </form>
		</body>

 - 以 Java 语言为例，对应的后台代码为：

		@PostMapping("/upload")
		public void upload(@RequestParam("identityCard") List<MultipartFile> identityCardFile) {
		
		    // omit
		}

- **很显然，这两种对后台服务器而言接收方式是不一样的。一个是每个文件单独接收，一个是直接使用 List 接收即可。造成这样的区别是什么呢？是 input 中的 name="" 的值的原因。**

- **我们知道在 html 中，input 的 name 的值是可以重复的，重复的结果就导致我们应该使用一个集合或数组来接收他们的值。我们又知道，在 multipart/form-data 请求类型的数据体中，每个 name 都是使用分隔符分隔的，既然这样我们与 input 的 name 的数量保持一致就可以了**

#### 三、为什么要对非简单跨域请求做预检？ ####

对于服务器来说：

** 1. 第一，减少非简单跨域请求对服务器的影响。许多服务器压根没打算给跨源用。当然你不给 CORS 响应头，浏览器也不会使用响应结果，但是请求本身可能已经造成了后果，比如PUT、DELETE请求可以直接新建或者修改、删除服务器中的资源。预检请求可以防止该情况发生。所以最好是默认禁止跨源请求。**

** 2. 第二，减少服务器对于是否跨域的计算量。要回答某个请求是否接受跨源，可能涉及额外的计算逻辑。这个逻辑可能很简单，比如一律放行。也可能比较复杂，结果可能取决于哪个资源哪种操作来自哪个 origin。对浏览器来说，就是某个资源是否允许跨源这么简单；对服务器来说，计算成本却可大可小。所以我们希望最好不用每次请求都让服务器劳神计算。**

- 预检请求（CORS-preflight） 就是这样一种机制，浏览器先单独请求一次，询问服务器某个资源是否可以跨源，如果不允许的话就不发实际的请求。**注意先许可再请求等于默认禁止了跨源请求。如果允许的话，浏览器会记住，然后发实际请求，且之后每次就都直接请求而不用再询问服务器否可以跨源了。于是，服务器想支持跨源，就只要针对 preflight 进行跨源许可计算，本身真正的响应代码则完全不管这个事情。**并且因为 preflight 是许可式的，也就是说如果服务器不打算接受跨源，什么事情都不用做。

- 但是这机制只能限于非简单请求。在处理简单请求的时候，如果服务器不打算接受跨源请求，不能依赖 CORS-preflight 机制。因为不通过 CORS，普通表单也能发起简单请求，所以默认禁止跨源是做不到的。既然如此，简单请求发 preflight 就没有意义了，就算发了服务器也省不了后续每次的计算，反而在一开始多了一次 preflight。



#### 四、为什么不对简单的跨域请求做预检？ ####

** 1.一开始就提到，form能实现的简单跨域请求，浏览器做不了任何的限制。**

**2.没必要对简单请求做预检。比如，一些post请求只是想打个日志，并不需要服务器的响应，但是如果加预检请求，预检请求不通过就做不了这件事。还有一些GET请求、HEAD请求只是想获取资源，并不会修改资源，在不获取响应的时候并不会对服务器造成影响。在这种情况下，加预检请求，只会增加服务器的负担**

#### 五、为什么不区分表单跨域简单请求和非表单跨域简单请求？ ####

- 最后，杠精（比如我）就会问了，既然一开始是因为form来区分两者的，那不如就按照表单跨域来区分一下：简单表单跨域请求和简单非表单跨域请求，绕晕了...，对于非表单简单跨域请求实行预检请求，怎么样，是不是完美无缺（微笑）...

- 原因如下：

   1.**这样划分之后，相当于服务器默认允许表单跨域请求。**（如果真的这样做，服务器就变成了默认允许跨源表单，如果想控制跨源，还是得（跟原本一样）直接在响应处理中执行跨源计算逻辑；另一方面服务器又需要增加对 preflight 请求的响应支持，执行类似的跨源计算逻辑以控制来自非表单的相同跨源请求。服务器通常没有区分表单/非表单差异的需求，这样搞纯粹是折腾服务器端工程师。）

   2.**对于其他非表单跨域简单请求进行预检也无必要，他们并不会对服务器造成不可想象的影响，还会麻烦服务器又要进行额外的预检响应。**（比如本来你可以直接用脚本发跨源普通请求，尽管（在服务器默认没有跨源处理的情况下）你无法得到响应结果，但是你的需求可能只是发送无需返回，比如打个日志。但现在如果服务器不理解 preflight 你就干不了这个事情了。）

   3.服务器还要区分表单/非表单跨域请求，弄啥嘞！！



