import { onMounted, onUnmounted } from 'vue-function-api'
import ClipboardJS from 'clipboard'

export default selector => {
  let clipboard

  const copyListener = ({ target }) => {
    if (target.matches(selector)) {
      const saved = target.textContent
      target.textContent = 'Copied!'
      setTimeout(() => (target.textContent = saved), 1000)
    }
  }

  onMounted(() => {
    clipboard = new ClipboardJS(selector)
    document.addEventListener('click', copyListener)
  })

  onUnmounted(() => {
    clipboard.destroy()
    document.removeEventListener('click', copyListener)
  })
}
