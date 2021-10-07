#### 一、min-width/height ####

- min-width/height默认值是auto。
- 给元素设置最小宽度，当width小于 min-width ，min-width会覆盖width的值。

		div{
		    min-width: 100px;
		    height: 100px;
		    width:20px;
		    border: 1px solid #000;
		}


- 针对这个div我们设置了width为20px,min-widthn:1000px。此时宽度是小于最小宽度的，导致最小宽度生效，最后div的宽度为100px。

- 给元素设置最小高度，当height小于 min-height ，min-height会覆盖height的值。

		.parent {
		  height: 200px;
		}
		.child {
		  min-height: 50%;
		  height: 50px;
		}

- 针对这个div我们设置了height为50px,min-height:50%(100px)。此时高度度是小于min-height的，导致min-height生效，最后div的高度为100px。

#### 二、max-width/height ####

- max-width/height默认值是none。
- 给元素设置最大宽度，当width大于 max-width ，max-width会覆盖width的值。
- 给元素设置最大高度，当height大于 max-height ，max-heighth会覆盖height的值。

#### 三、min-width与max-width的优先级 ####

- min-width和 都max-width用于一个元素时，它们中的哪一个会覆盖另一个？换句话说，哪一个具有更高的优先级？

   - 如果min-width的值 大于max-width，则该min-width值将被视为元素的宽度

		.parent {
		  width: 500px;
		}
		.child {
		  min-width:100%;(500px)
		  max-width: 50%;(250px)
		}

   - 当设定了width ,并且min-width大于width,min-width小于max-width时，这个时候min-width 生效。

       .child {
		  min-width: 50%;(250px)
		  max-width: 100%;（500px）
		  width: 200px;
		}


#### 四、应用场景 ####

1. flex布局 内部元素overflow:hidden;失效。

		.parent {
		  width: 250px;
		  display: flex;
		  background: rgb(182, 67, 67);
		}
		.child {
		  border: 1px solid #000;
		}
		p {
		  white-space: nowrap;
		  overflow: hidden;
		  text-overflow: ellipsis;
		}
		<div class="parent">
		  <div class="child">
		    <p>
		      我说道：“爸爸，你走吧。”他往车外看了看，说：“我买几个橘子去。你就在此地，不要走动。”我看那边月台的栅栏外有几个卖东西的等着顾客。
		    </p>
		  </div>
		</div>

- 如图所示，最终的效果：文字并没有隐藏显示省略号，这是因为啥呢？？？
- div.parent在设定为flex的时候,其子元素div.child的min-width自动设置为auto,导致浏览器按照p标签的宽度来自动设置宽度了。则min-width大于width，就覆盖了min-width，也就是：

		.child {
		  border: 1px solid #000;
		  min-width:auto;
		}

- 所以我们只要设置min-width:0；覆盖掉auto。 

2. 高度未知的元素动画

- 场景：一个下拉菜单，菜单项未知，导致无法设置高度，当鼠标放在上面可以缓慢的（动画）展开菜单。
- 当然你也可以使用js解决，直接获取高度，然后设置动画，这样也是ok的，但是max-height也可以解决。

      #menu #list {
        max-height: 0;
        transition: max-height 0.15s ease-out;
        overflow: hidden;
        background: #d5d5d5;
      }

      #menu:hover #list {
        max-height: 500px;
        transition: max-height 5s ease-in;
      }
    <div id="menu">
      <a>菜单</a>
      <ul id="list">
        <li>item</li>
        <li>item</li>
      </ul>
    </div>

3. 高度为 100% 的 HTML/Body

- 这个场景真的是经常遇到，比如说侧边栏的高度要铺满。

		html {
		  height: 100%;
		}
		
		body {
		  min-height: 100%;
		}

4. 最小宽的button

- 因为公司有自己的组件库，在设计button的时候，领导要求buttonBun不能太小。 像下面着两个按钮，当文字只有一个的时候，会显得特别小，所以这个时候领导为了统一样式，设定最小宽度。

5. 多列布局

- 比如常见的三栏布局，我们可以设定左侧和右侧布局的最大最小宽度，这样可以保证在不同设备下主栏的宽度，同时也保证左右两栏不会太小。
比较常见的应用应该是网站首页的三栏布局类型，一般是两边的侧边栏会设定一个最大最小宽度，中间为主栏，这样不管如何缩放都能突出主栏，且侧边栏也不会缩太小影响观感




