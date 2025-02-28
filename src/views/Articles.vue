<script setup>
import { ref, onMounted, computed } from 'vue'
import { useMotion } from '@vueuse/motion'
import gsap from 'gsap'

const pageTitle = ref(null)
const articlesList = ref(null)

// 示例文章数据
const articles = ref([
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
])

// 分类列表
const categories = ref([
  '全部',
  '前端开发',
  'JavaScript',
  'CSS',
  '动画效果',
  '工具'
])

const selectedCategory = ref('全部')

// 根据分类筛选文章
const filteredArticles = computed(() => {
  if (selectedCategory.value === '全部') {
    return articles.value
  }
  return articles.value.filter(article => article.category === selectedCategory.value)
})

// 设置动画
const titleMotion = useMotion(pageTitle, {
  initial: {
    opacity: 0,
    y: 50
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 200,
      duration: 600
    }
  }
})

const listMotion = useMotion(articlesList, {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1,
    transition: {
      delay: 400,
      duration: 800
    }
  }
})

onMounted(() => {
  // 文章卡片动画
  const cards = document.querySelectorAll('.article-card')
  gsap.fromTo(cards, 
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.6, 
      stagger: 0.15,
      ease: 'power2.out'
    }
  )
})
</script>

<template>
  <div class="articles-page">
    <div class="page-header">
      <h1 ref="pageTitle" class="page-title">博客文章</h1>
      <p class="page-description">探索前端开发的各种话题和技术分享</p>
    </div>

    <div class="categories-filter">
      <button 
        v-for="category in categories" 
        :key="category"
        :class="['category-btn', { active: selectedCategory === category }]"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div class="articles-container" ref="articlesList">
      <router-link 
        v-for="article in filteredArticles" 
        :key="article.id" 
        :to="`/articles/${article.id}`" 
        class="article-card"
      >
        <div class="article-image">
          <img :src="article.cover" :alt="article.title">
          <div class="article-category">{{ article.category }}</div>
        </div>
        <div class="article-content">
          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-excerpt">{{ article.excerpt }}</p>
          <div class="article-meta">
            <span class="article-date">{{ article.date }}</span>
            <span class="article-read-time">{{ article.readTime }}阅读</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.articles-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.page-description {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.categories-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.category-btn {
  padding: 0.5rem 1.2rem;
  border-radius: 30px;
  border: 2px solid #667eea;
  background: transparent;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover {
  background-color: rgba(102, 126, 234, 0.1);
}

.category-btn.active {
  background-color: #667eea;
  color: white;
}

.articles-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
}

.article-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
}

.article-image {
  height: 220px;
  position: relative;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.1);
}

.article-category {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(118, 75, 162, 0.9);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.article-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.article-title {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.3;
}

.article-excerpt {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #888;
}

.article-read-time {
  background-color: #f3f4f6;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .articles-container {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2.2rem;
  }
  
  .categories-filter {
    gap: 0.5rem;
  }
  
  .category-btn {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
}
</style>