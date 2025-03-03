<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMotion } from '@vueuse/motion'
import gsap from 'gsap'
import MarkdownRenderer from '../components/markdownRenderer.vue'

const route = useRoute()
const router = useRouter()

const articleHeader = ref(null)
const relatedArticles = ref([])

// 设置动画
useMotion(articleHeader, {
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

if (relatedArticles.value.length > 0) {
  useMotion(relatedArticles, {
    initial: {
      opacity: 0,
      y: 30
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 600,
        duration: 600
      }
    }
  })
}

function goBack() {
  router.back()
}

const id = route.params.id
onMounted(async () => {
  // 滚动到顶部
  window.scrollTo(0, 0)

  // 内容动画
  const elements = document.querySelectorAll('.article-content h2, .article-content p, .article-content ul')
  gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: '.article-content',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  )
})
</script>

<template>
  <div class="article-detail">
    <div class="article-header" ref="articleHeader">
      <button class="back-button" @click="goBack">
        <span class="back-icon">←</span>
        返回
      </button>

      <MarkdownRenderer :filePath="`/my_blog/src/content/articles/${id}.md`" />

      <div class="related-articles" ref="relatedArticles" v-if="relatedArticles.length">
        <h3 class="related-title">相关文章</h3>
        <div class="related-grid">
          <router-link v-for="post in relatedArticles" :key="post.id" :to="`/articles/${post.id}`" class="related-card">
            <div class="related-image">
              <img :src="post.cover" :alt="post.title" />
            </div>
            <div class="related-content">
              <h4 class="related-post-title">{{ post.title }}</h4>
              <span class="related-post-date">{{ post.date }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-detail {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: none;
  color: var(--primary-color);
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background-color: rgba(102, 126, 234, 0.1);
}

.back-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.article-header {
  margin-bottom: 3rem;
}

.related-articles {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(125, 125, 125, 0.2);
}

.related-title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.related-card {
  display: flex;
  text-decoration: none;
  color: inherit;
  background: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.related-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.related-image {
  width: 120px;
  height: 120px;
  overflow: hidden;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.related-card:hover .related-image img {
  transform: scale(1.1);
}

.related-content {
  padding: 1rem;
  flex-grow: 1;
}

.related-post-title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-color);
}

.related-post-date {
  font-size: 0.8rem;
  color: var(--light-text);
}

@media (max-width: 768px) {
  .article-detail {
    padding: 1rem;
  }

  .article-title {
    font-size: 2rem;
  }

  .article-cover {
    height: 250px;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
