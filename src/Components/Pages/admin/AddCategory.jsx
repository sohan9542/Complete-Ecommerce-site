import React from "react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import axios from "axios";
import { URI, headerToken } from "../../../App";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import {AiFillDelete} from "react-icons/ai"

const AddCategory = () => {
  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState([
    {
      subTitle: "",
      options: [""],
      navbarShow: false,
    },
  ]);

  const history = useHistory();
  const create = () => {
    let data = JSON.stringify({
      title: name.toLowerCase(),
      subcategory : subCategory
    });

    let config = {
      method: "post",
      url: `${URI}/api/v1/admin/category/new`,
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
            history.push("/admin/category");
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
          Create Category
        </h1>
        <div className="flex w-full items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              create();
            }}
            className="w-full lg:w-96"
          >
            <p className=" mt-3">Category Name</p>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
            />
            {/* <p className=" mt-3">Description</p>

            <textarea
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea> */}
            {subCategory.map((item, ind) => (
              <div className=" bg-red-100 px-3 py-1 pb-3 my-2">
                <p className=" mt-3">Sub Category Name</p>
                <div className="flex items-center gap-2">
                  <input
                    required
                    value={subCategory[ind].subTitle}
                    onChange={(e) => {
                      let tempObj = subCategory;
                      tempObj[ind].subTitle = e.target.value.toLowerCase();
                      setSubCategory([...tempObj]);
                    }}
                    type="text"
                    className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
                  />
                  {ind + 1 === subCategory.length && (
                    <button
                      onClick={() => {
                        let tempObj = subCategory;
                        tempObj[ind + 1] = {
                          subTitle: "",
                          options: [""],
                          navbarShow: false,
                        };
                        setSubCategory([...tempObj]);
                      }}
                      className="text-xl bg-green-500 px-2 py-1 text-white rounded-md"
                    >
                      +
                    </button>
                  )}
                </div>
                <p className=" mt-3">Options</p>
                {subCategory[ind].options.map((i, idx) => (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      required
                      value={item.options[idx]}
                      onChange={(e) => {
                        let tempObj = subCategory;
                        tempObj[ind].options[idx] = e.target.value.toLowerCase();
                        setSubCategory([...tempObj]);
                      }}
                      type="text"
                      className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
                    />
                    {idx + 1 === subCategory[ind].options.length && (
                      <button
                        onClick={() => {
                          let tempObj = subCategory;
                          tempObj[ind].options[idx + 1] = "";
                          setSubCategory([...tempObj]);
                        }}
                        className="text-xl bg-green-500 px-2 py-1 text-white rounded-md"
                      >
                        +
                      </button>
                    )}
                    { subCategory[ind].options.length !== 1  && (
                      <button
                        onClick={() => {
                          let tempObj = subCategory;
                          let removeItem = tempObj[ind].options.splice(idx, 1)
                          setSubCategory([...tempObj]);
                        }}
                        className=" flex items-center justify-center py-2 bg-red-500 px-2 text-white rounded-md"
                      >
                        <AiFillDelete className="w-5 h-5"/>
                      </button>
                    )}
                  </div>
                ))}

                <div className="flex items-center mt-2 justify-between">
                  <div className=" flex items-center gap-2">
                    <input
                      checked={subCategory[ind].navbarShow}
                      onChange={(e) => {
                        let tempObj = subCategory;
                        tempObj[ind].navbarShow = e.target.checked;
                        setSubCategory([...tempObj]);
                      }}
                      type="checkbox"
                      className="w-4 h-4"
                    />{" "}
                    Add to Navbar
                  </div>
                  {subCategory.length !== 1 && <button onClick={()=>{
                      let tempObj = subCategory;
                      let removeItem = tempObj.splice(ind, 1)
                      setSubCategory([...tempObj]);
                  }} className="py-1 px-2 bg-red-500 rounded-md text-white">Delete</button>}
                </div>
              </div>
            ))}

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

export default AddCategory;
