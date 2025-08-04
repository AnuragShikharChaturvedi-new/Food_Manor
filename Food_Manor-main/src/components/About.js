// About.js
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Welcome to <span className="text-orange-500">Food_Manor</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Delivering happiness with every order, we connect you with the best restaurants in your area.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              <span>Explore Restaurants</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
          <div className="md:w-1/2 pl-48">
            <img
              src="https://www.pngarts.com/files/7/Food-Delivery-Service-PNG-High-Quality-Image.png"
              alt="Food Delivery"
              className="rounded-lg shadow-xl pl-50 w-70 h-48"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Food_Manor?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fast Delivery */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast Delivery</h3>
              <p className="text-gray-600">
                Experience swift delivery at your doorstep with our efficient delivery network
              </p>
            </div>

            {/* Live Tracking */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Live Order Tracking</h3>
              <p className="text-gray-600">
                Track your order in real-time from the restaurant to your location
              </p>
            </div>

            {/* Quality Food */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Best Quality Food</h3>
              <p className="text-gray-600">
                We ensure the highest quality of food from our partner restaurants
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold mb-2">100+</h4>
              <p className="text-orange-100">Restaurants</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">50k+</h4>
              <p className="text-orange-100">Happy Customers</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">500+</h4>
              <p className="text-orange-100">Delivery Partners</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">30+</h4>
              <p className="text-orange-100">Cities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
     
    </div>
  );
};

export default About;
