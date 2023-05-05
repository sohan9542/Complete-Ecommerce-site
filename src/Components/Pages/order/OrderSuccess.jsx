import React from "react";
import {AiOutlineCheckCircle} from "react-icons/ai";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="h-96 w-full flex items-center justify-center flex-col ">
      <AiOutlineCheckCircle className="w-10 h-10 text-green-500"/>

      <h1 className="text-lg font-semibold mt-2">Your Order has been Placed successfully </h1>
      <Link to="/profile" className="text-new mt-2">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
