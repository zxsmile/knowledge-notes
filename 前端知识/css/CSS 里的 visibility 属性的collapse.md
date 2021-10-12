#### 一、简介 ####

- visibility:visible,hidden,collapse,inherit

- 当一个元素的visibility属性被设置成collapse值后，对于一般的元素，它的表现跟hidden是一样的。但例外的是，如果这个元素是table相关的元素，例如table行，table group，table列，table column group，它的表现却跟display: none一样，也就是说，它们占用的空间也会释放。

		<table>
		    <tr>
		      <td>111</td>
		      <td>222</td>
		    </tr>
		    <div class='box'>222</div>
		    <div>333</div>
		</table>

       tr{
	       visibility:collapse;
	     }

	     .box{
	      visibility:collapse;
	     }


- 上面例子中，tr会消失，它的表现和display：none一样不会占据空间，第一个div会占据它的位置，因为第一个div也设置了visibility:collapse，第一个div也消失了，但他的表现和visible一样，会占据空间，所以第二个div显示在第一个div下边。

#### 二、回答 ####

- 对于一般的元素，它的表现跟visibility：hidden;是一样的。元素是不可见的，但此时仍占用页面空间。
- 但例外的是，如果这个元素是table相关的元素，例如table行，table group，table列，table column group，它的表现却跟display:none一样，也就是说，它们占用的空间也会释放。
