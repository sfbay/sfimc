'use client'

import React from 'react'

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-baseline gap-0.5 text-2xl font-bold tracking-tight">
        <span style={{ color: '#ffffff' }}>sf</span>
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: '#ff4f1f' }}
        />
        <span style={{ color: '#ffffff' }}>imc</span>
      </div>
      <span
        className="text-sm font-medium px-2 py-0.5 rounded"
        style={{ backgroundColor: 'rgba(255, 79, 31, 0.2)', color: '#ff4f1f' }}
      >
        Admin
      </span>
    </div>
  )
}
