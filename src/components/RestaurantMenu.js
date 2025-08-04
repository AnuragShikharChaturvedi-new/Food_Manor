import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ShimmerMenu from './ShimmerMenu';
import { CDN_URL } from '../utils/constants';
import { FiClock, FiInfo } from 'react-icons/fi';
import { AiOutlineStar, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiRupee } from 'react-icons/bi';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import { addItem } from '../utils/cartSlice';
import toast from 'react-hot-toast';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);
  const dispatch = useDispatch();
  const [showOffers, setShowOffers] = useState(false);

  if (resInfo === null) return <ShimmerMenu />;

  const restaurantInfo = resInfo?.cards?.find(
    (card) => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  )?.card?.card?.info || {};
  
  const {
    name,
    cuisines,
    costForTwoMessage,
    cloudinaryImageId,
    avgRating,
    sla,
    areaName,
    totalRatingsString,
    aggregatedDiscountInfo,
    feeDetails,
  } = restaurantInfo;

  const menuItems = resInfo?.cards
    ?.find(card => card?.groupedCard)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards
    ?.filter(card => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
    ?.map(card => card?.card?.card) || [];
  
  const handleAddItem = (item) => {
    dispatch(addItem(item));
    toast.success('Added to cart!', {
      icon: '🛒',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const toggleAccordion = (index) => {
    setShowIndex(showIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[80px]">
      {/* Restaurant Info Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Restaurant Image */}
            {cloudinaryImageId && (
              <div className="md:w-80 w-full">
                <img 
                  className="w-full h-52 md:h-64 rounded-lg object-cover shadow-lg" 
                  src={`${CDN_URL}${cloudinaryImageId}`} 
                  alt={name} 
                />
              </div>
            )}

            {/* Restaurant Details */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-800">{name}</h1>
                  <p className="text-gray-600 mt-1">{cuisines?.join(", ")}</p>
                  <p className="text-gray-600">{areaName}</p>
                </div>
                <div className="text-center">
                  <div className={`px-2 py-1 rounded-md ${avgRating >= 4 ? 'bg-green-500' : avgRating >= 3 ? 'bg-orange-500' : 'bg-red-500'} text-white font-bold flex items-center gap-1`}>
                    <AiOutlineStar /> {avgRating}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{totalRatingsString}</p>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center gap-4 mt-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <FiClock className="text-lg" />
                  <span>{sla?.deliveryTime} mins</span>
                </div>
                <div className="flex items-center gap-1">
                  <BiRupee className="text-lg" />
                  <span>{costForTwoMessage}</span>
                </div>
              </div>

              {/* Offers Section */}
              {aggregatedDiscountInfo && (
                <div className="mt-6">
                  <button 
                    className="flex items-center gap-2 text-orange-500 hover:text-orange-600"
                    onClick={() => setShowOffers(!showOffers)}
                  >
                    <AiOutlineInfoCircle className="text-xl" />
                    <span className="font-medium">Available Offers</span>
                  </button>
                  {showOffers && (
                    <div className="mt-2 p-4 bg-orange-50 rounded-lg">
                      <p className="text-gray-800">{aggregatedDiscountInfo?.descriptionList?.[0]?.meta}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Delivery Fee Info */}
              {feeDetails && (
                <div className="mt-4 flex items-center gap-2 text-gray-600">
                  <FiInfo className="text-lg" />
                  <span>{feeDetails.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
          <p className="text-gray-600">{menuItems.length} Categories</p>
        </div>

        {/* Menu Categories */}
        <div className="space-y-4 w-full">
          {menuItems.map((category, index) => (
            <div 
              key={category?.title || index} 
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md w-full"
            >
              {/* Category Header */}
              <div 
                className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleAccordion(index)}
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {category?.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category?.itemCards?.length} items
                  </p>
                </div>
                <span className={`transform transition-transform duration-200 ${showIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
              
              {/* Category Items */}
              {showIndex === index && (
                <div className="border-t border-gray-100">
                  {category?.itemCards?.map((item) => {
                    const { id, name, price, description, imageId, defaultPrice, isVeg } = item?.card?.info || {};
                    return (
                      <div 
                        key={id} 
                        className="p-8 border-b last:border-b-0 hover:bg-gray-50 flex justify-between items-start gap-8"
                      >
                        <div className="flex-1 max-w-2xl">
                          {/* Veg/Non-veg indicator */}
                          <div className="mb-2">
                            <span className={`inline-block w-4 h-4 border ${isVeg ? 'border-green-600' : 'border-red-600'} p-[2px]`}>
                              <span className={`block w-full h-full rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                            </span>
                          </div>
                          <h4 className="font-bold text-gray-800 text-xl">{name}</h4>
                          <p className="text-gray-600 mt-1 text-lg">
                            ₹{(price || defaultPrice) / 100}
                          </p>
                          {description && (
                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                              {description}
                            </p>
                          )}
                        </div>
                        
                        <div className="relative min-w-[200px]">
                          {imageId && (
                            <div className="relative">
                              <img
                                className="w-[200px] h-[140px] rounded-lg object-cover"
                                src={`${CDN_URL}${imageId}`}
                                alt={name}
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddItem(item);
                                }}
                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2
                                  bg-white text-green-600 px-10 py-2 rounded-lg shadow-md border border-green-600
                                  hover:bg-green-600 hover:text-white transition-all duration-200 text-sm font-medium
                                  active:scale-95"
                              >
                                ADD +
                              </button>
                            </div>
                          )}
                          {!imageId && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddItem(item);
                              }}
                              className="w-full bg-white text-green-600 px-10 py-2 rounded-lg shadow-md border border-green-600
                                hover:bg-green-600 hover:text-white transition-all duration-200 text-sm font-medium
                                active:scale-95"
                            >
                              ADD +
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
