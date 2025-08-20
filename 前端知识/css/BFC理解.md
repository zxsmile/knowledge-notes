# 一、先理解一下`Box`、`Formatting Context`的概念。

- [ ] **`Box` 是 `CSS` 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 `Box` 组成的。元素的类型和 `display` 属性，决定了这个 `Box` 的类型。 不同类型的 `Box`， 会参与不同的 `Formatting Context`（一个决定如何渲染文档的容器），因此`Box`内的元素会以不同的方式渲染。**让我们看看有哪些盒子：
  - [ ] `block-level box`：`display` 属性为 `block`, `list-item,` `table` 的元素，会生成 `block-level box`。并且参与 `block fomatting context`；
  - [ ] `inline-level box`：`display` 属性为 `inline`, `inline-block`，`inline-table` 的元素，会生成 `inline-level box`。并且参与 `inline formatting context`；
  - [ ] `run-in box`: `display` 属性为`flex`，`grid`，
    - [ ] 如果 `run-in box` 包含 `block box`，那么这个 `run-in box` 也成为 block box
    - [ ] 如果紧跟在 `run-in box` 之后的兄弟节点是 `block box`，那么这个 `run-in box` 就会作为此 `block box` 里的 `inline box`，`run-in box` 不能进入一个已经以 `run-in box` 开头的块内，也不能进入本身就是 `display:run-in;` 的块内，否则，run-in box 成为 block box
- [ ] `Formatting context`(格式化上下文)  是 `W3C CSS2.1` 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 `Formatting context` 有 `Block fomatting context` (简称`BFC`)和 `Inline formatting context` (简称`IFC`)
- [ ] 每个盒子都有一个`FC`特性，不同的`FC`值代表一组盒子不同的排列方式。有的`FC`值表示盒子从上到下垂直排列，有的`FC`值表示盒子从左到右水平排列等等。而`IFC`则是表示盒子从左到右的水平排列方式，仅此而已(注意：一个盒子仅且仅有一个`FC`值)。而`inline-level box`的`FC`特性值固定为`IFC`
- [ ] 另外仅处于`in-flow`的盒子才具有`FC`特性，也就是`positioning scheme`必须为`Normal flow`(普通流元素)的盒子才具有`FC`特性。
- [ ] 如果一个元素是浮动的(`float:left/righ`t)，绝对定位的(`position:absolute/fixed`)或者是根元素(`html`)，那么它被称之为流外的元素(`out-of-flow`)。如果一个元素不是流外的元素，那么它被称之为流内的素(`in-flow`)。

# 二、`BFC`

https://blog.csdn.net/xiasohuai/article/details/83721442

三、`IFC`，`GFC`，`FFC`
https://zhanghao-web.github.io/2018/07/23/CSS3/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3BFC-IFC-GFC%E5%92%8CFFC/