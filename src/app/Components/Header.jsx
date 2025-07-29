import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {FaShoppingCart } from 'react-icons/fa';
import { IoMdLogIn } from 'react-icons/io';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

export default function Header() {
  const [token,setToken]=useState(localStorage.getItem("token"))
  useEffect(()=>{
    const interval=setInterval(() => {
      setToken(localStorage.getItem('token'))
    }, 500);
    return ()=>clearInterval(interval);
  })
  const Cart=useSelector((state)=>state.product.Cart)
  
  return (
    <header className="border-b text-sm font-light ">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-2 border-b text-gray-700">
        <div className="flex space-x-4">
          {
            !token?
            <>
              <NavLink to="/">Home</NavLink>
          <span>|</span>
          <NavLink to="/about">About Us</NavLink>
         

            </>:
            <>
               <NavLink to="/profile">My Account</NavLink>
          <span>|</span>
          <NavLink to="/contact">Contact Us</NavLink>
            </>
          }
        
       
        </div>
        <div >
<NavLink to={'/'}>
            <img src="https://backpacks-preview-com.3dcartstores.com/assets/images/3dcart/logo.png" alt="" className='hover:rotate-360 transition-transform duration-1000' />
</NavLink>
        </div>
        <div className="flex items-center space-x-2  ">
          <IoMdLogIn className="inline" />
          {
            !token?
            <>
             <NavLink to="/signIn">Login</NavLink>
          <span>or</span>
          <NavLink to="/signUp">Register</NavLink>
          <span>|</span>
            </>:
            <>
             <NavLink to="/cart" className="flex items-center space-x-1">
            <span>Shopping Cart</span>
            <FaShoppingCart /><sup className='text-l  font-bold-600'>{Cart.length}</sup>
          </NavLink>
          <button onClick={()=>{
            localStorage.removeItem("token");
            toast.success("Logout Successfully")
           setTimeout(() => {
             window.location.href='/signin'
           }, 500);
          }}
          className='bg-amber-700 text-white p-1 rounded text-bold hover:scale-105 transition-transform duration-1000'
          >Logout</button>
            </>
          }
         
         
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex justify-center space-x-10 text-black text-sm tracking-wider font-medium pb-4 mt-10">
        {
          !token?
          <>
             <NavLink to="/" className={({ isActive }) => isActive ? "border-b border-black pb-1" : ""}>HOME</NavLink>
                     <NavLink to="/collection" className={({ isActive }) => isActive ? "border-b border-black pb-1" : ""}>COLLECTIONS</NavLink>

          </>:
          <>
            <NavLink to="/" className={({ isActive }) => isActive ? "border-b border-black pb-1" : ""}>HOME</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "border-b border-black pb-1" : ""}>CONTACT</NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? "border-b border-black pb-1" : ""}>CART</NavLink>
          <NavLink to="/collection" className={({ isActive }) => isActive ? "border-b border-black pb-1" : ""}>COLLECTIONS</NavLink>
          </>
          
        }
      
      </nav>
            <Toaster position="top-center" reverseOrder={false} />

    </header>
  );
}
