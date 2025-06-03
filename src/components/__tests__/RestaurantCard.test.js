import { render, screen } from "@testing-library/react";
import RestaurantCard from "../RestaurantCard";
import "@testing-library/jest-dom";

describe("Restaurant Card Test Cases", () => {
    // Define mock data that matches your component's expected structure
    const MOCK_DATA = {
        info: {  // Wrap the data in info object
            id: "10576",
            name: "Pizza Hut",
            cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2024/7/16/87e56c63-b521-4257-96ae-a42229b92009_10576.jpg",
            locality: "6th Block",
            areaName: "Koramangala",
            costForTwo: "₹350 for two",
            cuisines: ["Pizzas"],
            avgRating: 4.2,
            sla: {
                deliveryTime: 43
            }
        }
    };

    it("should render RestaurantCard component with props Data", () => {
     const {getByText}  = render(<RestaurantCard resData={MOCK_DATA} />);
        
        // Test for restaurant name
        const name = screen.getByText("Pizza Hut");
        expect(name).toBeInTheDocument();

        // Test for cuisines
        const cuisines = screen.getByText("Pizzas");
        expect(cuisines).toBeInTheDocument();

        // Test for rating
        const rating = screen.getByText("4.2 stars");
        expect(rating).toBeInTheDocument();

        // Test for cost for two
        const cost = screen.getByText("₹350 for two");
        expect(cost).toBeInTheDocument();

        // Test for delivery time
    });

    
});

