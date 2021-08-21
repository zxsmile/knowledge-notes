# 一、事件

* 事件是文档或者浏览器窗口中发生的，特定的交互瞬间，用户或浏览器自身执行的某种动作，也可以理解为可以被JavaScript侦听到的行为，如click,load和mouseover都是事件的名字

* 事件是javaScript和DOM之间交互的桥梁，事件发生，调用它的处理函数执行相应的JavaScript代码给出响应

# 二、js事件流

事件流：从页面接收事件的顺序也可以理解为事件在页面中传播的顺序

1.两种事件流模型

  (1)捕获型事件流：最不具体的节点先接收事件，由上至下依次传播直至目标节点。(window->document->html->body->div)

  (2)冒泡型事件流：目标节点先接收事件，由下至上依次传播直至window。(div->body->html->document->window)

  注：所有现代浏览器都支持事件冒泡，但在具体实现中略有差别：

        * IE5.5及更早版本中事件冒泡会跳过<html>元素(从body直接跳到document)。

        * IE9、Firefox、Chrome、和Safari则将事件一直冒泡到window对象。

        * IE9、Firefox、Chrome、Opera、和Safari都支持事件捕获。尽管DOM标准要求事件应该从document对象开始传播，但这些浏览器都是从window对象开始捕获事件的。

        * 由于老版本浏览器不支持，很少有人使用事件捕获。建议使用事件冒泡。
    
  注：当两个元素有包含关系并且事件相同时才会触发冒泡和捕获机制

2.DOM事件流

* DOM标准采用捕获+冒泡。两种事件流都会触发DOM的所有对象，从document对象开始，也在document对象结束

* DOM标准规定事件流包括三个阶段：事件捕获阶段,目标事件阶段，事件冒泡阶段

   (1)事件捕获阶段：实际目标（<div>）在捕获阶段不会接收事件。也就是在捕获阶段，事件从document到<html>再到<body>就停止了

   (2)处于目标阶段：事件在<div>上发生并处理。但是事件处理会被看成是冒泡阶段的一部分。

   (3)冒泡阶段：事件又传播回文档

   注：
      
     * 尽管“DOM2级事件”标准规范明确规定事件捕获阶段不会涉及事件目标，但是在IE9、Safari、Chrome、Firefox和Opera9.5及更高版本都会在捕获阶段触发事件对象上的事件。结果，就是有两次机会在目标对象上面操作事件。

         两次机会在目标对象上面操作事件例子：

             <body>
			    <div class='outer'>
			        <div class='inner'>
			            <div class='box'></div>
			        </div>
			    </div>
			    <script>
			      var outer = document.getElementsByClassName('outer')[0];
			      var inner = document.getElementsByClassName('inner')[0];
			      var box = document.getElementsByClassName('box')[0];
			
			      outer.addEventListener('click',function(e){
			          alert('我是捕获阶段的outer')
			      },true)
			
			      outer.addEventListener('click',function(e){
			          alert('我是冒泡阶段的outer')
			      },false)
			
			      inner.addEventListener('click',function(e){
			          alert('我是捕获阶段的inner')
			      },true)
			
			      inner.addEventListener('click',function(e){
			          alert('我是冒泡阶段的inner')
			      },false)
			
			      box.addEventListener('click',function(e){
			          alert('我是捕获阶段的box')
			      },true)
			
			      outer.addEventListener('click',function(e){
			          alert('我是冒泡阶段的box')
			      },false)
			    </script>
		    </body>

         依次弹出"我是捕获阶段的outer"、"我是捕获阶段的inner"、"我是捕获阶段的box"、"我是冒泡阶段的outer"、"我是冒泡阶段的inner"、"我是冒泡阶段的box"

     * 并非所有的事件都会经过冒泡阶段 。所有的事件都要经过捕获阶段和处于目标阶段，但是有些事件会跳过冒泡阶段：如，获得输入焦点的focus事件和失去输入焦点的blur事件。

# 三、事件处理程序(事件侦听器)：响应某个事件的函数。

  (1)html事件处理程序

	  <button onclick="alert('hello')"></button>
	
	  <button onclick="fun()"></button>
	   <script>
	       function fun(){
	           alert('hello')
	       }
	   </script>

  (2)DOM0级事件处理程序

	   <button id='btn'>点击</button>
	   <script>
	       var btn=document.getElementById('btn')
	       btn.onclick=function(){
	           alert('hello')
	       }
	   </script>
	
	   btn.onclick = null;来删除指定的事件处理程序。
   
   使用DOM0级方法指定的事件处理程序被认为是元素的方法，因此，这时候的事件处理程序是在元素作用域中运行。换句话说，程序中的this引用当前元素。
   不支持捕获事件。
   缺点：DOM0级事件处理程序同一个事件不能添加多个，也不能控制事件流是捕获还是冒泡。

  (3)DOM2级事件处理程序

  addEventListener()：添加事件侦听器，接收三个参数:要处理的事件名(不带on前缀才是事件名)，作为事件处理程序的方法，一个布尔值，false表示在冒泡阶段调用事件处理程序，true表示在捕获阶段调用事件处理程序。
  removeEventListener()：删除事件侦听器，接收三个参数，和需要移除的事件侦听器的addEventListener参数保持一致。

	  <button id='btn'>点击</button>
	   <script>
	       var btn=document.getElementById('btn')
		   btn.addEventListener('click',hello，false);
		   btn.addEventListener('click',helloagain，false);
		   function hello(){
		    alert("hello");
		   }
		   function helloagain(){
		    alert("hello again");
	      }
	   </script>
  
  同时支持冒泡事件和捕获事件，先捕获再冒泡，可以指定在那个阶段响应
  利用addEventListener方法添加事件侦听器，同一个事件可以添加多个事件侦听器，但是事件侦听器的方法名称不能一样，会发生覆盖。
  如果同一个监听事件分别为"事件捕获"和"事件冒泡"注册了一次，一共两次，这两次事件需要分别移除。两者不会互相干扰。
  事件触发的顺序是按照添加它们的顺序。
  
  (4)IE事件处理程序

  attachEvent():添加事件侦听器
  detachEvent():删除事件侦听器
  它们都接收两个参数：
      事件处理程序名称。如onclick、onmouseover，注意：这里不是事件，而是事件处理程序的名称，所以有on。
      事件处理程序函数。
  之所以没有和DOM2级事件处理程序中类似的第三个参数，是因为IE8及更早版本只支持冒泡事件流。

	 <button id='btn'>点击</button>
	   <script>
	       var btn=document.getElementById('btn')
		   btn.attachEvent('click',hello，false);
		   btn.attachEvent('click',helloagain，false);
		   function hello(){
		    alert("hello");
		   }
		   function helloagain(){
		    alert("hello again");
	      }
	   </script>

  attachEvent方法有个缺点，this的值会变成window对象的引用，而不是触发元素的引用。
  事件触发的顺序是按照添加它们的相反顺序。

# 四、事件流的典型应用事件委托

* 事件委托（delegate）也称为事件托管或事件代理

* 统的事件处理中，需要为每个元素添加事件处理器。js事件委托则是一种简单有效的技巧，通过它可以把事件处理器添加到一个父级元素上，从而避免把事件处理器添加到多个子级元素上

1.事件委托

事件委托的原理用到的就是事件冒泡和目标元素，把事件处理器添加到父元素，等待子元素事件冒泡，并且父元素能够通过target（IE为srcElement）判断是哪个子元素，从而做相应处理

	如：

		<body>
			<ul id="color-list">
			<li>red</li>
			<li>orange</li>
			<li>yellow</li>
			<li>green</li>
			<li>blue</li>
			<li>indigo</li>
			<li>purple</li>
			</ul>
			<script>
				(function(){
				    var colorList=document.getElementById("color-list");
				    colorList.addEventListener('click',showColor,false);
				    function showColor(e)
				    {
				        e=e||window.event;
				        var targetElement=e.target||e.srcElement;
				        if(targetElement.nodeName.toLowerCase()==="li"){
				        alert(targetElement.innerHTML);
				        }
				    }
				})();
			</script>
		</body>

2.事件委托的好处

(1)将多个事件处理器减少到一个，因为事件处理器要驻留内存，这样就提高了性能

(2)DOM更新无需重新绑定事件处理器，因为事件代理对不同子元素可采用不同处理方法。如果新增其他子元素（a,span,div等），直接修改事件代理的事件处理函数即可，不需要重新绑定处理器，不需要再次循环遍历


3.事件代理的问题

 代码如下：事件代理同时绑定了li和span，当点击span的时候，li和span都会冒泡

	<li><span>li中的span的内容</span></li>
	
	<script>
	    $(document).on('click', 'li', function(e){
	        alert('li li');
	    });
	
	    $(document).on('click', 'span', function(e){
	        alert('li span');
	    })
	</script>

 解决办法：

   (1)span的事件处理程序中阻止冒泡

       $(document).on('click', 'span', function(e){
	        alert('li span');
	        e.stopPropagation();
	    })

   (2)li的事件处理程序中检测target元素

       $(document).on('click', 'li', function (e) {
	        if (e.target.nodeName == 'SPAN') {
	            e.stopPropagation();
	            return;
	        }
	        alert('li li');
	    });
		




