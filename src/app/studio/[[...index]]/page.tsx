'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { useEffect } from 'react'

export default function StudioPage() {
  useEffect(() => {
    // Sitenin kök dizinindeki (layout) fare imlecini iptal etme kodunu ezer
    // Sanity Studio içerisinde normal fare imlecinin kullanılmasını sağlar.
    document.body.style.cursor = 'auto'
    
    // CustomCursor ve Navigation componentlerinin Studio'nun üzerine binmesini engellemek için
    // geçici olarak gizliyoruz.
    const customCursor = document.getElementById('custom-cursor')
    const nav = document.querySelector('nav')
    if (customCursor) customCursor.style.display = 'none'
    if (nav) nav.style.display = 'none'

    return () => {
      document.body.style.cursor = 'none'
      if (customCursor) customCursor.style.display = 'block'
      if (nav) nav.style.display = 'block'
    }
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999999, backgroundColor: '#111' }}>
      <NextStudio config={config} />
    </div>
  )
}
