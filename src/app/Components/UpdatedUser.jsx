import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const UPDATED_PASSWORD = gql`
  mutation Mutation($email: String!, $password: String!) {
    updateUser(email: $email, password: $password) {
      email
      password
    }
  }
`

export default function UpdatedUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [updateUser] = useMutation(UPDATED_PASSWORD)

  const handleReset = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please enter both email and password')
      return
    }

    try {
      const res = await updateUser({
        variables: {
          email,
          password,
        },
      })

      if (res?.data?.updateUser) {
        toast.success('Password Updated Successfully')
        setTimeout(() => {
          window.location.href = '/signin'
        }, 800)
      }
    } catch (error) {
      toast.error('Update Failed')
      console.error(error)
    }
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <form id="update-user-form" onSubmit={handleReset} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full border border-gray-300 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            required
            className="w-full border border-gray-300 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </form>
    </div>
  )
}
