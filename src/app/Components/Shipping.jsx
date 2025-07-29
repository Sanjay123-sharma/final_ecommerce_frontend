import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllOrders, Orders, removeCart } from '../Redux/Slice';
import { gql, useMutation } from '@apollo/client';
import Header from './Header';
import Footer from './Footer';

const Shipping_Details = gql`
mutation Mutation($name: String!, $email: String!, $pincode: String!, $state: String!, $city: String!, $payment: String!, $mobile: String!, $street: String, $order: [OrderInput]) {
  createShippingUser(Name: $name, email: $email, pincode: $pincode, state: $state, city: $city, payment: $payment, mobile: $mobile, street: $street, Order: $order) {
    Name
    Order {
      count
      id
      image
      price
      size
      title
    }
    city
    email
    mobile
    payment
    pincode
    state
    street
  }
}`;

const Send_Mail = gql`
mutation OrderDetails($email: String!, $orderSummary: String!) {
  sendMail(email: $email, OrderSummary: $orderSummary)
}`;

export default function Shipping() {
  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('');
  const [street, setStreet] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [payment, setPayment] = useState('card');

  const [createShippingUser] = useMutation(Shipping_Details);
  const [sendMail] = useMutation(Send_Mail);
  const Cart = useSelector((state) => state.product.Cart);
  const dispatch = useDispatch();

  const transformedOrder = Cart.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    count: item.count,
    image: item.image,
    size: item.size,
  }));

  const SubTotal = Cart.reduce((x, item) => x + item.count * item.price, 0);
  const Tax = Math.round(SubTotal * 0.08);
  const Total = SubTotal + Tax;
  const TotalItems = Cart.length;

  const isValidForm = () => {
    if (!email || !name || !street || !city || !state || !mobile || !payment || !pincode) {
      console.log('All fields are required.');
      return false;
    }
    if (!/^\d{1,10}$/.test(pincode)) {
      console.log('Pincode must be numeric and not exceed 10 digits.');
      return false;
    }
    if (!/^\d{1,10}$/.test(mobile)) {
      console.log('Mobile number must be numeric and not exceed 10 digits.');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!isValidForm()) return;

    try {
      await createShippingUser({
        variables: {
          name,
          email,
          street,
          city,
          mobile,
          state,
          pincode,
          payment,
          order: transformedOrder,
        },
      });

      await sendMail({
        variables: {
          email,
          orderSummary: `
            Total Items: ${TotalItems}
            Total: ${Total}
            Address: ${street}, ${city}, ${state}, ${pincode}
          `,
        },
      });

      if (payment === 'card') {
        Razorpay();
      } else {
        dispatch(Orders());
        dispatch(AllOrders());
        dispatch(removeCart());
        setTimeout(() => {
          window.location.href = '/order';
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Razorpay = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: "rzp_test_10bPvq7zFtWaxp",
      amount: Total * 100,
      currency: "INR",
      name: "Your Company",
      description: "Order Payment",
      handler: function () {
        dispatch(Orders());
        dispatch(AllOrders());
        dispatch(removeCart());
        setTimeout(() => {
          window.location.href = '/order';
        }, 500);
      },
      prefill: { name, email, contact: mobile },
      notes: { address: `${street}, ${city}, ${state}, ${pincode}` },
      theme: { color: "#F97316" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Prevents non-numeric input and limits digits to 10
  const handleNumericInput = (e, setter) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setter(value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Header />
      </div><br /><br />
      <div className="pt-32 pb-10 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">BILLING INFORMATION</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <select className="w-full border p-2 rounded text-gray-600">
              <option>select an address</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="First Name *" className="border p-2 rounded w-full" />
              <input type="text" placeholder="Last Name" className="border p-2 rounded w-full" />
            </div>
            <input type="text" placeholder="Company" className="border p-2 rounded w-full" />
            <div className="grid grid-cols-3 gap-4">
              <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Address *" className="border p-2 rounded w-full col-span-2" />
              <input type="text" placeholder="Suite / Apt #" className="border p-2 rounded w-full" />
            </div>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="border p-2 rounded w-full" />
            <div className="grid grid-cols-3 gap-4">
              <select className="border p-2 rounded w-full" value="India">
                <option>India</option>
              </select>
              <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State *" className="border p-2 rounded w-full" />
              <input
                type="text"
                value={pincode}
                onChange={(e) => handleNumericInput(e, setPincode)}
                placeholder="Zip *"
                className="border p-2 rounded w-full"
              />
            </div>
            <input
              type="text"
              value={mobile}
              onChange={(e) => handleNumericInput(e, setMobile)}
              placeholder="Phone"
              className="border p-2 rounded w-full"
            />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 rounded w-full" />
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span className="text-sm">Yes, I would like to be notified of product updates.</span>
            </label>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <div className="space-y-2">
                <label className="block">
                  <input type="radio" name="payment" value="cash on Delivery" onChange={(e) => setPayment(e.target.value)} />
                  <span className="ml-2">Cash on Delivery</span>
                </label>
                <label className="block">
                  <input type="radio" name="payment" value="card" defaultChecked onChange={(e) => setPayment(e.target.value)} />
                  <span className="ml-2">Credit/Debit</span>
                </label>
              </div>
              <button onClick={handlePlaceOrder} className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
                Place Order
              </button>
            </div>
          </form>
        </div>

        {/* Right Side Order Summary */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">Order Summary</h2>
          {Cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 mb-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
              <div className="flex-1">
                <p className="text-sm text-blue-700 hover:underline cursor-pointer">{item.title}</p>
                <p className="text-sm">${item.price}</p>
              </div>
              <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">{item.count}</span>
            </div>
          ))}
          <p className="text-sm text-gray-600">Please select the appropriate shipping method to display the order total.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
