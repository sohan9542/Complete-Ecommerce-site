import React from "react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import axios from "axios";
import { URI, headerToken } from "../../../App";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const AddCupon = () => {
  const [name, setName] = useState("");

  const [deadLine, setDeadLine] = useState();
  const [discount, setDiscount] = useState(0);
  const history = useHistory();
  const create = () => {
    let data = JSON.stringify({
      title: name,
      deadline: deadLine,
      discount: discount,
    });

    let config = {
      method: "post",
      url: `${URI}/api/v1/admin/promo/new`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data?.success) {
          toast.success("Category Created Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            history.push("/admin/cupon");
          }, 2500);
        }
      })
      .catch((error) => {
        toast.error("Something Went Wrong Please Try again", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-5">
      <Sidebar />
      <div className="w-full lg:col-span-4 mt-32 lg:mt-0">
        <h1 className="text-center mt-32 text-2xl text-blk-tx font-bold">
          Create Coupon
        </h1>
        <div className="flex w-full items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              create();
            }}
            className="w-full lg:w-96"
          >
            <p className=" mt-3">Coupon Name</p>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
            />

            <p className=" mt-3">Valid Before </p>
            <input
              required
              onChange={(e) => setDeadLine(e.target.value)}
              type="date"
              className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
            />

            <p className=" mt-3">Discount </p>
            <div className="flex items-center gap-2">
              <input
                required
                onChange={(e) => setDiscount(e.target.value)}
                type="number"
                className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
              />
              %
            </div>

            <div className="w-full flex items-center justify-center mt-3">
              <button className="inline-block text-center transition delay-100 ease-linear bg-primary-txt border border-transparent rounded-md py-2 px-8 font-medium text-white hover:bg-blk-txt">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCupon;
