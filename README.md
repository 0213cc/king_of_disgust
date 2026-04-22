# King of Disgust

> 面向 GitHub 仓库的交互式开源数据可视化大屏。

<p align="center">
  <a href="https://github.com/0213cc/king_of_disgust/stargazers">
    <img src="https://img.shields.io/github/stars/0213cc/king_of_disgust?style=for-the-badge" alt="stars" />
  </a>
  <a href="https://github.com/0213cc/king_of_disgust/network/members">
    <img src="https://img.shields.io/github/forks/0213cc/king_of_disgust?style=for-the-badge" alt="forks" />
  </a>
  <a href="https://github.com/0213cc/king_of_disgust/issues">
    <img src="https://img.shields.io/github/issues/0213cc/king_of_disgust?style=for-the-badge" alt="issues" />
  </a>
  <a href="https://github.com/0213cc/king_of_disgust">
    <img src="https://img.shields.io/badge/Vue%203-DataV-6c07f1?style=for-the-badge" alt="vue3 datav" />
  </a>
</p>

<p align="center">
  <a href="https://0213cc.github.io/king_of_disgust/"><strong>在线预览</strong></a>
  ·
  <a href="https://0213cc.github.io/king_of_disgust/#/?repo=ant-design/ant-design"><strong>示例大屏</strong></a>
  ·
  <a href="https://github.com/0213cc/king_of_disgust/issues"><strong>反馈问题</strong></a>
</p>

`King of Disgust` 是一个基于 Vue 3 构建的 GitHub 开源项目数据看板。它通过 OpenDigger 数据接口，将仓库的活跃度、代码变更、贡献者分布等指标组织成适合展示、分享和快速浏览的大屏视图。

## Preview

在线访问入口：

- 项目首页：https://0213cc.github.io/king_of_disgust/
- 示例仓库：https://0213cc.github.io/king_of_disgust/#/?repo=ant-design/ant-design

进入页面后，输入任意 GitHub 仓库名 `owner/repo` 即可切换数据大屏。

## Screenshots

![King of Disgust Preview](src/assets/Bg.gif)

适合用在这些场景：

- 快速查看一个开源仓库最近是否活跃
- 在课程、汇报、路演中展示项目数据
- 为自己的仓库 README 提供一个可点击进入的可视化入口
- 对比不同 GitHub 项目的社区活跃度和协作情况

## Features

- 仓库级数据大屏：输入 `owner/repo` 即可切换目标仓库
- 多维指标展示：聚合展示 Star、Fork、Issue、PR 等核心数据
- 趋势与活跃度分析：通过图表查看时间变化与项目波动
- 贡献者词云：快速识别高频贡献者与社区参与情况
- 代码变更统计：直观看到提交与改动节奏
- 大屏布局：适合投屏、演示、展示墙和课堂场景
- 分享友好：自动生成 README 徽章、链接和可访问 URL

## What It Shows

项目当前主要包含以下可视化内容：

- 核心仓库指标总览
- 活跃度卡片图表
- 贡献者词云
- 趋势流图
- 代码变更统计
- 活跃度/降雨式分布图

这些视图适合回答几个常见问题：

- 这个仓库最近是不是还在持续维护？
- 社区讨论和协作是否活跃？
- 最近的代码变更是否集中或稳定？
- 主要贡献者和参与者是谁？

## How To Use

如果你只是想使用这个项目，而不是参与开发，流程非常简单：

1. 打开页面
2. 输入或拼接目标仓库名，格式为 `owner/repo`
3. 直接查看交互式数据大屏
4. 需要分享时，使用页面右下角的“分享”按钮生成链接或徽章

支持通过 URL 直接指定仓库：

```text
https://<github-user>.github.io/<repo-name>/#/?repo=<owner>/<repo>
```

例如：

```text
https://0213cc.github.io/king_of_disgust/#/?repo=ant-design/ant-design
```

## README Share

如果你希望在自己的仓库 README 中放一个可视化入口，可以直接使用徽章或普通链接。

徽章示例：

```md
[![OpenDigger Dashboard](https://img.shields.io/badge/OpenDigger-Dashboard-6c07f1)](https://0213cc.github.io/king_of_disgust/#/?repo=ant-design/ant-design)
```

普通链接示例：

```md
[查看 ant-design/ant-design 交互式数据大屏](https://0213cc.github.io/king_of_disgust/#/?repo=ant-design/ant-design)
```

更完整的分享说明见 [docs/github-pages-share.md](/Users/heail/dase/king_of_disgust/docs/github-pages-share.md)。

## Why This Project

很多 GitHub 仓库数据工具更偏表格化、搜索式或分析页风格，而这个项目更强调：

- 一屏展示
- 演示友好
- 视觉聚合
- 低门槛分享

它不是为了替代 GitHub 原生页面，而是为了在“展示”和“快速理解”这个场景下提供更强的可视化表达。

## Tech Stack


- Vue 3
- Vue Router
- Vuex
- ECharts
- DataV
- Element Plus
- Axios

## Notes

- 数据展示依赖 OpenDigger 相关接口可正常访问
- 推荐使用桌面端浏览器访问，展示效果更稳定
- 更适合在大屏、宽屏或投影场景下浏览


