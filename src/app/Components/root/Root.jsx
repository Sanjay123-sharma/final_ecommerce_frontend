import {
  ApolloClient,
  gql,
  InMemoryCache,
  useQuery,
} from '@apollo/client';
import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addCart,
  setProducts,
  setSizeL,
  setSizeM,
  setSizeS,
  setSizeXL,
} from '../../Redux/Slice';

import { NavLink, Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../Header';
import Footer from '../Footer';


export const client = new ApolloClient({
  uri: 'https://final-ecommerce-backend-zyo2.onrender.com',
  cache: new InMemoryCache(),
});

const Get_Products = gql`
  query {
    products {
      id
      category
      description
      image
      inStock
      price
      title
    }
  }
`;

export default function Root() {
  const Products = useSelector((state) => state.product.Products);
    const token=localStorage.getItem("token")

  const Cart = useSelector((state) => state.product.Cart);
  const dispatch = useDispatch();
  const { loading, data, error } = useQuery(Get_Products);
  const handleSizeS = (id) => dispatch(setSizeS(id));
  const handleSizeM = (id) => dispatch(setSizeM(id));
  const handleSizeL = (id) => dispatch(setSizeL(id));
  const handleSizeXL = (id) => dispatch(setSizeXL(id));

  const handleAdd = (id) => {
    let res = Cart.find((item) => item.id === id);
    if (res) {
      toast('Item already added');
    } else {
      dispatch(addCart(id));
      toast.success('Item has been Added to Cart');
    }
  };

  if (error) console.log(error);

  useEffect(() => {
    if(data && data.products){
      dispatch(setProducts(data.products));
    }
  }, [data, dispatch]);

 
  return (
    <div className="main-container">
  <div className='fixed top-0 left-0 right-0 z-50 bg-white shadow'>
      <Header />
  </div>

     <div className='mt-10  '>
       <img
        src="https://backpacks-preview-com.3dcartstores.com/cdn-cgi/image/format=auto,fit=contain,width=1400/assets/images/3dcart/banner2.jpg"
        alt="Banner"
        className="main-banner mt-10 animate-pulse"
      />
     </div>

      <Toaster position="top-center" reverseOrder={false} />

      <div className="content-container">
        <div className='mt-5'>
           <h2 className='text-center text-xl  '>Featured Products</h2>
        </div>
        <div className="product-grid ">
  {loading ? (
    <p className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"></p>
  ) : (
    <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-5 md:gap-6 mt-5px-4 transition-all transition-normal ">
      {Products.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md p-4 min-w-[250px] md:min-w-0 relative"
        >
          {/* SALE Badge */}
          <span className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
            SALE
          </span>

          <NavLink to={`/product/${item.id}`}>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-contain mb-3 "
            />
            <p className="text-sm text-gray-600">{item.category}</p>
            <h3 className="font-semibold text-md mb-1">{item.title}</h3>

            {/* Rating */}
            <div className="flex items-center text-sm text-gray-500 mb-1">
              ⭐️⭐️⭐️⭐️ <span className="ml-1">(4)</span>
            </div>

            {/* Price */}
            <p className="text-sm">
              <span className="line-through text-gray-400 mr-2">${(item.price + 5).toFixed(2)}</span>
              <span className="text-black font-semibold">${item.price}</span>
            </p>
            <p className="text-green-700 text-xs mt-1">In Stock.</p>
          </NavLink>

          {/* Sizes */}
          <div className="flex flex-wrap gap-1 mt-3">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                onClick={() =>
                  size === 'S'
                    ? handleSizeS(item.id)
                    : size === 'M'
                    ? handleSizeM(item.id)
                    : size === 'L'
                    ? handleSizeL(item.id)
                    : handleSizeXL(item.id)
                }
                className="text-sm border px-2 py-1 rounded hover:bg-yellow-700 active:bg-yellow-700 focus:bg-yellow-700"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add to Cart */}
       {
        token?
        <div>
             <button
            onClick={() => handleAdd(item.id)}
            className="w-full bg-yellow-700 text-white mt-3 py-2 rounded hover:bg-amber-700 transition hover:scale-90 transition-transform-1000"
          >
            Add to Cart
          </button>
        </div>:
        <div>
          <button
                      className="w-full bg-yellow-700 text-white mt-3 py-2 rounded hover:bg-amber-700 transition hover:scale-90 transition-transform-1000"
onClick={()=>{
  toast("Must be logged In")
  setTimeout(() => {
    window.location.href='/signin'
  }, 500);
}}
          >
            Add to Cart</button>
        </div>
       }
        </div>
      ))}
    </div>
  )}
</div>

        <div>
          <Footer/>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
