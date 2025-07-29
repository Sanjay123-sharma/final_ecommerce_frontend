import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCPassword, setEmail, setPassword, setUsername } from '../../Redux/Slice'
import { gql, useMutation } from '@apollo/client'
import toast, { Toaster } from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router'
import Header from '../Header'
import Footer from '../Footer'

const Create_User = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!, $cpassword: String!, $otp: String!) {
  createUser(username: $username, email: $email, password: $password, cpassword: $cpassword, otp: $otp) {
    username
    email
    password
    cpassword
    otp
  }
}`

const Send_OTP = gql`
mutation SendOtp($email: String!) {
  sendOtp(email: $email)
}
`

export default function SignUp() {
  const email = useSelector((state) => state.product.email)
  const username = useSelector((state) => state.product.username)
  const password = useSelector((state) => state.product.password)
  const cpassword = useSelector((state) => state.product.cpassword)
  const [otp, setOtp] = useState('')
  const [optsent, setOptSent] = useState(false)
  const [error, setError] = useState({})
  const dispatch = useDispatch()

  const [createUser] = useMutation(Create_User)
  const [sendOtp] = useMutation(Send_OTP)
  const Navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!username) newErrors.username = 'This is a required field'
    if (!email) newErrors.email = 'This is a required field'
    if (!password) newErrors.password = 'This is a required field'
    if (!cpassword) newErrors.cpassword = 'This is a required field'
    if (!otp) newErrors.otp = 'This is a required field'

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors)
      return
    }

    try {
      const res = await createUser({
        variables: { username, email, password, cpassword, otp }
      })

      if (res.data === 'User Already Exist') {
        toast("Account Already Exists")
        setTimeout(() => {
          Navigate('/signin')
        }, 500);
      } else if (res.data) {
        toast.success('Account Created Successfully')
        Navigate('/signin')
      } else if (res.data === 'Invalid or expired Otp') {
        toast.error('Invalid or Expired OTP')
      }
    } catch (error) {
      toast.error('Internal Server Error', error)
    }
  }

  const handleOtp = async () => {
    if (!email) return toast.error('Enter a valid email')

    await sendOtp({ variables: { email } })
    toast.success('OTP sent to your mail')
    setOptSent(true)
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Header />
      </div><br />

      {/* Form content */}
      <div className="pt-28 px-4 pb-10 max-w-2xl mx-auto mt-20">
        <h2 className="text-3xl font-semibold border-b pb-2 mb-6">CREATE AN ACCOUNT</h2>

        {/* Email + OTP */}
        <div>
          <h3 className="text-xl font-semibold mb-3 border-b pb-1">NEW CUSTOMERS</h3>
          <div className="space-y-3 mb-6">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  dispatch(setEmail(e.target.value))
                  setError({ ...error, email: '' })
                }}
                placeholder="Email"
                className={`w-full px-4 py-2 border ${error.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              />
              {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
            </div>

            <div>
              <button
                onClick={handleOtp}
                className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition uppercase"
              >
                Get OTP
              </button>
            </div>
          </div>
        </div>

        {optsent && (
          <>
            <h3 className="text-xl font-semibold mb-3 border-b pb-1">CUSTOMER INFORMATION</h3>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    dispatch(setUsername(e.target.value))
                    setError({ ...error, username: '' })
                  }}
                  placeholder="First Name"
                  className={`w-full px-4 py-2 border ${error.username ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none"
                />
              </div>
              {error.username && <p className="text-red-500 text-sm">{error.username}</p>}

              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value)
                  setError({ ...error, otp: '' })
                }}
                placeholder="OTP"
                className={`w-full px-4 py-2 border ${error.otp ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              />
              {error.otp && <p className="text-red-500 text-sm">{error.otp}</p>}

              <input
                type="password"
                value={password}
                onChange={(e) => {
                  dispatch(setPassword(e.target.value))
                  setError({ ...error, password: '' })
                }}
                placeholder="Password"
                className={`w-full px-4 py-2 border ${error.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              />
              {error.password && <p className="text-red-500 text-sm">{error.password}</p>}

              <input
                type="password"
                value={cpassword}
                onChange={(e) => {
                  dispatch(setCPassword(e.target.value))
                  setError({ ...error, cpassword: '' })
                }}
                placeholder="Confirm Password"
                className={`w-full px-4 py-2 border ${error.cpassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              />
              {error.cpassword && <p className="text-red-500 text-sm">{error.cpassword}</p>}

              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-black text-white uppercase hover:bg-gray-800 transition"
              >
                Register
              </button>
            </form>
          </>
        )}

        <div><Toaster position="top-center" reverseOrder={false} /></div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <NavLink to={'/signin'} className="text-black hover:underline">
            Sign in
          </NavLink>
        </p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
