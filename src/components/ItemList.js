import React from 'react';
import { CDN_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';

const ItemList = ({ items = [] }) => { // Default to an empty array
  const dispatch = useDispatch();
  
  const handleAddItem = (item) => {
    dispatch(addItem(item));
    console.log(items);
  };

  return (
    <div className="menu-main-card-container space-y-4">
      {items.map((item) => (
        <div key={item?.card?.info?.id} className="menu-card flex items-center p-4 border-b last:border-b-0">
          <div className="menu-card-left flex-grow pr-4">
            <h2 className="menu-name text-lg font-medium mb-1">{item?.card?.info?.name}</h2>
            <h3 className="menu-price text-gray-700 mb-2">
              ₹{item?.card?.info?.price / 100 || item?.card?.info?.defaultPrice / 100}
            </h3>
            <h4 className="menu-description text-sm text-gray-500">
              {item?.card?.info?.description}
            </h4>
          </div>
          <div className="menu-card-right flex-shrink-0 w-24">
            {item?.card?.info?.imageId && (
              <img className="w-full h-24 object-cover rounded-lg" src={`${CDN_URL}${item?.card?.info?.imageId}`} alt={item?.card?.info?.name} />
            )}
            <button className="mt-2 w-full bg-white text-green-500 border border-green-500 px-2 py-1 rounded text-sm hover:bg-green-50 transition-colors duration-200" onClick={() => handleAddItem(item)}>
              ADD
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;