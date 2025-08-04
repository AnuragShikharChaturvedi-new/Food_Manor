import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeItem } from "../utils/cartSlice";
import { Link } from "react-router-dom";

const EmptyCartIcon = () => (
  <svg
    className="w-64 h-64 text-gray-300"
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M40 72C40 73.1046 39.1046 74 38 74C36.8954 74 36 73.1046 36 72C36 70.8954 36.8954 70 38 70C39.1046 70 40 70.8954 40 72Z"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      d="M60 72C60 73.1046 59.1046 74 58 74C56.8954 74 56 73.1046 56 72C56 70.8954 56.8954 70 58 70C59.1046 70 60 70.8954 60 72Z"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      d="M28.5 28H67.5L64.5 56H31.5L28.5 28Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28.5 28L25.5 16H20"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + ((item.card.info.price || item.card.info.defaultPrice) / 100) * (item.quantity || 1);
    }, 0);
  };

  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto mt-[80px]"> {/* Added mt-[80px] for header spacing */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-8 text-center">
              <EmptyCartIcon />
              <h2 className="text-xl font-semibold text-gray-600 mt-6 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                You can go to home page to view more restaurants
              </p>
              <Link 
                to="/"
                className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors inline-block font-medium"
              >
                See Restaurants
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-end mb-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md">
              {cartItems.map((item) => {
                const { id, name, price, imageId, defaultPrice } = item.card.info;
                return (
                  <div key={id} className="flex items-center p-6 border-b last:border-b-0">
                    <div className="flex-shrink-0 w-24 h-24 mr-4">
                      {imageId && (
                        <img
                          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${imageId}`}
                          alt={name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-gray-800">{name}</h3>
                      <p className="text-gray-600 mt-1">
                        ₹{((price || defaultPrice) / 100) * (item.quantity || 1)}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="text-gray-500 mr-4">
                          Quantity: {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleRemoveItem(id)}
                          className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Cart Summary */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">₹{getTotal()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className="font-semibold">₹40</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-semibold">
                    ₹{getTotal() + 40}
                  </span>
                </div>
                
                <button className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
