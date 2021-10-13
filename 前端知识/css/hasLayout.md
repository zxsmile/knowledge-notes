https://segmentfault.com/a/1190000004632071

#### 一、hasLayout到底是何方神圣？ ####

- hasLayout可以简单看作是IE5.5/6/7中的BFC(Block Formatting Context)。也就是一个元素要么自己对自身内容进行组织和尺寸计算(即可通过width/height来设置自身的宽高)，要么由其containing block来组织和尺寸计算。而IFC（即没有拥有布局）而言，则是元素无法对自身内容进行组织和尺寸计算，而是由自身内容来决定其尺寸（即仅能通过line-height设置内容行距，通过行距来支撑元素的高度；也无法通过width设置元素宽度，仅能由内容来决定而已）
- 当hasLayout为true时(就是所谓的"拥有布局")，相当于元素产生新BFC，元素自己对自身内容进行组织和尺寸计算;
- 当hasLayout为false时(就是所谓的"不拥有布局")，相当于元素不产生新BFC，元素由其所属的containing block进行组织和尺寸计算。
- 和产生新BFC的特性一样，hasLayout无法通过CSS属性直接设置，而是通过某些CSS属性间接开启这一特性。不同的是某些CSS属性是以不可逆方式间接开启hasLayout为true。并且默认产生新BFC的只有html元素，而默认hasLayout为true的元素就不只有html元素了。
- 另外我们可以通过object.currentStyle.hasLayout属性来判断元素是否开启了hasLayout特性。

#### 二、默认hasLayout==true的元素 ####

		<html>, <body>
		<table>, <tr>, <th>, <td>
		<img>,<hr>
		<input>, <button>, <select>, <textarea>, <fieldset>, <legend>
		<iframe>, <embed>, <object>, <applet>,<marquee>

#### 三、触发hasLayout==true的方式 ####

		display: inline-block
		height: (除 auto 外任何值)
		width: (除 auto 外任何值)
		float: (left 或 right)
		position: absolute
		writing-mode: tb-rl
		zoom: (除 normal 外任意值)

- IE7 还有一些额外的属性(不完全列表)可以触发 hasLayout ：

		min-height: (任意值)
		min-width: (任意值)
		max-height: (除 none 外任意值)
		max-width: (除 none 外任意值)
		overflow: (除 visible 外任意值，仅用于块级元素)
		overflow-x: (除 visible 外任意值，仅用于块级元素)
		overflow-y: (除 visible 外任意值，仅用于块级元素)
		position: fixed

- IE6 以前的版本（也包括 IE6 及以后所有版本的混杂模式，其实这种混杂模式在渲染方面就相当于 IE 5.5）， 通过设置任何元素的 'width' 或 'height'（非auto）都可以触发 hasLayout ； 但在 IE6 和 IE7 的标准模式中的行内元素上却不行，设置 'display:inline-block' 才可以。
- 其中通过display:inline-block或min-width:0或min-height:0将不可逆地启用hasLayout特性。而在没有其他属性启用hasLayout时，可通过以下方式关闭hasLayout

		max-width, max-height (设为 "none")(在IE7中)
		position (设为 "static")
		float (设为 "none")
		overflow (设为 "visible") (在IE7中)
		zoom (设为 "normal")
		writing-mode (从 "tb-rl" 设为 "lr-t")