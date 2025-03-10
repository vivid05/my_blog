export const articles = [
  {
    id: 1,
    title: '开始使用Vue3的Composition API',
    excerpt: 'Vue3的Composition API提供了更灵活的代码组织方式，本文将介绍如何开始使用它...',
    date: '2023-06-15',
    cover: 'https://picsum.photos/id/1/800/450',
    category: '前端开发',
    readTime: '5分钟'
  },
  {
    id: 2,
    title: '使用GSAP创建丝滑动画效果',
    excerpt: 'GSAP是一个强大的JavaScript动画库，可以帮助你创建流畅的网页动画...',
    date: '2023-07-22',
    cover: 'https://picsum.photos/id/2/800/450',
    category: '动画效果',
    readTime: '7分钟'
  },
  {
    id: 3,
    title: 'Vite构建工具的优势',
    excerpt: 'Vite是一个现代前端构建工具，相比传统工具有哪些优势？本文将为你详细解析...',
    date: '2023-08-10',
    cover: 'https://picsum.photos/id/3/800/450',
    category: '工具',
    readTime: '6分钟'
  },
  {
    id: 4,
    title: '响应式设计最佳实践',
    excerpt: '如何确保你的网站在各种设备上都能完美展示？本文分享响应式设计的关键技巧...',
    date: '2023-09-05',
    cover: 'https://picsum.photos/id/4/800/450',
    category: 'CSS',
    readTime: '8分钟'
  },
  {
    id: 5,
    title: 'JavaScript异步编程详解',
    excerpt: '从回调到Promise再到async/await，JavaScript异步编程的演进历程...',
    date: '2023-10-18',
    cover: 'https://picsum.photos/id/5/800/450',
    category: 'JavaScript',
    readTime: '10分钟'
  },
  {
    id: 6,
    title: 'CSS Grid布局完全指南',
    excerpt: 'CSS Grid是一个强大的布局工具，本文将带你全面了解如何使用它构建复杂布局...',
    date: '2023-11-22',
    cover: 'https://picsum.photos/id/6/800/450',
    category: 'CSS',
    readTime: '9分钟'
  }
]

// 获取所有文章分类
export const getCategories = () => {
  const categories = new Set(articles.map(article => article.category))
  return ['全部', ...Array.from(categories)]
}

// 根据分类获取文章
export const getArticlesByCategory = (category) => {
  if (category === '全部') {
    return articles
  }
  return articles.filter(article => article.category === category)
}

// 根据ID获取文章
export const getArticleById = (id) => {
  return articles.find(article => article.id === id)
} 