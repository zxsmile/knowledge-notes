一、发生的条件

* 首先，会发生margin重叠和塌陷的肯定是普通文档流中同一个BFC内的块级元素，例如div、ul等，不是块级元素不会发生重叠。（内联元素是不能设置高、行高、内外边距的，而且内联元素只能容纳文本或者其他内联元素。），也就是说普通文档流中属于同一个BFC的两个相邻块级元素的margin会发生重叠

* 只发生在垂直方向上

二、margin塌陷

1.原理

普通文档流中父子块级元素，如果父元素没有设置上内边距或上边框，子元素的上边距就会和父元素的上边距重合，以他们两个中间最大上边距为准，与距离他们最近的盒子隔开

2.案例

	如：<style>
	
	        body{
	            margin:0;
	            padding:0;
	        }
	       .father{
	           width:200px;
	           height:200px;
	           background-color: aqua;
	           margin-top:20px;
	       }
	
	       .son{
	           width:100px;
	           height:100px;
	           background-color: red;
	           margin-top:40px;
	       }
	   </style>
	
		<body>
		    
		    <div class='father'>
		       <div class='son'></div>
		    </div>
		
		</body>

father和son的上边距重合，值取决于它们俩中上边距的最大值，当两个的margin-top都为20px的时候，一起向下一20px,将子元素的margin-top修改为40px，父元素和子元素一起向下移20px

3.解决方法

(1)给父元素设置内边距或者边框(改变结构了，不建议使用)

(2)触发bfc，改变父元素的渲染规则

* 解决原理：

     * 使用BFC的特性来将父级元素设置为一个独立的BFC，子级元素的margin值就不会溢出父级，而是将父级作为一个独立区域去计算margin值

* bfc的三个特性：
 
     * 阻止外边距折叠
     * 可以包含浮动的元素
     * 可以阻止元素被浮动元素覆盖

* 开启bfc:

     * 浮动元素：float 除 none 以外的值
     * 绝对定位元素：position (absolute、fixed)
     * display 为 inline-block、table-cells、flex
     * overflow 除了 visible 以外的值 (hidden、auto、scroll)

三、margin重叠

1.原理

* 垂直相邻的普通元素margin，不是两者相加之和，而是取最大值，这个现象叫做margin重叠

* 假设有一个空元素，它有外边距，但是没有边框或填充。在这种情况下，上外边距与下外边距就碰到了一起，它们会发生合并。如果这个外边距遇到另一个元素的外边距，它还会发生合并

* 普通元素才会发生margin重叠，如果是float元素，就不会发生，margin是两者相加之和

2.折叠规则

* 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值

* 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值

* 两个外边距一正一负时，折叠结果是两者的相加的和


3.案例

	如：<style>
	
	        body{
	            margin:0;
	            padding:0;
	        }
	       .father{
	           width:200px;
	           height:200px;
	           background-color: aqua;
	           margin-bottom:20px;
	       }
	
	       .son{
	           width:100px;
	           height:100px;
	           background-color: red;
	           margin-top:50px;
	       }
	   </style>
	
		<body>
		    
		    <div class='father'><div>
		    <div class='son'></div>
		
		</body>


两盒子之间的距离仅是50px，两盒子之间的margin出现了重叠部分

4.外边距重叠的意义

外边距的重叠只产生在普通流文档的上下外边距之间，这个看起来有点奇怪的规则，其实有其现实意义。设想，当我们上下排列一系列规则的块级元素（如段落P）时，那么块元素之间因为外边距重叠的存在，段落之间就不会产生双倍的距离。

5.解决办法

(1)推荐也是常用的:如果要上下间距为40px,只需要son盒子上边距设为40px,father盒子不用设下边距，这样就可以了，意思是不需要强行解决这个bug,只需要将一边的边距设为两个盒子边距的和就可以了

(2) 不推荐也是不常用的（这样会改变html结构）：在son和father盒子外面在加一个盒子，让这个加的外层盒子的渲染规则改为BFC

      * 解决原理：利用BFC阻止margin溢出，我们可以将两个div套上一个BFC的外壳，这样两个BFC的内部元素就不会互相影响了





