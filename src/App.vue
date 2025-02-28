<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRouteName = computed(() => route.name)

// 控制移动端菜单显示
const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="app-container">
    <header class="header">
      <div class="container">
        <div class="header-content">
          <router-link to="/" class="logo">个人博客</router-link>
          
          <!-- 桌面端导航 -->
          <nav class="desktop-nav">
            <router-link to="/" :class="{ active: currentRouteName === 'Home' }">首页</router-link>
            <router-link to="/articles" :class="{ active: currentRouteName === 'Articles' }">文章</router-link>
            <router-link to="/about" :class="{ active: currentRouteName === 'About' }">关于</router-link>
          </nav>
          
          <!-- 移动端菜单按钮 -->
          <button class="mobile-menu-button" @click="toggleMobileMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
    
    <!-- 移动端菜单 -->
    <div class="mobile-menu" :class="{ open: isMobileMenuOpen }">
      <nav>
        <router-link to="/" @click="closeMobileMenu">首页</router-link>
        <router-link to="/articles" @click="closeMobileMenu">文章</router-link>
        <router-link to="/about" @click="closeMobileMenu">关于</router-link>
      </nav>
    </div>
    
    <main>
      <router-view v-slot="{ Component }">
        <transition :name="route.meta.transition || 'fade'" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} 个人博客. 保留所有权利.</p>
        <div class="footer-links">
          <a href="#">隐私政策</a>
          <a href="#">联系我</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* 全局样式 */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #333;
  --light-text: #666;
  --bg-color: #f8f9fa;
  --card-bg: #ffffff;
  --header-height: 70px;
  --transition-speed: 0.3s;
  --transition-ease: cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--text-color);
  background-color: var(--bg-color);
  line-height: 1.6;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 应用容器 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 头部样式 */
.header {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
  width: 100%;
  transition: transform var(--transition-speed) var(--transition-ease);
}

.header.scrolled-down {
  transform: translateY(-100%);
}

.header.scrolled-up {
  transform: translateY(0);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  transition: transform var(--transition-speed) var(--transition-ease);
}

.logo:hover {
  transform: scale(1.05);
}

/* 桌面导航 */
.desktop-nav {
  display: flex;
  gap: 2rem;
}

.desktop-nav a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  transition: color var(--transition-speed) var(--transition-ease);
}

.desktop-nav a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  transition: width var(--transition-speed) var(--transition-ease),
              left var(--transition-speed) var(--transition-ease);
  transform-origin: center;
}

.desktop-nav a:hover::after,
.desktop-nav a.active::after {
  width: 100%;
  left: 0;
}

/* 移动端菜单按钮 */
.mobile-menu-button {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.mobile-menu-button span {
  display: block;
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  transition: transform var(--transition-speed) var(--transition-ease),
              opacity var(--transition-speed) var(--transition-ease);
}

.mobile-menu-button.open span:first-child {
  transform: translateY(9px) rotate(45deg);
}

.mobile-menu-button.open span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-button.open span:last-child {
  transform: translateY(-9px) rotate(-45deg);
}

/* 移动端菜单 */
.mobile-menu {
  position: fixed;
  top: var(--header-height);
  left: 0;
  width: 100%;
  height: 0;
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden;
  transition: height var(--transition-speed) var(--transition-ease);
  z-index: 99;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.mobile-menu.open {
  height: auto;
  max-height: calc(100vh - var(--header-height));
}

.mobile-menu nav a {
  transform: translateY(-20px);
  opacity: 0;
  transition: transform var(--transition-speed) var(--transition-ease),
              opacity var(--transition-speed) var(--transition-ease);
}

.mobile-menu.open nav a {
  transform: translateY(0);
  opacity: 1;
}

.mobile-menu.open nav a:nth-child(1) { transition-delay: 0.1s; }
.mobile-menu.open nav a:nth-child(2) { transition-delay: 0.2s; }
.mobile-menu.open nav a:nth-child(3) { transition-delay: 0.3s; }

/* 主内容区 */
main {
  flex: 1;
  padding-top: 1rem;
  padding-bottom: 3rem;
  animation: fadeIn 0.5s var(--transition-ease);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 页脚样式 */
.footer {
  background-color: white;
  padding: 3rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent,
    var(--primary-color),
    var(--secondary-color),
    transparent
  );
}

.footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  position: relative;
  margin-right: 2rem;
  color: var(--text-color);
  text-decoration: none;
  transition: color var(--transition-speed) var(--transition-ease);
}

.footer-links a:hover {
  color: var(--primary-color);
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-speed) var(--transition-ease),
              transform var(--transition-speed) var(--transition-ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform var(--transition-speed) var(--transition-ease);
}

.slide-left-enter-from {
  transform: translateX(30px);
}

.slide-left-leave-to {
  transform: translateX(-30px);
}

.slide-right-enter-from {
  transform: translateX(-30px);
}

.slide-right-leave-to {
  transform: translateX(30px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .mobile-menu-button {
    display: flex;
  }
  
  .header {
    padding: 0 1rem;
  }
  
  main {
    padding: 1rem;
  }
}

/* 暗色模式支持 */
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #e1e1e1;
    --light-text: #a0a0a0;
    --bg-color: #1a1a1a;
    --card-bg: #2a2a2a;
  }
  
  .header {
    background-color: rgba(26, 26, 26, 0.8);
  }
  
  .mobile-menu {
    background-color: rgba(26, 26, 26, 0.98);
  }
  
  .footer {
    background-color: #1a1a1a;
    border-top-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
