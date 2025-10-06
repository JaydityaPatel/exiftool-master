import React from 'react';
import ImageUpload from './components/ImageUpload';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <section className="relative h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero content */}
          <div className="text-center lg:text-left">
            <h1 className="text-[80px] lg:text-[100px] font-bold leading-none mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2962FF] via-[#2684FF] to-[#B620E0]">
                Digital Forensics
              </span>
              <br />
              <span className="text-white">Simplified</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
              Your smart companion for analyzing image authenticity, one upload at a time.
            </p>
          </div>

          {/* Right side - Image upload */}
          <div className="flex justify-center lg:justify-end">
            <ImageUpload />
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}

export default App;
