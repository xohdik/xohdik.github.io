import { useEffect } from 'react'

export default function TawkToChat() {
  useEffect(() => {
    if (document.querySelector('script[src*="tawk.to"]')) return

    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    // Customize widget before it loads
    window.Tawk_API.customStyle = {
      visibility: {
        desktop: { position: 'br', xOffset: 20, yOffset: 20 },
        mobile: { position: 'br', xOffset: 10, yOffset: 10 },
      },
    }

    // After widget loads, prevent mobile fullscreen and set header
    window.Tawk_API.onLoad = function () {
      // Inject CSS to prevent tawk fullscreen on mobile
      const style = document.createElement('style')
      style.textContent = `
        @media (max-width: 768px) {
          iframe[title*="chat"][style*="width: 100%"],
          iframe[title*="chat"][style*="height: 100%"] {
            width: 320px !important;
            height: 450px !important;
            max-width: 90vw !important;
            max-height: 70vh !important;
            bottom: 10px !important;
            right: 10px !important;
            border-radius: 16px !important;
          }
        }
      `
      document.head.appendChild(style)
    }

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
