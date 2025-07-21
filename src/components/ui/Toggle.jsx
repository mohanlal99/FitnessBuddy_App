import React from 'react'

const Toggle = ({ active, onToggle }) => {
  return (
    <div 
      className={`relative cursor-pointer inline-block w-12 h-6 rounded-full transition-colors ease-in-out ${active ? 'bg-blue-500' : 'bg-gray-300'}`}
      onClick={onToggle}
    >
      <div
        className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full transition-transform ease-in-out ${active ? 'transform translate-x-6' : ''}`}
      />
    </div>
  )
}

export default Toggle;
