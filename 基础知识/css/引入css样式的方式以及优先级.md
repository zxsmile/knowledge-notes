一、引入css样式的方式

- CSS可以通过三种方式引入样式表，三种方式分别是行内样式表，内部样式表和外部样式表

  1.行内样式表

    - 通过给标签设定style属性

         <body>
			<div style="background-color: pink;width:200px;height:200px"></div>
		</body>

  2.内部样式表

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

  3.外部样式表

    - 通过创建外部的css样式表文件，然后在html文件中引入，引入的方式有两种，分别是链接引入css样式表文件和导入css样式表文件

      - html文件中的head标签下插入：

        - (1)链接引入css样式表

             <link rel="stylesheet" type="text/css" href="index.css"> //ref规定当前文档与被链接文档之间的关系

        - (2)导入css样式表文件

              <style type="text/css">
					@import url('index.css') //css样式表的路径
			  </style>

        - 两种引入css样式表的区别：

             - 链接引入属于html的标签语法，在加载页面时，就会同时加载css样式表
             - 导入css样式表，属于css中的语法，在加载页面时，加载页面完成之后才会加载css样式表

二、css样式引入的优先级

   - 
            