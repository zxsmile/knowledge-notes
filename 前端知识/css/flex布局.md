#### 一、概述 ####

- Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。
- 任何一个容器都可以指定为Flex布局，设置方法为：

		.box{
		    display: flex;
		}

- 行内元素也可以使用Flex布局。

		.box{
		  display: inline-flex;
		}

- Webkit内核的浏览器，必须加上-webkit前缀。

		.box{
		  display: -webkit-flex; /* Safari */
		  display: flex;
		}

- **注意**：使用Flex布局之后，里面的float、clear、vertical-align属性将失效。
 
#### 二、flex布局基本概念 ####
 
- 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
1. 容器的属性

   - （1）flex-driection设置项目的排列方向，默认属性row, flex-driection的值：

       * row :主轴为水平方向，起点在左端。
       * row-reverse: 主轴为水平方向，起点在右端。
       * column :主轴为垂直方向，起点在上沿。
       * column-revers:主轴为垂直方向，起点在下沿。

				.box{
				    display: flex;
				    display: -webkit-flex;
				    flex-direction: row;
				    }

   - （2）flex-wrap设置项目是否在一条线上，默认nowrap,flex-wrap的值：

      * wrap :换行，第一行在上方。
      * nowrap: 不换行。
      *  wrap-reverse:换行，第一行在下方。

				.box{
				    display: flex;
				    display: -webkit-flex;
				    flex-wrap: wrap;
				    }

  - （3）flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
  - （4）justify-content属性定义项目在主轴上的对齐方式，默认值为flex-start,justify-content的值:

      *  flex-start ：左对齐
      *  flex-end  ：右对齐
      * center  ：居中
      *  space-between  ：两端对齐，项目之间的间隔都相等。
      * space-around ：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

				.box{
				    display: flex;
				    display: -webkit-flex;
				    justify-content: flex-start;

  - （5）align-items属性定义项目在纵轴上的对齐方式，默认值为stretch,align-items的值：
  
      * flex-start： 交叉轴的起点对齐。
      * flex-end ： 交叉轴的终点对齐。
      * center ： 交叉轴的中点对齐。
      * baseline ：  项目的第一行文字的基线对齐。
      * stretch： 如果项目未设置高度或设为auto，将占满整个容器的高度。

				.box{
				    display: flex;
				    display: -webkit-flex;
				     align-items: flex-start;
				     }

   - （6）align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。align-content的值：
   
       * flex-start：与交叉轴的起点对齐。
       * flex-end：与交叉轴的终点对齐。
       * center：与交叉轴的中点对齐。
       * space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
       * space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
       * stretch（默认值）：轴线占满整个交叉轴。

				.box{
				    display: flex;
				    display: -webkit-flex;
				    flex-wrap: wrap;
				    }

2. 项目的属性

    - （1）order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

				.item {
				  order: <integer>;
				}

    - （2）flex-grow属性定义项目的放大比例，主要在父元素的宽度大于子元素的宽度之和时候起作用，它定义子元素如何分配父元素的剩余宽度，默认为0，这个时候不索取父元素的宽度。

				.item {
				  flex-grow: <number>;  /* default 0 */
				}

    - （3）flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。如果项目没设置flex-shrink属性，则项目的默认flex-shrink值为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时flex-shrink属性为0的项目不缩小。

				.item {
				  flex-shrink: <number>; /* default 1 */
				}

    - （4）flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间(默认值为auto，即项目的本来大小)

        - 注意：如果同时给项目设置flex-basis和width属性值，则flex-basis会覆盖width的值。例如同时给项目设置属性，flex-basis：80px;width:100px;则项目的实际宽度是80px;

				.item {
				  flex-basis: <length> | auto; /* default auto */
				}

    - （5）flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。

				.item {
				  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
				}

    - （6）align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

				.item {
				  align-self: auto | flex-start | flex-end | center | baseline | stretch;
				}
