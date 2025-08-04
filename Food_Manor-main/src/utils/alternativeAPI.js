// Alternative APIs that don't have CORS issues

export const fetchRestaurantsFromSpoonacular = async () => {
  const API_KEY = 'YOUR_SPOONACULAR_API_KEY'; // Get free key from spoonacular.com
  const response = await fetch(
    `https://api.spoonacular.com/food/restaurants/search?query=restaurant&apiKey=${API_KEY}`
  );
  return response.json();
};

export const fetchRestaurantsFromZomato = async () => {
  // Zomato API alternative (if available)
  const response = await fetch('https://developers.zomato.com/api/v2.1/search');
  return response.json();
};

// JSON Server setup for your own API
export const setupLocalAPI = () => {
  console.log(`
    To set up your own API server:
    1. npm install -g json-server
    2. Create db.json with restaurant data
    3. Run: json-server --watch db.json --port 3001
    4. Use: http://localhost:3001/restaurants
  `);
};