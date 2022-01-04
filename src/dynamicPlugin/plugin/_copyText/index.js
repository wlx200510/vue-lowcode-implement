const cssText = 'position:fixed;pointer-events:none;z-index:-9999;opacity:0;'
const copyErrorMessage = 'Failed to copy value to clipboard. Unknown type.'

const $clipboard = (input) => {
  let value

  if (typeof input !== 'string') {
    try {
      value = JSON.stringify(input)
    } catch (e) {
      throw copyErrorMessage
    }
  } else {
    value = input
  }

  const textarea = document.createElement('textarea')

  textarea.addEventListener('focusin', (e) => e.stopPropagation())
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.cssText = cssText

  document.body.appendChild(textarea)

  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    textarea.contentEditable = true
    textarea.readOnly = true

    const range = document.createRange()

    range.selectNodeContents(textarea)

    const selection = window.getSelection()

    selection.removeAllRanges()
    selection.addRange(range)
    textarea.setSelectionRange(0, 999999)
  } else {
    textarea.select()
  }

  let success = false

  try {
    success = document.execCommand('copy')
  } catch (err) {
    console.warn(err)
  }

  document.body.removeChild(textarea)

  return success
}
export default {
  active(data) {
    return $clipboard(data)
  },
}
