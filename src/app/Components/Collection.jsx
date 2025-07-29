import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';

export default function Collection() {
  const Products = useSelector((state) => state.product.Products);
  const [filterCat, setFilterCat] = useState('Men');
  const [price, setPrice] = useState('');

  const filterData =
    filterCat === 'All'
      ? Products
      : Products.filter((item) => item.category === filterCat);

  const filterPrice = filterData.filter((item) => {
    if (price === '100-300') return item.price >= 100 && item.price <= 300;
    if (price === '300-600') return item.price > 300 && item.price <= 600;
    return true; // Allow showing all if no price selected
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Header />
      </div>

      {/* Main Content */}
      <main className="pt-28 px-4 md:px-16">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Shop Collection
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
          {/* Category Filter */}
          <div className="flex gap-4 items-center">
            <span className="font-semibold">Filter by Category:</span>
            {['Men', 'Women', 'All'].map((cat) => (
              <label key={cat} className="text-sm">
                <input
                  type="radio"
                  name="filterCat"
                  value={cat}
                  checked={filterCat === cat}
                  onChange={(e) => setFilterCat(e.target.value)}
                  className="mr-1"
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Price Filter */}
          <div className="flex gap-4 items-center">
            <span className="font-semibold">Filter by Price:</span>
            <label className="text-sm">
              <input
                type="radio"
                name="price"
                value="100-300"
                onChange={(e) => setPrice(e.target.value)}
                className="mr-1"
              />
              ₹100 - ₹300
            </label>
            <label className="text-sm">
              <input
                type="radio"
                name="price"
                value="300-600"
                onChange={(e) => setPrice(e.target.value)}
                className="mr-1"
              />
              ₹300 - ₹600
            </label>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filterPrice.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-contain mb-2"
              />
              <p className="text-xs text-gray-400">{item.category}</p>
              <h2 className="font-semibold text-sm mb-1">{item.title}</h2>
             <NavLink to={`/product/${item.id}`}>
                 <p className="text-green-700 text-xs">₹{item.price}</p>
              <button                         className="w-full bg-yellow-700 text-white mt-3 py-2 rounded hover:bg-amber-700 transition hover:scale-90 transition-transform-1000"

>
                View Product
              </button>
             </NavLink>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
