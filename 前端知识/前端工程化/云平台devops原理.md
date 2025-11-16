# 一、问题引入

在企业里，直接在云平台新建前端容器服务单元，填写该服务单元对应的域名以及码云仓库，容器生成后会自动绑定一个新建的流水线，当代码提交后会主动触发流水线，流水线运行成功将本地的静态文件复制到`docker`中，自动重启`docker`，访问域名看到页面变化，这整个过程的底层实现原理是什么，详细解释。

这是一个典型的 **企业级前端应用自动化交付场景**。虽然用户操作看似简单（填表 → 提交代码 → 访问域名看到更新），但其背后是一套高度集成的 **云原生 `DevOps` 自动化体系**，融合了 **`Git` 触发、`CI/CD` 编排、容器构建、`Kubernetes` 部署、`Ingress` 路由、服务治理** 等多项核心技术。

下面我们将从 **服务创建 → 流水线绑定 → 代码触发 → 构建部署 → 域名访问** 全链路，逐层拆解其底层实现原理。

# 二、整体架构概览

![package39](.\images\package39.png)

# 三、阶段详解：底层实现原理

## 1、阶段 1️⃣：新建服务单元 + 自动绑定流水线

#### 用户操作：

- 在云平台（如阿里云 `ACK` 控制台、腾讯云 `TKE` 或自研 `PaaS`）点击“新建前端服务”
- 填写：
  - 服务名：`marketing-site`
  - 域名：`site.corp.com`
  - 码云仓库：`https://gitee.com/team/marketing-site`

#### 平台自动执行：

##### 1.1 创建内部流水线定义（`Pipeline Definition`）

平台在后台创建一个 **流水线对象**（可能是 `Jenkins Job`、`Tekton Pipeline`、或自研引擎任务），并记录元数据：

```
{
  "pipeline_id": "pl-marketing-site-2025",
  "git_repo": "https://gitee.com/team/marketing-site",
  "build_type": "frontend-vue",
  "target_namespace": "prod-frontend",
  "domain": "site.corp.com"
}
```

##### 1.2 向码云仓库注入 `CI` 配置文件（关键！）

平台通过 **`Gitee OpenAPI` + 机器人账号 `Token`**，向仓库根目录写入 `.gitee-ci.yml`（或其他 `CI` 文件）：

```
# .gitee-ci.yml
stages:
  - build
  - package
  - deploy

build:
  image: node:18-alpine
  script:
    - npm install
    - npm run build   # 输出到 dist/ 目录

package:
  image: docker:20-dind
  services:
    - docker:20-dind
  script:
    - echo "$HARBOR_PASSWORD" | docker login harbor.corp.com -u robot --password-stdin
    - docker build -t harbor.corp.com/frontend/marketing-site:$CI_COMMIT_SHA .
    - docker push harbor.corp.com/frontend/marketing-site:$CI_COMMIT_SHA

deploy:
  image: bitnami/kubectl
  script:
    - |
      cat <<EOF > deployment.yaml
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: marketing-site
        namespace: prod-frontend
      spec:
        replicas: 2
        selector:
          matchLabels:
            app: marketing-site
        template:
          metadata:
            labels:
              app: marketing-site
          spec:
            containers:
            - name: nginx
              image: harbor.corp.com/frontend/marketing-site:$CI_COMMIT_SHA
              ports:
              - containerPort: 80
              readinessProbe:
                httpGet:
                  path: /
                  port: 80
                initialDelaySeconds: 3
      ---
      apiVersion: v1
      kind: Service
      metadata:
        name: marketing-site-svc
        namespace: prod-frontend
      spec:
        selector:
          app: marketing-site
        ports:
        - port: 80
          targetPort: 80
      ---
      apiVersion: networking.k8s.io/v1
      kind: Ingress
      metadata:
        name: marketing-site-ingress
        namespace: prod-frontend
        annotations:
          kubernetes.io/tls-acme: "true"
      spec:
        tls:
        - hosts:
          - site.corp.com
          secretName: marketing-site-tls
        rules:
        - host: site.corp.com
          http:
            paths:
            - path: /
              pathType: Prefix
              backend:
                service:
                  name: marketing-site-svc
                  port:
                    number: 80
      EOF
    - kubectl apply -f deployment.yaml
```

> 🔑 关键点：
>
> - 所有 `K8s` 资源（`Deployment/Service/Ingress`）**动态生成并内联在 `CI` 脚本中**；
> - 镜像标签使用 `$CI_COMMIT_SHA`（`Git` 提交 `ID`），确保**不可变、可追溯**；
> - 使用 `kubectl apply` 实现声明式部署。

#####  1.3 配置 `Gitee Webhook`（自动触发）

平台调用 `Gitee API`，为该仓库添加 `Webhook`：

```
POST https://gitee.com/api/v5/repos/team/marketing-site/hooks
Body:
{
  "url": "https://ci-platform.corp.com/webhook/gitee/pl-marketing-site-2025",
  "push_events": true,
  "token": "webhook-secret-xxx"
}
```

未来每次 `git push`，`Gitee` 都会 `POST` 通知 `CI` 平台。

##### 1.4 预配置 `DNS` 与 `TLS`（可选）

- 若企业已配置泛解析：`*.corp.com → `，则无需操作；
- 否则平台调用云 `DNS API` 添加 `A` 记录；
- `Ingress` 中启用 `TLS`，`cert-manager` 自动申请 `Let's Encrypt` 证书。

## 2、阶段 2️⃣：代码提交 → 触发流水线

#### 开发者操作：

```
git add .
git commit -m "update banner"
git push origin main
```

#### 底层触发机制：

1. `Gitee` 检测到 `push` 事件；

2. 向预设 `Webhook URL` 发送 `HTTP POST`：

   ```
   {
     "ref": "refs/heads/main",
     "after": "a1b2c3d4e5f6...",
     "repository": { "name": "marketing-site", "clone_url": "..." }
   }
   ```

3. `CI` 平台验证签名后，启动对应流水线任务（在隔离的 Pod 中运行）。

## 3、阶段 3️⃣：流水线执行（构建 + 部署）

#### 步骤 3.1：构建静态文件

- 在 `Node` 容器中执行 `npm run build`；
- 生成 `dist/index.html`, `dist/assets/...`。

#### 步骤 3.2：构建 `Docker` 镜像

- 使用内置`Dockerfile`（若无则平台提供默认）：

  `dockerfile`

  ```
  FROM nginx:alpine
  COPY dist/ /usr/share/nginx/html/
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
  ```

- 构建并推送镜像：

  ```
  docker build -t harbor.corp.com/frontend/marketing-site:a1b2c3d .
  docker push harbor.corp.com/frontend/marketing-site:a1b2c3d
  ```

#### 步骤 3.3：部署到 `Kubernetes`（核心！）

##### 目标

将新构建的 `Docker` 镜像（含最新静态文件）部署到 `Kubernetes` 集群，并**平滑替换旧版本 `Pod`**，确保服务不中断。

##### 触发动作

`CI/CD` 系统执行：

```
kubectl apply -f deployment.yaml
```

其中 `deployment.yaml` 包含 **`Deployment + Service + Ingress`** 三个资源，关键字段如下：

```
# Deployment 片段
spec:
  template:
    spec:
      containers:
      - name: nginx
        image: harbor.corp.com/frontend/marketing-site:a1b2c3d  # ← 新镜像
```

##### 底层执行流程详解

###### 1️⃣ **`API Server` 接收并持久化期望状态**

- `kubectl` 将 `YAML` 转为 `JSON`，发送到 **`kube-apiserver`**；
- `apiserver`：
  - 验证用户权限（`RBAC`）；
  - 校验资源合法性；
  - 将对象写入 **`etcd`**（`Kubernetes` 的唯一事实源）。

> ✅ 此时，集群的“期望状态”已更新：**所有 `Pod` 都应使用新镜像 `a1b2c3d`**。

------

###### 2️⃣ **`Deployment Controller` 启动滚动更新（`Rolling Update`）**

`Kubernetes` 采用 **控制器模式（`Controller Pattern`）**：

- **`Deployment Controller`** 在后台持续运行；
- 它通过 **`watch` 机制** 监听 `etcd` 中 `Deployment` 的变化；
- 检测到 `spec.template.spec.containers[0].image` 发生变更 → 触发更新。

🔄 **滚动更新策略（默认）：**

```
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 25%   # 最多允许 25% 的 Pod 不可用
    maxSurge: 25%         # 最多允许超出 replicas 的 25%
```

假设 `replicas: 2`，则更新过程如下：（`replicas`：是指在集群中运行的相同容器实例数量，用于实现服务的高可用性和负载均衡）

| 步骤 | 操作                                        | Pod 状态        |
| ---- | ------------------------------------------- | --------------- |
| 初始 | 2 个旧 `Pod`（`v1`）                        | ✅✅              |
| 1    | 创建 1 个新 `Pod`（`v2`）                   | ✅✅➕（3 个）     |
| 2    | 等待新 `Pod` 就绪（`Readiness Probe` 成功） | ✅✅✅             |
| 3    | 删除 1 个旧 `Pod`                           | ✅✅（2 个 `v2`） |
| 4    | 创建第 2 个新 `Pod`                         | ✅✅➕             |
| 5    | 删除最后一个旧 `Pod`                        | ✅✅（全部 `v2`） |

> ⚡ 整个过程 **始终至少有 2 个可用 `Pod`**（满足 `maxUnavailable=25%`），实现零停机。

------

###### 3️⃣ **`ReplicaSet` 版本管理**

- `Deployment` **不直接管理 `Pod`**，而是通过 **`ReplicaSet`** 间接控制；
- 每次镜像变更，都会创建 **新的 `ReplicaSet`**：

```
$ kubectl get rs -n prod-frontend
NAME                          DESIRED   CURRENT   READY
marketing-site-6b7c8d9       0         0         0     # 旧版本（已缩容）
marketing-site-a1b2c3d       2         2         2     # 新版本
```

> 🔁 这种设计使得 **回滚极其简单**：只需将 `Deployment` 指向旧 `ReplicaSet`。

------

###### 4️⃣ **`Pod` 调度与启动**

- 新 `Pod` 被创建后处于 `Pending` 状态；
- **`kube-scheduler`** 为其选择合适的 `Worker Node`；
- 目标节点上的`kubelet`：
  - 拉取新镜像：`docker pull harbor.corp.com/...:a1b2c3d`
  - 启动容器（运行 `Nginx`，`serve /usr/share/nginx/html/`）

------

###### 5️⃣ **健康检查决定是否接入流量**

`Deployment` 中配置了 **就绪探针（`Readiness Probe`）**：

```
readinessProbe:
  httpGet:
    path: /
    port: 80
  initialDelaySeconds: 3
```

- `kubelet` 定期访问 `http://PodIP/`；
- **只有返回 200，`Pod` 才被视为“就绪”**；
- 未就绪的 `Pod` **不会被加入 `Service` 的 `Endpoints`**，因此**不会收到任何流量**。

> ✅ 这是保证用户体验的关键：**绝不把请求打到未准备好的容器**。

------

###### 6️⃣ **`Service Endpoints` 自动更新**

- `EndpointSlice Controller`

  （在 `kube-controller-manager` 中）：

  - 监听 `Pod`  状态变化；
  - 当新 `Pod`  就绪，自动将其 `IP` 加入 `marketing-site-svc` 的 `Endpoints`；
  - 当旧 `Pod`  终止，自动移除其 `IP`。

```
$ kubectl get endpoints marketing-site-svc -n prod-frontend
NAME                   ENDPOINTS                         AGE
marketing-site-svc     10.244.1.10:80,10.244.2.15:80    1m
```

> 🌐 此时，**Service 的负载均衡目标已完全切换到新版本 `Pod`**。

## 4、阶段 4️⃣：访问域名看到页面变化

**在企业中，当你新建一个 `Docker` 容器服务单元并“输入一个自己命名的域名”时，这个域名并不会直接绑定到容器，而是通过一套标准化的流量治理基础设施（如 `Kubernetes Ingress`）实现“逻辑绑定”。
 容器与域名之间是“间接、动态、声明式”的关系，底层依赖 `DNS` + 负载均衡 + 反向代理三层解耦**

###  4.1、容器与域名的真实关系（不是一对一！）

| 概念                       | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| **你输入的域名**           | 如 `user-service.corp.com` —— 是**服务的访问入口标识**       |
| **`Docker` 容器（`Pod`）** | 实际运行应用的实例，通常**没有公网 `IP`**，也不直接暴露      |
| **真实绑定对象**           | 域名最终绑定的是 **`Kubernetes Service` 或 `Ingress` 资源**，而非容器本身 |

> ✅ **关系本质**：
>  **域名 → `Ingress` 规则 → `Service` → 一组容器（`Pods`）**
>  这是一个 **`1 : N` 的动态映射**，支持扩缩容、蓝绿发布等。

### 4.2、`Service` 名称的来源：必须先有 `Service`

`Kubernetes` 的流量模型是：

> **`Pod` ←（被）← `Service` ←（被引用）← `Ingress`**

因此：

1. 你先要有一个运行应用的 **`Deployment`（或 `StatefulSet`）**；
2. 然后创建一个 **`Service`**，通过 `selector` 关联到该 `Deployment` 的 `Pod`；
3. 最后在 **`Ingress`** 中引用这个 `Service` 的名字。

#### 示例流程：

##### 步骤 1️⃣：创建 `Deployment`（运行容器）

```
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-web-app          # ← Deployment 名称
spec:
  selector:
    matchLabels:
      app: my-web           # ← 标签（关键！）
  template:
    metadata:
      labels:
        app: my-web         # ← Pod 携带此标签
    spec:
      containers:
      - name: app
        image: my-web:1.0
        ports:
        - containerPort: 8080
```

##### 步骤 2️⃣：创建 `Service`（暴露服务）

```
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-web-svc          # ← 这就是 Service 名称！
spec:
  selector:
    app: my-web             # ← 必须匹配 Pod 的标签
  ports:
    - protocol: TCP
      port: 80              # Service 对外端口
      targetPort: 8080      # Pod 实际端口
```

##### 步骤 3️⃣：创建 `Ingress`（对外暴露）

```
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        backend:
          service:
            name: my-web-svc   # ← 引用上面定义的 Service 名称！
            port:
              number: 80
```

> 🔑 **结论**：
>  **`Ingress` 中的 `service.name` = 你在 `service.yaml` 中定义的 `metadata.name`。**

####  三、`Service` 是谁创建的？

##### 情况 1️⃣：开发者手动创建（初级）

- 开发者自己写 `service.yaml` 和 `ingress.yaml`；
- 在 `CI/CD` 中一起部署。

##### 情况 2️⃣：通过 `Helm/Kustomize` 模板生成（中级）

- 使用 `Helm Chart`，`Service` 名称由模板变量控制：

  ```
  # templates/service.yaml
  metadata:
    name: {{ include "mychart.fullname" . }}-svc
  ```

- 开发者只需在 `values.yaml` 中指定基础名。

##### 情况 3️⃣：平台自动生成（高级）

- 在内部开发者平台（`IDP`）中：
  - 开发者填写“服务名：`user-service`”；
  - 平台自动生成：
    - `Deployment`（`user-service`）
    - `Service`（`user-service` 或 `user-svc`）
    - `Ingress`（引用该 `Service` 名）

> 💡 **无论哪种方式，`Service` 名称都是“先定义、后引用”的显式资源。**

### 4.3、`Ingress` 

`Ingress` 资源是 `Kubernetes` 中用于**管理集群外部访问服务（通常是 `HTTP/HTTPS`）的 `API` 对象**。它的核心原理是：**通过声明式配置，将外部流量按规则路由到集群内部的服务（`Service`）**。

但 `Ingress` 本身**只是一个配置规范**，真正实现流量转发的是 **`Ingress Controller`**。下面从 **设计思想、工作原理、组件协作和实际流程** 四个层面彻底讲清 `Ingress` 资源的原理。

#### 核心设计思想：解耦“规则”与“实现”

`Kubernetes` 采用 **“接口 + 实现”** 的经典架构：

| 组件                     | 角色               | 类比                       |
| ------------------------ | ------------------ | -------------------------- |
| **`Ingress`（资源）**    | 声明“我要怎么路由” | 菜单（点菜：我要宫保鸡丁） |
| **`Ingress Controller`** | 执行路由逻辑的程序 | 厨师（根据菜单做菜）       |

> ✅ **`Ingress` 只是 `YAML` 配置，不干活；
>  `Ingress Controller` 才是真正监听端口、解析 `Host`、转发流量的进程。**

#### `Ingress` 配置来源

##### 模式一：开发者手动提供（传统方式）

###### 适用场景：

- 初创团队、小公司
- 未建设内部开发者平台（`IDP`）
- 使用原生 `Kubernetes`

###### 流程：

1. 开发者自己编写`ingress.yaml`：

   ```
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: my-app
     annotations:
       kubernetes.io/ingress.class: "nginx"
   spec:
     rules:
     - host: my-app.corp.com    # ← 开发者自己填域名
       http:
         paths:
         - path: /
           pathType: Prefix
           backend:
             service:
               name: my-app-svc
               port:
                 number: 80
   ```

2. 将该文件放入 `Git` 仓库；

3. `CI/CD` 流水线部署时一并应用（`kubectl apply -f ingress.yaml`）。

###### 优点：

- 灵活，可定制高级路由规则（如路径、`Header` 匹配）

###### 缺点：

- 容易出错（拼写错误、格式问题）
- 域名管理混乱（重复申请、命名不规范）
- `TLS` 证书需手动处理

> 🔸 **此时：`Ingress` 资源由新建容器的人（开发者）提供。**

##### 模式二：半自动生成（模板化）

###### 适用场景：

- 中型企业，有基础 `DevOps` 平台
- 使用 `Helm`、`Kustomize` 等模板工具

###### 流程：

1. 平台提供标准化 `Helm Chart` 模板：

   ```
   # templates/ingress.yaml
   {{- if .Values.ingress.enabled }}
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: {{ include "mychart.fullname" . }}
   spec:
     rules:
     - host: {{ .Values.ingress.host }}   # ← 从 values.yaml 注入
       http:
         paths:
         - path: {{ .Values.ingress.path }}
           backend:
             service:
               name: {{ include "mychart.fullname" . }}
               port:
                 number: {{ .Values.service.port }}
   {{- end }}
   ```

2. 开发者只需在`values.yaml`中填写：

   ```
   ingress:
     enabled: true
     host: order.corp.com    # ← 只填域名，不写完整 YAML
   ```

###### 优点：

- 减少重复代码
- 强制规范（如必须用 `.corp.com` 后缀）

> 🔸 **此时：`Ingress` 结构由平台提供，域名由开发者指定，最终 `YAML` 自动生成。**

#####  模式三：全自动创建（企业级平台）

###### 适用场景：

- 大型企业（如阿里、腾讯、字节）
- 有完善的 `Internal Developer Platform (IDP)`

###### 流程：

1. 开发者在内部平台点击 **“新建服务”**；
2. 填写表单：
   - 服务名称：`user-service`
   - 是否对外暴露： 是
   - 域名：`user.corp.com`（或自动生成 `user-service.prod.corp.com`）
3. 平台自动：
   - 校验域名合规性（是否已存在、是否符合命名规范）
   - 在 `GitOps` 仓库中生成完整的 `Kubernetes Manifest`（含 `Ingress`）
   - 提交 `PR` 或直接部署
   - 自动申请 `TLS` 证书（通过 `cert-manager`）
   - 配置监控告警（按域名维度）

###### 示例：平台生成的 `Ingress`（对开发者透明）

```
# 自动生成，开发者无需关心
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: user-service
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts: ["user.corp.com"]
    secretName: user-corp-com-tls
  rules:
  - host: user.corp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: user-service
            port:
              number: 8080
```

#### 优点：

- **零 `YAML` 编写**，降低认知负担
- **强一致性**：所有服务 `Ingress` 配置统一
- **安全合规**：自动集成 `TLS`、`WAF`、认证等策略

> 🔸 **此时：`Ingress` 资源完全由平台自动生成，开发者只提供“意图”（如域名）。**

###### 📊 对比总结

| 维度                 | 手动编写            | 模板化            | 全自动生成   |
| -------------------- | ------------------- | ----------------- | ------------ |
| **谁提供 Ingress？** | 开发者              | 开发者 + 平台模板 | 平台         |
| **开发者工作量**     | 高（写完整 `YAML`） | 中（填 `values`） | 低（填表单） |
| **标准化程度**       | 低                  | 中                | 高           |
| **适合团队规模**     | < 10 人             | 10~100 人         | > 100 人     |
| **是否推荐**         | ❌ 仅学习/临时用     | ✅ 中小型团队      | ✅ 大型企业   |

### 4.4、从域名到容器的过程解析

#### 第 1 层：`DNS`（域名解析）

- 企业会预先将 `*.corp.com` 的 `DNS` 记录指向一个 **固定的公网 `IP` 或 `VIP`**；

- 这个 `VIP` 实际是云厂商的负载均衡器（`Load Balancer`），例如：

  - `AWS: Application Load Balancer (ALB)`
  - 阿里云: `Server Load Balancer (SLB)`
  - `GCP: Cloud Load Balancing`

- 比如，企业通常配置泛域名解析：

  ```
  *.corp.com  →  203.0.113.10   （指向云负载均衡器 VIP）
  ```

> ✅ 用户访问 `app.corp.com` → `DNS` 解析到 `LB` 的 `IP` → 流量进入 `LB`。

#### 第 2 层：云负载均衡器（`Load Balancer`）

- 由云厂商提供（`AWS ALB`、阿里云 `SLB` 等）；
- 接收公网流量，转发到集群内的 **`Ingress Controller Pod`**；
- 提供高可用、`DDoS` 防护、`TLS` 卸载（可选）。

#### 第 3 层：`Ingress Controller`（智能路由中枢）

- 运行在 `Kubernetes` 集群中的专用 `Pod`（如 `nginx-ingress-controller`）；
- **监听所有 `Ingress` 资源变化**；
- 根据 `Ingress` 配置，**自动生成反向代理规则**。

##### 示例： Ingress 资源

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: user-service
spec:
  rules:
  - host: user-service.corp.com   # ← 你命名的域名
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: user-svc        # ← 指向你的 Service
            port:
              number: 8080
```

 `Ingress Controller` 会动态更新其内部 `Nginx` 配置：

```
server {
    server_name user-service.corp.com;
    location / {
        proxy_pass http://user-svc.namespace.svc.cluster.local:8080;
    }
}
```

#### 第 4 层：`Kubernetes Service`（服务发现）

- `user-svc` 是一个 `ClusterIP` 类型的 `Service`；
- 自动维护后端 `Pod` 列表（通过 `label selector`）；
- 提供负载均衡（轮询、会话保持等）。

### 4.5、完整请求流程（以访问为例）

1. 用户浏览器访问 `https://user-service.corp.com`
2. `DNS` 返回 `203.0.113.10`（云 `LB` 的 `VIP`）
3. 请求到达云 `LB`，`LB` 将流量转发到 `Ingress Controller Pod`
4. `Ingress Controller` 匹配 `Host: user-service.corp.com`
5. 匹配到你的 `Ingress` 规则，将请求代理到 `user-svc:8080`
6. `Kubernetes Service` 将请求负载均衡到某个 `user-app Pod`
7. 容器处理请求并返回响应

> ✅ **全程无需知道容器 `IP`、数量、位置** —— 全部由平台自动管理。

```
+---------------------+
|   用户浏览器        |
|  https://site.corp.com  |
+----------+----------+
           |
           v
+---------------------+
|      DNS            | → 解析到 SLB IP
+----------+----------+
           |
           v
+---------------------+
|  云负载均衡器 (SLB)  | → 转发到 Ingress Controller
+----------+----------+
           |
           v
+---------------------+
| Ingress Controller  | → 匹配 host，转发到 Service
+----------+----------+
           |
           v
+---------------------+
|  Kubernetes Service | → 负载均衡到“就绪”的 Pod
+----------+----------+
           |
           v
+---------------------+     +----------------------------+
|   Pod (容器)         |<--->| 镜像: harbor/...:a1b2c3d    |
|                     |     | 文件: /html/index.html (新)|
|  Nginx              |     +----------------------------+
|  serve /html/       |
+---------------------+
```



### 4.6、为什么企业要这样设计？

| 优势         | 说明                                                     |
| ------------ | -------------------------------------------------------- |
| **解耦**     | 域名与具体容器解耦，支持无缝扩缩容                       |
| **标准化**   | 所有服务统一接入方式，降低运维复杂度                     |
| **安全**     | `TLS` 终止、`WAF`、认证可在 `Ingress` 层统一实施         |
| **可观测性** | 日志、监控按域名聚合（如 `user-service.corp.com` `QPS`） |
| **自助化**   | 开发者只需声明域名，平台自动完成网络配置                 |

### 4.7、自动化平台如何实现“输入域名即用”？

大型企业通常有 **内部开发者平台（`Internal Developer Platform, IDP`）**：

1. 开发者填写表单：
   - 服务名：`payment-service`
   - 域名：`payment.corp.com`
   - 环境：`prod/staging`
2. 平台自动生成并部署：
   - `Git` 仓库模板（含 `Ingress YAML`）
   - `CI/CD` 流水线
   - `Kubernetes Deployment + Service + Ingress`
3. 首次部署后：
   - `Ingress Controller` 自动加载新规则
   - `DNS` 已泛解析，立即可访问

>  **开发者视角**：“我只告诉系统我要什么域名”，
>  **平台视角**：“我自动搞定 `DNS`、`LB`、`Ingress`、证书、路由”。

### 4.8、重要澄清

| 误解               | 正确理解                                       |
| ------------------ | ---------------------------------------------- |
| “域名直接指向容器” | ❌ 域名指向 `LB` → `Ingress` → `Service` → 容器 |
| “每个容器一个域名” | ❌ 一个域名对应一组容器（副本），支持弹性伸缩   |
| “不用 `Nginx`”     | ❌ 用了，但封装在 `Ingress Controller` 中       |
| “手动配置反向代理” | ❌ 全部通过声明式 `API（Ingress）`自动化        |

### 4.9、总结

| 问题                         | 答案                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| **容器和域名的关系？**       | **间接绑定：域名 → `Ingress` → `Service` → 容器组**          |
| **底层原理？**               | **`DNS` 泛解析 + 云负载均衡 + `Ingress Controller（Nginx/Envoy）` + `Kubernetes Service`** |
| **为什么能“输入域名就用”？** | **企业通过标准化平台将网络配置自动化、声明化**               |
| **是否每个容器独占域名？**   | ❌ 否，一个域名服务多个容器副本，支持高可用                   |

> 💡 **现代云原生的本质**：
>  **把基础设施能力封装成“产品”，让开发者像使用 `SaaS` 一样使用 `Kubernetes`。**
>  你“输入域名”，平台“交付服务”——这就是企业级 `DevOps` 的威力。



# `pod`是什么？

**`Pod` 是 `Kubernetes` 中最小的可部署和可调度的计算单元。**

它不是一个容器，而是一个 **包含一个或多个相关容器的逻辑组**，这些容器共享网络、存储和运行上下文。

#### 关键特性：

- **原子调度单位**：`K8s` 调度的是 `pod`，不是容器；
- **共享网络命名空间**：`pod`内所有容器共享同一个 `IP` 和端口空间；
- **共享存储卷（`Volume`）**：容器间可通过挂载同一 `Volume` 共享文件；
- **短暂性（`Ephemeral`）**：`pod`被删除后，`IP`、本地存储都会丢失；
- **由控制器管理**：生产中通常由 `Deployment`、`StatefulSet` 等创建和维护

#### `Pod` 的核心特性详解

##### 1️⃣ 共享网络（`Network Namespace`）

- `Pod` 被分配一个 **唯一的 `IP` 地址**（如 `10.244.1.10`）；
- `Pod` 内所有容器共享该 `IP` 和端口空间；
- 容器间通过 `localhost` 互相访问。

✅ 示例：

- `nginx` 监听 80 端口；
- `log-agent` 容器可通过 `curl http://localhost:80/healthz` 检查状态。

> 🔒 不同 `Pod` 之间网络隔离，即使在同一节点。

##### 2️⃣ 共享存储（`Volume`）

`Pod` 可定义 `Volume`，并挂载到多个容器：

```
volumes:
- name: shared-data
  emptyDir: {}  # 临时目录，Pod 存活期间存在

containers:
- name: app
  volumeMounts:
  - name: shared-data
    mountPath: /data

- name: backup
  volumeMounts:
  - name: shared-data
    mountPath: /backup
```

> 🗂️ 常见 `Volume` 类型：
>
> - `emptyDir`：临时存储（`Pod`  删除即丢）；
> - `configMap` / `secret`：注入配置或密钥；
> - `persistentVolumeClaim`（`PVC`）：持久化存储（用于数据库等）。

#### 3️⃣ 生命周期（短暂性）

`Pod` 是 **短暂的（`Ephemeral`）**：

- 一旦被删除，无法恢复；
- `IP` 地址会被回收；
- 本地存储（非 `PVC`）数据丢失。

因此：

- **不要在 `Pod` 内存储重要数据**；  
- **不要依赖 `Pod` `IP` 进行服务发现**（应使用 `Service`）。

> ✅ 正确做法：用 **`Deployment`** 管理 `Pod` ，实现自动重建、滚动更新、扩缩容。

#### 为什么需要 `Pod`？——设计哲学

你可能会问：**“为什么不让 `Kubernetes` 直接调度容器？”**

答案：**为了支持“紧密协作的容器组”这一模式。**

##### 典型多容器场景（`Sidecar` 模式）：

| 场景     | 主容器     | `Sidecar` 容器       | 协作方式                   |
| -------- | ---------- | -------------------- | -------------------------- |
| 日志收集 | `Web` 应用 | `Fluentd / Filebeat` | 共享日志目录 `Volume`      |
| 证书刷新 | `Nginx`    | `cert-manager agent` | 共享 `TLS` 证书 `Volume`   |
| 配置同步 | `App`      | `git-sync`           | `Sidecar` 拉代码到共享目录 |
| 服务网格 | `App`      | `Envoy (Istio)`      | 通过 `localhost` 代理流量  |

>  `Pod` 提供了 **“协同定位 + 共享上下文”** 的执行环境，这是单容器无法实现的。

## 1、`Kubernetes` 不调度“裸容器”

- `Docker` 可以直接 `docker run nginx` 启动一个容器；
- **但 `Kubernetes` 没有“运行容器”的 `API`**，只有 **“创建 `Pod`”** 的 `API`；
- 容器必须作为 **`Pod` 的一部分** 被定义和管理。

## 2、最小调度单位是 `Pod`

- 当你需要运行一个 `Nginx` 实例，你写的是：

  ```
  apiVersion: v1
  kind: Pod
  metadata:
    name: my-web
  spec:
    containers:
    - name: nginx
      image: nginx:alpine
  ```

- 然后执行：

  ```
  kubectl apply -f pod.yaml
  ```

- `Kubernetes` 会在某个节点上启动这个 Pod，Pod 内部启动 `nginx` 容器。

> 🔄 所以：**要运行一个容器，就必须创建一个 Pod 来“包裹”它。**

## 3、但要注意：`Pod` ≠ 只能有一个容器

虽然大多数场景（尤其是前端）是 **1 `Pod` : 1 容器**，但 `Pod` 本身支持多容器：

```
spec:
  containers:
  - name: nginx          # 主应用
    image: nginx
  - name: log-collector  # Sidecar 辅助容器
    image: fluentd
  - name: metrics-agent  # 监控代理
    image: prometheus-node-exporter
```

> 这仍然是 **1 个 `Pod`**，但包含 **3 个容器**，它们共享网络和存储。

## 4、生产环境：你其实不直接创建 `Pod`！

虽然技术上可以 `kubectl run` 或写 `Pod YAML`，但**生产中几乎从不直接操作 `Pod`**，原因如下：

| 问题               | 说明                       |
| ------------------ | -------------------------- |
| **`Pod` 是短暂的** | `Pod` 被删除后不会自动恢复 |
| **无法扩缩容**     | 不能动态增加副本数         |
| **无滚动更新**     | 更新镜像需手动删建         |

### 正确做法：用控制器管理 `Pod`

- **`Deployment`**（最常用）：管理无状态应用（如前端、`API`）
- **`StatefulSet`**：管理有状态应用（如数据库）
- **`DaemonSet`**：每台节点跑一个 `Pod`（如日志采集）

#### 示例：用 `Deployment` 创建 `Pod`

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-portal
spec:
  replicas: 3                # 要 3 个副本
  template:                  # Pod 模板
    spec:
      containers:
      - name: nginx
        image: harbor.corp.com/web:v1
```

`Kubernetes` 会自动创建 **3 个 `Pod`**，每个 `Pod` 运行 **1 个 `nginx` 容器**。

```
$ kubectl get pods
NAME                           READY   STATUS
web-portal-7d5b8c9f4-abc12    1/1     Running
web-portal-7d5b8c9f4-def34    1/1     Running
web-portal-7d5b8c9f4-ghi56    1/1     Running
```

> 🔁 这里：**1 个 `Deployment` → `N` 个 `Pod` → 每个 `Pod` 1 个容器**

## 5、一个镜像可以生成多个容器实例和`pod`有啥关系？

> **一个 `Docker` 镜像可以被用来创建多个容器；
>  在 `Kubernetes` 中，这些容器必须被组织在 `pod` 中；
>  因此，“多个容器实例” = “多个 `pod`”（通常每个 `pod`包含一个该镜像的容器）。**

| 概念                         | 说明                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| **`Docker` 镜像（`Image`）** | 只读模板，包含应用代码、运行时、依赖、配置等（如 `nginx:1.25`） |
| **容器（`Container`）**      | 镜像的运行实例，是操作系统上的一个进程                       |
| **`Pod`**                    | `Kubernetes` 的最小调度单元，可包含 1 到 `N` 个共享网络/存储的容器 |

### 5.1、关系详解

#### 场景：你有一个前端镜像

```
harbor.corp.com/frontend/web-portal:v1
```

你想运行 **3 个副本** 来支撑高并发访问。

##### ❌ 错误理解：

> “`Kubernetes` 直接用这个镜像启动 3 个容器。”

##### ✅ 正确理解：

> **`Kubernetes` 创建 3 个 `Pod`，每个 `Pod` 中运行 1 个基于该镜像的容器。**

![package40](.\images\package40.png)

> 🔑 **每个 Pod 是独立的，拥有自己的 IP、文件系统、资源配额。**

### 5.2、为什么不能“一个 `Pod` 里跑多个相同业务容器”？

你可能会问：

> “既然 `Pod` 能放多个容器，为什么不把 3 个 `nginx` 容器塞进同一个 `Pod`？”

**答案：不推荐，违背设计原则。**

#### 原因如下：

| 问题             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| **调度粒度太粗** | `Pod`是调度单位。如果 3 个容器在一个 `Pod`，`K8s` 只能整体调度到一台机器，无法分散负载 |
| **扩缩容不灵活** | 你想从 3 扩到 4？必须新建一个 `Pod`，但 `Pod`内容器数固定，无法动态增减 |
| **资源隔离差**   | 3 个容器共享 `CPU/Memory` 限制，一个 `OOM` 会导致整个 `Pod`被杀 |
| **高可用风险**   | `Pod`所在节点宕机 → 3 个实例同时挂掉                         |

> ✅ **最佳实践：一个 Pod = 一个主业务容器 + （可选）辅助容器（如日志采集 sidecar）**

### 5.3、实际工作流程（以 `Deployment` 为例）

当你在云平台创建前端服务并设置 `replicas: 3`，底层发生：

```
# deployment.yaml
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: nginx
        image: harbor.corp.com/frontend/web-portal:v1  # ← 同一个镜像
```

`Kubernetes` 会：

1. 创建 **1 个 `ReplicaSet`**；
2. `ReplicaSet` 创建 **3 个 `Pod`**；
3. 每个 `Pod`启动 **1 个容器**，使用相同的镜像 `web-portal:v1`；
4. 这 3 个 `Pod`被调度到不同节点（如果资源允许），实现负载分散和高可用。

```
$ kubectl get pods
NAME                            READY   STATUS    RESTARTS
web-portal-7d5b8c9f4-abc12     1/1     Running   0
web-portal-7d5b8c9f4-def34     1/1     Running   0
web-portal-7d5b8c9f4-ghi56     1/1     Running   0
```

> 虽然容器来自同一镜像，但它们是 **3 个独立进程，运行在 3 个独立沙箱（`Pod`）中**。

### 5.4、类比理解

| 类比项       | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| **镜像**     | 蛋糕模具（定义蛋糕长什么样）                                 |
| **容器**     | 用模具烤出的一个蛋糕                                         |
| **`Pod`**    | 一个托盘，通常只放一个蛋糕（业务容器），但也可以放蛋糕+叉子+纸巾（`sidecar`） |
| **多个实例** | 烤 3 个蛋糕 → 需要 3 个托盘（3 个 `Pod`），不能把 3 个蛋糕硬塞进 1 个托盘（除非特殊需求） |

> 💡 记住：
>  **镜像是“模板”，容器是“实例”，`Pod`是 `Kubernetes` 管理容器的“包装盒”。**
>  要扩展服务？—— **增加 `Pod`数量，而不是往一个 `Pod` 里塞更多容器。**

## 6、`pod`和域名？

**一个 `pod`本身并不“拥有”域名，**是否能通过多个域名访问同一个 `pod`，**完全取决于上层的路由配置（如 `Ingress`、`Service`、负载均衡器等）**。

### 6.1、为什么 `pod`和域名没有直接绑定？

#### 1️⃣ `pod`是底层计算单元

- `pod`是 `Kubernetes` 中运行容器的**最小调度单位**；
- 它只有 **`IP` 地址**（如 `10.244.1.10`），没有域名属性；
- `pod`生命周期短暂，`IP` 会变，**不能直接用 `IP` 或 `pod`名称对外提供服务**。

#### 2️⃣ 域名访问靠的是“服务抽象层”

用户访问的是：

```
https://site-a.corp.com  → Ingress → Service → Pod
https://site-b.corp.com  → Ingress → Service → 同一个 Pod（或同一组 Pod）
```

> 🔑 **只要路由规则指向同一个后端 `Service`，多个域名就可以共享同一组 `Pod`。**

### 6.2、实际场景：一个 `Pod`（组）支持多个域名

#### 场景示例

你有一个前端应用 `marketing-site`，希望同时通过以下域名访问：

- `www.corp.com`
- `campaign.corp.com`
- `promo.corp.com`

它们都展示**相同的内容**（比如同一个活动页）。

#### 实现方式：配置一个 `Ingress` 支持多个 `Host`

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: multi-domain-ingress
spec:
  rules:
  - host: www.corp.com          # ← 域名1
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: marketing-site-svc
            port:
              number: 80
  - host: campaign.corp.com     # ← 域名2
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: marketing-site-svc   # ← 指向同一个 Service
            port:
              number: 80
  - host: promo.corp.com        # ← 域名3
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: marketing-site-svc   # ← 还是同一个 Service
            port:
              number: 80
```

#### 结果：

- 三个域名都解析到 **同一个 `Ingress Controller` 的 `IP`**；
- `Ingress` 根据 `HTTP` 请求头中的 `Host` 字段，将流量路由到 **同一个 Service**；
- `Service` 负载均衡到 **同一组 `Pod`**（比如 `marketing-site-xxx`）；
- 用户访问任一域名，看到的都是**同一个前端页面**（由相同的 `Pod` 提供）。

> ✅ **一个 `Pod`（组） → 多个域名，完全可行！**

## 7、新建一个容器的时候就是新建一个 `pod` ？

- **如果你是在 `Kubernetes` 环境下**：✅ 是的，新建一个业务容器，就意味着新建一个 `Pod`（通常 1:1）。
- **如果你是在纯 `Docker` 环境下**：❌ 不是，`Docker` 可以直接运行容器，无需 `Pod`。
- **但在云平台（如阿里云 `ACK`、腾讯云 `TKE`）新建“前端容器服务”时**：
  平台底层会为你创建 **`Deployment` → 自动创建 `Pod` → `Pod` 启动容器**，
  所以对你来说，“新建服务 = 新建一组 `Pod`（每个含一个容器）”。

> 在 `Kubernetes` 体系中：
>  **“容器”不能独立存在，必须属于某个“`pod` ”；
>  因此，要运行一个新容器，就必须创建（或由控制器创建）一个新的 `pod` 。**

这就是为什么我们常说：

> **`pod` 是 `Kubernetes` 中最小的部署和调度单元，而不是容器。**