import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { NavLink } from 'react-router'

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Header />
      </div>

      <main className="flex-1 mt-48 ml-10 px-4 md:px-10 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-gray-500 text-sm mb-4">
          <span className="hover:text-black cursor-pointer">
            <NavLink to={'/'}>Home</NavLink>
          </span>
          <span className="mx-2">|</span>
          <span className="text-black">About Us</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl font-semibold border-b-2 border-black inline-block pb-1 mb-6">
          ABOUT US
        </h1>

        {/* Subtitle */}
        <h2 className="text-lg font-medium mb-4">Sample Store</h2>

        {/* Paragraph */}
        <p className="text-gray-800 leading-relaxed text-justify">
          Thanks so much for visiting our online store. Our team is excited to provide you with an impeccable
          online shopping experience and remains available to assist at any time. If you have questions, comments
          or concerns about your order or the content found within this website, please feel free to contact us
          via telephone or email and one of our experienced team members will get back to you right away.
          Again, thanks for visiting our store and we look forward to serving you in the future.
        </p>
      </main>

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  )
}
