import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ItemList from './ItemList';

const RestaurantCategory = ({ category,isExpanded,setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div className="menu-category mb-6 bg-white shadow-md rounded-lg overflow-hidden">
      <button
        className="w-full text-left p-4 cursor-pointer  bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
        onClick={handleClick}
      >
        <h2 className="text-xl font-bold">{category?.title}({category.itemCards.length})</h2>
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isExpanded && (
        <div className="p-4">
          <ItemList items={category?.itemCards} />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;