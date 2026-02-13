import { useEffect } from 'react'

export default function TawkToChat() {
  useEffect(() => {
    // Your tawk.to script
    var Tawk_API = window.Tawk_API || {}
    var Tawk_LoadStart = new Date()
    
    var s1 = document.createElement("script")
    var s0 = document.getElementsByTagName("script")[0]
    s1.async = true
    s1.src = 'https://embed.tawk.to/698f398019252a1c3511ea0e/1jhbnh80i'
    s1.charset = 'UTF-8'
    s1.setAttribute('crossorigin', '*')
    s0.parentNode.insertBefore(s1, s0)

    // Optional: Customize widget behavior
    Tawk_API.onLoad = function() {
      console.log('Tawk.to loaded')
    }

    // Cleanup on unmount
    return () => {
      const script = document.querySelector('script[src*="tawk.to"]')
      if (script) script.remove()
    }
  }, [])

  return null
}