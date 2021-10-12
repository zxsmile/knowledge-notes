#### 一、无继承性的属性 ####

1. display：规定元素应该生成的框的类型
文本属性：
2. vertical-align：垂直文本对齐
3. text-decoration：规定添加到文本的装饰
4. text-shadow：文本阴影效果
5. white-space：空白符的处理
6. unicode-bidi：设置文本的方向
7. 盒子模型的属性：width、height、margin、border、padding
8. 背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment
9. 定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index
10. 生成内容属性：content、counter-reset、counter-increment
11. 轮廓样式属性：outline-style、outline-width、outline-color、outline
12. 页面样式属性：size、page-break-before、page-break-after
13. 声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

#### 二、有继承性的属性 ####

1. 字体系列属性

   - font-family：字体系列
   - font-weight：字体的粗细
   - font-size：字体的大小
   - font-style：字体的风格

2. 文本系列属性

   - text-indent：文本缩进
   - text-align：文本水平对齐
   - line-height：行高
   - word-spacing：单词之间的间距
   - letter-spacing：中文或者字母之间的间距
   - text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）
   - color：文本颜色


3. 元素可见性

    - visibility：控制元素显示隐藏


4. 列表布局属性

   - list-style：列表风格，包括list-style-type、list-style-image等


5. 光标属性

   - cursor：光标显示为何种形态

#### 三、回答 ####

- 每一个属性在定义中都给出了该属性是否具有继承性，一个具有继承性的属性会在没有指定值的时候，会使用父元素的同属性的值来作为自己的值
- 一般具有继承性的属性有，字体相关的属性，font-size和font-weight等。文本相关的属性，color和text-align等。表格的一些布局属性、列表属性如list-style等。还有光标属性cursor、元素可见性visibility。
- 当一个属性不是继承属性的时候，我们也可以通过将它的值设置为inherit来使它从父元素那获取同名的属性值来继承。


