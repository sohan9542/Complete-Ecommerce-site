import axios from "axios";
import React, { useContext, useState } from "react";
import {AiFillDelete } from "react-icons/ai";

import { URI } from "../../../App";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

// import { toast } from "react-toastify";
const User = () => {
  const [allusers, setAllusers] = useState([]);
  const [reload, setReload] = useState(false);


  React.useEffect(() => {
    var config = {
      method: "get",
      url: `${URI}/api/v1/admin/users`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
      },
    };
    axios(config)
      .then(function (response) {
        setAllusers(response.data?.users);
      })
      .catch(function (error) {
        console.log(error);
      });

      if (reload) {
        setReload(false);
      }
  }, [reload]);

  const deleteUser = (id) => {
    var config = {
      method: "delete",
      url: `${URI}/api/v1/admin/user/${id}`,
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


  return (
    <div>
    

      <div className=" grid grid-cols-1 lg:grid-cols-5">
        <Sidebar />
        <div className=" mt-3 py-3 px-2 rounded-xl lg:col-span-4 bg-white shadow-sm">
        <h2 className=" font-semibold text-3xl text-gray-700 text-center mt-20">Users</h2>
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
                      Email
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-2 text-xs font-bold text-gray-500  tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                {allusers.length != 0 && (
                  <tbody className="bg-white  text-sm">
                    {allusers?.map((item, ind) => (
                      <tr
                        className={
                          item?.status === 2 ? "bg-red-100" : "bg-white"
                        }
                      >
      
                        <td className="px-4 py-2 text-gray-600 font-medium whitespace-nowrap">
                          <p>{item?.name}</p>
                        </td>
                        <td className="px-4 py-2 text-gray-600 font-medium whitespace-nowrap">
                          <p>{item?.email}</p>
                        </td>
                    

                        <td className="px-4 py-2 text-gray-600 font-medium  whitespace-nowrap">
                          <div className=" flex items-center gap-2">
           
                            <button
                              onClick={() => {
                                deleteUser(item?._id);
                              
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
      </div>
    </div>
  );
};

export default User;
