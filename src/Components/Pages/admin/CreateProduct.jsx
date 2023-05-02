import React from "react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import axios from "axios";
import { URI, headerToken } from "../../../App";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [smell, setSmell] = useState("");
  const [stock, setStock] = useState(0);
  const [imagesPreview, setImagesPreview] = useState([]);
  const history = useHistory()
  const create = () => {

    let data = JSON.stringify({
      "name": name,
      "description": description,
      "stock": stock,
      "price": price,
      "images": images,
      "category": category,
      "smell": smell
    });
    
    let config = {
      method: "post",
      url: `${URI}/api/v1/admin/product/new`,
      headers:{
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
      if(response.data?.success){
        toast.success("Product Created Successfully", {
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
        history.push("/admin/products")
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
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-5">
      <Sidebar />
      <div className="w-full lg:col-span-4 mt-32 lg:mt-0">
        <h1 className="text-center mt-32 text-2xl text-blk-tx font-bold">
          Create Product
        </h1>
        <div className="flex w-full items-center justify-center">
          <form onSubmit={(e)=>{
            e.preventDefault()
            create()
          }} className="w-full lg:w-96">
            <p className=" mt-3">Name</p>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
            />
            <p className=" mt-3">Description</p>

            <textarea
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <p className=" mt-3">Price</p>
            <input
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
            />
            <p className=" mt-3">Quantity</p>
            <input
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              type="number"
              defaultValue={1}
              className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
            />

            <div id="createProductFormImage"  className="mt-4 flex items-center gap-2">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} className="w-20" alt="Product Preview" />
              ))}
            </div>

            <p className=" mt-3 mb-1">Images</p>
            <input  required multiple   onChange={createProductImagesChange} type="file" />

            <p className=" mt-3 mb-1">Category</p>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border px-3 py-1 text-sm outline-none"
              name=""
              id=""
            >
              <option value=""></option>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
            <p className=" mt-3 mb-1">Smell</p>
            <select
              required
              value={smell}
              onChange={(e) => setSmell(e.target.value)}
              className="border px-3 py-1 text-sm outline-none"
              name=""
              id=""
            >
              <option value=""></option>
              <option value="citrus">Citrus</option>
              <option value="oud">Owd</option>
              <option value="sweet">Sweet</option>
              <option value="rose">Rose</option>
            </select>

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

export default CreateProduct;
