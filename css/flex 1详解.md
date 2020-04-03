https://www.cnblogs.com/ceceliahappycoding/p/10791191.html

1.概述
 
  - flex 是 flex-grow、flex-shrink、flex-basis的缩写

  - flex 的默认值是以上三个属性值的组合，flex 的默认值是 0 1 auto

2.取值

(1)当 flex 取值为 none，则计算值为 0 0 auto；

(2)当 flex 取值为 auto，则计算值为 1 1 auto；

(3)当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%，如下是等同的：

	.item {flex: 1;}
	.item {
	    flex-grow: 1;
	    flex-shrink: 1;
	    flex-basis: 0%;
	   }

(4)当 flex 取值为一个长度或百分比，则视为 flex-basis 值，flex-grow 取 1，flex-shrink 取 1，有如下等同情况


	.item-1 {flex: 0%;}
	.item-1 {
	    flex-grow: 1;
	    flex-shrink: 1;
	    flex-basis: 0%;
	   }
	.item-2 {flex: 24px;}
	.item-1 {
	    flex-grow: 1;
	    flex-shrink: 1;
	    flex-basis: 24px;
	   }


(5)当 flex 取值为两个非负数字，则分别视为 flex-grow 和 flex-shrink 的值，flex-basis 取 0%，如下是等同的：

	.item {flex: 2 3;}
	.item {
	    flex-grow: 2;
	    flex-shrink: 3;
	    flex-basis: 0%;
	   }

(6)当 flex 取值为一个非负数字和一个长度或百分比，则分别视为 flex-grow 和 flex-basis 的值，flex-shrink 取 1，如下是等同的：

	.item {flex: 2333 3222px;}
	.item {
	    flex-grow: 2333;
	    flex-shrink: 1;
	    flex-basis: 3222px;
	   }

