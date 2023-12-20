import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useGlobalContext } from "./utilities/Context";
import Nav from './Components/Nav'
import HeroPage from './Components/HeroPage'
import Loading from "./Components/Loading";
import About from "./Components/About";
import Error from "./Components/Error";
import Products from "./Components/Products";
import Cart from './Components/Cart'
import SingleProduct from './Components/SingleProduct'
import SignIn from './Components/SignIn'
import Signup from './Components/Signup'
import Checkout from './Components/Checkout'
import Orders from './Components/Orders'
function App() {
  const {loading} = useGlobalContext()
if (loading) {
  return (
    <main>
      <Loading />
    </main>
  );
}
  return (
    <Router>
      <main>
        <Nav />
        <Routes>
        <Route exact path='/' element={<HeroPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/singleproduct/:id' element={<SingleProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='*' element={<Error />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
