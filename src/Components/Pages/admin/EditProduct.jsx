import React from "react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import axios from "axios";
import { URI } from "../../../App";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [smell, setSmell] = useState("");
  const [stock, setStock] = useState(0);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [productType, setProductType] = useState({
    productType: "",
    tags: [""],
  });
  const [arrayCategory, setArrayCategory] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    var config = {
      method: "get",
      url: `${URI}/api/v1/category`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
      },
    };
    axios(config)
      .then(function (response) {
        setArrayCategory(response.data?.category);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const update = () => {
    let data = JSON.stringify({
      name: name,
      description: description,
      stock: stock,
      price: price,
      images: images,
      tags: productType.tags,
      productType: productType.productType,
    });

    let config = {
      method: "put",
      url: `${URI}/api/v1/admin/product/${id}`,
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
          toast.success("Product Updated Successfully", {
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
            history.push("/admin/products");
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
          setImagesPreview((old) => [...imagesPreview, ...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    var config = {
      method: "get",
      url: `${URI}/api/v1/product/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
      },
    };
    axios(config)
      .then(function (response) {
        const product = response.data?.product;
        setName(product.name);
        setDescription(product.description);

        setPrice(product.price);
        setStock(product.stock);
        let productTypeTemp = {
          productType: "",
          tags: [""],
        };
        productTypeTemp.productType = product.productType;
        productTypeTemp.tags = product.tags;
        setProductType({ ...productTypeTemp });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-5">
      <Sidebar />
      <div className="w-full lg:col-span-4 mt-32 lg:mt-0">
        <h1 className="text-center mt-32 text-2xl text-blk-tx font-bold">
          Create Product
        </h1>
        <div className="flex w-full items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              update();
            }}
            className="w-full lg:w-96"
          >
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

            <div
              id="createProductFormImage"
              className="mt-4 flex items-center gap-2"
            >
              {imagesPreview.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="w-20"
                  alt="Product Preview"
                />
              ))}
            </div>

            <p className=" mt-3 mb-1">Images</p>
            <input
              required
              multiple
              onChange={createProductImagesChange}
              type="file"
            />
            <p className=" mt-3 mb-1">Product Type</p>
            <select
              required
              value={productType.productType}
              onChange={(e) => {
                // setProductType(e.target.value)
                let obj = productType;
                obj.productType = e.target.value;
                setProductType({ ...obj });
              }}
              className="border px-3 py-1 text-sm outline-none"
              name=""
              id=""
            >
              <option value=""></option>
              {arrayCategory?.map((item) => (
                <option value={item?.title}>{item?.title}</option>
              ))}
            </select>

            {productType.productType !== "" && (
              <>
                {arrayCategory
                  .filter((i) => i?.title === productType.productType)?.[0]
                  ?.subcategory?.map((item, ind) => (
                    <>
                      <p className=" mt-3 mb-1">{item?.subTitle}</p>
                      <select
                        required
                        value={productType.tags[ind]}
                        onChange={(e) => {
                          let obj = productType;
                          obj.tags[ind] = e.target.value;
                          setProductType({ ...obj });
                        }}
                        className="border px-3 py-1 text-sm outline-none"
                        name=""
                        id=""
                      >
                        <option value=""></option>
                        {item?.options?.map((op) => (
                          <option value={op}>{op}</option>
                        ))}
                      </select>
                    </>
                  ))}
              </>
            )}

            <div className="w-full flex items-center justify-center mt-3">
              <button className="inline-block text-center transition delay-100 ease-linear bg-primary-txt border border-transparent rounded-md py-2 px-8 font-medium text-white hover:bg-blk-txt">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
