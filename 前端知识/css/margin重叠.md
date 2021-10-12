#### 一、margin重叠理解 ####

- 块级元素的上外边距（margin-top）与下外边距（margin-bottom）有时会合并为单个外边距，这样的现象称为“margin合并”。
- 产生折叠的必备条件：

  - margin必须是邻接的
  - 必须是处于常规文档流（非float和绝对定位）的块级盒子，并且处于同一个BFC当中。
  - 没有线盒，没有空隙，没有padding和border将他们分隔开
  - 都属于垂直方向上相邻的外边距

- 折叠规则

   * 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值
   * 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值
   * 两个外边距一正一负时，折叠结果是两者的相加的和
   
- margin重叠的情况：

  - （1）相邻兄弟元素margin合并。

      - 元素的margin-bottom与其下一个常规文档流的兄弟元素的margin-top
      - 解决办法：

        - 设置块状格式化上下文元素（BFC）

  - （2）父级和第一个子元素margin-top合并。
   
      - 解决办法：

          - 父元素设置为块状格式化上下文元素；
          - 父元素设置border-top值；
          - 父元素设置padding-top值；
          - 父元素和第一个子元素之间添加内联元素进行分隔。

  - （3）height为auto父级和最后一个子元素margin-bottom合并。

      - height为auto的元素的margin-bottom与其最后一个常规文档流的子元素的margin-bottom
      -  解决办法：
      
         - 父元素设置为块状格式化上下文元素；
         - 父元素设置border-bottom值；
         - 父元素设置padding-bottom值；
         - 父元素和最后一个子元素之间添加内联元素进行分隔；
         - 父元素设置height、min-height或max-height。 
         
  - （4）空块级元素的margin合并。

      - 高度为0并且最小高度也为0，不包含常规文档流的子元素，并且自身没有建立新的BFC的元素的margin-top

      - 解决办法：

        - 设置垂直方向的border；
        - 设置垂直方向的padding；
        - 里面添加内联元素（直接Space键空格是没用的）；
        - 设置height或者min-height。


#### 二、回答 ####

- margin重叠指的是在垂直方向上，两个相邻元素的margin发生重叠的情况。
- 一般来说可以分为四种情形：

  - 第一种是相邻兄弟元素的marin-bottom和margin-top的值发生重叠。这种情况下我们可以通过设置其中一个元素为BFC来解决。
  - 第二种是父元素的margin-top和子元素的margin-top发生重叠。它们发生重叠是因为它们是相邻的，所以我们可以通过这一点来解决这个问题。我们可以为父元素设置border-top、padding-top值来分隔它们，当然我们也可以将父元素设置为BFC来解决。
  - 第三种是高度为auto的父元素的margin-bottom和子元素的margin-bottom发生重叠。它们发生重叠一个是因为它们相邻，一个是因为父元素的高度不固定。因此我们可以为父元素设置border-bottom、padding-bottom来分隔它们，也可以为父元素设置一个高度，max-height和min-height也能解决这个问题。当然将父元素设置为BFC是最简单的方法。
  - 第四种情况，是没有内容的元素，自身的margin-top和margin-bottom发生的重叠。我们可以通过为其设置border、padding或者高度来解决这个问题。