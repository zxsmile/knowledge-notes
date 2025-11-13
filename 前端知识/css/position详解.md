#### 一、position属性值 ####

1. static：默认值默认布局。
   * 元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
2. relative：相对定位。
   * 不影响元素本身特性（无论区块元素还是内联元素会保留其原本特性）
   * 不会使元素脱离文档流（元素原本位置会被保留，即改变位置也不会占用新位置
   * 没有定位偏移量时对元素无影响（相对于自身原本位置进行偏移）
   * 提升层级（用z-index样式的值可以改变一个定位元素的层级关系，从而改变元素的覆盖关系，值越大越在上面，z-index只能在position属性值为relative或absolute或fixed的元素上有效。） （两个都为定位元素，后面的会覆盖前面的定位）
3. absolute：绝对定位。
   * 使元素完全脱离文档流（在文档流中不再占位）
   * 使内联元素在设置宽高的时候支持宽高（改变内联元素的特性）
   * 使区块元素在未设置宽度时由内容撑开宽度（改变区块元素的特性）
   * 相对于最近一个有定位的父元素偏移（若其父元素没有定位则逐层上找，直到document——页面文档对象）
   * 相对定位一般配合绝对定位使用（将父元素设置相对定位，使其相对于父元素偏移）
   * 提升层级（同相对定位）
4. fixed：固定定位。
   * fixed生成固定定位的元素，相对于浏览器窗口进行定位。
5. sticky：粘性定位
   * 该定位基于用户滚动的位置。它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。注意: Internet Explorer, Edge 15 及更早 IE 版本不支持 sticky 定位。 Safari 需要使用 -webkit- prefix 。
6. inherit规定应该从父元素继承 position 属性的值。
   - initial：设置该属性为默认值。

#### 二、主要属性值详解

1. 首先说一下什么文档流

  - 所谓文档流就是HTML文档中可显示元素在排列时所占用的位置。HTML文档流中的标签元素遵循“从左到右、从上到下”的排列次序，有如现代汉字的书写顺序一样。
  - 比如说我们有多个div，根据网页的默认样式他是一个块极元素。所以他就会单独占一行。就会从上到下的排列。
  - 又比如说有多个span标签，根据网页的默认的样式他是一个行级元素，就会从左到右的排列。
  - 其实我简单的理解就相当于我们网页就像我们写作业的纸，我们的元素就写到上面。成为我们元素的内容。我们写东西的时候是不是将文字从左到右的写，写完啦一排再写另外一排呢。其实这个就叫做文档流。

2. 脱离文档流

  - 也就是将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当做脱离文档流的元素不存在而进行定位。
  * 一个元素脱离文档流后，其他的元素在定位时候会当做没看见他，两者位置重叠都是可以的。 
  * 脱离文档流不是从dom树中脱离，用浏览器的审查元素可以看到脱离文档流的元素，依然会出现在dom树里 
  * 实质：脱离文档流，也就是将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当做脱离文档流的元素不存在而进行定位。需要注意的是，使用float脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。而对于使用absolute position脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它。

   - 脱离文档流的三种方式：浮动，绝对定位，固定定位

3. 默认情况下，所有元素都在z-index:0这一层，元素的top,left,right,bottom,z-index属性都没有被激活，设置了也没有用。position:relative/ablolute/fixed/sticky,都可以让元素激活top,left,right,bottom,z-index属性。如果使用absolute/relative/sticky定位的话，必须指定top,left,right,bottom属性中的至少一个，否则top,left,right,bottom属性会使用它们的默认值auto,这将导致对象遵从正常的HTML布局规则，在前一个对象之后立即被呈递，简单讲就是都变成relative。如果top和bottom一同存在的话，那么只有top生效。如果left和right一同存在的话，那么只有left生效。
4. static

   - 默认值，一般元素不设置定位属性就属于静态定位，元素处于标准流中。

5. relative

   - 相对定位的元素不会脱离文档流，还处于标准流中,但它会让元素浮起来(即：z-index的值大于0)。相对定位是相对它原来处于文档流的位置而进行偏移的，可以说它是static到absoulte的一个中间过渡属性。虽然它的实际位置可能因为设置了top,left,right,bottom属性值而偏离原来的位置，但对于其他仍然在z-index:0层的元素位置不会造成影响(<font color='red'>即：它还占着文档空间，而且占据的文档空间不会随top,left,right,bottom等属性的偏移而发生变动。。

![](relative1.PNG)

    - 没有设置top,left,right,bottom时，如下图：

![](relative2.jpg)

    - 设置了top:20px;left:20px后，如下图：

![](relative3.jpg)

    - 证明了它还占着文档空间，而且占据的文档空间不会随top,left,right,bottom等属性的偏移而发生变动。
    - 虽然top,left,right,bottom属性不会对relative定位的元素所占据的文档空间产生偏移，但margin，padding会让该文档空间产生偏移。

6. absolute

   - 绝对定位会使元素脱离文档流，它会让元素浮起来(即：z-index的值大于0)，它在文档流中的位置会被删除。它只能根据祖先类元素(父类以上)进行定位，而这个祖先类还必须是以postion非static方式定位的
   - 举个例子，a元素使用absoulte定位，它会从父类开始找起，寻找以position非static方式定位的祖先类元素(注意，一定要是直系祖先才算哦~），直到<html>标签为止，这里还需要注意的是，relative和static方式在最外层时是以<body>标签为定位原点的，而absoulte方式在无父级是position非static定位时是以<html>作为原点定位。<html>和<body>元素相差9px左右。
   

![](absolute1.jpg)

![](absolute2.jpg)

   - 祖先类的margin会让子类的absoulte跟着偏移，而padding却不会让子类的absoulte发生偏移。总结一下，就是absoulte是根据祖先类的border进行的定位。

   - position：absolute和float会隐式的改变display类型，不论之前什么类型的元素（display：none除外），只要设置了position：absolute、float：left或float：right中任意一个，都会让元素以display：inline-block的方式显示：可以设置长宽，默认宽度并不占满父元素

7. fixed<br/>

   - 固定定位会使元素脱离文档流，和绝对定位类似，相对于浏览器窗口进行定位。

8. sticky<br/>

   - 粘性布局不会使元素脱离文档流，可以说是相对定位relative和固定定位fixed的结合。
   - 使用条件：

      * 父元素不能overflow:hidden或者overflow:auto属性。
      * 必须指定top、bottom、left、right4个值之一，否则只会处于相对定位
      * 父元素的高度不能低于sticky元素的高度
      * sticky元素仅在其父元素内生效

9. display、float、position的关系

  - （1）首先判断display属性是否为none，如果为none，则position和float属性的值不影响元素最后的表现。
  - （2）然后判断position的值是否为absolute或者fixed，如果是，则float属性失效，并且display的值应该被设置为table或者block，具体转换需要看初始转换值。
  - （3）如果position的值不为absolute或者fixed，则判断float属性的值是否为none，如果不是，则display的值则按上面的规则转换。注意，如果position的值为relative并且float属性的值存在，则relative相对于浮动后的最终位置定位。
  - （4）如果float的值为none，则判断元素是否为根元素，如果是根元素则display属性按照上面的规则转换，如果不是，则保持指定的display属性值不变。
总的来说，可以把它看作是一个类似优先级的机制，"position:absolute"和"position:fixed"优先级最高，有它存在的时候，浮动不起作用，'display'的值也需要调整；其次，元素的'float'特性的值不是"none"的时候或者它是根元素的时候，调整'display'的值；最后，非根元素，并且非浮动元素，并且非绝对定位的元素，'display'特性值同设置值。

10. absolute与fixed共同点与不同点

   - 共同点：

      - 改变行内元素的呈现方式，将display置为inline-block  
      - 使元素脱离普通文档流，不再占据文档物理空间
      - 覆盖非定位文档元素

   - 不同点：

     - abuselute与fixed的根元素不同，abuselute的根元素可以设置，fixed根元素是浏览器。
     - 在有滚动条的页面中，absolute会跟着父元素进行移动，fixed固定在页面的具体位置。









