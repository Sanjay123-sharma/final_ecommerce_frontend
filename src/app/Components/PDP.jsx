import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import toast, { Toaster } from 'react-hot-toast';
import { addCart } from '../Redux/Slice';

export default function PDP() {
  const { id } = useParams();
  const Products = useSelector((state) => state.product.Products);
  const Product = Products.find((item) => item.id.toString() === id);
  const token = localStorage.getItem('token');
  const Cart = useSelector((state) => state.product.Cart);
  const dispatch = useDispatch();

  const handleAdd = (id) => {
    const res = Cart.find((item) => item.id === id);
    if (res) {
      toast('Item already added');
    } else {
      dispatch(addCart(id));
      toast.success('Item has been Added to Cart');
    }
  };

  if (!Product) return <h1 className="text-center text-xl mt-10">Product Not Found</h1>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Header />
      </div><br /><br /><br />

      {/* Main */}
      <main className="pt-28 px-4 md:px-16">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="flex justify-center items-center">
            <img
              src={Product.image}
              alt={Product.title}
              className="w-full max-h-[400px] object-contain rounded-lg"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{Product.title}</h2>
            <p className="text-sm text-gray-500">Category: {Product.category}</p>
            <p className="text-green-700 font-semibold text-xl">₹{Product.price}</p>

            {token ? (
              <button
                onClick={() => handleAdd(Product.id)}
                className="bg-yellow-700 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-all duration-300 hover:scale-95"
              >
                Add to Cart
              </button>
            ) : (
              <button
                onClick={() => {
                  toast('Must be logged in');
                  setTimeout(() => {
                    window.location.href = '/signin';
                  }, 500);
                }}
                className="bg-yellow-700 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-all duration-300 hover:scale-95"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </main>
          <Toaster position="top-center" reverseOrder={false} />

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
