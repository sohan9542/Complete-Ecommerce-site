import axios from "axios";
import React, { useContext, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiFillDelete,
  AiOutlineCloseCircle,
  AiOutlineEye,
} from "react-icons/ai";
import { GoNote } from "react-icons/go";

import { URI } from "../../../App";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
const AllOrder = () => {
  const [allProducts, setAllProducts] = useState([]);

  const [reload, setReload] = useState(false);

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
        setAllProducts(response.data?.orders?.reverse());
      })
      .catch(function (error) {
        console.log(error);
      });

    if (reload) {
      setReload(false);
    }
  }, [reload]);

  const deleteOrder = (id) => {
    var config = {
      method: "delete",
      url: `${URI}/api/v1/admin/order/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setReload(true);
          toast.success("Delete Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Something went Wrong!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [showDetails, setShowDetails] = useState(false);
  const [orderSelected, setOrderSelected] = useState(null);

  const updateorder = (id, status) => {
    let data = JSON.stringify({
      status: status,
    });
    var config = {
      method: "put",
      url: `${URI}/api/v1/admin/order/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          setReload(true);
          setShowDetails(false);
          toast.success("Update Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const [open, setOpen] = useState(false);
  const [addId, setAddId] = useState("");
  const [note, setNote] = useState("");
  const addnote = () => {
    let data = JSON.stringify({
      newNote: note,
    });
    var config = {
      method: "put",
      url: `${URI}/api/v1/admin/order/${addId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          setReload(true);
          setShowDetails(false);
          setOpen(false)
          toast.success("Update Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <div>
      <div className=" grid grid-cols-1 lg:grid-cols-5">
        <Sidebar />
        {showDetails === false ? (
          <div className=" mt-3 py-3 px-2 rounded-xl lg:col-span-4 bg-white shadow-sm">
            <AddNote
              open={open}
              setOpen={setOpen}
              setNote={setNote}
              addnote={addnote}
            />
            <h2 className=" font-semibold text-3xl text-gray-700 text-center mt-20">
              All Orders
            </h2>
            <div>
              <div className=" w-full    mt-4 overflow-x-scroll lg:overflow-hidden ">
                <table className="min-w-full ">
                  <thead className="bg-blue-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-2 text-left text-xs font-bold text-gray-500  tracking-wider"
                      >
                        User Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-2 text-left text-xs font-bold text-gray-500  tracking-wider"
                      >
                        Order Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-2 text-left text-xs font-bold text-gray-500  tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-2 text-left text-xs font-bold text-gray-500  tracking-wider"
                      >
                        Transaction
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-2 text-left text-xs font-bold text-gray-500  tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-2 text-left text-xs font-bold text-gray-500  tracking-wider"
                      >
                        Note
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-2 text-xs font-bold text-gray-500  tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {allProducts.length != 0 && (
                    <tbody className="bg-white  text-sm">
                      {allProducts?.map((item, ind) => (
                        <tr
                          className={
                            item?.status === 2 ? "bg-red-100" : "bg-white"
                          }
                        >
                          <td className="px-4 py-2 text-gray-600 font-medium whitespace-nowrap">
                            <p>{item?.name}</p>
                          </td>
                          <td className="px-4 py-2 text-gray-600 font-medium whitespace-nowrap">
                            <p>{item?.paidAt?.slice(0, 10)}</p>
                          </td>
                          <td className="px-4 py-2 text-gray-600 font-medium whitespace-nowrap">
                            <p>${item?.totalPrice}</p>
                          </td>
                          <td className="px-4 py-2 text-gray-600 font-medium whitespace-nowrap">
                            <p>{item?.paymentInfo?.id}</p>
                          </td>

                          <td className="px-4 py-2 text-gray-600 font-medium whitespace-nowrap">
                            <p>{item?.orderStatus}</p>
                          </td>
                          <td className="px-4 py-2 text-gray-600 font-medium whitespace-nowrap">
                            <p>{item?.note}</p>
                          </td>

                          <td className="px-4 py-2 text-gray-600 font-medium  whitespace-nowrap">
                            <div className=" flex items-center gap-2">
                              {item.orderStatus !== "Delivered" && (
                                <>
                                  <button
                                    onClick={() =>
                                      updateorder(item?._id, "Delivered")
                                    }
                                    className=" px-2 cursor-pointer hover:bg-red-600 hover:text-white py-1 border-2 border-red-600 text-red-600 rounded-md text-sm"
                                  >
                                    <AiOutlineCheckCircle className=" w-5 h-5 cursor-pointer" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      updateorder(item?._id, "Cancel")
                                    }
                                    className=" px-2 cursor-pointer hover:bg-red-600 hover:text-white py-1 border-2 border-red-600 text-red-600 rounded-md text-sm"
                                  >
                                    <AiOutlineCloseCircle className=" w-5 h-5 cursor-pointer" />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => {
                                  setShowDetails(true);
                                  setOrderSelected(item);
                                }}
                                className=" px-2 hover:bg-red-600 hover:text-white py-1 border-2 border-red-600 text-red-600 rounded-md text-sm"
                              >
                                <AiOutlineEye className=" w-5 h-5 cursor-pointer" />
                              </button>
                              <button
                                onClick={() => {
                                  setOpen(true);
                                  setAddId(item?._id);
                                }}
                                className=" px-2 hover:bg-red-600 hover:text-white py-1 border-2 border-red-600 text-red-600 rounded-md text-sm"
                              >
                                <GoNote className=" w-5 h-5 cursor-pointer" />
                              </button>
                              <button
                                onClick={() => {
                                  deleteOrder(item?._id);
                                }}
                                className=" px-2 hover:bg-red-600 hover:text-white py-1 border-2 border-red-600 text-red-600 rounded-md text-sm"
                              >
                                <AiFillDelete className=" w-5 h-5 cursor-pointer" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        ) : (
          <>
            <ViewOrder
              order={orderSelected}
              updateorder={updateorder}
              setShowDetails={setShowDetails}
            />
          </>
        )}
      </div>
    </div>
  );
};

const ViewOrder = ({ order, updateorder, setShowDetails }) => {
  return (
    <div className="lg:col-span-4">
      <h2 className=" font-semibold text-3xl text-gray-700 text-center mt-20">
        Order Details
      </h2>
      <div className="px-4 mt-4">
        {order?.note && (
          <p className="text-lg">
            <span className="font-bold">Note: </span> {order?.note}
          </p>
        )}
        <p className="text-lg">
          <span className="font-bold">Address: </span>{" "}
          {order?.shippingInfo?.address}
        </p>
        <p className="text-lg">
          <span className="font-bold">City: </span> {order?.shippingInfo?.city}
        </p>
        <p className="text-lg">
          <span className="font-bold">Country: </span>{" "}
          {Country.getCountryByCode(order?.shippingInfo?.country).name}
        </p>
        <p className="text-lg">
          <span className="font-bold">Phone: </span>{" "}
          {order?.shippingInfo?.phoneNo}
        </p>
        <p className="text-lg">
          <span className="font-bold">State: </span>{" "}
          {
            State.getStateByCodeAndCountry(
              order?.shippingInfo?.state,
              order?.shippingInfo?.country
            ).name
          }
        </p>
        <p className="text-lg">
          <span className="font-bold">Tax: </span> ${order?.taxPrice}
        </p>
        <p className="text-lg">
          <span className="font-bold">Shipping Price: </span> $
          {order?.shippingPrice}
        </p>
        <p className="text-lg">
          <span className="font-bold">Total Price: </span> ${order?.totalPrice}
        </p>

        <div>
          <div className=" w-full    mt-4 overflow-x-scroll lg:overflow-hidden ">
            <table className="min-w-full ">
              <thead className="bg-blue-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-2 text-left text-xs font-bold text-gray-500  tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-left text-xs font-bold text-gray-500  tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-left text-xs font-bold text-gray-500  tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-left text-xs font-bold text-gray-500  tracking-wider"
                  >
                    Quantity
                  </th>
                </tr>
              </thead>
              {order?.orderItems?.length != 0 && (
                <tbody className="bg-white  text-sm">
                  {order?.orderItems?.map((item, ind) => (
                    <tr>
                      <td className="px-4 py-2 text-gray-600 font-medium whitespace-nowrap">
                        <p>{item?.name}</p>
                      </td>
                      <td className="px-4 py-2 text-gray-600 font-medium whitespace-nowrap">
                        <img className="w-12" src={item?.image} alt="" />
                      </td>
                      <td className="px-4 py-2 text-gray-600 font-medium whitespace-nowrap">
                        <p>${item?.price}</p>
                      </td>

                      <td className="px-4 py-2 text-gray-600 font-medium whitespace-nowrap">
                        <p>{item?.quantity}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      <div className=" flex items-center flex-wrap mt-10 w-full justify-center gap-2">
        {order.orderStatus !== "Delivered" && (
          <>
            <button
              onClick={() => updateorder(order?._id, "Delivered")}
              className=" px-2 flex items-center gap-2 cursor-pointer hover:bg-red-600 hover:text-white py-1 border-2 border-red-600 text-red-600 rounded-md text-sm"
            >
              <AiOutlineCheckCircle className=" w-5 h-5 cursor-pointer" />
              Delivered
            </button>
            <button
              onClick={() => updateorder(order?._id, "Cancel")}
              className=" px-2 flex items-center gap-2 cursor-pointer hover:bg-red-600 hover:text-white py-1 border-2 border-red-600 text-red-600 rounded-md text-sm"
            >
              <AiOutlineCloseCircle className=" w-5 h-5 cursor-pointer" />
              Cancel
            </button>
          </>
        )}
        <button
          onClick={() => setShowDetails(false)}
          className=" px-2 flex items-center gap-2 cursor-pointer hover:bg-red-600 hover:text-white py-1 border-2 border-red-600 text-red-600 rounded-md text-sm"
        >
          Back
        </button>
      </div>
    </div>
  );
};

const AddNote = ({ open, setOpen, setNote, addnote }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 bg-border-clr bg-opacity-70 overflow-y-auto"
        onClose={setOpen}
      >
        <div
          className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
          style={{ fontSize: 0 }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden md:inline-block md:align-middle md:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-2xl">
              <div className="w-full relative flex items-center bg-white rounded-xl px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-new hover:text-primary-txt sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    addnote();
                  }}
                  className="w-full flex flex-col items-center gap-4"
                >
                  <p>Add Note</p>
                  <textarea
                    name=""
                    id=""
                    onChange={(e) => setNote(e.target.value)}
                    cols="30"
                    required
                    rows="10"
                    className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
                  ></textarea>
                  <button
                    type="submit"
                    className="inline-block text-center transition delay-100 ease-linear bg-primary-txt border border-transparent rounded-md py-2 px-8 font-medium text-white hover:bg-blk-txt"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default AllOrder;
