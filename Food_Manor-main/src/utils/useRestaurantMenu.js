import { useEffect, useState } from "react";
const useRestaurantMenu=(resId)=>{
     const [resInfo,setResInfo]=useState(null);
    useEffect(()=>{
        fetchData();
    },[])

    const fetchData=async()=>{
        const menuApis = [
            // Primary API - TheMealDB
            async () => {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${resId}`);
                const data = await response.json();
                
                if (data.meals && data.meals[0]) {
                    const meal = data.meals[0];
                    const categoryResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal.strCategory}`);
                    const categoryData = await categoryResponse.json();
                    
                    const menuItems = categoryData.meals ? categoryData.meals.slice(0, 8).map((item) => ({
                        card: {
                            info: {
                                id: item.idMeal,
                                name: item.strMeal,
                                price: 15000 + Math.floor(Math.random() * 20000),
                                description: `Delicious ${item.strMeal} prepared with authentic ingredients`,
                                imageId: item.strMealThumb
                            }
                        }
                    })) : [];
                    
                    return {
                        cards: [
                            {
                                card: {
                                    card: {
                                        info: {
                                            name: `${meal.strMeal} Kitchen`,
                                            avgRating: (4.0 + Math.random() * 1).toFixed(1),
                                            totalRatingsString: `${Math.floor(Math.random() * 5000) + 500}+ ratings`,
                                            costForTwoMessage: `₹${300 + Math.floor(Math.random() * 200)} for two`,
                                            cuisines: [meal.strCategory, meal.strArea || 'International']
                                        }
                                    }
                                }
                            },
                            {
                                groupedCard: {
                                    cardGroupMap: {
                                        REGULAR: {
                                            cards: [
                                                {
                                                    card: {
                                                        card: {
                                                            title: "Recommended",
                                                            itemCards: menuItems
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    };
                }
                throw new Error('Menu not found');
            },
            
            // Fallback - Static menu based on restaurant ID
            async () => {
                const menuItems = [
                    { name: 'Chicken Curry', price: 25000, desc: 'Spicy chicken curry with rice' },
                    { name: 'Vegetable Biryani', price: 20000, desc: 'Aromatic rice with mixed vegetables' },
                    { name: 'Paneer Butter Masala', price: 22000, desc: 'Creamy paneer in rich tomato gravy' },
                    { name: 'Dal Tadka', price: 15000, desc: 'Yellow lentils with spices' },
                    { name: 'Naan Bread', price: 8000, desc: 'Fresh baked Indian bread' },
                    { name: 'Gulab Jamun', price: 12000, desc: 'Sweet milk dumplings in syrup' }
                ].map((item, index) => ({
                    card: {
                        info: {
                            id: `${resId}_${index}`,
                            name: item.name,
                            price: item.price,
                            description: item.desc,
                            imageId: `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&random=${index}`
                        }
                    }
                }));
                
                return {
                    cards: [
                        {
                            card: {
                                card: {
                                    info: {
                                        name: `Restaurant ${resId}`,
                                        avgRating: (4.0 + Math.random() * 1).toFixed(1),
                                        totalRatingsString: `${Math.floor(Math.random() * 5000) + 500}+ ratings`,
                                        costForTwoMessage: `₹${300 + Math.floor(Math.random() * 200)} for two`,
                                        cuisines: ['Indian', 'International']
                                    }
                                }
                            }
                        },
                        {
                            groupedCard: {
                                cardGroupMap: {
                                    REGULAR: {
                                        cards: [
                                            {
                                                card: {
                                                    card: {
                                                        title: "Recommended",
                                                        itemCards: menuItems
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                };
            }
        ];
        
        // Try APIs in order
        for (let i = 0; i < menuApis.length; i++) {
            try {
                console.log(`Trying menu API ${i + 1}...`);
                const menuData = await menuApis[i]();
                if (menuData) {
                    setResInfo(menuData);
                    console.log(`Menu API ${i + 1} successful`);
                    return;
                }
            } catch (err) {
                console.log(`Menu API ${i + 1} failed:`, err);
                continue;
            }
        }
        
        // If all fail, set null
        console.error("All menu APIs failed");
        setResInfo(null);
    }
   

    return resInfo;
}
export default useRestaurantMenu;