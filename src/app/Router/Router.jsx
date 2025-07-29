import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from '../Components/root/Root'
import SignUp from '../Components/root/SignUp'
import SignIn from '../Components/root/SignIn'
import Cart from '../Components/Cart'
import PDP from '../Components/PDP'
import Shipping from '../Components/Shipping'
import Contact from '../Components/Contact'
import Profile from '../Components/Profile'
import OrderConfirmation from '../Components/OrderConfirmation'
import About from '../Components/About'
import Collection from '../Components/Collection'


export default function Router() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Root/>,
   

    },
    {
      path:"/product/:id",
      element:<PDP/>

    },
    {
path:"/cart",
element:<Cart/>
    },
    
    {
      path:"/signup",
      element:<SignUp/>
    },{
      path:"/signin",
      element:<SignIn/>
    },
    {
      path:"/shipping",
      element:<Shipping/>
    },
    {
      path:"/contact",
      element:<Contact/>
    },
    {
      path:"/profile",
      element:<Profile/>
    },
    {
      path:"/order",
      element:<OrderConfirmation/>
    },
    {
      path:"/about",
      element:<About/>
    },
    {
      path:"/collection",
      element:<Collection/>
    }
 
  ])
  return (
    <div>
      <RouterProvider router={router} />

      
    </div>
  )
}
