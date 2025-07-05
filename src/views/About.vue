<script setup>
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'
import gsap from 'gsap'

const pageTitle = ref(null)
const aboutContent = ref(null)

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

const contentMotion = useMotion(aboutContent, {
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


const profileDescription = ref(`你好！我是一名深爱前端开发的工程师，拥有5年的行业经验，专注于打造用户友好、性能卓越的网站和应用程序。我对技术的热情不仅体现在日常工作中，更驱使我不断学习和掌握前沿技术，并将它们巧妙融入项目，显著提升用户体验和网站效率。

在我的职业生涯中，我参与了多个具有挑战性的项目，涵盖从设计直观的响应式布局到优化网站加载速度等多个方面。我熟练掌握HTML、CSS、JavaScript等核心技术，并对Vue框架有着深入理解和丰富实践。例如，我曾主导一个复杂的单页应用（SPA）开发，通过优化代码结构和资源加载策略，成功将页面加载时间缩短了30%，为用户带来了更流畅的交互体验。

我坚信技术永无止境，因此始终保持学习的姿态。紧跟最新的技术趋势，并通过阅读和实践探索如WebAssembly和Progressive Web Apps（PWA）等新兴技术。这些努力让我能够在项目中不断创新，为团队和用户创造更多价值。

除了 coding，我还热衷于将所学所得与社区分享。我定期在个人技术博客上发布文章，内容涵盖前端开发的方方面面——从基础技巧到高级应用，从项目心得到行业洞察。

总的来说，我是一名充满激情且不断进取的前端工程师，擅长通过技术创新提升产品价值，同时乐于分享知识、回馈社区。如果你对前端开发有任何有趣的想法，欢迎和我一起探讨！`)

</script>

<template>
  <div class="about-page">
    <div class="page-header">
      <h1 ref="pageTitle" class="page-title">吴伟伟</h1>
      <p class="page-subtitle">前端开发工程师</p>
    </div>

    <div class="about-container" ref="aboutContent">
      <div class="profile-section">
        <div class="profile-image">
          <img src="https://picsum.photos/id/1012/300/300" alt="个人照片" />
        </div>
        <div class="profile-info">
          <h2>个人简介</h2>
          <p>{{ profileDescription }}</p>
          <div class="social-links">
            <a href="#" class="social-link">GitHub</a>
            <a href="#" class="social-link">LinkedIn</a>
            <a href="#" class="social-link">Twitter</a>
          </div>
        </div>
      </div>


      <div class="experience-section">
        <h2>工作经历</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h3>高级前端开发工程师</h3>
              <p class="timeline-company">科技有限公司</p>
              <p class="timeline-period">2021年 - 至今</p>
              <p>负责公司核心产品的前端架构设计和开发，优化用户体验和页面性能，指导初级开发人员。</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h3>前端开发工程师</h3>
              <p class="timeline-company">互联网科技有限公司</p>
              <p class="timeline-period">2019年 - 2021年</p>
              <p>参与多个Web应用项目的开发，负责实现响应式设计和交互功能，解决浏览器兼容性问题。</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h3>初级前端开发</h3>
              <p class="timeline-company">网络科技有限公司</p>
              <p class="timeline-period">2018年 - 2019年</p>
              <p>协助团队完成网站开发任务，学习并应用前端技术，参与代码审查和测试。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
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

.page-subtitle {
  font-size: 1.2rem;
  color: #666;
}

.profile-section {
  display: flex;
  gap: 3rem;
  margin-bottom: 4rem;
  align-items: center;
}

.profile-image {
  flex-shrink: 0;
}

.profile-image img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 5px solid white;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.profile-image img:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.profile-info h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.profile-info p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1rem;
  white-space: pre-line;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-link {
  padding: 0.5rem 1rem;
  border-radius: 30px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.social-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}


.experience-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 2px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
}

.timeline-item {
  position: relative;
  padding-bottom: 2.5rem;
}

.timeline-dot {
  position: absolute;
  left: -2.5rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #667eea;
  border: 3px solid white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}

.timeline-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.timeline-company {
  font-weight: 600;
  color: #667eea;
  margin-bottom: 0.3rem;
}

.timeline-period {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.8rem;
}

.timeline-content p:last-child {
  line-height: 1.6;
  color: #555;
}

@media (max-width: 768px) {
  .profile-section {
    flex-direction: column;
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }

  .page-title {
    font-size: 2.2rem;
  }
}
</style>
