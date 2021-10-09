#### 一、SVG ####

- SVG叫可伸缩的矢量图形，它是基于XML格式的，特点是不管放大多少倍都不会失真。 svg绘图时，每个图形都是以DOM节点的形式插入到页面中的，我们可以通过js来直接操作这些图形，所以支持事件处理器

1. 圆形

		<svg width="300" height="180">
		  <circle cx="30"  cy="50" r="25" />
		  <circle cx="90"  cy="50" r="25" class="red" />
		  <circle cx="150" cy="50" r="25" class="fancy" />
		</svg>
		
		.fancy {
		  fill: none;
		  stroke: black;
		  stroke-width: 3pt;
		}

- cx,cy,r表示圆心横纵坐标，半径。fill填充色，stroke描边色，stroke-width描边宽度。

2. 直线

		<svg width="300" height="180">
		  <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0,0,0);stroke-width:5" />
		</svg>

3. <polyline>标签绘制一根折线

		<svg width="300" height="180">
		  <polyline points="3,3 30,28 3,53" fill="none" stroke="black" />
		</svg>

4. <polygon>标签用于绘制多边形

		<svg width="300" height="180">
		  <polygon fill="green" stroke="orange" stroke-width="1" points="0,0 100,0 100,100 0,100 0,0"/>
		</svg>

#### 二、canvas ####

- 和svg不同，canvas是基于像素进行渲染的，通过javascript进行绘制。所以一旦图形被绘制完成，就不会再得到浏览器的关注，不支持事件绑定。

		<canvas id="myCanvas" width="200px" height="100px" style="border:1px solid #333">
		</canvas>
		<script type="text/javascript">
		    var c=document.getElementById("myCanvas");
		    var ct=c.getContext("2d");
		    ct.fillStyle="#ccc";
		    ct.fillRect(5,10,150,10);
		</script>

- canvas标签本身并没有绘制图像的能力，是通过javascript绘制的

#### 三、区别 ####

- 在HTML5之前，人们通常使用SVG来在页面上绘制出图形。SVG使用XML来定义图形，就像使用HTML标签和样式定义DIV一样，我们也可以将一个空白的DIV想象为长方形的SVG，两者的设计思想是相通的，SVG的本质就是一个DOM元素。而Canvas则不同，Canvas提供的是 JavaScript 的绘图 API，而不是像 SVG那样使用XML 描述绘图，通过JavaScript API直接完成绘制，比起修改XML来说要更简便、更直接。
- 除了定义的方式不同，Canvas和DOM（当然也包含SVG）的差异更多的体现在浏览器的渲染方式上。浏览器在做页面渲染时，Dom元素是作为矢量图进行渲染的。每一个元素的边距都需要单独处理，浏览器需要将它们全都处理成像素才能输出到屏幕上，计算量十分庞大。当页面上内容非常多，存在大量DOM元素的时候，这些内容的渲染速度就会变得很慢。而Canvas与DOM的区别则是Canvas的本质就是一张位图，类似img标签，或者一个div加了一张背景图（background-image）。所以，DOM那种矢量图在渲染中存在的问题换到Canvas身上就完全不同了。在渲染Canvas时，浏览器只需要在JavaScript引擎中执行绘制逻辑，在内存中构建出画布，然后遍历整个画布里所有像素点的颜色，直接输出到屏幕就可以了。不管Canvas里面的元素有多少个，浏览器在渲染阶段也仅需要处理一张画布。
- canvas绘画出来的图形一般成为位图，也就是放大缩小的情况下会出现失真的情况，svg绘制的图形是矢量图，不存在失真的情况
- canvas绘制的图形不会出现在DOM结构中，svg绘制的会存在于DOM结构
- canvas类似于动画，每次图形的改变都是先清除原来的图形，然后把新的图形画上去，svg则是可以直接通过js来进行某些操作
- canvas依赖于分辨率，svg不依赖分辨率
- canvas最适合图像密集型的游戏，其中的许多对象会被频繁重绘，svg不适合游戏应用

