---
title: BFC理解
date: 2019-09-24 19:15:09
tags:
cover: /images/psb26.jpg
---
一.先理解一下Box、Formatting Context的概念。<br/>
1.Box:CSS布局的基本单位<br/>
Box 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：
* block-level box:display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context；

* inline-level box:display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；

* run-in box: display 属性为flex,grid
   * 如果 run-in box 包含 block box，那么这个 run-in box 也成为 block box
   * 如果紧跟在 run-in box 之后的兄弟节点是 block box，那么这个 run-in box 就会做为此 block box 里的 inline box，run-in box 不能进入一个已经以 run-in box 开头的块内，也不能进入本身就是 display:run-in; 的块内
   * 否则，run-in box 成为 block box
2.Formatting context(格式化上下文)<br/>
 Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)<br/>
3.每个盒子都有一个FC特性，不同的FC值代表一组盒子不同的排列方式。有的FC值表示盒子从上到下垂直排列，有的FC值表示盒子从左到右水平排列等等。而IFC则是表示盒子从左到右的水平排列方式，仅此而已(注意：一个盒子仅且仅有一个FC值)。而inline-level box的FC特性值固定为IFC<br/>
4.另外仅处于in-flow的盒子才具有FC特性，也就是positioning scheme必须为Normal flow(普通流元素)的盒子才具有FC特性。<br/>
* 如果一个元素是浮动的(float:left/right)，绝对定位的(position:absolute/fixed)或者是根元素(html)，那么它被称之为流外的元素(out-of-flow)。如果一个元素不是流外的元素，那么它被称之为流内的素(in-flow)。<br/>

二.BFC<br/>
https://blog.csdn.net/xiasohuai/article/details/83721442<br/>

三.IFC,GFC,FFC<br/>
https://zhanghao-web.github.io/2018/07/23/CSS3/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3BFC-IFC-GFC%E5%92%8CFFC/<br/>
