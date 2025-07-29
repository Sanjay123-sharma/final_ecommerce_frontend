import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "product",
  initialState: {
    Products: [],
    username: "",
    email: "",
    password: "",
    cpassword: "",
    size: "M",
    Cart: [],
    Order: [],
    AllOrder: [],
    Return:[]
  },
  reducers: {
    setProducts: (state, action) => {
      state.Products = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setCPassword: (state, action) => {
      state.cpassword = action.payload;
    },
    setSizeS: (state, action) => {
      if (action.payload) {
        state.size = "S";
      }
    },
    setSizeM: (state, action) => {
      if (action.payload) {
        state.size = "M";
      }
    },
    setSizeL: (state, action) => {
      if (action.payload) {
        state.size = "L";
      }
    },
    setSizeXL: (state, action) => {
      if (action.payload) {
        state.size = "XL";
      }
    },

    addCart: (state, action) => {
      let list = state.Products;
      let res = list.find((item) => item.id === action.payload);
      state.Cart.push({
        id: res.id,
        title: res.title,
        image: res.image,
        size: state.size,
        price: res.price,
        count: 1,
      });
    },
    removeOrder: (state, action) => {
      state.Cart = state.Cart.filter((item) => item.id !== action.payload);
    },
    increment: (state, action) => {
      let list = state.Cart;
      let res = list.find((item) => item.id === action.payload);
      if (res) {
        res.count = res.count + 1;
      }
    },
    decrement: (state, action) => {
      let list = state.Cart;
      let res = list.find((item) => item.id === action.payload);
      if (res.count <= 1) {
        console.log("restrict");
      } else {
        res.count = res.count - 1;
      }
    },
    removeCart: (state) => {
      state.Cart = [];
    },
    Orders: (state) => {
      const newOrder = state.Cart.map((items) => ({
        ...items,
        OrderId: Date.now()+Math.floor(Math.random() * 1000),
        email:state.email
      }));
      state.Order = [...newOrder];
    },
    AllOrders: (state) => {
      const newOrder = state.Cart.map((items) => ({
        ...items,
        OrderId: Date.now()+Math.floor(Math.random() * 1000),
        email:state.email
      }));
      state.AllOrder =[...newOrder,...state.AllOrder]
    },
    cancelOrder:(state,action)=>{
      state.AllOrder=state.AllOrder.filter((item)=>item.OrderId===action.payload)
    },
    

    
  },
});

export const {
 
  setProducts,
  setEmail,
  setPassword,
  setUsername,
  setCPassword,
  setSizeM,
  setSizeS,
  setSizeL,
  setSizeXL,
  addCart,
  increment,
  decrement,
  Orders,
  AllOrders,
  removeCart,
  removeOrder,
  cancelOrder
} = Slice.actions;
export default Slice.reducer;
