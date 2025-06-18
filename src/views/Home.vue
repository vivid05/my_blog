<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const heroTitle = ref(null)
const heroSubtitle = ref(null)

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
          <router-link to="/my_blog/articles" class="btn primary">浏览文章</router-link>
          <router-link to="/my_blog/about" class="btn secondary">关于我</router-link>
        </div>
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
