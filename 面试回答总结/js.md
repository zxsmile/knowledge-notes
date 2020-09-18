一、null是对象吗？为什么？

答案：不是，typeof null='object'为什么他不是一个对象呢，其实这是JavaScript的一个BUG，编程语言最后的形式都是二进制，所以JavaScript中的对象在底层也是以二进制表示的。如果底层有前三位都等于0的二进制，就会被判定为对象，而null在底层中的二进制表示是全零，所以在对 null 的类型判定时，发现其二进制前三位都是零，因此判定为 object。

二、0.1+0.2=0.3？

答案：不等于，因为计算机在底层是以二进制形式表示的，由于0.1转换成二进制表示时是无限循环的，由于标准位数的限制后面多余的位数会被截掉，此时就已经出现了精度的损失，相加后因浮点数小数位的限制而截断的二进制数字在转换为十进制就会变成0.30000000000000004。

解决办法：es6提供了Number.EPSILON，这个值等于2^-52，这个值非常非常小，在底层计算机已经帮我们运算好，并且无限接近0，但不等于0，这个时候我们只要判断误差值在这个范围内就可以说明是相等的。

function numbersequal(a,b){

return Math.abs(a-b)<Number.EPSILON;

}

0.1+0.1为什么等于0.2？ 因为两个有相同

二进制可以精确的表示位数有限且分母是2的倍数的小数，比如0.5+0.5=1，因为0.5表示成分数是1/2，分母是2的倍数

三、js事件流

 1.事件流

   - js事件流就是指，元素触发事件时，事件在页面中的传播过程。它一共分为三个阶段，捕获阶段、处于目标阶段和冒泡阶段。捕获阶段就是由最不具体的节点先接收事件，由上至下依次传播直至目标节
点。冒泡阶段就是目标节点先接收事件，由下至上依次传播直至window。

   - 默认情况下，事件使用冒泡事件流，不使用捕获事件流。addEventListener方法可以显式的指定事件是使用捕获事件流还是冒泡事件流。addEventListener事件接受三个参数，第一个事件名称，第二个是作为事件处理程序的函数，第三个为一个布尔值，true表示捕获阶段，false表示冒泡阶段（btn.addEventListener('click',handler,false)）。addEventListener是DOM2级事件，与DOM0级事件（btn.onclick)不同的是同一事件（如click)它可以添加多个事件处理程序,执行顺序按照添加时的顺序。与之对应的移除事件处理程序的方法是removeEventListener,接收的参数和添加事件处理程序时的参数是相同的，所以这也意味着，添加的匿名事件处理程序函数将无法移除。DOM0级移除（btn.onclick=null）。

   - IE实现了和DOM中类似的两个方法attachEvent和detachEvent,这两个方法接收相同的两个参数，事件名称(注意是onclick)和事件处理程序函数（btn.attachEvent('onclick',handler)）。由于IE8及更早的版本只支持事件冒泡，所以通过attachEvent添加的事件都会被添加到冒泡阶段。attachEvent和addEventListener一样都可以为同一个元素添加相同的事件，不过它俩不同的是，attachEvent添加的事件处理程序不是以添加的顺序执行的，而是以相反的顺序执行的。


   - IE中的attachEvent和DOM中的方法的只要区别还在于，事件处理程序的作用域不同，使用DOM级方法的情况下，事件处理程序会在其所属元素的作用域运行，this执行该元素。使用attachEvent情况下，事件处理程序会在全局作用域中运行，因此this等于window

 2.事件委托（事件代理）

    - 事件委托就是利用了事件冒泡，把事件处理器添加到父元素，等待子元素事件冒泡，并且父元素能够通过target（IE为srcElement）判断是哪个子元素，从而做相应处理。事件委托的好处就是将多个事件处理器减少到一个，因为事件处理器要驻留内存，这样就提高了性能。DOM更新无需重新绑定事件处理器，因为事件代理对不同子元素可采用不同处理方法。如果新增其他子元素（a,span,div等），直接修改事件代理的事件处理函数即可，不需要重新绑定处理器，不需要再次循环遍历

 
 3.阻止冒泡和默认行为

    event.preventDefault可以阻止默认行为但不阻止冒泡
    event.stoppropagation 可以阻止冒泡但不阻止默认行为
    return false 可以阻止默认行为但不阻止冒泡

四、节流和防抖

  1.节流

     - 节流就是指一定时间内只执行一次事件处理函数。
     - 原理就是通过判断是否到达规定时间来触发函数。
     - 应用场景：鼠标不断点击，监听滚动事件，比如是否滑到底自动加载更多

        var throttle = function(fn,delay){
             var timer = null
             var startTime = new Date()

             return function(){
              var curTime = new Date()
              var remaining = dalay-(curTime - startTime)
              var context = this
              var arg = arguments
              clearTimeout(timer)
              if(remaining<=0){
                  fn.apply(context,arg)
                  startTime = Date.now()
              }else{
                 timer = setTimeout(fn,demaining)
              }
            }
 
        }

      var handler = function(){
         console.log('666')
      }

     window.addEventListener('scroll',handler,false)

在节流函数内部使用开始时间startTime、当前时间curTime与delay来计算剩余时间remaining，当remaining<=0时表示该执行事件处理函数了（保证了第一次触发事件就能立即执行事件处理函数和每隔delay时间执行一次事件处理函数）。如果还没到时间的话就设定在remaining时间后再触发 （保证了最后一次触发事件后还能再执行一次事件处理函数）。当然在remaining这段时间中如果又一次触发事件，那么会取消当前的计时器，并重新计算一个remaining来判断当前状态


2.防抖

   - 持续触发事件时，一定时间段内没有再次触发事件，时间处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时
   - 应用场景:search搜索联想，用户在不断输入值时，用防抖来节约请求资源

      function debounce(fn, delay){
	  
	     var time = null
	
	     return function(){
	         if(time!==null){
	           clearTimeout(time)
	        }
	        
	       time = setTimeout(fn,delay)
	        
	     }
	}

	
	function handle(){
	    console.log('666')
	}

	window.addEventListener('scroll', debounce(handle, 1000));

三、token认证(https://www.cnblogs.com/moyand/p/9047978.html)

  - 浏览器请求服务器的时候，服务器将浏览器的信息和一个只有服务器知道的密钥一起使用算法生成一个签名，然后将这个签名和浏览器的信息一起作为一个token给浏览器，浏览器将它存储（cookie或者localstroage）起来，以后每次请求服务器都要带着这个token，然后服务器会验证这个token是否正确来决定是否要可以访问




   

