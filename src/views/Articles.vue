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
          // 动画完成
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
        // 初始加载动画完成
      }
    }
  )
})
</script>

<template>
  <div class="articles-page">


    <div class="page-header">
      <div class="title-container">
        <h1 ref="pageTitle" class="page-title">
          <span class="title-text">博客文章</span>
          <div class="title-underline"></div>
        </h1>
        <div class="title-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
      <p class="page-description">
        <span class="description-highlight">探索</span>前端开发的各种话题和技术分享
        <div class="description-dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </p>
    </div>

    <div class="categories-section">
      <div class="categories-header">
        <h3>文章分类</h3>
        <div class="categories-count">{{ filteredArticles.length }} 篇文章</div>
      </div>
      <div class="categories-filter">
        <button 
          v-for="category in categories" 
          :key="category" 
          :class="['category-btn', { active: selectedCategory === category }]" 
          @click="selectedCategory = category"
        >
          <span class="category-text">{{ category }}</span>
          <div class="category-ripple"></div>
        </button>
      </div>
    </div>

    <div class="articles-container" ref="articlesList">
      <router-link 
        v-for="(article, index) in filteredArticles" 
        :key="article.id" 
        :to="`/my_blog/articles/${article.id}`" 
        class="article-card"
        :style="{ '--card-index': index }"
      >
        <div class="article-card-inner">
          <div class="article-image">
            <img :src="article.cover" :alt="article.title" />
            <div class="image-overlay"></div>
            <div class="article-category">
              <span>{{ article.category }}</span>
            </div>
            <div class="read-indicator">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <div class="article-content">
            <h2 class="article-title">{{ article.title }}</h2>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <div class="article-meta">
              <div class="meta-left">
                <span class="article-date">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  {{ article.date }}
                </span>
              </div>
              <span class="article-read-time">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M2 3H8L10 21L14 3H22" stroke="currentColor" stroke-width="2"/>
                </svg>
                {{ article.readTime }}阅读
              </span>
            </div>
            <div class="card-shine"></div>
          </div>
        </div>
      </router-link>
    </div>

    <!-- 加载更多按钮 -->
    <div class="load-more-section" v-if="filteredArticles.length > 0">
      <button class="load-more-btn">
        <span>加载更多文章</span>
        <div class="btn-ripple"></div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.articles-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem;
  position: relative;
  min-height: 100vh;
}

/* 背景装饰元素 */
.bg-decorations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 20%;
  right: 15%;
  animation-delay: -2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  bottom: 30%;
  left: 20%;
  animation-delay: -4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  right: 10%;
  animation-delay: -1s;
}

.shape-5 {
  width: 40px;
  height: 40px;
  top: 60%;
  left: 50%;
  animation-delay: -3s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* 页面头部 */
.page-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.title-container {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 3.5rem;
  margin: 0;
  position: relative;
  display: inline-block;
}

.title-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.title-underline {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 4px;
  background: linear-gradient(90deg, transparent, #667eea, transparent);
  border-radius: 2px;
  animation: underlineGlow 2s ease-in-out infinite alternate;
}

.title-icon {
  position: absolute;
  top: -15px;
  right: -40px;
  width: 30px;
  height: 30px;
  color: #667eea;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes underlineGlow {
  0% {
    opacity: 0.5;
    transform: translateX(-50%) scaleX(0.8);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) scaleX(1);
  }
}

@keyframes sparkle {
  0%, 100% {
    transform: rotate(0deg) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: rotate(180deg) scale(1.2);
    opacity: 1;
  }
}

.page-description {
  font-size: 1.3rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  line-height: 1.6;
}

.description-highlight {
  color: #667eea;
  font-weight: 600;
  position: relative;
}

.description-dots {
  display: inline-flex;
  gap: 4px;
  margin-left: 8px;
  align-items: center;
}

.dot {
  width: 6px;
  height: 6px;
  background: #667eea;
  border-radius: 50%;
  animation: dotPulse 1.5s ease-in-out infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotPulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* 分类部分 */
.categories-section {
  margin-bottom: 4rem;
}

.categories-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.categories-header h3 {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
  font-weight: 600;
}

.categories-count {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.categories-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.category-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  border: 2px solid #667eea;
  background: transparent;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  transform: translateY(0);
}

.category-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.category-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-color: transparent;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.category-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.category-btn:active .category-ripple {
  width: 300px;
  height: 300px;
}

/* 文章容器 */
.articles-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
}

.article-card {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  background: white;
  height: 100%;
  position: relative;
  animation: cardSlideIn 0.6s ease-out forwards;
  animation-delay: calc(var(--card-index) * 0.1s);
  opacity: 0;
  transform: translateY(30px);
}

@keyframes cardSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}



.article-card-inner {
  position: relative;
  z-index: 2;
  background: transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.article-image {
  height: 240px;
  position: relative;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}





.article-category {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.read-indicator {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.read-indicator svg {
  width: 20px;
  height: 20px;
}



.article-content {
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.article-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.3;
  color: #333;
}

.article-excerpt {
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.7;
  flex-grow: 1;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #888;
}

.meta-left {
  display: flex;
  align-items: center;
}

.article-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.article-date svg {
  width: 16px;
  height: 16px;
}

.article-read-time {
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.article-read-time svg {
  width: 14px;
  height: 14px;
}

.card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: left 0.6s ease;
}

.article-card:hover .card-shine {
  left: 100%;
}

/* 加载更多部分 */
.load-more-section {
  text-align: center;
  margin-top: 3rem;
}

.load-more-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.load-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.btn-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.load-more-btn:active .btn-ripple {
  width: 300px;
  height: 300px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .articles-page {
    padding: 2rem 1rem;
  }

  .articles-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .title-icon {
    display: none;
  }

  .categories-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .categories-filter {
    gap: 0.5rem;
  }

  .category-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  .article-content {
    padding: 1.5rem;
  }

  .floating-shape {
    display: none;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }

  .page-description {
    font-size: 1.1rem;
  }

  .article-image {
    height: 200px;
  }
}
</style>
