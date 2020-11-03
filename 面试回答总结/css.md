一、BFC（块级格式化上下文）

 - 我们看到的页面是由一个一个的盒子组成的，元素的类型和display属性决定了这个盒子的类型，不同类型的盒子会参与不同的格式化上下文。格式化上下文就是页面中一块独立的渲染区域，并且有一套自己的渲染规则，它规定了其内部的子元素如何布局，而BFC就是display属性为block（此元素将显示为块级），list-item（此元素将显示为列表），table（此元素会作为块级表格来显示）的元素参与的格式化上下文，直译为块级格式化上下文。
 - 它的布局规则是：
       - 内部的盒子会在垂直方向上一个接一个的排列
       - 盒子垂直方向上的距离由margin决定，属于同一个BFC的相邻的两个盒子的margin会发生重叠
       - 对于从左往右的格式来说，盒子的左外边缘（margin-left）会触碰到容器的左边缘（border-left）
       - BFC区域和浮动区域不会重叠（自适应两栏布局）
       - BFC区域就是页面中的一块独立的区域，容器里面的子元素不会影响到外面的元素
       - 计算BFC时浮动元素也会参与计算（解决高度塌陷）        

 - 开启BFC:
       
       - 根元素（html）
       - float属性不为none
       - position属性为absolute,fixed
       - overflow属性不为visible
       - display属性为inline-block,table-cell,table-caption,flex,inline-flex

 - 应用

    - 解决高度塌陷

         - 高度塌陷是由于父元素没有设置高度，高度是由子元素撑起来的，当子元素设置了浮动脱离文档流之后，父元素就会塌陷，这时候我们可以给父元素开启BFC,因为计算BFC时父元素也会参与计算，所以就解决了父元素的高度塌陷问题

    - 实现自适应两栏布局BFC

         - 设置两个div，第一个div宽度固定，设置左浮动，第二个div就会自动填满剩余的宽度，正常情况下，第一个div会覆盖一部分第二个div。这时候我们可以给第二个div开启BFC，由于BFC和浮动元素不会重叠，这样就实现了两栏布局

    - 解决margin重叠

         - 由于属于同一个BFC相邻的两个块级元素会发生margin重叠，所以我们可以给其中一个盒子包一层div，然后激活它的BFC，这样它俩就不属于同一个BFC了，就不会margin重叠了


二、块级元素和行内元素

   1. 块级元素（display:block）
     
      - 总是从新行开始，独占一行
      - 高度，宽度，内边距，外边距都可控制
      - 如果没有设置宽度，默认为父元素的100%
      - 它可以容纳行内元素和其他块级元素

   2. 行内元素（diplay:inline）

      - 和其他元素都在一行上
      - 宽度就是它的文字或图片的宽度，不可改变
      - height无效(可以设置inline-height)，margin上下无效，padding上下无效
      - 内联元素只能容纳文本或者其他内联元素
  
   3. 行内块元素

       - 当设置display属性为inline-block时，该元素就是行内块元素，既具有 block 元素可以设置宽高的特性，同时又具有 inline 元素默认不换行的特性。当然不仅仅是这些特性，比如 inline-block 元素也可以设置 vertical-align（因为这个垂直对齐属性只对设置了inline-block的元素有效） 属性。
       - 属于行内块的元素：input img


   4. 消除元素间隙

      - 行内元素和行内块元素都是排列在一行的，但是元素之间会有一个空隙，该空隙是由于HTML中的换行符、空格符、制表符等合并为空白符，字体大小不为 0 的情况下，空白符自然占据一定的宽度，使元素间产生了空隙

      - 消除空隙
		(1)
		
			<div class="space">
			    <a href="##">
			    惆怅</a><a href="##">
			    淡定</a><a href="##">
			    热血</a>
			</div>
		
			<div class="space">
			    <a href="##">惆怅</a
			    ><a href="##">淡定</a
			    ><a href="##">热血</a>
			</div>
		
			<div class="space">
			    <a href="##">惆怅</a><!--
			    --><a href="##">淡定</a><!--
			    --><a href="##">热血</a>
			</div>
		
		(2)margin负边距
		
			如：.space a {
				    display: inline-block;
				    margin-right: -3px;
				}
		
		margin负值的大小与上下文的字体和文字大小相关
		
		(3)去掉闭标签
		
			   <div class="space">
			        <a href="##">惆怅
			        <a href="##">淡定
			        <a href="##">热血</a>
			    </div>
		
		在html5中最后一个标签也可以省略
		
			   <div class="space">
			        <a href="##">惆怅
			        <a href="##">淡定
			        <a href="##">热血
			    </div>
		
		(5)font-size:0
		
		      .space{
		            font-size:0;
		        }
		
			 .space a {
		            display: inline-block;
		            padding: .5em 1em;
		            background-color: #cad5eb;
		            font-size: 12px;
		        }
		
		       
		(6)letter-spacing(字符间距)
		
				.space a {
		            display: inline-block;
		            padding: .5em 1em;
		            background-color: #cad5eb;
		            font-size: 12px;
		        }
		
		        .space {
		            letter-spacing: -3px;
		        }
		        .space a {
		            letter-spacing: 0;
		        }
		
		(7)word-spacing(单词间距)
		
				.space a {
				            display: inline-block;
				            padding: .5em 1em;
				            background-color: #cad5eb;
				            font-size: 12px;
				        }
				
				.space {
				    word-spacing: -6px;
				}
				.space a {
				    word-spacing: 0;
				}

四、清除浮动（https://blog.csdn.net/u012207345/article/details/78279961）

  - 清除浮动的方法主要分为两类，一类是使用clear属性，一类是使用BFC
  - clear属性只能影响使用该属性的元素本身，不能影响其他元素。clear属性规定元素盒子的边不能和浮动元素相邻，所以我们使用clear清除浮动的原理就是，在父元素的最后加一个具有clear属性的块级元素，由于该块级元素不能和浮动元素相邻，而浮动元素的位置我们已经确定了，所以为了满足该元素的需求，将该元素渲染在了浮动元素的下面，由于该元素在父元素的边界内，所以父元素必须增加高度将它包含在内，这样就达到了清除浮动的目的
  - BFC原理是由于开启了BFC的元素在计算其高度时，是要包含浮动元素的，所以给父元素开启BFC就能清除浮动

五、css3动画

  - css动画主要有transform，translation，animation。transform可以理解为元素的几何变形，它不会产生动画效果。translation和animation都可以实现过渡动画，不同的是translation只能定义开始状态和结束状态，不能定义中间状态，并且translation动画是需要事件触发的（：hover,:focus,js触发），不能在网页加载时自动执行，并且动画是不能循环的。

六、box-sizing

  - box-sizing 是用于告诉浏览器如何计算一个元素是总宽度和总高度
  - 标准盒模型 box-sizing: content-box

       - width = content width
       - height = content height

  - IE盒模型 box-sizing: border-box

       - width = border + padding + content width
       - heigth = border + padding + content heigth





       
		  
		
		



          