



# 一、`iframe`

## 概念

`iframe`是 `HTML` 中的一个标签，它允许在当前网页中嵌入另一个网页。通过设置 `iframe`的`src`属性，可以指定要嵌入的网页地址。被嵌入的网页在一个独立的窗口中显示，与主页面相对隔离，有自己独立的 `DOM` 树、`CSS` 样式和 `JavaScript` 执行环境。

## 场景

- **第三方内容嵌入**：很多网站会使用 `iframe`来嵌入第三方的地图、视频播放器等内容。例如，在一个旅游网站的酒店介绍页面，通过 `iframe`嵌入百度地图，让用户可以直观地看到酒店的地理位置；在视频分享网站中，使用 `iframe`嵌入视频播放代码，方便用户在不离开当前页面的情况下观看视频。
- **广告嵌入**：广告商通常会提供一段包含在 `iframe`中的广告代码，网站所有者只需将这段代码插入到自己的页面中，就可以在指定位置展示广告。这样可以保证广告内容的独立性和安全性，同时也便于广告商进行管理和统计。

## 优点

- **内容隔离**：`iframe`中的内容与主页面的内容相互隔离，包括 `CSS` 样式、`JavaScript` 代码和 `DOM` 结构等。这意味着嵌入的内容不会影响主页面的布局和功能，也不会被主页面的代码所干扰，大大降低了样式和脚本冲突的风险。
- **易于集成**：只需要一个标签和一个`src`属性，就可以将外部内容嵌入到当前页面中，非常简单方便。对于一些简单的嵌入需求，几乎不需要额外的开发工作。

## 缺点

### 1、路由状态丢失

当浏览器刷新页面时，`iframe`的当前路由状态会丢失。比如，你在页面中使用了一个 ，`iframe`内部加载了某个子页面。这个`iframe`的 `URL` 有一段路由路径：

```js
http://your-domain.com/container
       └── iframe src="http://child-app.com/#/dashboard"
```

你在 `iframe`内部导航到了一个`profile`页面，路由状态变成了

```js
http://your-domain.com/container
       └── iframe src="http://child-app.com/#/profile"
```

这时候你刷新整个浏览器页面（即父页面），**`iframe`又重新加载了它最初的 `src URL`，原来的路由状态（比如 `/profile`）会丢失**，`iframe`的路由状态又回到了`http://child-app.com/#/dashboard`

#### 为什么路由状态会丢失？

`iframe`加载的是一个子页面，它自己内部维护自己的路由状态。**当你刷新父页面时，整个 `DOM` 被重建**，包括 `iframe`标签本身。所以它的 `src` 会重新被设置成你原先的值（比如 `http://child-app.com/#/dashboard`），不会记得你用户之前在 `iframe`里导航到了 `/profile`

#### 解决办法

把 `iframe`的路由状态同步到父应用的 URL，在`iframe`加载时同步回`iframe`。

让父页面记录 `iframe`的状态，比如：

```bash
http://your-domain.com/container?childRoute=/profile
```

然后在加载 `iframe`时拼接这个路由:

```html
<iframe src={`http://child-app.com/#${childRoute}`}></iframe>
```

- 你可能会问，`iframe`的路由状态怎么同步到父应用的URL上呢？

  我们可以重写掉`iframe window`上的`pushState/replaceState`方法，以及监听`hashchange/popstate`事件，把`iframe`的路由状态作为参数写到主应用的URL上。伪代码如下：

```js
const iframeWindow = iframe.contentWindow;
 const history = iframeWindow.history;
 history.pushState = function (data, title, url: string) {
  syncUrlToWindow(iframeWindow);  // syncUrlToWindow 负责把iframe路由写到主应用的URL上
 }
 history.replaceState = function (data, title, url: string) {
  syncUrlToWindow(iframeWindow);
 }
 iframeWindow.addEventListener("hashchange", () => syncUrlToWindow(iframeWindow));
 iframeWindow.addEventListener("popstate", () => {
    syncUrlToWindow(iframeWindow);
  });
```

### 2、`DOM`割裂严重，弹窗只能在`iframe`内部展示

每个`iframe`或子应用有自己独立的`window`，`document`，`CSS`样式表，`JS`作用域。当你在 `iframe`内部调用代码，比如：

```js
document.body.appendChild(modalElement);
```

弹窗只会出现在`iframe`内部，无法穿透`iframe`显示在整个主页面（父页面）上方。你想要一个弹窗遮罩整个页面（全局），结果它只遮住了小小的 `iframe`区域。

#### 为什么无法覆盖？

**`iframe` 是一个完整的独立页面（`document`）** ，和父页面是两个完全分离的 `DOM` 世界。弹窗的定位和层级（如 `position: fixed`、`z-index`）只能作用在当前 document，即`iframe`的`document`上。

#### 解决办法

弹窗放在主应用，由子应用触发。子应用通过 `postMessage` 或全局事件总线发出事件或消息，主应用监听并渲染弹窗，**弹窗 `DOM` 节点实际挂在主应用 `DOM` 上**

```js
// 子应用发消息
window.parent.postMessage({ type: 'OPEN_MODAL', data: {...} }, '*');
```

```
// 主应用监听
window.addEventListener('message', (event) => {
  if (event.data.type === 'OPEN_MODAL') {
    showGlobalModal(event.data.data);
  }
});
```

### 3、`iframe web`应用之间通信困难

浏览器出于安全目的实施了同源策略，**同源**是指协议、域名、端口都相同。当`iframe`的协议、域名和端口与主页面都相同时，我们把它叫做同源`iframe`，否则，叫做跨越`iframe`。

同源策略给`iframe`与主页面之间的通信带来了困难，尤其是跨域`iframe`。主页面无法直接访问跨域`iframe`页面的 `DOM`、`JS` 对象等，会抛出安全错误。

#### 跨域`iframe`与主页面的通信

虽然困难，但不是不可能。我们可以使用`HTML5`提供的官方跨域通信机制`postMessage API`。

**`postMessage API`**

由主页面调用`postMessage`发出消息：

```js
iframe.contentWindow.postMessage('hello', 'https://iframe-domain.com');
```

被嵌入的 `iframe` 页面监听消息：

```js
window.addEventListener('message', (event) => {
  // 安全校验
  if (event.origin === 'https://your-main-domain.com') {
    console.log(event.data);
  }
});
```

#### 同源`iframe`与主页面的通信

主页面和同源`iframe`之间的通信是比较简单的，**可以直接通过 `JavaScript` 访问彼此的对象和方法**，没有跨域限制。

**主页面访问`iframe`**

```html
<!-- 主页面 -->
<iframe id="myIframe" src="/child.html"></iframe>
```

主页面 `JavaScript`：

```ini
const iframe = document.getElementById('myIframe');

// 调用 iframe 中暴露的方法
iframe.onload = () => {
  iframe.contentWindow.sayHelloFromParent && iframe.contentWindow.sayHelloFromParent();
};
```

`iframe` 页面（`/child.html`）：

```html
<script>
  // 被主页面调用的方法
  function sayHelloFromParent() {
    alert('Hello from parent!');
  }
</script>
```

**`iframe`调用主页面方法（向主页面发送消息）** 主页面定义方法：

```html
<script>
  window.sayHelloFromIframe = function () {
    alert('Hello from iframe!');
  };
</script>
```

`iframe` 页面中访问：

```js
// iframe 中的 JS
window.parent.sayHelloFromIframe && window.parent.sayHelloFromIframe();
```

### 4、`iframe` 加载`SPA`应用白屏时间过长

这个问题常见于基于 `iframe` 的微前端架构或嵌入式系统中。对于 `SPA`（`Single Page Application`）应用来说，`iframe` 每次加载都重新初始化一整个应用，导致白屏时间长、用户体验差。

下面是一些常见的优化方案，可以有效减少 `iframe` 白屏时间：

#### 预加载 `iframe` 

提前创建隐藏的 `iframe` 并加载目标页面，等用户点击或需要显示时再展示。示例：

```ini
<iframe id="app-frame" src="about:blank" style="display: none;"></iframe>

<script>
  const iframe = document.getElementById("app-frame");
  iframe.src = "https://your-spa-app.com"; // 提前加载
  iframe.onload = () => {
    // 等加载完成后再展示
    iframe.style.display = "block";
  };
</script>
```

#### 使用 `Loading Skeleton` / 占位动画

在 `iframe` 加载时展示骨架屏或 `loading` 动画，减少“白屏感知”。我们可以分两步来实现：

- `iframe` 容器层级内加一层 `loading` 遮罩层；
- 监听 `iframe.onload` 后移除遮罩。

#### 使用 `keep-alive iframe` 或 `sandbox` 缓存技术

如果使用微前端框架（如 `Qiankun`、`Wujie`），可以启用 **子应用保活** 机制：

- 子应用第一次加载后，把`iframe`相关的`DOM`保持在内存中；
- 后续切换时直接切回 `DOM`，不重新初始化。

