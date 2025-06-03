// src/components/ShimmerMenu.js
const ShimmerMenu = () => {
  return (
    <div className="mt-24">
      <div className="max-w-4xl mx-auto p-4">
        {/* Restaurant Info Shimmer - Hero Section */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          {/* Restaurant Banner */}
          <div className="h-[200px] w-full bg-gray-200 animate-pulse"></div>
          
          {/* Restaurant Info Section */}
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {/* Restaurant Name */}
                <div className="w-72 h-8 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                {/* Cuisine */}
                <div className="w-96 h-5 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                {/* Address */}
                <div className="w-64 h-5 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                {/* Delivery Info */}
                <div className="flex gap-8 mt-6">
                  <div className="w-20 h-16 border-r border-gray-200">
                    <div className="w-16 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-20 h-16 border-r border-gray-200">
                    <div className="w-16 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-20 h-16">
                    <div className="w-16 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
              {/* Rating Card */}
              <div className="w-[100px] h-[100px] bg-white shadow-md rounded-lg p-3">
                <div className="w-full h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Offers Carousel */}
        <div className="flex gap-4 mb-6 overflow-x-auto hide-scrollbar">
          {Array(4).fill("").map((_, index) => (
            <div key={index} className="flex-shrink-0 w-[300px] h-[80px] bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>

        {/* Menu Categories */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          {/* Category Tabs */}
          <div className="flex gap-6 mb-6 overflow-x-auto hide-scrollbar pb-2">
            {Array(6).fill("").map((_, index) => (
              <div key={index} className="flex-shrink-0 w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>

          {/* Menu Items */}
          {Array(4).fill("").map((_, categoryIndex) => (
            <div key={categoryIndex} className="border-b border-gray-100 last:border-none">
              {/* Category Header */}
              <div className="flex justify-between items-center py-4">
                <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Menu Items */}
              {Array(3).fill("").map((_, itemIndex) => (
                <div key={itemIndex} className="flex justify-between py-6 border-t border-dashed border-gray-100">
                  <div className="flex-1 pr-4">
                    {/* Veg/Non-veg indicator */}
                    <div className="w-4 h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    {/* Item name */}
                    <div className="w-64 h-5 bg-gray-200 rounded mb-3 animate-pulse"></div>
                    {/* Price */}
                    <div className="w-20 h-5 bg-gray-200 rounded mb-3 animate-pulse"></div>
                    {/* Description */}
                    <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="relative w-[118px]">
                    <div className="w-[118px] h-[96px] bg-gray-200 rounded-lg overflow-hidden animate-pulse"></div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-24 h-8 bg-white rounded shadow-md animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* License Info */}
        <div className="mt-8">
          <div className="w-full h-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ShimmerMenu;
