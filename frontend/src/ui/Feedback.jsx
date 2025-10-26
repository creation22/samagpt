import React from 'react'
import { MarqueeDemo } from './Testimonial'

const Feedback = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="font-light ext-6xl md:text-7xl  mb-16 text-gray-100 tracking-tight">
          What our users say
        </h1>
      <div className="w-full max-w-6xl">
        <MarqueeDemo/>
      </div>
    </div>
  )
}

export default Feedback