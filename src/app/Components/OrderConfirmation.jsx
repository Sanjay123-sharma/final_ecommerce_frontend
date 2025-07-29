import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';

export default function OrderConfirmation() {
  const Order = useSelector((state) => state.product.Order);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Header />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 pt-24 px-4 pb-16 max-w-7xl mx-auto">
        {Order.length === 0 ? (
          <div className="text-center mt-10 text-xl font-semibold text-gray-700">
            No Order Found
          </div>
        ) : (
          <>
            {/* Confirmation Banner */}
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-6 text-center text-lg font-medium shadow">
              ✅ Your Order Has Been Successfully Placed!
            </div>

            <h1 className="text-3xl font-bold mb-8 text-center text-orange-600">Order Summary</h1>

            {/* Order Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Order.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg p-4 transition duration-300"
                >
                  {/* Image */}
                  <div className="w-full h-40 flex items-center justify-center mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-contain h-full rounded-md"
                    />
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h2>

                  {/* Details */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-semibold">Price:</span>{' '}
                      <span className="text-green-600 font-bold">₹{item.price}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Quantity:</span> {item.count}
                    </p>
                    <p>
                      <span className="font-semibold">Size:</span>{' '}
                      <span className="inline-block bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium">
                        {item.size}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
