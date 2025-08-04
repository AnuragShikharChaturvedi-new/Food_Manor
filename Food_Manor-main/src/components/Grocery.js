const Grocery = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Main Content */}
            <div className="flex-grow pt-[80px] px-4"> {/* Added pt-[80px] for header spacing */}
                <div className="max-w-6xl mt-20 ml-auto mr-auto">
                    {/* Hero Section */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Fresh Groceries Delivered
                        </h1>
                        <p className="text-xl text-gray-600">
                            Shop from our wide selection of fresh produce, pantry essentials, and more
                        </p>
                    </div>

                    {/* Categories Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {/* Category Card 1 */}
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fresh Fruits</h2>
                            <p className="text-gray-600 mb-4">
                                Handpicked fresh fruits delivered to your doorstep
                            </p>
                            <button className="text-green-600 font-medium hover:text-green-700">
                                Shop Now →
                            </button>
                        </div>

                        {/* Category Card 2 */}
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fresh Vegetables</h2>
                            <p className="text-gray-600 mb-4">
                                Farm-fresh vegetables for your daily needs
                            </p>
                            <button className="text-green-600 font-medium hover:text-green-700">
                                Shop Now →
                            </button>
                        </div>

                        {/* Category Card 3 */}
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dairy Products</h2>
                            <p className="text-gray-600 mb-4">
                                Fresh dairy products from trusted sources
                            </p>
                            <button className="text-green-600 font-medium hover:text-green-700">
                                Shop Now →
                            </button>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="text-center">
                            <div className="text-4xl mb-4">🚚</div>
                            <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
                            <p className="text-gray-600">On orders above ₹499</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-2">Express Delivery</h3>
                            <p className="text-gray-600">Within 2 hours</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">💯</div>
                            <h3 className="text-xl font-semibold mb-2">Best Quality</h3>
                            <p className="text-gray-600">100% quality guarantee</p>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="bg-green-50 rounded-lg p-8 text-center mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Subscribe to Our Newsletter
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Get updates about new products and special offers
                        </p>
                        <div className="max-w-md mx-auto flex gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

           
           
        </div>
    );
};

export default Grocery;
