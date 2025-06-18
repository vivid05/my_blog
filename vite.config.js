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
  base: '/my_blog/', // 设置基础路径为仓库名
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
  // 确保.md文件被当作静态资源处理
  publicDir: 'public',
  build: {
    outDir: 'docs', // 将构建输出目录设置为 docs
    emptyOutDir: true, // 构建前清空输出目录
    assetsDir: '', // 不再使用 assets 子目录
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'img/[name]-[hash][extname]'
          }
          if (/\.css$/.test(name ?? '')) {
            return 'css/[name]-[hash][extname]'
          }
          return '[ext]/[name]-[hash][extname]'
        }
      }
    }
  }
})
