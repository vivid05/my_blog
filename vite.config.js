import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
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
    nodePolyfills({
      protocolImports: true,
      globals: {
        Buffer: true,
        global: true,
        process: true
      }
    })
  ],
  assetsInclude: ['**/*.md'],
  server: {
    fs: {
      // 允许访问项目根目录以外的文件
      allow: ['..']
    }
  },
  build: {
    outDir: 'docs', // 将构建输出目录设置为 docs
    emptyOutDir: true, // 构建前清空输出目录
    assetsDir: 'assets', // 静态资源目录
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
