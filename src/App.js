import React, { useState } from 'react'
import Navbar from './Components/layout/navtop/Navtop'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext } from 'react'
import Footer from './Components/layout/footar/Footer';
import Home from './Components/Pages/Home/Home';
import Shop from './Components/Pages/Shop/Shop';
import Quickview from './Components/Pages/Home/FOT/Quickview';
import ProductDetails from './Components/Pages/ProductDetails/ProductDetails';
import Tooltips from './Components/layout/navtop/Tooltips';
import Blogs from './Components/Pages/Blog/Blogs';
export const RapperContent = createContext()
const App = () => {
  const [added_products, setAdded_products] = useState([])
  const [added_wish, setAdded_wish] = useState([])
  const [open, setOpen] = useState(false)
  const [toltip, setToltip] = useState(false)
  const [wtoltip, setWtoltip] = useState(false)
  const [quickviewProduct, setQuickviewProduct] = useState({})
  const handleClick = (e) => {
    const newarr = [...added_products, e]
    setAdded_products(newarr)
  }
  const handleRemvoe = (e) => {
    const newarr = added_products.filter(pro => e !== pro)
    setAdded_products(newarr)
  }
  const handlewish = (e) => {
    const newarr = [...added_wish, e]
    setAdded_wish(newarr)
  }
  const wishRemvoe = (e) => {
    const newarr = added_wish.filter(pro => e !== pro)
    setAdded_wish(newarr)
  }

  return (
    <RapperContent.Provider value={{
      handleClick,
      open, setOpen,
      quickviewProduct, setQuickviewProduct,
      added_products,
      setWtoltip, wtoltip,
      setToltip, toltip,
      handleRemvoe, handlewish,
      wishRemvoe, added_wish
    }}>
      <Router>
        <Navbar />
        {/* <NewNavbar /> */}
        <Tooltips />
        <Quickview />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/shop">
            <Shop />
          </Route>
          <Route path="/productDetails/:KeyID">
            <ProductDetails />
          </Route>
          <Route path="/blog">
            <Blogs />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </RapperContent.Provider>
  )
}

export default App
