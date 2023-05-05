import React from "react";
import Sidebar from "./Sidebar";
import { URI } from "../../../App";
import axios from "axios";

const Dashboard = () => {
    const [allProducts, setAllProducts] = React.useState([]);

    const [reload, setReload] = React.useState(false);
  
    //   fetching all orders
    React.useEffect(() => {
      var config = {
        method: "get",
        url: `${URI}/api/v1/admin/orders`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
        },
      };
      axios(config)
        .then(function (response) {
          setAllProducts(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  
      if (reload) {
        setReload(false);
      }
    }, [reload]);
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-5">
      <Sidebar />
      <div className=" mt-3 py-3 px-2 rounded-xl lg:col-span-4 bg-white shadow-sm">
        <h2 className=" font-semibold text-3xl text-gray-700 text-center mt-20">
          Dashboard
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-3">
          <div className=" bg-red-100 h-40 w-full flex items-center flex-col justify-center">
            <p>Sold Items</p>
            <h1 className="text-4xl">{allProducts?.totalItems}</h1>
          </div>
          <div className=" bg-blue-100 h-40 w-full flex items-center flex-col justify-center">
            <p>Orders</p>
            <h1 className="text-4xl">{allProducts?.orders?.length}</h1>
          </div>
          <div className=" bg-yellow-100 h-40 w-full flex items-center flex-col justify-center">
            <p>Total Amount</p>
            <h1 className="text-4xl">${allProducts?.totalAmount}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
