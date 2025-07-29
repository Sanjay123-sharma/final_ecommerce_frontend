import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { gql, useMutation } from '@apollo/client'
import toast, { Toaster } from 'react-hot-toast'

const REQUEST=gql`
mutation CreateContactRequest($name: String!, $email: String!, $message: String!) {
  createContactRequest(name: $name, email: $email, message: $message) {
   name
   email
   message
  }
}
`

const Mail_Request=gql`
mutation CreateContactRequest($email: String!, $message: String) {
  sendRequestMail(email: $email, message: $message)
}
`

export default function Contact() {
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [message,setMessage]=useState('')
    const [createContactRequest]=useMutation(REQUEST)
    const [sendRequestMail]=useMutation(Mail_Request)

    const handleSubmit=async()=>{
       try {
         if(!email || !message || !name) {
            console.log('restrict')
        }
        const res=await createContactRequest({
            variables:{
                name:name,
                email:email,
                message:message
            }
        })
        const res2=await sendRequestMail({
            variables:{
                email:email,
                message:message
            }
        })
        
        if(res.data || res2.data){
            toast.success('Request Submitted and mail sent successfully')
        }else{
            toast.error('Internal Server Issue')
        }
        
       } catch (error) {
        toast.error('Internal Server Issue')
        
       }

    }
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
      </div>

      <main className='mt-2'>
        <div className="text-3xl font-semibold  ml-5 border-b-2 border-black inline-block mb-10">
            <h1 className=''>Contact Form</h1>
        </div>
        <div className='mt-1 ml-5 lg:w-1/2'>
            Name: <input type="text" value={name} onChange={(e)=>setName(e.target.value)}                 className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
/> <br />
            Email: <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}                 className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
/> <br />
           Message: <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)}                 className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
 /> <br /><br />
              <button onClick={()=>handleSubmit()} className='bg-yellow-700 text-white border-2 ml-134 w-40 p-1 hover:scale-90 transition-transform duration-1000 '>Submit Request</button>
        </div>

      </main>
<br />
      <div>
    <Footer/>
      </div>
    </div>
  )
}
