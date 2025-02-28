import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import matter from 'gray-matter'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// Markdown 文件处理插件
function markdownPlugin() {
  return {
    name: 'vite-plugin-markdown',
    transform(code, id) {
      if (!id.endsWith('.md')) return

      // 读取 Markdown 文件
      const { data, content } = matter(code)

      // 返回处理后的内容
      return {
        code: `export default {
          frontmatter: ${JSON.stringify(data)},
          content: ${JSON.stringify(content)}
        }`,
        map: null
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    markdownPlugin(),
    nodePolyfills()
  ],
  assetsInclude: ['**/*.md'],
  server: {
    fs: {
      // 允许访问项目根目录以外的文件
      allow: ['..']
    }
  }
})
