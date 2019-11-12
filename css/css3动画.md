CSS3中有三个关于动画的样式属性transform、transition和animation

一、transform

* transform可以用来设置元素的形状改变，主要有以下几种变形：rotate（旋转）、scale（缩放）、skew（扭曲）、translate（移动）和matrix（矩阵变形）

* 语法：

.transform-class {

   transform ： none | <transform-function>
}

none表示不做变换；<transform-function>表示一个或多个变化函数，变化函数由函数名和参数组成，参数包含在()里面，用空格分开

	
    如：.transform-class {
	    
          transform ： rotate(30deg) scale(2,3);
	   }

(1)transform-origin基点

* transform-origin是变形原点，也就是该元素围绕着那个点变形或旋转，该属性只有在设置了transform属性的时候起作用

* 因为我们元素默认基点就是其中心位置，换句话说我们没有使用transform-origin改变元素基点位置的情况下，transform进行的rotate,translate,scale,skew,matrix等操作都是以元素自己中心位置进行变化的。

* 使用规则:

      * transform-origin(X,Y):用来设置元素的运动的基点（参照点）。默认点是元素的中心点。其中X和Y的值可以是百分值,em,px，其中X也可以是字符参数值left,center,right；Y和X一样除了百分值外还可以设置字符值top,center,bottom

      * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%而top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%;如果只取一个值，表示垂直方向值不变

          * top left | left top 等价于 0 0
          * top | top center | center top 等价于 50% 0
          * right top | top right 等价于 100% 0
          * left | left center | center left 等价于 0 50%
          * center | center center 等价于 50% 50%（默认值）
          * right | right center | center right 等价于 100% 50%
          * bottom left | left bottom 等价于 0 100%
          * bottom | bottom center | center bottom 等价于 50% 100%
          * bottom right | right bottom 等价于 100% 100%

* transform-origin并不是transform中的属性值，他具有自己的语法,但是他要结合transform才能起作用

(2)rotate 旋转

* 表示通过指定的角度对元素进行旋转变形，如果是正数则顺时针旋转，如果是负数则逆时针旋转

* 用法：

      * rotate(<angle>)

		如：.transform-rotate {
			    transform: rotate(30deg);
			}

(3)scale 缩放

* 它有三种用法：

      * scale(<number>[, <number>]):代表水平和垂直方向同时缩放
      * scaleX(<number>):水平方向的缩放
      * scaleY(<number>):垂直方向的缩放

* 入参代表水平或者垂直方向的缩放比例。缩放比例如果大于1则放大，反之则缩小，如果等于1代表原始大小

	如：.transform-scale {
		    transform: scale(2,1.5);
		}
		
		.transform-scaleX {
		    transform: scaleX(2);
		}
		
		.transform-scaleY {
		    transform: scaleY(1.5);
		}


(4)translate 移动

* 移动也分三种情况：

      * translate(<translation-value>[, <translation-value>]):代表水平和垂直的移动
      * translateX(<translation-value>):水平方向的移动
      * translateY(<translation-value>):垂直的移动

* 移动单位是 CSS 中的长度单位：px、rem等;

	如：.transform-translate {
		    transform: translate(400px, 20px);
		}
		
		.transform-translateX {
		    transform: translateX(300px);
		}
		
		.transform-translateY {
		    transform: translateY(20px);
		}

(5)skew 扭曲

* 扭曲同样也有三种情况:

      * skew(<angle>[, <angle>]):水平和垂直方向同时扭曲
      * skewX(<angle>):水平方向的扭曲
      * skewY(<angle>):垂直方向的扭曲
     
* 单位为角度

	如：.transform-skew {
		    transform: skew(30deg, 10deg);
		}
		
		.transform-skewX {
		    transform: skewX(30deg);
		}
		
		.transform-skewY {
		    transform: skewY(10deg);
		}
	
(6)matrix 矩阵变换

* x和y是元素初始的坐标，x' 和y'则是通过矩阵变换后得到新的坐标。通过中间的那个3×3的变换矩阵，对原先的坐标施加变换，就能得到新的坐标了。依据矩阵变换规则即可得到： x'=ax+cy+e,y'=bx+dy+f

* 用法：

      *  matrix(a,b,c,d,e,f) 
      *  对应的矩阵:

            a,c,e
            b,d,f
            0,0,1

     * 2D的转换是由一个3*3的矩阵表示的，前两行代表转换的值，分别是 a b c d e f ，要注意是竖着排的，第一行代表的是X轴变化，第二行代表的是Y轴的变化，第三行代表的是Z轴的变化，2D不涉及到Z轴，这里使用 0 0 1
        
	如：.transform-skew {
		   transform: matrix(1,0,0,1,100,100);
	  }

* transform中translate，scale，rotate，skew背后实现原理也对应着matrix变化

https://www.tuicool.com/articles/na6jy2

二、transition

* transition是用来设置样式的属性值是如何从从一种状态变平滑过渡到另外一种状态

* 它有四个属性：

      * transition-property（变换的属性，即那种形式的变换：大小、位置、扭曲等）
      * transition-duration（变换延续的时间）
      * transition-timing-function（变换的速率）
      * transition-delay（变换的延时）

1.属性讲解

(1)transition-property

* 它是用来设置哪些属性的改变会有这种平滑过渡的效果

* 主要有以下的值:

      * none
      * all
      * 元素属性名：

            * color
            * length
            * visibility
            * ...
* 语法：

 .transition-property {
   transition-property ： none | all | 属性
 } 

	如：.transition-property {
		   transition-property： height
		 }
	  

(2)transition-duration

* 它是用来设置转换过程的持续时间，单位是s或者ms，默认值为0

* 始终设置 transition-duration属性，否则时长为 0，就不会产生过渡效果

* 语法:

.transition-duration {
   transition-duration ： <time> 
}

	如：.transition-duration {
		    transition-duration: 1s
		}


(3)transition-timing-function

* 它是来设置过渡效果的速率

* 它有6种形式的速率:

      * ase：逐渐变慢（默认），等同于贝塞尔曲线(0.25, 0.1, 0.25, 1.0)
      * linear：匀速，等同于贝塞尔曲线(0.0, 0.0, 1.0, 1.0)
      * ease-in：加速，等同于贝塞尔曲线(0.42, 0, 1.0, 1.0)
      * ease-out：减速，等同于贝塞尔曲线(0, 0, 0.58, 1.0)
      * ease-in-out：先加速后减速，等同于贝塞尔曲线(0.42, 0, 0.58, 1.0)
      * cubic-bezier：自定义贝塞尔曲线

* 贝塞尔曲线

    * 语法为：cubic-bezier (x1,y1,x2,y2)
    
    * 其中起始点固定值为A(0,0),终止点固定为D(1,1)剩下的中间点B(x1,y1),C(x2,y2)也就是所要动态操控的两个点了,对应cubic-bezier (x1,y1,x2,y2)中的四个参数,通过改变B,C两点的坐标值来动态生成一条贝塞尔曲线表示动画中的速度变化
 
* 用法：

.transition-timing {
   transition-timing-function ： ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>);
}

	如：.transition-timing {
		    transition-timing-function ： ease 
		}
	        

(3)transition-delay

* 它是来设置过渡动画何时开始，单位是s或者ms，默认值为0

* 用法：

.transition-delay {
   transition-delay ： <time> 
}

	如：.transition-delay {
		    transition-delay ：1s
		}


(5)全部简写

.transition {
   transition ：<property> <duration> <timing function> <delay>;
}

 
	如：transition: height 1s ease 1s


2.总结

* 不是所有的CSS属性都支持transition
 
* transition需要明确知道，开始状态和结束状态的具体数值，才能计算出中间状态。比如，height从0px变化到100px，transition可以算出中间状态。但是，transition没法算出0px到auto的中间状态，也就是说，如果开始或结束的设置是height: auto，那么就不会产生动画效果。类似的情况还有，display: none到block，background: url(foo.jpg)到url(bar.jpg)等等

* transition需要事件触发，所以没法在网页加载时自动发生

* transition是一次性的，不能重复发生，除非一再触发


三、animation

* animation比较类似于 flash 中的逐帧动画，逐帧动画就像电影的播放一样，表现非常细腻并且有非常大的灵活性

* 用法：

    * 利用@keyframes声明一个关键帧组
    * 在animation属性中调用上述声明的的关键帧组，来实现动画

1.@keyframes

	@keyframes animationName {
	    from {
	        properties: value;
	    }
	    percentage {
	        properties: value;
	    }
	    to {
	        properties: value;
	    }
	}

	//or

	@keyframes animationName {
	    0% {
	        properties: value;
	    }
	    percentage {
	        properties: value;
	    }
	    100% {
	        properties: value;
	    }
	}
	


* animationName：动画名称，开发人员自己命名；
* percentage：为百分比值，可以添加多个百分比值；
* properties：样式属性名称，例如：color、left、width等等。

	   
2.animation

(1)animation-name

* 它是用来设置动画的名称，可以同时赋值多个动画名称，用,隔开

* 用法：

.animation {
   animation-name: none | name;
}


(2)animation-duration

* 它是用来设置动画的持续时间，单位为s，默认值为0：

* 用法：

.animation {
   animation-duration: <time>;
}


(3)animation-timing-function

* 和transition-timing-function

* 用法：

.animation {
   animation-timing-function:ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>);
}


(4)animation-delay

* 它是来设置动画的开始时间，单位是s或者ms，默认值为0

* 用法：

.animation {
   animation-delay: <time>;
}


(5)animation-iteration-count

* 它是来设置动画循环的次数，默认为1，infinite为无限次数的循环

* 用法：

.animation {
   animation-iteration-count:infinite | <number> ;
}


(6)animation-direction

* 它是来设置动画播放的方向，默认值为normal表示向前播放，alternate代表动画播放在第偶数次向前播放，第奇数次向反方向播放：

* 用法：

.animation {
   animation-direction: normal | alternate [, normal | alternate]*;
}


(7)animation-play-state

* 它主要是来控制动画的播放状态：running代表播放，而paused代表停止播放，running为默认值

* 用法：

.animation {
   animation-play-state:running | paused ;
}

(7)animation简写

它是animation-name、animation-duration、animation-timing-function、animation-delay、animation-iteration-count、animation-direction的简写：

.animation {
   animation:[<animation-name> || <animation-duration> || <animation-timing-function> || <animation-delay> || <animation-iteration-count> || <animation-direction>];
}



四、总结

关于 CSS3 的动画的三个属性transform、transition、animation我们都介绍完了，让我们回顾一下。transform我们可以理解为元素的几何变形，它是有规律可寻的，这种变形并不会产生动画效果仅仅是原有形状的改变；transition和animation它们很像 flash 中的补间动画和逐帧动画；transition是从一个状态变化到另外一种状态，当变化有了平滑的效果后就产生了动画，它是一个公式化的变化，在比较规则的动画效果中我们可以使用，例如：旋转的风车、行驶的汽车、颜色的渐变等等；animation的动画效果更加灵活，可以实现像影片一样的复杂无规则的动画。

