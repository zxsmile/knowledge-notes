一、js事件流

1.事件：指可以被JavaScript侦听到的行为。
2.事件流：从页面接收事件的顺序也可以理解为事件在页面中传播的顺序。
  (1)捕获：最不具体的节点先接收事件，由上至下依次传播直至目标节点。(window->document->html->body->div)
  (2)冒泡：目标节点先接收事件，由下至上依次传播直至window。(div->body->html->document->window)
  (3)DOM2级事件规定的事件流包括三个阶段：
     事件捕获阶段,目标事件阶段，事件冒泡阶段
3.事件处理程序(事件侦听器)：响应某个事件的函数。
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

   缺点：DOM0级事件处理程序同一个事件不能添加多个，也不能控制事件流是捕获还是冒泡。

  (3)DOM2级事件处理程序

  addEventListener()：添加事件侦听器，接收三个参数:要处理的事件名(不带on前缀才是事件名)，作为事件处理程序的方法，一个布尔值，false表示冒泡机制，true表示捕获机制。
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

  利用addEventListener方法添加事件侦听器，同一个事件可以添加多个事件侦听器，但是事件侦听器的方法名称不能一样，会发生覆盖。
  如果同一个监听事件分别为"事件捕获"和"事件冒泡"注册了一次，一共两次，这两次事件需要分别移除。两者不会互相干扰。
  事件触发的顺序是添加的顺序。
  
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