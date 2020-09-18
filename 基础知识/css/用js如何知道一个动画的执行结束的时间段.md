1.CSS3动画执行起来平滑且快速，但不像JavaScript动画，你可以一帧一帧控制。幸运的是，你可以在任何一个元素上使用事件处理来决定动画的状态。同时它支持连续播放不同动画这种细粒度的控制

	如：<style>
	        .block{
	            width:100px;
	            height:100px;
	            border-radius: 50%;
	            background: linear-gradient(180deg,pink,deepskyblue);
	            margin: 0 auto;
	            animation: tanqiu 2s ease-in infinite alternate;
	        }
	        
	        @keyframes tanqiu {
	            10%{
	                margin-top:600px;
	            }
	            40%{
	                margin-top:300px;
	            }
	            50%{
	                margin-top:600px;
	            }
	            60%{
	                margin-top:450px;
	            }
	            70%{
	                margin-top:600px;
	            }
	            80%{
	                margin-top:550px;
	            }
	            90%{
	                margin-top:600px;
	            }
	        }
	    </style>

		<body>
		    <div class="block" id='anim'></div>
		    <script>
		         var anim = document.getElementById("anim");
		         anim.addEventListener("animationstart", function(e){
		             console.log('sss')
		         }, false);
		    </script>
		</body>

	上述动画将用在id=anim的div上

一、animation动画

1.动画运行时会触发三种类型的事件：

(1)animationstart

	var anim = document.getElementById("anim");
	anim.addEventListener("animationstart", AnimationListener, false);

动画第一次启动时，animationstart 事件触发

(2)animationiteration

	var anim = document.getElementById("anim");
	anim.addEventListener("animationiteration", AnimationListener, false);

animationinteration事件会在每一次新的动画执行过程中被触发，即除了第一次之外的每一个迭代过程

(3)animationend

	var anim = document.getElementById("anim");
	anim.addEventListener("animationend", AnimationListener, false);

animationend事件会在动画结束时被触发

不同浏览器的AnimationEnd写法 (webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend)

2.事件对象

每当动画事件发生时，都会调用AnimationListener函数。事件对象作为单个参数传递。除了标准的属性和方法外，还提供：

    * animationName：CSS3动画名称（即flash）
    * elapsedTime：动画开始后以秒为单位的时间

二、transition动画

1.transitionend事件

* transitionend事件在CSS transition完成的时候触发。如果transition在完成前被删除（例如remove掉transition属性），则不会触发。如在transition完成前设置 display: none，或CSS未作改变，事件同样不会被触发

* transitionend 事件是双向触发的 - 当完成到转换状态的过渡，以及完全恢复到默认或非转换状态时都会触发。 如果没有过渡延迟或持续时间，即两者的值都为0s或者都未声明， 则不发生过渡，并且任何过渡事件都不会触发

* 不同浏览器写法：(transitionend,oTransitionEnd,MozTransitionEnd,webkitTransitionEnd)

2.使用transitionend事件的缺点

(1)如果操作多属性CSS，假设padding，transitionend会在padding-top，padding-right，padding-bottom，padding-left过渡结束时均触发transitionend事件，transitionend事件将执行 4 次！

(2)如果子元素也有transition的话，transitionend事件会冒泡。需要阻止冒泡。

(3)如果是重复的执行transition，需要解绑

* 上述第一条'多属性'与'重复的执行'transition属性不同，'多属性'指一条属性附带多个属性，如border、margin、padding等，'重复的执行'指transition属性有多条属性需要过度，如操作一个div同一时间过度'color、width、height、background'时

* hover将触发两次transition,也将触发两次transitionend(transitionend 事件是双向触发的)