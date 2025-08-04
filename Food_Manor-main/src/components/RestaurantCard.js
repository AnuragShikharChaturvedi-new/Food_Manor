import React from 'react';

// src/components/RestaurantCard.js
const RestaurantCard = ({ resData }) => {
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    sla,
    aggregatedDiscountInfoV3,
  } = resData?.info;

  return (
    <div className="group cursor-pointer transform transition-all duration-200 hover:scale-95">
      {/* Image Container */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${cloudinaryImageId}`}
          alt={name}
        />
        {/* Discount Banner */}
        {aggregatedDiscountInfoV3?.header && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white font-bold">
              {aggregatedDiscountInfoV3.header}
              {aggregatedDiscountInfoV3.subHeader && 
                ` ${aggregatedDiscountInfoV3.subHeader}`}
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-bold text-xl mb-2 truncate">{name}</h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <span className="text-white bg-green-500 px-2 py-1 text-sm rounded">
              ⭐ {avgRating}
            </span>
          </div>
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">{sla?.deliveryTime} mins</span>
        </div>
        <p className="text-gray-600 text-sm truncate">
          {cuisines.join(", ")}
        </p>
        <p className="text-gray-600 text-sm">{costForTwo}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
