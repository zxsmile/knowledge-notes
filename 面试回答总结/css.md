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

四、清除浮动

  - 清除浮动主要就是为了解决高度塌陷的问题

  - 方法：

        - 

       
		  
		
		



          