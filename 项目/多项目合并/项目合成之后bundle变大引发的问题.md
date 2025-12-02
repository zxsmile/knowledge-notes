# 一、问题引入

> 不同的子项目放在`dist`的不同目录，首次渲染时，需要把`bundle`全部加载进来吗？

**不需要。不同的子项目放在 `dist` 的不同目录，首次渲染时，并不会自动把所有子项目的 `bundle` 全部加载进来。**

是否加载某个子项目的资源，**完全取决于浏览器是否发起了对该子项目资源的请求**。而这个请求，是由你的**主应用如何集成这些子项目**决定的。

## 1、核心原则：**按需加载（`On-Demand Loading`）**

浏览器只会加载：

- 当前页面 `HTML` 中引用的资源（如 `<script>`、`<link>`）
- 通过 `JS` 动态请求的资源（如 `fetch()`、动态 `import()`）
- **`iframe` 的 `src` 指向的页面及其依赖**

只要你不主动引用或嵌入某个子项目，它的 `bundle` **根本不会被下载**。

# 二、 场景分析：不同集成方式下的加载行为

## 1、场景 1️⃣：主应用通过 **`iframe` 按需嵌入**

```
<!-- 主应用 index.html -->
<div id="container">
  <!-- 初始不渲染任何 iframe -->
</div>

<script>
// 用户点击“打开后台”时才加载
function openAdmin() {
  container.innerHTML = '<iframe src="/admin/index.html"></iframe>';
}
</script>
```

####  **加载行为**：

- 首次访问主站（`/`）：只加载 `dist/marketing/` 下的资源
- **`dist/admin/` 的任何文件都不会被请求**
- 只有调用 `openAdmin()` 后，浏览器才请求 `/admin/index.html` → 触发加载 `admin` 的 `JS/CSS`

#### **结论：完全按需，无浪费**

## 2、场景 2️⃣：主应用 **一次性渲染多个 `iframe`**

```
<iframe src="/app1/index.html"></iframe>
<iframe src="/app2/index.html"></iframe>
<iframe src="/app3/index.html"></iframe>
```

####  **加载行为**：

- 首次渲染时，**三个 `iframe` 会并行加载各自的 `index.html`**
- 浏览器会分别请求：
  - `/app1/index.html` → 加载 `app1` 的 `bundle`
  - `/app2/index.html` → 加载 `app2` 的 `bundle`
  - `/app3/index.html` → 加载 `app3` 的 `bundle`

####  **后果**：

- 即使用户只关心 `app1`，`app2/app3` 的资源也会被下载
- 总流量 = `app1 + app2 + app3`
- 首屏时间变长，内存占用高

####  **结论：非按需，`bundle` 膨胀问题真实存在**

## 场景 3️⃣：主应用通过 **`AJAX + innerHTML` 注入**（不推荐）

```
fetch('/dashboard/index.html')
  .then(res => res.text())
  .then(html => container.innerHTML = html);
```

####  **问题**：

- 虽然 `HTML` 被注入，但 `<script>` 标签**不会自动执行**
- 即使手动执行，`CSS/JS` 路径可能错误（相对路径失效）
- 无法保证子应用正常运行

####  **不推荐用于生产**

## 场景 4️⃣：主应用使用 **微前端框架（如 `qiankun`）**

- 子应用仍放在 `dist/app1/` 等目录

- 主应用通过配置注册子应用：

  ```
  registerMicroApps([
    { name: 'app1', entry: '/app1', ... }
  ]);
  ```

- **只有在路由匹配或手动启动时，才加载子应用资源**

 **加载行为**：按需加载，类似 `iframe`，但共享 `JS` 上下文（可共享依赖）

##  关键验证方法：看 `Network` 面板

你可以在 `Chrome DevTools` 的 **`Network`** 标签中观察：

1. 打开主站（`/`）
2. 查看是否有请求：
   - `/admin/main.js`
   - `/dashboard/assets/index.abcd1234.css`
3. 如果没有 → 说明未加载
4. 点击“进入后台”后，再看是否出现相关请求

> 💡 **事实依据：浏览器不会预读未引用的静态资源**

#  三、最佳实践建议

| 目标             | 做法                                                    |
| ---------------- | ------------------------------------------------------- |
| **避免全量加载** | `iframe` 或微前端按需挂载，不要一次性渲染所有子应用     |
| **减少重复依赖** | 若技术栈相同，考虑 `Module Federation` 共享 `React/Vue` |
| **优化首屏体验** | 主应用轻量化，子应用懒加载                              |
| **监控加载行为** | 使用 `Lighthouse` 或自定义性能埋点                      |

# 四、总结

> **只要你的主应用在首次渲染时不引用（如不设置 `iframe` 的 `src`，不动态 `import`，不 `script` 引入），那么其他子项目的 `bundle` 就完全不会被加载。**

**`bundle` 放在 `dist/app1/`、`dist/app2/` 只是物理存储位置，不影响加载逻辑。**
 **是否加载，`100%` 由主应用的运行时行为决定。**

因此，只要你采用 **按需集成策略**（如点击 `tab` 再加载对应 `iframe`），就能完美避免“首次渲染加载全部 `bundle`”的问题。

如果你能控制主应用的集成方式，**性能风险是可控的**。

# 五、`bundle` 放在 `dist/app1/`、`dist/app2/`是分包还是一个包

> **`bundle` 放在 `dist/app1/`、`dist/app2/` 属于「多个独立的包」（multiple separate bundles），不是「一个包的分包」（code-split chunks of a single bundle）。**

下面从 **构建产物、依赖关系、加载机制、缓存行为** 四个维度详细解释两者的本质区别。

## 1、你的场景：多个独立包（`Multiple Independent Bundles`）

#### 目录结构

```
dist/
├── app1/                # ← 项目 A 的完整构建产物
│   ├── index.html
│   ├── assets/main.a1b2c3.js
│   └── assets/vendor.x9y8z7.js
│
└── app2/                # ← 项目 B 的完整构建产物
    ├── index.html
    ├── assets/main.d4e5f6.js
    └── assets/vendor.g7h8i9.js
```

#### 特征

| 维度         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| **构建过程** | `app1` 和 `app2` 是**两个独立的构建任务**（如 `npm run build` 各自执行） |
| **依赖关系** | 无共享依赖分析，即使都用了 `React`，也会各自打包一份         |
| **入口文件** | 各自有 `index.html`，可独立运行                              |
| **资源隔离** | `JS/CSS` 完全独立，无交叉引用（除非手动写死路径）            |
| **部署方式** | 可单独部署到不同域名，也可聚合到同一镜像                     |

> 💡 这本质上是 **“多仓库”或“多应用”** 的物理聚合，**不是单应用的代码分割**。



## 2、对比：单个应用的分包（`Code Splitting / Chunking`）

这是 `Webpack`、`Vite` 等工具对**同一个项目**做的优化：

#### 目录结构（单项目）

```
dist/                    # ← 一个项目的构建产物
├── index.html
├── assets/
│   ├── main.abcd1234.js       # 主 bundle
│   ├── vendor.efgh5678.js     # 第三方依赖（split 出来）
│   ├── layout.ijkl9012.js     # 路由级 chunk（懒加载）
│   └── dashboard.mnop3456.js  # 另一个路由 chunk
```

####  特征

| 维度         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| **构建过程** | 一次构建，工具自动分析依赖并拆包                             |
| **依赖共享** | 所有 `chunk` 共享同一份 `React`、`Lodash`（通过 `splitChunks`） |
| **按需加载** | 主 `bundle` 小，其他 `chunk` 在路由切换时动态加载            |
| **强关联**   | 所有 `chunk` 必须配合使用，不能单独运行                      |

> 💡 这是 **“单体应用的性能优化手段”**，目标是减少首屏体积。

## 3、核心区别总结

| 对比项           | 多个独立包（你的场景）                  | 单个应用的分包               |
| ---------------- | --------------------------------------- | ---------------------------- |
| **项目数量**     | ≥2 个逻辑独立项目                       | 1 个项目                     |
| **构建命令**     | 多次 `build`（或并行）                  | 1 次 `build`                 |
| **依赖重复**     | ✅ 极可能重复（如 `React` 打包多次）     | ❌ 自动去重                   |
| **能否独立运行** | ✅ `dist/app1/index.html` 可直接打开     | ❌ `chunk` 无法单独运行       |
| **加载触发**     | 由主应用决定是否嵌入（如 `iframe src`） | 由路由/交互触发动态 `import` |
| **典型架构**     | 微前端（`iframe / qiankun`）            | 单体 `SPA +` 路由懒加载      |

##  4、举个生活化例子

- **多个独立包** → 就像你手机里装了 **微信、支付宝、淘宝** 三个 `App` 
  - 每个 `App` 都自带 `UI` 框架、网络库、图片资源
  - 打开微信不会加载支付宝的代码
  - 但三个 `App` 可能都内置了“腾讯 `X5` 内核”（重复）
- **单个应用的分包** → 就像 **微信内部的功能模块**
  - 首屏只加载聊天界面
  - 点“支付”时才下载支付模块代码
  - 所有模块共享微信底层框架（不重复）

## 5、总结

**`dist/app1/` 和 `dist/app2/` 是两个独立的 `bundle` 包，不是一个 `bundle` 的分包。**

这意味着：

-  它们可以**完全独立开发、构建、部署**
- 但会**重复打包公共依赖**（如 `React`、`Ant Design`）
- 首次渲染时**不会互相加载**（只要你主应用不主动引入）
- 总流量 = `app1 + app2`（无法像分包那样共享 `vendor`）

| 说法                                                 | 正确性 |
| ---------------------------------------------------- | ------ |
| “`dist/app1/` 和 `dist/app2/` 是一个 `bundle`的分包” | ❌ 错误 |
| “它们是两个独立构建的 `bundle`包”                    | ✅ 正确 |
| “首次渲染是否会加载全部？取决于主应用是否引用”       | ✅ 正确 |

## 6、 优化建议（针对独立包的重复问题）

如果 `app1` 和 `app2` 技术栈相同（如都是 `React`），可考虑：

#### 1、外置公共库（通过 `CDN`）

```
<!-- 所有子项目的 index.html 都引用 -->
<script src="https://cdn/react-18.js"></script>
```

→ 子项目构建时标记 `react` 为 `external`

#### 2、迁移到 `Module Federation`

- 共享依赖
- 按需加载 `remote` 模块
- 保留独立构建能力

#### 3、保持现状 + 接受重复

- 如果子项目访问频次低（如后台系统）
- 或团队完全独立，维护成本高于流量成本
- **`iframe` + 独立包仍是合理选择**

# 六、这些包生成一个镜像，那么包和镜像的关系是什么？

## 1、回答

> **这些“包”（`dist/app1/`, `dist/app2/` 等）是镜像的 内容（文件），而镜像本身是一个 可运行的容器模板，包含了这些包 + `Web` 服务器（如 `Nginx`） + 运行环境配置。**

换句话说：

- **包 = 静态资源（`HTML/JS/CSS`）**
- **镜像 = 静态资源 + 服务它们的 `Web` 服务器 + 启动指令**

##  2、详细拆解：从包到镜像的构建过程

#### 2.1、第一步：生成“包”（`Bundles`）

每个子项目独立构建，输出静态文件：

```
# 构建后
my-project/
└── dist/
    ├── app1/          # ← 包 1：营销站
    │   ├── index.html
    │   └── assets/main.a1b2c3.js
    └── app2/          # ← 包 2：管理后台
        ├── index.html
        └── assets/main.d4e5f6.js
```

✅ 这些“包”只是**普通文件**，不能自己运行，需要 `Web` 服务器提供服务。

#### 2.2、第二步：编写 `Dockerfile`（定义镜像结构）

```
# 使用轻量 Web 服务器作为基础
FROM nginx:alpine

# 将所有“包”复制进镜像的指定目录
COPY dist/ /usr/share/nginx/html/

# （可选）复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 镜像启动时自动运行 Nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### 2.3、第三步：构建镜像

```
docker build -t my-frontend-app:latest .
```

`Docker` 会：

1. 拉取 `nginx:alpine` 基础镜像（≈`7MB`）
2. 创建新层（`layer`），将你的 `dist/` 目录内容复制进去
3. 设置启动命令
4. 生成一个**完整、自包含**的镜像（例如 ≈`40MB`）

#### 2.4、第四步：运行容器（镜像 → 实例）

```
docker run -p 8080:80 my-frontend-app
```

此时：

- 容器内运行着 `Nginx`
- `Nginx` 的根目录是 `/usr/share/nginx/html/`
- 该目录下包含 `app1/` 和 `app2/` 所有文件
- 访问 `http://localhost:8080/app1/` → 返回 `app1/index.html`
- 访问 `http://localhost:8080/app2/` → 返回 `app2/index.html`

## 3、包与镜像的关系图示

![project14](..\images\project14.png)

