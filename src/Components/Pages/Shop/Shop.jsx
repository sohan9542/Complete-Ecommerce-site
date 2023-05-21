import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, FilterIcon } from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/solid";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { RapperContent, URI } from "../../../App";
import axios from "axios";
import Rating from '@mui/material/Rating';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const sortOptions = [
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const Shop = () => {
  const {
    handleClick,
    handlewish,
    setOpen,
    setQuickviewProduct,
    setWtoltip,
    setToltip,
    added_products,
  } = useContext(RapperContent);
  const { productCategory } = useParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handlequickview = (e) => {
    setOpen(true);
    setQuickviewProduct(e);
  };
  const handleadtocart = (e) => {
    handleClick(e);
    setToltip(true);
  };
  const handleallWish = (e) => {
    handlewish(e);
    setWtoltip(true);
  };

  // all product fetch
  const params = new URLSearchParams(window.location.search);
  let categoryParams = params.get("category");

  const [currentUrl, setCurrentUrl] = useState(`${URI}/api/v1/products?size=0`);
  const [allProducts, setAllProducts] = useState(null);
  const [category, setCategory] = useState([]);

  const [categoryAll, setCategoryAll] = useState(null);

  useEffect(() => {
    if (categoryParams) {
      setCategory([categoryParams]);
    }

    var config = {
      method: "get",
      url: `${URI}/api/v1/category`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
      },
    };
    axios(config)
      .then(function (response) {
        setCategoryAll(
          response.data?.category?.filter(
            (item) => item.title === productCategory
          )?.[0]
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [categoryParams]);

  useEffect(() => {
    if (currentUrl !== "") {
      var config = {
        method: "post",
        url: currentUrl,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          subcategory: category,
          category: productCategory,
        }),
      };
      axios(config)
        .then(function (response) {
          setAllProducts(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    window.scrollTo(0, 0);
  }, [currentUrl, category, productCategory]);

  useEffect(() => {
    if (localStorage.getItem("productCategory")) {
      if (localStorage.getItem("productCategory") !== productCategory) {
        if(categoryParams){
          setCategory([categoryParams]);
        }
        else{
          setCategory([]);
        }
       
        localStorage.removeItem("productCategory")
        localStorage.setItem("productCategory", productCategory)
      }
    }
    else{
      localStorage.setItem("productCategory", productCategory)
    }
  }, [productCategory]);

  const checkQuantity = (stock, newitem) => {
    if (
      added_products?.filter((item) => item.id === newitem?._id)?.length > 0
    ) {
      if (
        stock >
        added_products?.filter((item) => item.id === newitem?._id)?.[0]
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

  const [sort, setSort] = useState(null);
  useEffect(() => {
    let url = `${URI}/api/v1/products?size=0&perfume=true`;
    if (sort !== null) {
      if (sort === 0) {
        setCurrentUrl(url + "&new=true");
      } else if (sort === 1) {
        setCurrentUrl(url + "&low=true");
      } else {
        setCurrentUrl(url + "&high=true");
      }
    }
  }, [sort]);

  return (
    <>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="ml-auto px-4 relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  {categoryAll?.subcategory?.map((item, ind) => (
                    <>
                      <p className=" mt-3 mb-1 capitalize">{item?.subTitle}</p>
                      <select
                        required
                        value={category[ind]}
                        onChange={(e) => {
                          let temCat = category;
                          temCat[ind] = e.target.value;
                          setCategory([...temCat]);
                          setMobileFiltersOpen(false);
                        }}
                        className="border px-3 w-full py-1 text-sm outline-none"
                        name=""
                        id=""
                      >
                        {item?.options?.map((i) => (
                          <option value={i}>{i}</option>
                        ))}
                      </select>
                    </>
                  ))}
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-border-clr">
              <h1 className="text-2xl text-center capitalize  font-medium text-blk-txt">
                {productCategory}
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      {sort === null && "Sort"}
                      {sort === 0 && "Newest"}
                      {sort === 1 && "Price: Low to high"}
                      {sort === 2 && "Price: Hight to low"}
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option, ind) => (
                          <Menu.Item
                            onClick={() => setSort(ind)}
                            key={option.name}
                          >
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FilterIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}
                <form className="hidden lg:block">
                  <button
                    onClick={() => setCategory([])}
                    className="px-3 py-2 text-sm text-white bg-primary-txt rounded-md"
                  >
                    Reset
                  </button>
                  {categoryAll?.subcategory?.map((item, ind) => (
                    <>
                      <p className=" mt-3 mb-1 capitalize">{item?.subTitle}</p>
                      <select
                        required
                        value={category[ind]}
                        onChange={(e) => {
                          let temCat = category;
                          temCat[ind] = e.target.value;
                          setCategory([...temCat]);
                        }}
                        className="border px-3 w-full py-1 text-sm outline-none"
                        name=""
                        id=""
                      >
                        {item?.options?.map((i) => (
                          <option value={i}>{i}</option>
                        ))}
                      </select>
                    </>
                  ))}
                </form>

                <div className="lg:col-span-3">
                  <div className="lg:h-full border h-au">
                    {allProducts?.products?.map((pro) => (
                      <>
                        <div className="grid lg:grid-cols-4 md:grid-cols-1 md:justify-center md:items-center sm:justify-center sm:items-center sm:grid-cols-1 py-2 border-b border-border-clr mx-2">
                          <div
                            className="w-40 object-cover"
                            style={{ margin: "0 auto" }}
                          >
                            <img
                              src={pro?.images?.[0]?.url}
                              alt={pro?.images?.[0]?.url}
                            />
                          </div>
                          <div className="col-span-2 px-3 text-ash flex flex-col justify-center">
                            <p className="text-sm capitalize">{pro.category}</p>
                            <h2 className="py-2 text-primary-txt font-medium">
                              <Link
                                to={"/product/" + pro?._id}
                                className="hover:text-new"
                              >
                                {pro.name}
                              </Link>
                            </h2>
                            <p className="text-sm">{pro.description}</p>
                            <div className="flex items-center gap-2 pt-3">
                              {pro?.tags?.map((item) => (
                                <p className="text-sm capitalize text-new font-bold ">
                                  #{item}
                                </p>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col px-3 justify-center">
                            <h1 className="px-2 text-lg font-semibold text-primary-txt py-1">
                              £{pro.price}
                            </h1>
                            <div className="flex items-center">
                              <div className="flex items-center">
                             
                                 {pro?.ratings !== 0 && <Rating name="half-rating-read" defaultValue={pro.ratings} precision={0.5} readOnly />  }
                                 {pro?.ratings === 0 && <Rating name="half-rating-read" defaultValue={0} precision={0.5} readOnly />  }
                              </div>
                              <a className="ml-3 text-sm font-medium text-primary-txt hover:text-new">
                                {pro?.numOfReviews} reviews
                              </a>
                            </div>
                            <div className="flex px-2 items-center justify-between py-1 text-ash">
                              <span
                                onClick={() => handlequickview(pro)}
                                className="flex cursor-pointer items-center text-sm"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 mr-1 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>{" "}
                                Quick View
                              </span>
                            </div>
                            <div style={{ width: "100%" }} className="px-2">
                              {pro.stock > 0 &&
                              checkQuantity(pro?.stock, pro) ? (
                                <div
                                  onClick={() => handleadtocart(pro)}
                                  className="border-1 border-primary-txt text-center transition delay-200 ease-linear text-primary-txt cursor-pointer py-2 hover:bg-primary-txt hover:text-white"
                                >
                                  ADD TO CART
                                </div>
                              ) : (
                                <div
                                  className="border-1 border-primary-txt text-center transition delay-200 ease-linear text-primary-txt py-2 hover:bg-primary-txt hover:text-white"
                                  style={{ cursor: "not-allowed" }}
                                >
                                  Out Of Stock
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                    {allProducts?.products?.length === 0 && (
                      <div className="h-96 w-full flex items-center justify-center">
                        <h1 className=" text-4xl">No Product Found</h1>
                      </div>
                    )}
                    {allProducts?.products?.length !== 0 && (
                      <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                          <Link
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Previous
                          </Link>
                          <Link
                            href="#"
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Next
                          </Link>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                          <Link
                            onClick={
                              allProducts?.prevPageUrl === null
                                ? null
                                : () => setCurrentUrl(allProducts?.prevPageUrl)
                            }
                            style={
                              allProducts?.prevPageUrl === null
                                ? { cursor: "not-allowed", color: "gray" }
                                : { cursor: "pointer" }
                            }
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            <ChevronLeftIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            <span>Previous</span>
                          </Link>
                          {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

                          <Link
                            onClick={
                              allProducts?.nextPageUrl === null
                                ? null
                                : () => setCurrentUrl(allProducts?.nextPageUrl)
                            }
                            style={
                              allProducts?.nextPageUrl === null
                                ? { cursor: "not-allowed", color: "gray" }
                                : { cursor: "pointer" }
                            }
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            <span>Next</span>
                            <ChevronRightIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default Shop;
