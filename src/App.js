import React, { useState } from "react";
import Navbar from "./Components/layout/navtop/Navtop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createContext } from "react";
import Footer from "./Components/layout/footar/Footer";
import Home from "./Components/Pages/Home/Home";
import Shop from "./Components/Pages/Shop/Shop";
import Quickview from "./Components/Pages/Home/FOT/Quickview";
import Tooltips from "./Components/layout/navtop/Tooltips";
import Auth from "./Components/Pages/auth/Auth";
import CreateProduct from "./Components/Pages/admin/CreateProduct";
import User from "./Components/Pages/admin/Users";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/Pages/auth/ProtectedRoute";
import AllProduct from "./Components/Pages/admin/Allproducts";
import EditProduct from "./Components/Pages/admin/EditProduct";
import OrderSuccess from "./Components/Pages/order/OrderSuccess";
import AllOrder from "./Components/Pages/admin/AllOrder";
import Profile from "./Components/Pages/Home/Profile/Profile";

import ProductDetails from "./Components/Pages/ProductDetails/ProductDetails";
import Dashboard from "./Components/Pages/admin/Dashboard";
import Category from "./Components/Pages/admin/Category";
import AddCategory from "./Components/Pages/admin/AddCategory";
import Cupon from "./Components/Pages/admin/Cupon";
import AddCupon from "./Components/Pages/admin/AddCupon";
import EditCategory from "./Components/Pages/admin/EditCategory";

export const RapperContent = createContext();
export const URI = process.env.REACT_APP_API_URI;
export const headerToken = {
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
  },
};
const App = () => {
  const [added_products, setAdded_products] = useState([]);
  const [open, setOpen] = useState(false);
  const [toltip, setToltip] = useState(false);
  const [wtoltip, setWtoltip] = useState(false);
  const [quickviewProduct, setQuickviewProduct] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  // adding product to bag
  const handleClick = (e) => {
    const findProduct  = added_products?.filter(item=> item.id === e._id)
    let productSingle = {
      name: e.name,
      price: e.price,
      quantity: findProduct?.length > 0 ? findProduct?.[0]?.quantity + 1 : 1,
      image: e.images?.[0].url,
      product: e._id,
      id: e._id
    }
    const eliminateProduct = added_products?.filter(item=> item.id !== e._id)
    setAdded_products([...eliminateProduct, productSingle]);
  };

  // removing product from cart
  const handleRemvoe = (e) => {
    const newarr = added_products.filter((pro) => e.id !== pro.id);

    setAdded_products([...newarr]);
  };




  // checking users authorization
  React.useEffect(() => {
    const etoken = localStorage.getItem("Etoken");
    if (etoken) {
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  return (
    <RapperContent.Provider
      value={{
        handleClick,
        open,
        setOpen,
        quickviewProduct,
        setQuickviewProduct,
        added_products,
        setWtoltip,
        wtoltip,
        setToltip,
        toltip,
        handleRemvoe,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setAdded_products
      }}
    >
      <Router>
        <ToastContainer />
        <Navbar />
        <Tooltips />
        <Quickview />
        <Switch>
          {/* public routes */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/shop/:productCategory">
            <Shop />
          </Route>
   
          <Route exact path="/product/:id">
            <ProductDetails />
          </Route>
          <Route path="/sign-in">
            <Auth />
          </Route>
          <Route path="/success">
            <OrderSuccess />
          </Route>
          <Route path="/sign-up">
            <Auth />
          </Route>

          {/* protected routes */}
          <ProtectedRoute
            isAdmin={true}
            exact
            isAuthenticated={isAuthenticated}
            path="/admin/cupon"
            component={Cupon}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            isAuthenticated={isAuthenticated}
            path="/admin/add-cupon"
            component={AddCupon}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            isAuthenticated={isAuthenticated}
            path="/admin/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            isAuthenticated={isAuthenticated}
            path="/admin/create"
            component={CreateProduct}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            isAuthenticated={isAuthenticated}
            path="/admin/users"
            component={User}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            isAuthenticated={isAuthenticated}
            path="/admin/category"
            component={Category}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            isAuthenticated={isAuthenticated}
            path="/admin/category/:catID"
            component={EditCategory}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            isAuthenticated={isAuthenticated}
            path="/admin/add-category"
            component={AddCategory}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            isAuthenticated={isAuthenticated}
            path="/admin/products"
            component={AllProduct}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            isAuthenticated={isAuthenticated}
            path="/admin/product/:id"
            component={EditProduct}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            isAuthenticated={isAuthenticated}
            path="/admin/orders"
            component={AllOrder}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            isAuthenticated={isAuthenticated}
            path="/profile"
            component={Profile}
          />
        </Switch>
        <Footer />
      </Router>
    </RapperContent.Provider>
  );
};

export default App;
