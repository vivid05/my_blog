<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useMotion } from '@vueuse/motion'
import gsap from 'gsap'
import { getCategories, getArticlesByCategory } from '../data/articles'

const pageTitle = ref(null)
const articlesList = ref(null)

// 分类列表
const categories = ref(getCategories())

const selectedCategory = ref('全部')

// 根据分类筛选文章
const filteredArticles = computed(() => {
  return getArticlesByCategory(selectedCategory.value)
})

// 添加事件监听器的函数
const addCardListeners = () => {
  const cards = document.querySelectorAll('.article-card')
  cards.forEach(card => {
    card.addEventListener('mousemove', e => handleMouseMove(e, card))
    card.addEventListener('mouseleave', () => handleMouseLeave(card))
  })
}

// 监听分类变化并执行动画
watch(selectedCategory, () => {
  nextTick(() => {
    const cards = document.querySelectorAll('.article-card')
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        scale: 1,
        y: 20
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        clearProps: 'all',
        onComplete: () => {
          // 动画完成后重新添加事件监听器
          addCardListeners()
        }
      }
    )
  })
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

// 处理卡片倾斜效果
const handleMouseMove = (event, card) => {
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = -((y - centerY) / 20)
  const rotateY = (x - centerX) / 20

  // 更新卡片的变换效果
  const inner = card.querySelector('.article-card-inner')
  inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

  // 更新渐变光效位置
  const xPercentage = Math.round((x / rect.width) * 100)
  const yPercentage = Math.round((y / rect.height) * 100)
  card.style.setProperty('--x', `${xPercentage}%`)
  card.style.setProperty('--y', `${yPercentage}%`)
  card.style.setProperty('--gradient-opacity', '1')
}

const handleMouseLeave = card => {
  const inner = card.querySelector('.article-card-inner')
  inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'
  card.style.setProperty('--gradient-opacity', '0')
}

onMounted(() => {
  // 文章卡片动画
  const cards = document.querySelectorAll('.article-card')
  gsap.fromTo(
    cards,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      onComplete: () => {
        // 初始加载动画完成后添加事件监听器
        addCardListeners()
      }
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
      <button v-for="category in categories" :key="category" :class="['category-btn', { active: selectedCategory === category }]" @click="selectedCategory = category">
        {{ category }}
      </button>
    </div>

    <div class="articles-container" ref="articlesList">
      <router-link v-for="article in filteredArticles" :key="article.id" :to="`/my_blog/articles/${article.id}`" class="article-card">
        <div class="article-card-inner">
          <div class="article-image">
            <img :src="article.cover" :alt="article.title" />
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
  text-decoration: none;
  color: inherit;
  background-color: white;
  height: 100%;
  position: relative;
  --x: 50%;
  --y: 50%;
  --gradient-opacity: 0;
}

.article-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--x) var(--y), rgba(74, 222, 128, 0.2) 0%, rgba(74, 222, 128, 0.1) 10%, transparent 20%);
  opacity: var(--gradient-opacity);
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.article-card-inner {
  position: relative;
  z-index: 2;
  background: transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.article-card:hover {
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
