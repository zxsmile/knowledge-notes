一、document.documentElement和document.body的区别
 
   1.概念上

       - documentElement是整个节点树的根节点root,即<html>标签
       - body是DOM对象中的body子节点，即<body>标签

   2.


二、几个元素大小属性详解

 1.clientWidth = content的width + 两个padding的width
   clientHeight = content的height + 两个padding的height

   - 这个属性很多博客中都说它是可见区域的高或宽，这样不是很准确，它其实和可见不可见是没有关系的，它表示的仅仅是元素的content的width/height + 两个padding的width/height，你可以尝试写很多个相同div，然后获取它们的clientHeight，你会发现无论有没有隐藏你获取到的都是相同的值。而平时我们使用document.documentElement.clientHeight这样获取的是html的clientHeight，给我们一种假象感觉获取到的是可视区域的高度，其实是因为溢出部分不属于html的height，可以使用两个嵌套div来测试。

 2.offsetWidth = content的width + 两个padding的width + 两个border的width + 垂直滚动条的width
   offsetHeight =  content的height + 两个padding的height + 两个border的height + 垂直滚动条的height
   offsetLeft = 元素左外边框至包含元素的左内边框之间的距离
   offsetTop = 元素上外边框至包含元素的上内边框之间的像素距离

 3.scrollWidth = 元素内容的总宽度
   scrollHeight = 元素内容的总高度
   scrollLeft = 水平滚动条滚动的距离
   scrollTop = 垂直滚动条滚动的距离