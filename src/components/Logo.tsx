import React from 'react'

export const Logo: React.FC = () => {
  return (
    <a href="#" className="flex items-center group cursor-pointer select-none">
      <img
        src="/Yoqo-icon.png"
        alt="YOQO Payment Experts"
        className="h-10 sm:h-12 w-auto object-contain transform transition-transform duration-200 group-hover:scale-105"
      />
    </a>
  )
}
