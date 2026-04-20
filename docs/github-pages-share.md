# GitHub Pages 交互式大屏分享方案

## 目标

GitHub README 不能执行 JavaScript，也会过滤 iframe，因此不能在 README 内部直接运行 Vue/ECharts 交互图表。本项目采用的方式是：

1. 将大屏项目部署到 GitHub Pages。
2. 大屏页面通过 URL 参数读取目标仓库。
3. 用户在 README 中放一个链接或徽章。
4. 访问者点击后进入 GitHub Pages 页面，在页面中使用完整交互能力。

## 技术实现

### 1. 使用 hash 路由

GitHub Pages 是静态托管，直接刷新前端 history 子路径时容易返回 404。项目已将 Vue Router 改为 hash 路由：

```js
createWebHashHistory(process.env.BASE_URL)
```

因此线上链接格式为：

```text
https://<github-user>.github.io/<repo-name>/#/?repo=<owner>/<repo>
```

示例：

```text
https://0213cc.github.io/king_of_disgust/#/?repo=ant-design/ant-design
```

### 2. 通过 repo 参数指定仓库

首页会读取路由 query 中的 `repo` 参数：

```text
#/?repo=apache/spark
```

读取后会提交到 Vuex：

```js
this.$store.commit('setCurrentRepository', repo)
```

各图表组件监听 `currentRepository` 后重新请求 OpenDigger 数据。

### 3. 生产构建使用相对 publicPath

`vue.config.js` 中生产环境使用：

```js
publicPath: './'
```

这样构建产物可部署在 GitHub Pages 的项目子路径下，例如：

```text
https://<github-user>.github.io/king_of_disgust/
```

### 4. DataV 构建补丁

当前依赖 `@jiaminghi/data-view` 中有两个模板不符合 Vue 3 生产构建规则，会导致 `npm run build` 失败。项目新增了安装后补丁：

```text
scripts/patch-datav.js
```

并通过 `package.json` 的 `postinstall` 自动执行。GitHub Actions 中执行 `npm ci` 后会自动修正依赖包模板，然后再构建。

### 5. README 徽章与链接

页面右下角新增“分享”按钮，会基于当前仓库生成三种内容：

- README 徽章
- README 普通链接
- 当前大屏 URL

徽章示例：

```md
[![OpenDigger Dashboard](https://img.shields.io/badge/OpenDigger-Dashboard-6c07f1)](https://0213cc.github.io/king_of_disgust/#/?repo=ant-design/ant-design)
```

普通链接示例：

```md
[查看 ant-design/ant-design 交互式数据大屏](https://0213cc.github.io/king_of_disgust/#/?repo=ant-design/ant-design)
```

## GitHub Pages 部署

项目已新增 GitHub Actions workflow：

```text
.github/workflows/deploy-pages.yml
```

它会在推送到 `main` 或 `master` 分支时执行：

1. 安装依赖。
2. 执行 `npm run build`。
3. 上传 `dist`。
4. 部署到 GitHub Pages。

## 你需要做什么

1. 将代码推送到 GitHub 仓库。
2. 打开仓库的 `Settings`。
3. 进入 `Pages`。
4. 在 `Build and deployment` 中选择 `GitHub Actions`。
5. 推送到 `main` 或 `master`，或手动运行 `Deploy GitHub Pages` workflow。
6. 等待 Actions 成功后，访问 Pages 地址：

```text
https://<github-user>.github.io/<repo-name>/
```

7. 拼接目标仓库参数：

```text
https://<github-user>.github.io/<repo-name>/#/?repo=<owner>/<repo>
```

8. 打开页面右下角“分享”，复制 README 徽章或链接。

## 用户怎么使用

其他用户不需要安装插件，也不需要部署你的项目。他们只需要把生成的 Markdown 放到自己的 README 中：

```md
[![OpenDigger Dashboard](https://img.shields.io/badge/OpenDigger-Dashboard-6c07f1)](https://<github-user>.github.io/<repo-name>/#/?repo=<owner>/<repo>)
```

访问者点击徽章后会进入你的 GitHub Pages 大屏页面，页面会自动加载对应仓库的数据，并保留所有网页端交互能力。

## 限制

- README 中不能原地交互，只能作为入口。
- GitHub Pages 只能托管静态前端，不能运行服务端截图、缓存、数据库等逻辑。
- 数据请求依赖 OpenDigger API 可访问。
- 如果仓库名无效，页面会保持当前数据并提示错误。
