#### 一、引入css样式的方式 ####

- CSS可以通过三种方式引入样式表，三种方式分别是行内样式表，内部样式表和外部样式表

  1. 行内样式表

     - 通过给标签设定style属性

	         <body>
				<div style="background-color: pink;width:200px;height:200px"></div>
			</body>

  2. 内部样式表

      - 通过在head标签中的style标签中编写样式

	        <head>
				<style type="text/css">
						div{
							width: 200px;
							height: 200px;
							background-color: pink;
						}
				</style>
			</head>

  3. 外部样式表

     - 通过创建外部的css样式表文件，然后在html文件中引入，引入的方式有两种，分别是链接引入css样式表文件和导入css样式表文件

     - html文件中的head标签下插入：

       - (1)链接引入css样式表

            	 <link rel="stylesheet" type="text/css" href="index.css"> //ref规定当前文档与被链接文档之间的关系

       - (2)导入css样式表文件
	
	              <style type="text/css">
						法一：@import url(index.css) //css样式表的路径
	                    法二：@import "index.css" //css样式表的路径
				  </style>

       - link和@import的区别：

          - link是html的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等；而@import是css的语法，只有导入样式表的作用。
          - link引入属于html的标签语法，在加载页面时，就会同时加载css样式表。@import导入css样式表，属于css中的语法，在加载页面时，加载页面完成之后才会加载css样式表
          - 兼容性：@import是 CSS2.1 才有的语法，所以只能在 IE5以上 才能识别；而link是 HTML 标签，所以不存在兼容性问题。
          - DOM：javascript只能控制dom去改变link标签引入的样式，而@import的样式不是dom可以控制的。


#### 二、引入样式方式比较 ####

   类别                    引入方法                      位置                               加载

 行内样式                开始标签内style               html文件内                            同时

 内部样式              <head>中的<style>内            html文件内                             同时

 链入外部样式          <head>中的<link>引用       css样式文件与html文件分离           页面加载时，同时加载css样式

 导入式@import           样式代码最开始处         css样式文件与html文件分离             在读取完html文件之后加载



#### 三、css样式引入的优先级 ####

- 行内样式 > 内部样式 > 外部样式

- 说明：- 链入外部样式表与内部样式表之间的优先级取决于所处位置的先后

          <link></link>           <style></style>
          <style></style>         <link></link>
 
- 最后定义的优先级最高（就近原则）
























   - 
            