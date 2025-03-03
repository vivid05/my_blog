<script setup>
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'
import gsap from 'gsap'

const heroTitle = ref(null)
const heroSubtitle = ref(null)
const latestPosts = ref(null)

// 示例博客文章数据
const posts = ref([
  {
    id: 1,
    title: '开始使用Vue3的Composition API',
    excerpt: 'Vue3的Composition API提供了更灵活的代码组织方式，本文将介绍如何开始使用它...',
    date: '2023-06-15',
    cover: 'https://picsum.photos/id/1/800/450'
  },
  {
    id: 2,
    title: '使用GSAP创建丝滑动画效果',
    excerpt: 'GSAP是一个强大的JavaScript动画库，可以帮助你创建流畅的网页动画...',
    date: '2023-07-22',
    cover: 'https://picsum.photos/id/2/800/450'
  },
  {
    id: 3,
    title: 'Vite构建工具的优势',
    excerpt: 'Vite是一个现代前端构建工具，相比传统工具有哪些优势？本文将为你详细解析...',
    date: '2023-08-10',
    cover: 'https://picsum.photos/id/3/800/450'
  },
  {
    id: 4,
    title: 'Vue3的Composition API',
    excerpt: 'Vue3的Composition API提供了更灵活的代码组织方式，本文将介绍如何开始使用它...',
    date: '2023-06-15',
    cover: 'https://picsum.photos/id/4/800/450'
  },
  {
    id: 5,
    title: 'Vue3的Composition API',
    excerpt: 'Vue3的Composition API提供了更灵活的代码组织方式，本文将介绍如何开始使用它...',
    date: '2023-06-15',
    cover: 'https://picsum.photos/id/4/800/450'
  },
  {
    id: 6,
    title: 'Vue3的Composition API',
    excerpt: 'Vue3的Composition API提供了更灵活的代码组织方式，本文将介绍如何开始使用它...',
    date: '2023-06-15',
    cover: 'https://picsum.photos/id/4/800/450'
  },
  {
    id: 7,
    title: 'Vue3的Composition API',
    excerpt: 'Vue3的Composition API提供了更灵活的代码组织方式，本文将介绍如何开始使用它...',
    date: '2023-06-15',
    cover: 'https://picsum.photos/id/4/800/450'
  },
  {
    id: 8,
    title: 'Vue3的Composition API',
    excerpt: 'Vue3的Composition API提供了更灵活的代码组织方式，本文将介绍如何开始使用它...',
    date: '2023-06-15',
    cover: 'https://picsum.photos/id/4/800/450'
  },
  {
    id: 9,
    title: 'Vue3的Composition API',
    excerpt: 'Vue3的Composition API提供了更灵活的代码组织方式，本文将介绍如何开始使用它...',
    date: '2023-06-15',
    cover: 'https://picsum.photos/id/4/800/450'
  }
])

// 设置动画
const heroMotion = useMotion(heroTitle, {
  initial: {
    opacity: 0,
    y: 100
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 200,
      duration: 800
    }
  }
})

const subtitleMotion = useMotion(heroSubtitle, {
  initial: {
    opacity: 0,
    y: 50
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 500,
      duration: 800
    }
  }
})

const postsMotion = useMotion(latestPosts, {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1,
    transition: {
      delay: 800,
      duration: 1000
    }
  }
})

onMounted(() => {
  // 滚动动画
  const cards = document.querySelectorAll('.post-card')
  cards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      duration: 0.8,
      delay: index * 0.2
    })
  })
})
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 ref="heroTitle" class="hero-title">热爱 向往</h1>
        <p ref="heroSubtitle" class="hero-subtitle">分享前端开发的心得与体会</p>
        <div class="hero-actions">
          <router-link to="/articles" class="btn primary">浏览文章</router-link>
          <router-link to="/about" class="btn secondary">关于我</router-link>
        </div>
      </div>
    </section>

    <section class="latest-posts" ref="latestPosts">
      <h2 class="section-title">最新文章</h2>
      <div class="posts-grid">
        <router-link v-for="post in posts" :key="post.id" :to="`/articles/${post.id}`" class="post-card">
          <div class="post-image">
            <img :src="post.cover" :alt="post.title" />
          </div>
          <div class="post-content">
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.excerpt }}</p>
            <div class="post-meta">
              <span class="post-date">{{ post.date }}</span>
              <span class="read-more">阅读更多 →</span>
            </div>
          </div>
        </router-link>
      </div>
      <div class="view-all">
        <router-link to="/articles" class="btn outline">查看所有文章</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

.hero {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../assets/hero.jpg') center/cover no-repeat;
  animation: pulse 15s infinite alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 0 20px;
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: #ffffff !important;
  background: unset !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: unset !important;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 300;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  color: #6a0dad !important;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  line-height: 100%;
}

.btn.primary {
  background-color: white;
  color: #764ba2;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.btn.secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn.secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

.latest-posts {
  padding: 5rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.post-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  background-color: white;
}

.post-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.post-image {
  height: 200px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.post-card:hover .post-image img {
  transform: scale(1.1);
}

.post-content {
  padding: 1.5rem;
}

.post-title {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.post-excerpt {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.post-date {
  color: #888;
}

.read-more {
  color: #667eea;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.post-card:hover .read-more {
  transform: translateX(5px);
}

.view-all {
  text-align: center;
}

.btn.outline {
  border: 2px solid #667eea;
  color: #667eea;
  background-color: transparent;
}

.btn.outline:hover {
  background-color: #667eea;
  color: white;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
