import { useEffect } from 'react'

export default function TawkToChat() {
  useEffect(() => {
    if (document.querySelector('script[src*="tawk.to"]')) return

    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    const s1 = document.createElement('script')
    s1.async = true
    s1.src = 'https://embed.tawk.to/698f398019252a1c3511ea0e/1jhbnh80i'
    s1.charset = 'UTF-8'
    s1.setAttribute('crossorigin', '*')
    document.head.appendChild(s1)

    return () => {
      const script = document.querySelector('script[src*="tawk.to"]')
      if (script) script.remove()
    }
  }, [])

  return null
}
