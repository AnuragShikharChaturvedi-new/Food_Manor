// src/components/Body.js
// Multiple API fallbacks to ensure data loads for all users
import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { FiSearch } from "react-icons/fi";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [activeFilters, setActiveFilters] = useState({
    rating: false,
    fastDelivery: false,
    pureVeg: false,
    offers: false,
  });

  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const apis = [
      // Primary API - TheMealDB
      async () => {
        const categories = ['Chicken', 'Beef', 'Seafood', 'Vegetarian', 'Pasta', 'Dessert'];
        const allRestaurants = [];
        
        for (let i = 0; i < categories.length; i++) {
          const response = await Promise.race([
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories[i]}`, {
              headers: { 'Accept': 'application/json' }
            }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Timeout')), 8000)
            )
          ]);
          
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();
          
          if (data.meals) {
            const restaurants = data.meals.slice(0, 3).map((meal) => ({
              info: {
                id: meal.idMeal,
                name: `${meal.strMeal} Kitchen`,
                avgRating: (4.0 + Math.random() * 1).toFixed(1),
                sla: { deliveryTime: 20 + Math.floor(Math.random() * 20) },
                cuisines: [categories[i], 'International'],
                costForTwoString: `₹${300 + Math.floor(Math.random() * 200)} FOR TWO`,
                cloudinaryImageId: meal.strMealThumb,
                veg: categories[i] === 'Vegetarian',
                aggregatedDiscountInfoV3: Math.random() > 0.5 ? {
                  header: `${10 + Math.floor(Math.random() * 40)}% OFF`,
                  subHeader: 'Use code SAVE'
                } : null
              }
            }));
            allRestaurants.push(...restaurants);
          }
        }
        return allRestaurants;
      },
      
      // Fallback API - JSONPlaceholder with food data
      async () => {
        const response = await Promise.race([
          fetch('https://jsonplaceholder.typicode.com/posts', {
            headers: { 'Accept': 'application/json' }
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 5000)
          )
        ]);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const posts = await response.json();
        
        const foodNames = ['Pizza Palace', 'Burger House', 'Pasta Corner', 'Sushi Bar', 'Taco Bell', 'Curry House', 'BBQ Grill', 'Salad Stop'];
        const cuisines = [['Italian'], ['American'], ['Italian'], ['Japanese'], ['Mexican'], ['Indian'], ['American'], ['Healthy']];
        
        return posts.slice(0, 8).map((post, index) => ({
          info: {
            id: post.id.toString(),
            name: foodNames[index] || `Restaurant ${post.id}`,
            avgRating: (4.0 + Math.random() * 1).toFixed(1),
            sla: { deliveryTime: 20 + Math.floor(Math.random() * 20) },
            cuisines: cuisines[index] || ['International'],
            costForTwoString: `₹${300 + Math.floor(Math.random() * 200)} FOR TWO`,
            cloudinaryImageId: `https://picsum.photos/300/200?random=${index}`,
            veg: Math.random() > 0.5,
            aggregatedDiscountInfoV3: Math.random() > 0.5 ? {
              header: `${10 + Math.floor(Math.random() * 40)}% OFF`,
              subHeader: 'Use code SAVE'
            } : null
          }
        }));
      },
      
      // Last resort - Static data
      async () => {
        const staticRestaurants = [
          { name: 'Pizza Palace', cuisine: 'Italian', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300' },
          { name: 'Burger House', cuisine: 'American', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300' },
          { name: 'Sushi Bar', cuisine: 'Japanese', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300' },
          { name: 'Taco Corner', cuisine: 'Mexican', image: 'https://images.unsplash.com/photo-1565299585323-38174c4a6c7b?w=300' },
          { name: 'Curry House', cuisine: 'Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300' },
          { name: 'Pasta Corner', cuisine: 'Italian', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300' }
        ];
        
        return staticRestaurants.map((restaurant, index) => ({
          info: {
            id: (index + 1).toString(),
            name: restaurant.name,
            avgRating: (4.0 + Math.random() * 1).toFixed(1),
            sla: { deliveryTime: 20 + Math.floor(Math.random() * 20) },
            cuisines: [restaurant.cuisine],
            costForTwoString: `₹${300 + Math.floor(Math.random() * 200)} FOR TWO`,
            cloudinaryImageId: restaurant.image,
            veg: Math.random() > 0.5,
            aggregatedDiscountInfoV3: {
              header: `${10 + Math.floor(Math.random() * 40)}% OFF`,
              subHeader: 'Use code SAVE'
            }
          }
        }));
      }
    ];
    
    // Try APIs in order until one works
    for (let i = 0; i < apis.length; i++) {
      try {
        console.log(`Trying API ${i + 1}...`);
        const restaurants = await apis[i]();
        
        if (restaurants && restaurants.length > 0) {
          setListOfRestaurants(restaurants);
          setFilteredRestaurants(restaurants);
          setLoading(false);
          console.log(`API ${i + 1} successful`);
          return;
        }
      } catch (err) {
        console.log(`API ${i + 1} failed:`, err);
        continue;
      }
    }
    
    // If all APIs fail
    setError('Unable to load restaurants. Please check your internet connection.');
    setLoading(false);
  };

  const handleSearch = () => {
    if (!searchText.trim()) {
      setFilteredRestaurants(listOfRestaurants);
      return;
    }
    const searchResult = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(searchResult);
  };

  const handleFilter = (filterType) => {
    const newActiveFilters = {
      ...activeFilters,
      [filterType]: !activeFilters[filterType],
    };
    setActiveFilters(newActiveFilters);

    let filteredResults = [...listOfRestaurants];

    // Apply active filters
    if (newActiveFilters.rating) {
      filteredResults = filteredResults.filter((res) => res.info.avgRating > 4);
    }
    if (newActiveFilters.fastDelivery) {
      filteredResults = filteredResults.filter((res) => res.info.sla.deliveryTime < 30);
    }
    if (newActiveFilters.pureVeg) {
      filteredResults = filteredResults.filter((res) => res.info.veg);
    }
    if (newActiveFilters.offers) {
      filteredResults = filteredResults.filter((res) => res.info.aggregatedDiscountInfoV3);
    }

    setFilteredRestaurants(filteredResults);
  };

  if (!onlineStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Looks like you're offline!
          </h1>
          <p className="text-gray-600">
            Please check your internet connection and try again.
          </p>
        </div>
      </div>
    );
  }

  if (loading) return <Shimmer />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search and Filters Section */}
      <div className="sticky top-20 z-10 bg-white shadow-sm py-4">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="flex items-center flex-1 max-w-[400px]">
              <div className="relative flex-1">
                <input
                  type="text"
                  className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Search for restaurants..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                className="ml-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleFilter('rating')}
                className={`px-4 py-2 rounded-full border flex items-center gap-2 transition-colors
                  ${activeFilters.rating 
                    ? 'bg-orange-500 text-white border-orange-500' 
                    : 'border-gray-300 hover:bg-gray-50'}`}
              >
                <TbAdjustmentsHorizontal />
                Rating 4.0+
              </button>
              <button
                onClick={() => handleFilter('fastDelivery')}
                className={`px-4 py-2 rounded-full border flex items-center gap-2 transition-colors
                  ${activeFilters.fastDelivery 
                    ? 'bg-orange-500 text-white border-orange-500' 
                    : 'border-gray-300 hover:bg-gray-50'}`}
              >
                Fast Delivery
              </button>
              <button
                onClick={() => handleFilter('pureVeg')}
                className={`px-4 py-2 rounded-full border flex items-center gap-2 transition-colors
                  ${activeFilters.pureVeg 
                    ? 'bg-orange-500 text-white border-orange-500' 
                    : 'border-gray-300 hover:bg-gray-50'}`}
              >
                Pure Veg
              </button>
              <button
                onClick={() => handleFilter('offers')}
                className={`px-4 py-2 rounded-full border flex items-center gap-2 transition-colors
                  ${activeFilters.offers 
                    ? 'bg-orange-500 text-white border-orange-500' 
                    : 'border-gray-300 hover:bg-gray-50'}`}
              >
                Offers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant List Section */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Restaurant Count */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {filteredRestaurants.length} restaurants
          </h2>
        </div>

        {/* Restaurant Grid */}
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No restaurants found!
            </h2>
            <p className="text-gray-600">
              Try changing your filters or search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant?.info?.id}
                to={`/restaurant/${restaurant?.info?.id}`}
                className="restaurant-link"
              >
                <RestaurantCard resData={restaurant} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
