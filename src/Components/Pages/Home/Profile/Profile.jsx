import React from "react";
import { useState } from "react";
import { URI, headerToken } from "../../../../App";
import axios from "axios";
import { useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { AiOutlineEye } from "react-icons/ai";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [orderSelected, setOrderSelected] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [reload, setReload] = useState(false);

  
  // profile data getting
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${URI}/api/v1/me`,
      ...headerToken,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data?.user) {
          setProfileData(response.data?.user);
        }
      })
      .catch((error) => {
        //   setIsAdmin(false);
      });
  }, []);

  //   fetching all orders of mine
  React.useEffect(() => {
    var config = {
      method: "get",
      url: `${URI}/api/v1/orders/me`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
      },
    };
    axios(config)
      .then(function (response) {
        setAllProducts(response.data?.orders);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (reload) {
      setReload(false);
    }
  }, [reload]);


  // logout 
  const logout = () => {
    localStorage.removeItem("Etoken");
    window.location.href = "/"
  };
  return (
    <div>
      <div
        className="w-full h-40 flex justify-center items-center"
        style={{ background: "#f6f6f6" }}
      >
        <h1 className="text-2xl lg:text-4xl text-blk-txt">My Profile</h1>
      </div>

      <div className=" grid grid-cols-1 items-start lg:grid-cols-4">
        <div className=" flex items-center mt-20 justify-center flex-col">
          <div className=" w-16 h-16 flex items-center justify-center  cursor-pointer rounded-full bg-primary-txt text-3xl ">
            P
          </div>
          <h1 className="text-xl">
            Name: <span className="font-semibold">{profileData?.name}</span>
          </h1>
          <h1 className="text-xl">
            Email: <span className="font-semibold">{profileData?.email}</span>
          </h1>
          <button
            onClick={logout}
            className=" px-2 flex mt-7 items-center gap-2 cursor-pointer hover:bg-red-600 hover:text-white py-1 border-2 border-red-600 text-red-600 rounded-md text-sm"
          >
            Log Out
          </button>
        </div>

        <div className=" lg:col-span-3">
          {showDetails === false ? (
            <div className="  py-3 px-2 rounded-xl lg:col-span-4 bg-white shadow-sm">
              <h2 className=" font-semibold text-3xl text-gray-700 text-center mt-10">
                My Orders
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
                                <button
                                  onClick={() => {
                                    setShowDetails(true);
                                    setOrderSelected(item);
                                  }}
                                  className=" px-2 hover:bg-red-600 hover:text-white py-1 border-2 border-red-600 text-red-600 rounded-md text-sm"
                                >
                                  <AiOutlineEye className=" w-5 h-5 cursor-pointer" />
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
                setShowDetails={setShowDetails}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
const ViewOrder = ({ order, setShowDetails }) => {
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
export default Profile;
