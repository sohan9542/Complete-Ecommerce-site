import React from "react";
import { StarIcon } from "@heroicons/react/solid";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { tabsClasses } from "@mui/material/Tabs";
import { useContext } from "react";
import { RapperContent, URI } from "../../../App";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetails = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { setToltip, isAuthenticated, added_products, setAdded_products } =
    useContext(RapperContent);
  const { id } = useParams();
  const [thisproduct, setThisproduct] = useState(null);
  const [reload, setReload] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [quentity, setQuentity] = useState(1);
  const handleadtocart = (e) => {
    setToltip(true);
    const findProduct = added_products?.filter((item) => item.id === e._id);
    let productSingle = {
      name: e.name,
      price: e.price,
      quantity: findProduct.length + quentity,
      image: e.images?.[0].url,
      product: e._id,
      id: e._id,
    };
    const eliminateProduct = added_products?.filter(
      (item) => item.id !== e._id
    );
    setAdded_products([...eliminateProduct, productSingle]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    var config2 = {
      method: "get",
      url: `${URI}/api/v1/product/${id}`,
    };

    axios(config2)
      .then(function (response) {
        setThisproduct(response.data?.product);
      })
      .catch(function (error) {
        console.log(error);
      });
    if (reload) {
      setReload(false);
    }

    if (isAuthenticated) {
      var config2 = {
        method: "get",
        url: `${URI}/api/v1/me`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
        },
      };

      axios(config2)
        .then(function (response) {
          console.log("I am here");
          setName(response.data?.user?.name);
          setEmail(response.data?.user?.email);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [reload, isAuthenticated]);

  const createReview = () => {
    let data = JSON.stringify({
      name: name,
      email: email,
      productId: id,
      comment: comment,
      rating: rating,
    });

    let config = {
      method: "put",
      url: `${URI}/api/v1/review`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data?.success) {
          toast.success("Review Created Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.reload();
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
  const checkQuantity = (stock) => {
    if (
      added_products?.filter((item) => item.id === thisproduct?._id)?.length > 0
    ) {
      if (
        stock >
        added_products?.filter((item) => item.id === thisproduct?._id)?.[0]
          ?.quantity
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  return (
    <>
      <div className="bg-white container">
        <div
          className="max-w-2xl mx-auto px-2 sm:py-12
                 s lg:max-w-7xl lg:px-8"
        >
          <div className="pt-6 lg:grid lg:grid-cols-2 lg:gap-x-8 gap-1">
            <div className="aspect-w-4  aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={thisproduct?.images?.[0]?.url}
                alt={thisproduct?.images?.[0]?.url}
                className="w-full h-full object-center object-cover"
              />
            </div>

            <div className="max-w-2xl px-3 mx-auto pt-10 pb-16 sm:px-6">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-normal tracking-tight text-blk-ash sm:text-3xl">
                  {thisproduct?.name}
                </h1>
              </div>
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {thisproduct?.ratings && thisproduct?.ratings !== 0 && (
                      <Rating
                        name="half-rating-read"
                        defaultValue={thisproduct?.ratings}
                        precision={0.5}
                        readOnly
                      />
                    )}
                    {thisproduct?.ratings && thisproduct?.ratings === 0 && (
                      <Rating
                        name="half-rating-read"
                        defaultValue={0}
                        precision={0.5}
                        readOnly
                      />
                    )}
                  </div>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-primary-txt hover:text-new"
                  >
                    {thisproduct?.numOfReviews} reviews
                  </a>
                </div>
              </div>
              {/* Options */}
              <div className="mt-3 lg:mt-0 lg:row-span-3">
                <p className="text-2xl text-primary-txt">
                  £{thisproduct?.price}
                </p>
                <div>
                  <div className="space-y-6 mt-2">
                    <p className="text-sm text-ash">
                      {thisproduct?.description}
                    </p>
                  </div>
                </div>

                <div className=" mt-2 flex  gap-3 items-center">
                  <p> Quentity: </p>
                  <div className="flex items-center justify-between w-36 border border-ash">
                    {quentity > 1 ? (
                      <div
                        onClick={() => setQuentity(quentity - 1)}
                        className="flex justify-center bg-primary-txt text-xl h-full py-2 items-center cursor-pointer w-10"
                      >
                        -
                      </div>
                    ) : (
                      <div className="flex justify-center bg-ash text-xl h-full py-2 items-center cursor-not-allowed w-10">
                        -
                      </div>
                    )}
                    <div className="flex justify-center items-center ">
                      {quentity}
                    </div>

                    {(quentity < thisproduct?.stock) &
                    checkQuantity(thisproduct?.stock) ? (
                      <div
                        onClick={() => setQuentity(quentity + 1)}
                        className="flex justify-center bg-primary-txt text-xl h-full py-2 items-center cursor-pointer w-10"
                      >
                        +
                      </div>
                    ) : (
                      <div className="flex justify-center bg-ash text-xl h-full py-2 items-center cursor-not-allowed w-10">
                        +
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex ">
                  {thisproduct?.stock > 1 &&
                  checkQuantity(thisproduct?.stock) ? (
                    <button
                      onClick={() => handleadtocart(thisproduct)}
                      className=" w-52 bg-primary-txt transition delay-100 border border-transparent rounded-md py-2 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-new"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      className=" w-52 bg-primary-txt transition delay-100 border border-transparent rounded-md py-2 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-new"
                      style={{ cursor: "not-allowed" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to Cart
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 border-t border-border-clr mt-2 pt-2">
                  {thisproduct?.tags?.map((item) => (
                    <p className="text-sm text-new">#{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="m-7">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    centered
                    variant="scrollable"
                    scrollButtons
                    sx={{
                      [`& .${tabsClasses.scrollButtons}`]: {
                        "&.Mui-disabled": { opacity: 0.3 },
                      },
                    }}
                  >
                    <Tab label="Reviews " value="1" />
                  </TabList>
                </Box>
                <div className="border">
                  <TabPanel value="1">
                    <p className="text-sm font-semibold pb-3 gap-2">Reviews</p>
                    <div className="divide-y divide-border-clr">
                      {thisproduct?.reviews?.map((item, ind) => (
                        <div className="grid md:mt-3 md:pt-6 lg:mt-3 lg:pt-6 lg:grid-cols-10">
                          <div
                            key={ind}
                            className="md:col-span-2 lg:col-span-2"
                          >
                            <p className="text-sm">{item?.name}</p>
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    item.rating > rating
                                      ? "text-yellow-500"
                                      : "text-ash",
                                    "h-4 w-4 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="text-sm text-ash">
                              {item?.createdAt?.slice(0, 10)}
                            </p>
                          </div>
                          <div className="col-span-10  lg:col-span-8 lg:pl-4">
                            <p className="text-lg font-medium text-ash">
                              {item?.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm font-semibold py-3 mt-20 gap-2">
                      Add a Review
                    </p>
                    <p className="text-ash text-xs py-2">
                      Your email address will not be published. Required fields
                      are marked *
                    </p>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        createReview();
                      }}
                      className="w-full"
                    >
                      <select
                        name=""
                        id=""
                        required
                        onChange={(e) => setRating(e.target.value)}
                        className="w-48 text-sm text-ash my-2 border p-2 ouline-new"
                      >
                        <option value="">Select Your Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <textarea
                        required
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border outline-white p-2 text-sm"
                        cols="30"
                        rows="10"
                        placeholder="Write Your Message"
                      />
                      {isAuthenticated === false && (
                        <div className="grid gap-3 grid-cols-2 my-2">
                          <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="border outline-white p-2 text-sm"
                            placeholder="Name*"
                            required
                          />
                          <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="border outline-white p-2 text-sm"
                            placeholder="Email*"
                            required
                          />
                        </div>
                      )}

                      <br />
                      <input
                        type="submit"
                        className="px-5 mt-3 py-2 bg-primary-txt text-white transition delay-100 ease-linear hover:bg-new"
                        value="Submit"
                      />
                    </form>
                  </TabPanel>
                </div>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
