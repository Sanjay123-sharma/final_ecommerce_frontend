import React from 'react';
import {
  FaFacebookF,
  FaPinterestP,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaPaypal,
} from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-[#faf7f5] text-black py-10 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-semibold tracking-wide">
        <div>
          <p className="mb-3">COLLECTIONS</p>
          <p className="mb-3">TERMS AND CONDITIONS</p>
          <p>PRODUCT INDEX</p>
        </div>
        <div>
          <p className="mb-3">BACKPACKS</p>
          <p className="mb-3">BECOME AN AFFILIATE</p>
          <p>CATEGORY INDEX</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex gap-4 text-xl">
            <FaFacebookF />
            <FiX />
            <FaPinterestP />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <FaCcAmex size={36} />
            <FaCcVisa size={36} />
            <FaCcMastercard size={36} />
            <FaCcDiscover size={36} />
            <FaPaypal size={36} />
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-10 text-gray-700">
        <p>
          Copyright Sample Store. All Rights Reserved. Cart Start An Online Business.
        </p>
      </div>
    </footer>
  );
}
