https://juejin.cn/post/6844903518520901639#heading-24
#### 一、动画 ####

- transform(变形)、transition、animation

#### 二、选择器 ####

- element1~element2 ：选择element1元素之后的所有兄弟元素element2。兄弟选择器
- [attribute^=value]: 选择某元素attribute属性是以value开头的。属性选择器 
- [attribute$=value]: 选择某元素attribute属性是以value结尾的。属性选择器
- [attribute*=value]: 选择某元素attribute属性包含value字符串的。属性选择器
- E:first-of-type: 选择属于其父元素的首个E元素的每个E元素。
- E:last-of-type: 选择属于其父元素的最后E元素的每个E元素。
- E:only-of-type: 选择属于其父元素唯一的E元素的每个E元素。
- E:only-child: 选择属于其父元素的唯一子元素的每个E元素。
- E:nth-child(n): 选择属于其父元素的第n个子元素的每个E元素。
- E:nth-last-child(n): 选择属于其父元素的倒数第n个子元素的每个E元素。
- E:nth-of-type(n): 选择属于其父元素第n个E元素的每个E元素。
- E:nth-last-of-type(n): 选择属于其父元素倒数第n个E元素的每个E元素。
- E:last-child: 选择属于其父元素最后一个子元素每个E元素。
- :root: 选择文档的根元素。
- E:empty: 选择没有子元素的每个E元素（包括文本节点)。
- E:target: 选择当前活动的E元素。
- E:enabled: 选择每个启用的E元素。
- E:disabled: 选择每个禁用的E元素。
- E:checked: 选择每个被选中的E元素。
- E:not(selector): 选择非selector元素的每个元素。
- E::selection: 选择被用户选取的元素部分。

#### 三、边框 ####

- CSS3新增了三个边框属性，分别是border-radius、box-shadow和border-image。border-radius可以创建圆角边框，box-shadow可以为元素添加阴影，border-image可以使用图片来绘制边框。IE9+支持border-radius和box-shadow属性。Firefox、Chrome以及Safari支持所有新的边框属性。

#### 四、背景 ####

- CSS3新增了几个关于背景的属性，分别是background-clip、background-origin、background-size和background-break。

1. background-clip

   - background-clip属性用于确定背景画区，有以下几种可能的属性：

     - background-clip: border-box; 背景从border开始显示
     - background-clip: padding-box; 背景从padding开始显示
     - background-clip: content-box; 背景显content区域开始显示
     - background-clip: no-clip; 默认属性，等同于border-box

   - 通常情况，背景都是覆盖整个元素的，利用这个属性可以设定背景颜色或图片的覆盖范围。

2. background-origin

   - background-clip属性用于确定背景的位置，它通常与background-position联合使用，可以从 border、padding、content来计算background-position（就像background-clip）。

     - background-origin: border-box; 从border开始计算background-position
     - background-origin: padding-box; 从padding开始计算background-position
     - background-origin: content-box; 从content开始计算background-position

3. background-size

   - background-size属性常用来调整背景图片的大小，主要用于设定图片本身。有以下可能的属性：

     - background-size: contain; 缩小图片以适合元素（维持像素长宽比）
     - background-size: cover; 扩展元素以填补元素（维持像素长宽比）
     - background-size: 100px 100px; 缩小图片至指定的大小
     - background-size: 50% 100%; 缩小图片至指定的大小，百分比是相对包 含元素的尺寸

4. background-break

   - CSS3中，元素可以被分成几个独立的盒子（如使内联元素span跨越多行），background-break 属性用来控制背景怎样在这些不同的盒子中显示。

     - background-break: continuous; 默认值。忽略盒之间的距离（也就是像元素没有分成多个盒子，依然是一个整体一样）
     - background-break: bounding-box; 把盒之间的距离计算在内；
     - background-break: each-box; 为每个盒子单独重绘背景。

#### 五、反射 ####

- 这个也可以说是倒影，用起来也挺有趣的。
- 语法

  -webkit-box-reflect:方向[ above-上 | below-下 | right-右 | left-左 ]，偏移量，遮罩图片

#### 六、文字效果 ####

1. word-wrap

   - word-wrap: normal|break-word; break-word：允许在长单词或url地址换行

2. text-overflow

  - 它与word-wrap是协同工作的，word-wrap设置或检索当当前行超过指定容器的边界时是否断开转行，而 text-overflow则设置或检索当当前行超过指定容器的边界时如何显示。对于“text-overflow”属性，有“clip”和“ellipsis”两种可供选择。

3. text-shadow

  - CSS3中，text-shadow可向文本应用阴影。能够规定水平阴影、垂直阴影、模糊距离，以及阴影的颜色。

		h1{
		    text-shadow: 5px 5px 5px #FF0000;
		}

4. text-decoration

- CSS3里面开始支持对文字的更深层次的渲染，具体有三个属性可供设置：

   - text-fill-color: 设置文字内部填充颜色
   - text-stroke-color: 设置文字边界填充颜色
   - text-stroke-width: 设置文字边界宽度

#### 七、颜色 ####

1. rgba

   - rgb为颜色值，a为透明度
   
		color: rgba(255,00,00,1);
		background: rgba(00,00,00,.5);

2. hsla

   - h:色相”，“s：饱和度”，“l：亮度”，“a：透明度”

		color: hsla( 112, 72%, 33%, 0.68);
		background-color: hsla( 49, 65%, 60%, 0.68);

#### 八、渐变 ####

- CSS3新增了渐变效果，包括linear-gradient(线性渐变)和radial-gradient(径向渐变)。

#### 九、滤镜 #### 

#### 十、弹性布局 ####

- flex
- https://link.juejin.cn/?target=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2015%2F07%2Fflex-grammar.html
- https://link.juejin.cn/?target=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2015%2F07%2Fflex-examples.html

#### 十一、栅格布局 ####

- grid
- https://link.juejin.cn/?target=http%3A%2F%2Fwww.jianshu.com%2Fp%2Fd183265a8dad

#### 十二、多列布局 ####

	<div class="newspaper">
	当我年轻的时候，我梦想改变这个世界；当我成熟以后，我发现我不能够改变这个世界，我将目光缩短了些，决定只改变我的国家；当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。当我现在躺在床上，行将就木时，我突然意识到：如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；在家人的帮助和鼓励下，我可能为国家做一些事情；然后，谁知道呢?我甚至可能改变这个世界。
	</div>
	
	.newspaper
	{
	    column-count: 3;
	    -webkit-column-count: 3;
	    -moz-column-count: 3;
	    column-rule:2px solid #000;
	    -webkit-column-rule:2px solid #000;
	    -mox-column-rule:2px solid #000;
	}    

#### 十三、盒模型定义 ####

#### 十二、媒体查询 ####

- 媒体查询，就在监听屏幕尺寸的变化，在不同尺寸的时候显示不同的样式

			<!DOCTYPE html>
			<html>
			<head>
			<meta charset="utf-8"> 
			<title></title> 
			<style>
			body {
			    background-color: pink;
			}
			@media screen and (max-width: 960px) {
			    body {
			        background-color: darkgoldenrod;
			    }
			}
			@media screen and (max-width: 480px) {
			    body {
			        background-color: lightgreen;
			    }
			}
			</style>
			</head>
			<body>
			
			<h1>重置浏览器窗口查看效果！</h1>
			<p>如果媒体类型屏幕的可视窗口宽度小于 960 px ，背景颜色将改变。</p>
			<p>如果媒体类型屏幕的可视窗口宽度小于 480 px ，背景颜色将改变。</p>
			
			</body>
			</html>

