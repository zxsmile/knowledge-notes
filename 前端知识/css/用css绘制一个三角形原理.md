#### 一、原理以及实现 ####

- 采用的是相邻边框连接处的均分原理
- 实现

  - 将元素的宽和高设置为0，只设置border，把任意三条边隐藏掉（颜色设为transparent），剩下一个就是三角形

		   .box{
		       width:0;
		       height:0;
		       border-style:solid;
		       border-width: 20px;
		       border-color:transparent transparent red transparent;
		     }