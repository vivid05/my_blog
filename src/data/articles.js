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
    title: 'Vue3响应式系统的设计与实现',
    excerpt: 'Vue3的响应式系统是其实现核心之一，本文将带你深入了解其设计与实现...',
    date: '2023-08-10',
    cover: 'https://picsum.photos/id/3/800/450',
    category: '前端开发',
    readTime: '10分钟'
  },
  {
    id: 4,
    title: 'HTTP缓存机制',
    excerpt: 'HTTP缓存机制是前端性能优化中重要的一环，本文将带你深入了解其设计与实现...',
    date: '2025-06-18',
    cover: 'https://picsum.photos/id/3/800/450',
    category: '前端开发',
    readTime: '5分钟'
  },
  {
    id: 5,
    title: 'Git 分支合并自动化工具',
    excerpt: 'Git 分支合并自动化工具，本文将带你深入了解其设计与实现...',
    date: '2025-06-18',
    cover: 'https://picsum.photos/id/3/800/450',
    category: '工具',
    readTime: '5分钟'
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