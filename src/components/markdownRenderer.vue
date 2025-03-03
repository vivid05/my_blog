<template>
  <div class="article-cover" v-if="article.cover">
    <img :src="article.cover" :alt="article.title" />
  </div>

  <div class="article-meta">
    <div class="article-info">
      <span class="article-author">作者: {{ article.author }}</span>
      <span class="article-date">{{ article.date }}</span>
      <span class="article-category">{{ article.category }}</span>
    </div>
  </div>

  <div class="markdown-container" v-html="renderedContent"></div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // 确保引入样式文件
import matter from 'gray-matter'

export default {
  name: 'MarkdownRenderer',
  props: {
    // 支持直接传入Markdown内容
    content: {
      type: String,
      default: ''
    },
    // 支持传入.md文件路径
    filePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const article = ref({
      title: '',
      content: '',
      date: '',
      author: '',
      category: '',
      cover: ''
    })
    const renderedContent = ref('')

    // 配置marked选项，使用highlight.js进行代码高亮
    marked.setOptions({
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
      },
      langPrefix: 'hljs language-', // 重要：为代码块添加正确的CSS类
      headerIds: true,
      gfm: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    })

    // 获取并渲染Markdown内容
    const renderMarkdown = async () => {
      try {
        let markdownContent = props.content
        let _renderedContent = ''

        // 如果提供了文件路径，则获取文件内容
        if (props.filePath && !props.content) {
          const response = await fetch(props.filePath)
          if (!response.ok) {
            throw new Error(`Failed to load markdown file: ${props.filePath}`)
          }
          markdownContent = await response.text()
          const { data, content } = matter(markdownContent)
          article.value = { ...data }
          _renderedContent = content
        }

        // 使用marked转换Markdown为HTML
        if (_renderedContent) {
          renderedContent.value = marked(_renderedContent)

          // 确保代码高亮应用于新渲染的内容
          // 注意：这一步在客户端渲染时很有用，确保动态内容也能高亮
          setTimeout(() => {
            document.querySelectorAll('pre code').forEach(block => {
              hljs.highlightElement(block)
            })
          }, 0)
        }
      } catch (error) {
        console.error('Error rendering markdown:', error)
        renderedContent.value = `<p class="error">Error loading markdown: ${error.message}</p>`
      }
    }

    onMounted(() => {
      renderMarkdown()
    })

    // 监听props变化，重新渲染内容
    watch(
      () => [props.content, props.filePath],
      () => {
        renderMarkdown()
      }
    )

    return {
      renderedContent,
      article
    }
  }
}
</script>

<style>
/* 注意：移除了scoped，以便样式可以应用到v-html内部的元素 */
.markdown-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 100%;
  overflow-x: auto;
}

.markdown-container h1 {
  font-size: 2em;
  margin-top: 1em;
  margin-bottom: 0.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-container h2 {
  font-size: 1.5em;
  margin-top: 1em;
  margin-bottom: 0.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-container h3 {
  font-size: 1.25em;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.markdown-container p {
  margin: 0.5em 0;
}

.markdown-container pre {
  background-color: #f6f8fa;
  border-radius: 3px;
  padding: 16px;
  overflow: auto;
  margin: 16px 0;
}

.markdown-container code {
  font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  padding: 0.2em 0.4em;
  font-size: 85%;
}

.markdown-container pre code {
  background-color: transparent;
  padding: 0;
  display: block;
  overflow-x: auto;
  color: #333;
  font-size: 14px;
}

.markdown-container blockquote {
  border-left: 4px solid #dfe2e5;
  padding: 0 1em;
  color: #6a737d;
  margin: 0.5em 0;
}

.markdown-container ul,
.markdown-container ol {
  padding-left: 2em;
  margin: 0.5em 0;
}

.markdown-container table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
  display: block;
  overflow-x: auto;
}

.markdown-container th,
.markdown-container td {
  border: 1px solid #dfe2e5;
  padding: 6px 13px;
}

.markdown-container th {
  background-color: #f6f8fa;
  font-weight: 600;
}

.markdown-container tr:nth-child(2n) {
  background-color: #f6f8fa;
}

.markdown-container img {
  max-width: 100%;
  height: auto;
}

/* 确保highlight.js样式可以正确应用 */
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #f6f8fa;
}

.error {
  color: #d32f2f;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
}
</style>

<style scoped>
.article-cover {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-cover:hover img {
  transform: scale(1.03);
}

.article-meta {
  margin-bottom: 2rem;
}

.article-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: var(--text-color);
}

.article-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: var(--light-text);
  align-items: center;
}

.article-category {
  background-color: rgba(102, 126, 234, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  color: var(--primary-color);
}
</style>
