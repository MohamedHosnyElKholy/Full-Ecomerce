import React from 'react';

export default function Page() {
    return (
        <div className="container mx-auto my-20">
            {/* Site Introduction */}
            <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center">
                <h2 className="text-3xl font-bold mb-4">Welcome to Our Online Store!</h2>
                <p className="mb-4">
                    Discover a unique shopping experience that combines quality and convenience.
                </p>
                
                {/* Attractive Icons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6">
                    <div className="flex flex-col items-center p-4">
                        <i className="fas fa-clock text-5xl text-blue-600 mb-2"></i>
                        <h3 className="text-xl font-semibold">Fast Delivery</h3>
                        <p className="text-gray-600">Get your orders delivered quickly and efficiently.</p>
                    </div>
                    <div className="flex flex-col items-center p-4">
                        <i className="fas fa-shopping-cart text-5xl text-blue-600 mb-2"></i>
                        <h3 className="text-xl font-semibold">Easy Shopping</h3>
                        <p className="text-gray-600">Shop your favorite items with just a few clicks.</p>
                    </div>
                    <div className="flex flex-col items-center p-4">
                        <i className="fas fa-star text-5xl text-blue-600 mb-2"></i>
                        <h3 className="text-xl font-semibold">Top Quality</h3>
                        <p className="text-gray-600">We offer only the best products for our customers.</p>
                    </div>
                </div>
                
                <p className="mt-4">
                    Join us today and discover exclusive deals!
                </p>
            </div>
        </div>
    );
}
