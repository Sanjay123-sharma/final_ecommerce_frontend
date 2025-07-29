import React from 'react';
import { useSelector } from 'react-redux';


export default function OrderConfirmation() {
  const Order = useSelector((state) => state.product.Order);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    

      <main className="flex-1 max-w-6xl mx-auto p-4">

        {Order.length === 0 ? (
          <h1 className="text-center text-gray-500 text-lg">No Order Found</h1>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="p-4 text-left">Item</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Quantity</th>
                  <th className="p-4 text-left">Size</th>
                  <th className="p-4 text-left">Image</th>
                </tr>
              </thead>
              <tbody>
                {Order.map((item) => (
                  <tr key={item.OrderId} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{item.title}</td>
                    <td className="p-4 text-green-600 font-semibold">₹{item.price}</td>
                    <td className="p-4">{item.count}</td>
                    <td className="p-4 uppercase">{item.size}</td>
                    <td className="p-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain border rounded-md"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

    </div>
  );
}
