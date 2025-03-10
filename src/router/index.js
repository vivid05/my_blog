import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Articles from '../views/Articles.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import About from '../views/About.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/my_blog',
      name: 'Home',
      component: Home,
      meta: { transition: 'fade' }
    },
    {
      path: '/my_blog/articles',
      name: 'Articles',
      component: Articles,
      meta: { transition: 'slide-left' }
    },
    {
      path: '/my_blog/articles/:id',
      name: 'ArticleDetail',
      component: ArticleDetail,
      meta: { transition: 'slide-left' }
    },
    {
      path: '/my_blog/about',
      name: 'About',
      component: About,
      meta: { transition: 'slide-left' }
    },
    {
      path: '/my_blog/articles',
      name: 'Articles',
      component: Articles,
      meta: { transition: 'slide-left' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '/my_blog',
      component: Home,
      meta: { transition: 'fade' }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router