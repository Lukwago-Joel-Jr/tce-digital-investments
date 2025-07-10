// components/BackToTopButton.js
'use client'

export default function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className="px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-full transition text-xs"
    >
      ↑ Back to Top
    </button>
  )
}
