# 前言

`react-router` 等前端路由的原理大致相同，就是页面的URL发生改变时，页面的显示结果可以根据`URL`的变化而变化，但是页面不会刷新

如何实现这个功能，那么我们需要解决两个核心问题

- 如何改变 `URL` 却不引起页面刷新？
- 如何监测 `URL` 变化？

在前端路由的实现模式有两种模式，`hash` 和 `history` 模式，本文将以这两种模式进行讲解

# 前端路由

## `hash` 模式

- `hash` 是 `url` 中 `hash` (#) 及后面的部分，常用锚点在页面内做导航，改变 `url` 中的 `hash` 部分不会引起页面的刷新
- 通过 `hashchange` 事件监听 `URL` 的改变。改变 `URL` 的方式只有以下几种：通过浏览器导航栏的前进后退、通过`<a>`标签、通过`window.location`，这几种方式都会触发`hashchange`事件

```tsx
function onLoad() {
  routeView = document.getElementById('routeView')
  changeView()
}

function changeView() {
  routeView = document.getElementById('routeView')
  
  switch (location.hash) {
    case '#/home':
      routeView.innerHTML = 'home'
      break;
    case '#/about':
      routeView.innerHTML = 'about'
      break;
  }
}

window.addEventListener('DOMContentLoaded', onLoad)
window.addEventListener('hashchange', changeView)
```

## `history` 模式

- `history` 提供了 `pushState` 和 `replaceState` 两个方法，这两个方法改变 `URL` 的 `path` 部分不会引起页面刷新
- 通过 `popchange` 事件监听 `URL` 的改变。需要注意只在通过浏览器导航栏的前进后退改变 `URL` 时会触发`popstate`事件，**通过标签和`pushState/replaceState`不会触发`popstate`方法**。但我们可以拦截`<a>`标签的点击事件和`pushState/replaceState`的调用来检测 `URL` 变化，也是可以达到监听 `URL` 的变化

```tsx
/**
 * state：一个与指定网址相关的状态对象， popstate 事件触发时，该对象会传入回调函数。如果不需要可填 null。
 * title：新页面的标题，但是所有浏览器目前都忽略这个值，可填 null。
 * path：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个地址。
 */
history.pushState(state,title,path)

// 修改当前的 history 对象记录， history.length 的长度不会改变
history.replaceState(state,title,path)


// 监听路由
window.addEventListener('popstate',function(e){
    /* 监听改变 */
})
```

`history.pushState` 可以使浏览器地址改变，但是无需刷新页面。

需要注意的是：用 `<a>`标签、 `pushState` 或者 `history.replaceState` 不会触发 `popstate` 事件。 `popstate` 事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮或者调用 `history.back()`、`history.forward()`、`history.go()`方法。

# `React Router`

有了上面的铺垫，`react-router`也就随之诞生了，`react-router`就是基于上述两种模式分别做了实现。

## 架构

`react-router`源码目前分四个包：

- `react-router`： `react-router`的核心包，下面的三个包都基于该包；
- `react-router-dom`：`react-router`用于`web`应用的包；
- `react-router-v5-compat`：如其名，为了兼容`v5`版本；
- `react-router-native`：用于`rn`项目；

除此之外，`react-router`还重度依赖一个他们团队开发的包`history`，该包主要用于配合宿主操作路由变化。

## `history`

这里讲的`history`是`react-router`开发团队开发的`history`包，不是浏览器的`history`。当然，`history`包也是依托浏览器的`history`的`API`，最终返回的就是一个包装过后的`history对`象。

```ts
export interface History {

  readonly action: Action;    // 操作类型

  readonly location: Location;    // location对象，包含state，search，path等

  createHref(to: To): string;    // 创建路由路径的方法，兼容非string类型的路径

  push(to: To, state?: any): void;    // 路由跳转指定路径

  replace(to: To, state?: any): void;    // 路由替换当前路由

  go(delta: number): void;    // 根据参数前进或后退

  back(): void;    // 类似浏览器后退按钮

  forward(): void;    // 类似浏览器前进按钮

  listen(listener: Listener): () => void;    // push和replace添加监听事件

  block(blocker: Blocker): () => void;    // push和replace添加拦截事件
}
```

![react1](.\images\react1.png)

- `history` 可以理解为 `react-router` 的核心，也是整个路由原理的核心，里面集成了`popState`、`pushState` 等底层路由实现的原理方法

- `react-router` 可以理解为是 `react-router-dom` 的核心，里面封装了`Router`，`Route`，`Switch`等核心组件,实现了从路由的改变到组件的更新的核心功能

- `react-router-dom` 是对 `react-router` 更上一层封装。添加了用于跳转的`Link`组件，以及基于 `history` 实现的 `BrowserRouter` 和 `HashRouter` 组件等

