#### 一、理解 ####

- width:100%会使元素box的宽度等于父元素的content box的宽度。
- width:auto会使元素撑满整个父元素也是content box宽度，并且margin、border、padding、content区域会自动分配水平空间。
- 可以理解为100%的话，子元素宽度始终为父元素宽度100%，假如子元素设置margin或border，padding这些属性的话，会超出父元素。
- 但auto的话，子元素设置margin或border，padding这些属性的时候会重新根据值分配子元素width的值，使子元素不超出父元素盒子

		<div class='box'>
		  <div class='inner'></div>
		</div>

		.box{
	       width:200px;
	       height:200px;
	       padding: 10px;
	       background-color: brown;
	     }
	     .inner{
	       width:100%;
	       height: 100px;
	       background-color: chartreuse;
	       padding: 20px;
	       margin: 20px;
	     }

        - 上面例子使用了100%，子元素有padding和margin会超出父盒子，子元素的width仍然为200px

		<div class='box'>
		  <div class='inner'></div>
		</div>

		.box{
	       width:200px;
	       height:200px;
	       padding: 10px;
	       background-color: brown;
	     }
	     .inner{
	       width:auto;
	       height: 100px;
	       background-color: chartreuse;
	       padding: 20px;
	       margin: 20px;
	     }

        - 上面例子使用了auto，子元素有padding和margin不会超出父盒子，子元素的width为120px


#### 二、回答 ####

- width:100%会使元素box的宽度等于父元素的content box的宽度。
- width:auto会使元素撑满整个父元素（也是content box的宽度），但margin、border、padding、content区域会自动分配水平空间。