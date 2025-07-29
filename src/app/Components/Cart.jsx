import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, removeOrder } from '../Redux/Slice';
import Header from './Header';
import Footer from './Footer';

export default function Cart() {
  const Cart = useSelector((state) => state.product.Cart);
  const [loader, setLoader] = useState(false);

  const SubTotal = Cart.reduce((x, item) => x + item.count * item.price, 0);
  const Tax = Math.round(SubTotal * 0.08);
  const Total = SubTotal + Tax;
  const dispatch = useDispatch();

  const handleIncrement = (id) => dispatch(increment(id));
  const handleDecrement = (id) => dispatch(decrement(id));
  const handleRemove = (id) => dispatch(removeOrder(id));

  const handleClick = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      window.location.href = '/shipping';
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-semibold border-b pb-2 mb-6">SHOPPING CART</h1>

        {Cart.length === 0 ? (
          <div className="text-center text-lg font-medium">Cart is Empty</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items Section */}
            <div className="lg:col-span-2">
              <table className="w-full border-t text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">ITEMS</th>
                    <th className="py-2">PRICE</th>
                    <th className="py-2">QTY</th>
                    <th className="py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Cart.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-4 flex items-center gap-4">
                        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover" />
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <button onClick={() => handleRemove(item.id)} className="text-sm text-blue-600 mt-1">
                            × Delete
                          </button>
                        </div>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <div className="flex items-center border w-fit">
                          <button onClick={() => handleDecrement(item.id)} className="px-2 border-r">-</button>
                          <span className="px-3">{item.count}</span>
                          <button onClick={() => handleIncrement(item.id)} className="px-2 border-l">+</button>
                        </div>
                      </td>
                      <td>${(item.count * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-right font-medium mt-4">
                Subtotal ({Cart.length} items): <span className="font-semibold">${SubTotal.toFixed(2)}</span>
              </p>
            </div>

            {/* Order Summary */}
            <div className="border p-6 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">ORDER SUMMARY</h2>
              <div className="flex justify-between mb-2">
                <span>SUBTOTAL</span>
                <span>${SubTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 font-bold text-lg">
                <span>TOTAL</span>
                <span>${Total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleClick}
                className="w-full bg-black text-white py-2 text-sm font-medium mb-4 hover:bg-gray-800 transition"
              >
                {loader ? (
                  <div className="w-6 h-6 mx-auto border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'PROCEED TO CHECKOUT'
                )}
              </button>
              

              <p className="text-center text-sm text-blue-500 mb-3">Save for later</p>
              <div className="text-center border-t pt-4 mb-3">Or checkout with:</div>

              <div className="space-y-3">
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm py-2 rounded font-semibold">
                  <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" className="h-5 mx-auto" />
                </button>
                <button className="w-full bg-blue-900 text-white py-2 text-sm font-semibold rounded">
                  PayPal CREDIT
                </button>
              </div>

              {/* Collapsibles */}
              <div className="mt-6 border-t pt-4">
                <details>
                  <summary className="cursor-pointer font-medium">Apply Coupon</summary>
                  <input type="text" className="border mt-2 w-full px-2 py-1 rounded" placeholder="Enter coupon" />
                </details>
              </div>
              <div className="mt-4 border-t pt-4">
                <details>
                  <summary className="cursor-pointer font-medium">Calculate Shipping</summary>
                  <input type="text" className="border mt-2 w-full px-2 py-1 rounded" placeholder="Zip / Postal code" />
                </details>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
