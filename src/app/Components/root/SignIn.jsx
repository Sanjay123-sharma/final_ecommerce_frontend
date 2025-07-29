import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setPassword } from '../../Redux/Slice'
import { gql, useMutation } from '@apollo/client'
import toast, { Toaster } from 'react-hot-toast'
import { FaUserPlus, FaSignInAlt, FaRedo } from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
import UpdatedUser from '../UpdatedUser'

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`

export default function SignIn() {
  const email = useSelector((state) => state.product.email)
  const password = useSelector((state) => state.product.password)
  const dispatch = useDispatch()
  const [loginUser] = useMutation(LOGIN_USER)
  const dialogRef = useRef(null)
  const [loader,setLoader]=useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await loginUser({
        variables: { email, password },
      })
      const token=response?.data?.loginUser?.token;

      if (response.data?.loginUser?.token) {
        setLoader(true)
       console.log(response.data.loginUser.token)
       localStorage.setItem("token",response.data.loginUser.token)
       document.cookie=`token=${token}; path=/;max-age=8640`
        setTimeout(() => {
          toast.success('Login Successfully')
          setLoader(false)
           
          window.location.href = '/'
        }, 1000)
      } else {
        toast.error('Invalid Credentials')
      }
    } catch (error) {
      toast.error('Internal Server Error')
      console.log('Error:', error)
    }
  }

  const openDialog = () => dialogRef.current?.showModal()
  const closeDialog = () => dialogRef.current?.close()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Header />
      </div>
      <br /> <br /> <br />

           
        

      <main className="flex-1 container mx-auto px-4 py-8 mt-25">
        <h1 className="text-3xl font-semibold border-b-2 border-black inline-block mb-10">MY ACCOUNT</h1>
        <div className='ml-80 '>
           {
              loader?<p className=' text-center w-20 h-20 ml-55 mb-30 border-amber-700 border-4 border-t-transparent rounded-full animate-spin'></p>:""
           }
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* New Customers */}
          <div className="lg:w-1/2 border-r lg:pr-12">
            <h2 className="text-lg font-semibold mb-2">NEW CUSTOMERS</h2>
            <p className="text-sm text-gray-600 mb-6">
              If you don't have an account, please proceed by clicking the following button to continue first-time registration.
            </p>
            
            <a
              href="/signup"
              className="inline-flex items-center justify-center border-2 border-black py-2 px-6 rounded-md hover:bg-black hover:text-white transition-all"
            >
              <FaUserPlus className="mr-2" />
              CREATE ACCOUNT
            </a>
            
          </div>
            
            


          {/* Returning Customers */}
          <div className="lg:w-1/2">
            <h2 className="text-lg font-semibold mb-2">RETURNING CUSTOMERS</h2>
            <p className="text-sm text-gray-600 mb-6">Please log in to your account.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="Email"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                placeholder="Password"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
             
               <button
                type="submit"
                className="w-full border border-black py-2 text-black font-medium flex items-center justify-center hover:bg-black hover:text-white transition duration-2000"
              >
                <FaSignInAlt className="mr-2" />
                LOG IN TO MY ACCOUNT
              </button>
             

             

              {/* RESET PASSWORD BUTTON */}
              <button
                type="button"
                onClick={openDialog}
                className="w-full bg-[#a4603a] text-white py-2 flex items-center justify-center hover:scale-110  transition-transform duration-1000 hover:bg-amber-600 transition duration-1000"
              >
                <FaRedo className="mr-2" />
                RESET MY PASSWORD
              </button>
            </form>
          </div>
        </div>

        {/* Dialog */}
        <dialog
          ref={dialogRef}
          className="rounded-md shadow-lg  p-1 ml-120 w-[90%] max-w-lg backdrop:bg-black/50"
        >
          <h2 className="text-l font-semibold mb-3">Reset My Password</h2>

          <UpdatedUser />

          <div className="flex justify-end gap-4 mt-2">
            <button
              onClick={closeDialog}
              className="px-2 py-2 bg-[#a4603a] text-white rounded hover:opacity-90"
            >
              CLOSE
            </button>
            <button
              form="update-user-form"
              className="px-2 py-2 border border-black rounded flex items-center hover:bg-black hover:text-white transition"
            >
              <FaRedo className="mr-2" />
              RESET MY PASSWORD
            </button>
          </div>
        </dialog>

        <Toaster position="top-center" reverseOrder={false} />
      </main>
      <br />
      <Footer />
    </div>
  )
}
