# 🌟 VIVI小屋 - 个人博客

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.13-green)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-blue)](https://vitejs.dev/)
[![Vue Router](https://img.shields.io/badge/Vue%20Router-4.5.0-green)](https://router.vuejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12.7-88ce02)](https://greensock.com/gsap/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

一个基于 Vue 3 + Vite 构建的现代化个人博客网站，具有优雅的设计、流畅的动画和响应式布局。

## ✨ 特色功能

### 🎨 设计特色

- **现代化界面**：采用简洁现代的设计风格
- **响应式布局**：完美适配桌面端和移动端
- **毛玻璃效果**：支持 backdrop-filter 的精美头部导航
- **流畅动画**：基于 GSAP 和 VueUse Motion 的丝滑动画效果
- **渐变配色**：优雅的紫蓝色渐变主题

### 📝 内容管理

- **Markdown 支持**：使用 marked.js 解析 Markdown 文章
- **代码高亮**：集成 highlight.js 支持多语言语法高亮
- **文章分类**：支持文章标签和分类管理
- **文章详情**：优雅的文章阅读体验

### 🚀 技术亮点

- **Vue 3 Composition API**：使用最新的 Vue 3 语法
- **Vite 构建**：极速的开发体验和构建速度
- **Pinia 状态管理**：轻量级的状态管理方案
- **VueUse 工具库**：丰富的 Vue 组合式函数
- **Progressive Enhancement**：渐进式增强的用户体验

## 🛠️ 技术栈

| 技术             | 版本    | 用途                |
| ---------------- | ------- | ------------------- |
| **Vue.js**       | 3.5.13  | 前端框架            |
| **Vite**         | 6.2.0   | 构建工具            |
| **Vue Router**   | 4.5.0   | 路由管理            |
| **Pinia**        | 3.0.1   | 状态管理            |
| **VueUse**       | 12.7.0  | 组合式函数库        |
| **GSAP**         | 3.12.7  | 动画库              |
| **Marked**       | 15.0.7  | Markdown 解析       |
| **Highlight.js** | 11.11.1 | 代码高亮            |
| **Gray Matter**  | 4.0.3   | Markdown 元数据解析 |

## 🚀 快速开始

### 📦 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 🔧 安装与运行

```bash
# 克隆项目
git clone <repository-url>
cd my_blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 🌐 访问应用

开发服务器启动后，在浏览器中访问：

- **本地开发**：http://localhost:5173
- **线上地址**：[https://vivid05.github.io/my_blog/]

## 📁 项目结构

```
my_blog/
├── public/                   # 静态资源
│   ├── *.txt                # 文章文件
│   └── vite.svg             # 图标
├── src/                     # 源代码
│   ├── assets/              # 资源文件
│   │   ├── *.png           # 图片资源
│   │   └── hero.jpg        # 首页背景图
│   ├── components/          # Vue 组件
│   │   └── markdownRenderer.vue  # 📝 Markdown 渲染组件
│   ├── data/               # 数据文件
│   │   └── articles.js     # 📚 文章数据配置
│   ├── router/             # 路由配置
│   │   └── index.js        # 🛣️ 路由定义
│   ├── views/              # 页面组件
│   │   ├── Home.vue        # 🏠 首页
│   │   ├── Articles.vue    # 📖 文章列表
│   │   ├── ArticleDetail.vue # 📄 文章详情
│   │   └── About.vue       # 👤 关于页面
│   ├── App.vue             # 🏠 根组件
│   ├── main.js             # 🚪 应用入口
│   └── style.css           # 🎨 全局样式
├── docs/                    # 构建输出目录
├── package.json            # 📦 项目配置
├── vite.config.js          # ⚙️ Vite 配置
└── README.md               # 📖 项目文档
```

## 🎨 界面预览

### 首页

- 🎯 英雄区域，展示个人简介
- 🌊 流畅的滚动动画效果
- 💫 渐变背景和现代化设计

### 文章页面

- 📚 文章列表，支持分类筛选
- 🏷️ 标签系统，便于内容组织
- 🔍 搜索功能（可扩展）

### 文章详情

- 📝 Markdown 渲染，支持代码高亮
- 🎨 优雅的排版和阅读体验
- 📱 移动端优化

### 关于页面

- 👤 个人介绍和联系方式
- 🛠️ 技能展示
- 📧 联系信息

## 📝 内容管理

### 添加新文章

1. **创建文章文件**：在 `public/` 目录下创建 `.txt` 文件
2. **配置文章信息**：在 `src/data/articles.js` 中添加文章元数据
3. **文章格式**：支持 Markdown 语法和 Front Matter

示例文章格式：

```markdown
---
title: 文章标题
date: 2025-01-01
tags: ['Vue', 'JavaScript']
---

# 文章标题

这里是文章内容...
```

### 文章配置

在 `src/data/articles.js` 中配置文章：

```javascript
export const articles = [
  {
    id: 1,
    title: '文章标题',
    summary: '文章摘要',
    date: '2025-01-01',
    tags: ['Vue', 'JavaScript'],
    filename: '1.txt' // 对应 public/ 下的文件
  }
]
```

## 🎯 功能特性

### 导航系统

- **固定头部**：毛玻璃效果的导航栏
- **移动端菜单**：汉堡菜单，支持触摸操作
- **活跃状态**：智能高亮当前页面
- **滚动隐藏**：向下滚动时自动隐藏导航

### 动画效果

- **页面过渡**：基于 Vue Router 的页面切换动画
- **元素动画**：使用 GSAP 的流畅元素动画
- **悬停效果**：精致的交互反馈
- **加载动画**：优雅的内容加载状态

### 响应式设计

- **断点适配**：支持各种屏幕尺寸
- **触摸优化**：移动端友好的交互设计
- **字体缩放**：自适应的字体大小
- **布局调整**：针对不同设备的布局优化

## 🔧 开发指南

### 自定义主题

在 `src/App.vue` 中修改 CSS 变量：

```css
:root {
  --primary-color: #667eea; /* 主色调 */
  --secondary-color: #764ba2; /* 辅助色 */
  --text-color: #333; /* 文本颜色 */
  --bg-color: #f8f9fa; /* 背景色 */
}
```

### 添加新页面

1. 在 `src/views/` 下创建新的 Vue 组件
2. 在 `src/router/index.js` 中添加路由配置
3. 在导航中添加对应链接

### 扩展功能

项目架构支持轻松扩展：

- **评论系统**：可集成 Gitalk、Valine 等
- **搜索功能**：支持全文搜索
- **RSS 订阅**：可添加 RSS 生成
- **SEO 优化**：可集成 meta 标签管理

## 🚀 部署

### GitHub Pages

```bash
# 构建项目
npm run build

# 部署到 gh-pages 分支
# docs/ 目录包含构建后的文件
```

### Vercel/Netlify

直接连接 GitHub 仓库，自动部署 `docs/` 目录。

### 自定义服务器

将 `docs/` 目录上传到你的服务器即可。

## 🌍 浏览器兼容性

| 浏览器  | 支持版本 |
| ------- | -------- |
| Chrome  | 88+      |
| Firefox | 78+      |
| Safari  | 14+      |
| Edge    | 88+      |

## 📈 性能优化

- **代码分割**：基于路由的懒加载
- **资源压缩**：Vite 自动压缩资源
- **Tree Shaking**：自动移除未使用代码
- **缓存策略**：合理的缓存配置

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 更新日志

### v1.0.0 (2025-01-XX)

- ✨ 初始版本发布
- 🎨 现代化界面设计
- 📝 Markdown 文章支持
- 📱 响应式布局
- 🎭 流畅动画效果
- 🚀 Vite 构建优化

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

---

⭐ 如果这个项目对你有帮助，请给它一个星标！

💡 如有问题或建议，欢迎提交 Issue 或 Pull Request。
