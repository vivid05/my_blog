<script setup>
import { ref } from 'vue'

const pageTitle = ref(null)
const aboutContent = ref(null)
const showToast = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('wuvivid0505@gmail.com')
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const profileDescription = ref(`你好！我是一名深爱前端开发的工程师，拥有5年的行业经验，专注于打造用户友好、性能卓越的网站和应用程序。我对技术的热情不仅体现在日常工作中，更驱使我不断学习和掌握前沿技术，并将它们巧妙融入项目，显著提升用户体验和网站效率。

在我的职业生涯中，我参与了多个具有挑战性的项目，涵盖从设计直观的响应式布局到优化网站加载速度等多个方面。我熟练掌握HTML、CSS、JavaScript等核心技术，并对Vue框架有着深入理解和丰富实践。例如，我曾主导一个复杂的单页应用（SPA）开发，通过优化代码结构和资源加载策略，成功将页面加载时间缩短了30%，为用户带来了更流畅的交互体验。

我坚信技术永无止境，因此始终保持学习的姿态。紧跟最新的技术趋势，并通过阅读和实践探索如WebAssembly和Progressive Web Apps（PWA）等新兴技术。这些努力让我能够在项目中不断创新，为团队和用户创造更多价值。

除了 coding，我还热衷于将所学所得与社区分享。我定期在个人技术博客上发布文章，内容涵盖前端开发的方方面面——从基础技巧到高级应用，从项目心得到行业洞察。

总的来说，我是一名充满激情且不断进取的前端工程师，擅长通过技术创新提升产品价值，同时乐于分享知识、回馈社区。如果你对前端开发有任何有趣的想法，欢迎和我一起探讨！`)
</script>

<template>
  <div class="about-page">
    <div class="page-header">
      <div ref="pageTitle" class="page-title">
        <span class="name-part">吴</span>
        <span class="name-part">伟</span>
        <span class="name-part">伟</span>
      </div>
      <p class="page-subtitle">
        <span class="role-highlight">前端开发工程师</span>
      </p>
    </div>

    <div class="about-container" ref="aboutContent">
      <div class="profile-section">
        <div class="profile-image-container">
          <div class="profile-image">
            <img src="https://picsum.photos/id/1012/300/300" alt="个人照片" />
          </div>
        </div>
        <div class="profile-info">
          <h2 class="section-title">
            <span class="title-icon">🚀</span>
            个人简介
          </h2>
          <div class="description-container">
            <p class="description-text">{{ profileDescription }}</p>
          </div>
          <div class="social-links">
            <a href="https://github.com/vivid05" target="_blank" class="social-link github">
              <svg class="link-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              <span class="link-text">GitHub</span>
            </a>
            <button @click="copyEmail" class="social-link email">
              <svg class="link-icon" viewBox="0 0 24 24" fill="white" width="20" height="20">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/>
              </svg>
              <span class="link-text">Gmail</span>
            </button>
          </div>
        </div>
      </div>

      <div class="experience-section">
        <h2 class="section-title">
          <span class="title-icon">💼</span>
          工作经历
        </h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="job-card">
                <h3>高级前端开发工程师</h3>
                <p class="timeline-company">🏢 科技有限公司</p>
                <p class="timeline-period">📅 2021年 - 至今</p>
                <p class="job-description">负责公司核心产品的前端架构设计和开发，优化用户体验和页面性能，指导初级开发人员。</p>
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="job-card">
                <h3>前端开发工程师</h3>
                <p class="timeline-company">🌐 互联网科技有限公司</p>
                <p class="timeline-period">📅 2019年 - 2021年</p>
                <p class="job-description">参与多个Web应用项目的开发，负责实现响应式设计和交互功能，解决浏览器兼容性问题。</p>
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="job-card">
                <h3>初级前端开发</h3>
                <p class="timeline-company">💻 网络科技有限公司</p>
                <p class="timeline-period">📅 2018年 - 2019年</p>
                <p class="job-description">协助团队完成网站开发任务，学习并应用前端技术，参与代码审查和测试。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Toast 提示 -->
    <div v-if="showToast" class="toast">
      邮箱地址已复制到剪贴板！
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.page-title {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 0.2em;
}

.name-part {
  color: #ffffff;
  font-weight: 800;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.page-subtitle {
  font-size: 1.8rem;
  margin-bottom: 2rem;
}

.role-highlight {
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  padding: 0.5rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: inline-block;
}

.about-container {
  position: relative;
}

.profile-section {
  display: flex;
  gap: 4rem;
  margin-bottom: 5rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.profile-image-container {
  position: relative;
  flex-shrink: 0;
}

.profile-image {
  border-radius: 50%;
  overflow: hidden;
  width: 250px;
  height: 250px;
  border: 4px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.profile-image:hover {
  transform: scale(1.05);
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.section-title {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-icon {
  font-size: 1.8rem;
}

.description-container {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border-left: 4px solid #667eea;
}

.description-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  white-space: pre-line;
}

.social-links {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.social-link.github {
  background: linear-gradient(45deg, #333, #24292e);
  color: white;
}

.social-link.email {
  background: linear-gradient(135deg, #ea4335 0%, #fbbc04 35%, #34a853 65%, #4285f4 100%);
  color: white;
  border: none;
  cursor: pointer;
}

.social-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.link-icon {
  font-size: 1.2rem;
}

.experience-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.timeline {
  position: relative;
  padding-left: 3rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  height: 100%;
  width: 4px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-dot {
  position: absolute;
  left: -3rem;
  top: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: 4px solid white;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.job-card {
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(102, 126, 234, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.job-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.job-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.job-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 700;
}

.timeline-company {
  font-weight: 600;
  color: #667eea;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.timeline-period {
  font-size: 1rem;
  color: #888;
  margin-bottom: 1rem;
  font-weight: 500;
}

.job-description {
  line-height: 1.7;
  color: #555;
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-page {
    padding: 2rem 1rem;
  }

  .profile-section {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    padding: 2rem;
  }

  .social-links {
    justify-content: center;
  }

  .page-title {
    font-size: 3rem;
    flex-direction: column;
    gap: 0.1em;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .timeline {
    padding-left: 2rem;
  }

  .timeline-dot {
    left: -2rem;
  }

  .experience-section,
  .profile-section {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2.5rem;
  }

  .profile-image {
    width: 200px;
    height: 200px;
  }
}

.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: toastSlideIn 0.3s ease;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@keyframes toastSlideIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
