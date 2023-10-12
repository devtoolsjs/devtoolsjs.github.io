export default async function copyToClipboard(text: string) {
  const nativeCopy = async () => {
    if (navigator.clipboard) {
      return navigator.clipboard
        .writeText(text)
        .then(() => true)
        .catch(() => false)
    }
    return false
  }

  const commandCopy = () => {
    const textArea = document.createElement('textarea')

    textArea.value = text
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)

    textArea.focus()
    textArea.select()

    let success = false

    try {
      success = document.execCommand('copy')
    } catch (err) {
      // nothing
    }

    document.body.removeChild(textArea)

    return success
  }

  return (await nativeCopy()) ? true : commandCopy()
}
