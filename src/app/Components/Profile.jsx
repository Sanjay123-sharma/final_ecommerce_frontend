import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OrderHistory from './OrderHistory';

export default function Profile() {
  const email = useSelector((state) => state.product.email);
  const username = useSelector((state) => state.product.username);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Header />
      </div>

      <main className="pt-28 px-4 max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-4">
          <NavLink to="/" className="hover:underline">Home</NavLink> &gt; <span>My Account</span>
        </div>

        {/* Welcome & Info */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back, <span className="text-orange-600">{username}</span> 👋</h1>
          <p className="text-gray-600">Your Email: <span className="font-medium text-gray-800">{email}</span></p>
        </div>

        {/* Order History */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Order History</h2>
          <OrderHistory />
        </div>
      </main>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
