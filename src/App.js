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

export const RapperContent = createContext()
const App = () => {
  const [added_products, setAdded_products] = useState([])
  const [added_wish, setAdded_wish] = useState([])

  const [toltip, setToltip] = useState(false)
  const [wtoltip, setWtoltip] = useState(false)
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
    <RapperContent.Provider value={{ handleClick, added_products, setWtoltip, wtoltip, setToltip, toltip, handleRemvoe, handlewish, wishRemvoe, added_wish }}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/shop">
            <Shop />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </RapperContent.Provider>
  )
}

export default App
