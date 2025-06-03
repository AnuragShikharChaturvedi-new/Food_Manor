import React from 'react';
import '../index.css'; // Import the CSS file for shimmer styling
// src/components/Shimmer.js
const Shimmer = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search and Filter Bar Shimmer */}
      <div className="sticky top-20 z-10 bg-white shadow-sm py-4">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="w-[400px] h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex gap-4">
              {Array(4).fill("").map((_, index) => (
                <div key={index} className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Top Restaurants Header */}
        <div className="mb-8">
          <div className="w-60 h-8 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
          <div className="w-96 h-5 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array(12).fill("").map((_, index) => (
            <div 
              key={index} 
              className="group cursor-pointer transform transition-transform duration-200 hover:scale-95"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] mb-4 rounded-2xl overflow-hidden bg-gray-200 animate-pulse">
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="absolute bottom-2 left-2 w-32 h-4 bg-gray-100/30 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-2">
                <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-12 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;


