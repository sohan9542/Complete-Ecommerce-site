import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { MenuIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useContext } from "react";
import { RapperContent, URI } from "../../../App";
import Addproduct from "./Addproduct";
import { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import CheckOut from "../../Pages/order/Checkout";
import Payment from "../../Pages/order/Payment";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartopen, setCartopen] = useState(false);
  const { added_products, isAuthenticated } = useContext(RapperContent);
  // console.log("added_products", added_products)
  const uniqueObjects = [
    ...new Map(added_products.map((item) => [item._id, item])).values(),
  ];
  let arr = [];
  added_products.forEach((e) => {
    arr = [...arr, e.price * e.quantity];
  });

  const price = arr.reduce((total, num) => total + num, 0);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${URI}/api/v1/me`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data?.user?.role === "admin") {
          setIsAdmin(true);
        }
      })
      .catch((error) => {
        setIsAdmin(false);
      });
  }, [isAuthenticated]);

  const [step, setStep] = useState(1);

  const shippingCharges = price > 100 ? 0 : 5;
const [discount, setDiscount] = useState(0)

  let totalPrice= 0

  
  totalPrice  = (price + shippingCharges - (price * (discount / 100))).toFixed(2);
  useEffect(() => {
    var config = {
      method: "get",
      url: `${URI}/api/v1/category`,
    };
    axios(config)
      .then(function (response) {
        setNavBarRoutes(response.data?.category);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const proceedPayment = () => {
   
   
    
  
    const data = {
      price,
      shippingCharges,
      totalPrice,
      discount,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
  };
  const logout = () => {
    localStorage.removeItem("Etoken");
    window.location.href = "/";
  };

  const [navBarRoutes, setNavBarRoutes] = useState([]);
  useEffect(() => {
    var config = {
      method: "get",
      url: `${URI}/api/v1/category`,
    };
    axios(config)
      .then(function (response) {
        setNavBarRoutes(response.data?.category);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setStep(1);
  }, [added_products]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchItem, setSearchItem] = useState(null);
  const searchProduct = (input) => {
    if (input !== "") {
      var config = {
        method: "get",
        url: `${URI}/api/v1/product/find?search=${input}`,
      };
      axios(config)
        .then(function (response) {
          setSearchItem(response.data?.products);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (input === "") {
      setSearchItem(null);
    }
  };
  return (
    <>
      <div className="bg-white  sticky top-0 inset-x-0 z-30">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setOpen}
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
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div cl>
                    <Tab.List className="flex flex-col items-center">
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "text-primary-txt"
                              : "text-gray-900 border-transparent",
                            "py-1 "
                          )
                        }
                      >
                        <Link className="hover:text-new" to="/">
                          {" "}
                          Home
                        </Link>
                      </Tab>
                      {navBarRoutes.map((navitem) => (
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "text-primary-txt"
                                : "text-gray-900 border-transparent",
                              "py-1"
                            )
                          }
                        >
                          <Link
                            className="hover:text-new capitalize"
                            to={`/shop/${navitem?.title}`}
                          >
                            {navitem?.title}
                          </Link>
                        </Tab>
                      ))}
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "text-primary-txt"
                              : "text-gray-900 border-transparent",
                            "py-1"
                          )
                        }
                      >
                        {isAuthenticated && isAdmin && (
                          <Link
                            to="/admin/dashboard"
                            className="text-sm   transition duration-300 ease-linear font-medium text-gray-700 hover:text-primary-txt"
                          >
                            Admin
                          </Link>
                        )}
                      </Tab>
                    </Tab.List>
                    {/* <Disclosure as="div" className="px-4 py-6 ">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium transition delay-150 ease-linear text-gray-900 hover:text-new">
                                Pages
                              </span>
                              <span className="ml-6 flex items-center text-ash">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              <div className="flex items-center flex-col">
                                <Tab
                                  className={({ selected }) =>
                                    classNames(
                                      selected
                                        ? "text-primary-txt"
                                        : "text-gray-900 border-transparent",
                                      "py-1 "
                                    )
                                  }
                                >
                                  <Link className="hover:text-new" to="/about">
                                    About
                                  </Link>
                                </Tab>
                                <Tab
                                  className={({ selected }) =>
                                    classNames(
                                      selected
                                        ? "text-primary-txt"
                                        : "text-gray-900 border-transparent",
                                      "py-1 "
                                    )
                                  }
                                >
                                  <Link
                                    className="hover:text-new"
                                    to="/contact"
                                  >
                                    Contact
                                  </Link>
                                </Tab>
                                <Tab
                                  className={({ selected }) =>
                                    classNames(
                                      selected
                                        ? "text-primary-txt"
                                        : "text-gray-900 border-transparent",
                                      "py-1 "
                                    )
                                  }
                                >
                                  <Link className="hover:text-new" to="/faq">
                                    FAQ
                                  </Link>
                                </Tab>
                                <Tab
                                  className={({ selected }) =>
                                    classNames(
                                      selected
                                        ? "text-primary-txt"
                                        : "text-gray-900 border-transparent",
                                      "py-1 "
                                    )
                                  }
                                >
                                  <Link
                                    className="hover:text-new"
                                    to="/error404"
                                  >
                                    Eror 404
                                  </Link>
                                </Tab>
                              </div>
                            </div>
                          </Disclosure.Panel>
                          {isAuthenticated && isAdmin && (
                            <Link
                              to="/admin/products"
                              className="text-sm mr-4  transition duration-300 ease-linear font-medium text-gray-700 hover:text-primary-txt"
                            >
                              Admin
                            </Link>
                          )}
                        </>
                      )}
                    </Disclosure> */}
                  </div>
                </Tab.Group>

                {isAuthenticated === false && (
                  <div className="border-t border-border-clr my-6 py-6 px-4 space-y-6">
                    <div className="flow-root">
                      <Link
                        to="/sign-in"
                        className="-m-2 p-2 block font-medium text-gray-900 hover:text-primary-txt"
                      >
                        Sign in
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        to="/sign-up"
                        className="-m-2 p-2 block transition font-medium text-gray-900 hover:text-primary-txt"
                      >
                        Create account
                      </Link>
                    </div>
                  </div>
                )}
                {isAuthenticated && (
                  <div className=" w-full flex items-center justify-center">
                    <button
                      onClick={logout}
                      className=" px-2 mt-10  items-center gap-2 ml-2 cursor-pointer hover:bg-primary-txt hover:text-white py-1 border-2 border-primary-txt text-primary-txt rounded-md text-sm"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white">
          <p className="bg-gray h-10 flex items-center justify-center text-sm font-medium text-ash px-4 sm:px-6 lg:px-8">
            Get free delivery on orders over £100
          </p>

          <nav
            aria-label="Top"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-border-clr">
              <div className="h-16 flex items-center">
                <button
                  type="button"
                  className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className=" flex ">
                  <Link to="/">
                    <h1 className="text-3xl font font-bold tracking-tight text-blk-txt ">
                      PERFUME
                    </h1>
                  </Link>
                </div>

                {/* Flyout menus */}

                {navBarRoutes.map((item, ind) => (
                  <Popover.Group
                    key={ind}
                    as="nav"
                    className="hidden md:flex ml-8"
                  >
                    <Popover className="relative">
                      {({ open }) => (
                        <div className="flex items-center gap-1">
                          <Link
                            to={`/shop/${item?.title}`}
                            className="font-sm hover:text-primary-txt text-sm  capitalize"
                          >
                            {item?.title}
                          </Link>
                          <Popover.Button
                            className={classNames(
                              open
                                ? "border-primary-txt text-primary-txt"
                                : "text-gray-500 ",
                              ""
                            )}
                          >
                            {item?.subcategory?.find(
                              (f) => f.navbarShow === true
                            ) && (
                              <ChevronDownIcon
                                className={classNames(
                                  open ? "text-primary-txt" : "text-gray-400",
                                  "ml-2  h-5 w-5 group-hover:text-gray-500"
                                )}
                                aria-hidden="true"
                              />
                            )}
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-40 px-5 w-screen max-w-md sm:px-0">
                              <div className="rounded-lg shadow-lg  overflow-hidden">
                                {item?.subcategory?.map((i) => (
                                  <>
                                    {i?.navbarShow && (
                                      <div className="relative grid gap-3 bg-white px-2 py-3 sm:gap-8 sm:p-8">
                                        {i?.options?.map((idx) => (
                                          <Link
                                            to={`/shop/${item.title}?category=${idx}`}
                                            className=" flex items-center rounded-lg hover:text-primary-txt"
                                          >
                                            <div className="ml-4">
                                              <p className="text-base capitalize font-medium text-gray-900">
                                                {idx}
                                              </p>
                                            </div>
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </>
                                ))}

                                {/* <Link
                                  to="/perfume?category=women"
                                  className=" flex items-start rounded-lg hover:text-primary-txt"
                                >
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">
                                      Women
                                    </p>
                                  </div>
                                </Link> */}
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </div>
                      )}
                    </Popover>
                  </Popover.Group>
                ))}
                {/* <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="h-full flex space-x-8">
                    <Popover className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex gap-3">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-primary-txt text-primary-txt"
                                  : "border-transparent text-gray-700 transition duration-300 ease-linear hover:text-primary-txt",
                                "relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                              )}
                            >
                              <Link className="hover:text-new" to="/bakhoor">
                                Bakhoor
                              </Link>
                            </Popover.Button>
                          
                          </div>
                        </>
                      )}
                    </Popover>
            
                  </div>
                </Popover.Group> */}
                <div className="ml-auto flex items-center">
                  {isAuthenticated === false && (
                    <div className="hidden lg:flex lg:flex-1 mr-4 lg:items-center lg:justify-end lg:space-x-6">
                      <Link
                        to="/sign-in"
                        className="text-sm transition duration-300 ease-linear font-medium text-gray-700 hover:text-primary-txt"
                      >
                        Sign in
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link
                        to="/sign-up"
                        className="text-sm transition duration-300 ease-linear font-medium text-gray-700 hover:text-primary-txt"
                      >
                        Create account
                      </Link>
                    </div>
                  )}
                  {isAuthenticated && isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="text-sm mr-4 hidden lg:block transition duration-300 ease-linear font-medium text-gray-700 hover:text-primary-txt"
                    >
                      Admin
                    </Link>
                  )}
                  {/* Cart */}

                  <div className="ml-4 flow-root lg:ml-5">
                    <div
                      className="group cursor-pointer -m-2 p-2 flex items-center"
                      onClick={() => setSearchOpen(true)}
                    >
                      <span class="relative inline-block">
                        <FiSearch className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flow-root lg:ml-5">
                    <div
                      className="group cursor-pointer -m-2 p-2 flex items-center"
                      onClick={() => setCartopen(true)}
                    >
                      <span class="relative inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blk-txt"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blk-txt transform translate-x-1/2 -translate-y-1/2 bg-primary-txt rounded-full">
                          {added_products.length}
                        </span>
                      </span>
                    </div>
                  </div>
                  {isAuthenticated && (
                    <Link
                      to="/profile"
                      className="ml-4 px-3 py-2 cursor-pointer rounded-full bg-primary-txt text-xl "
                    >
                      P
                    </Link>
                  )}
                  {isAuthenticated && (
                    <button
                      onClick={logout}
                      className=" px-2 hidden lg:flex  items-center gap-2 ml-2 cursor-pointer hover:bg-primary-txt hover:text-white py-1 border-2 border-primary-txt text-primary-txt rounded-md text-sm"
                    >
                      Log Out
                    </button>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <Transition.Root show={cartopen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30"
          onClose={() => setCartopen(false)}
        >
          <div className="absolute inset-0">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md bg-white">
                  <div className="flex items-start justify-between px-4 py-2 bg-white border-b mb-3">
                    {step === 1 ? (
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Your Products
                      </Dialog.Title>
                    ) : (
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shipping Details
                      </Dialog.Title>
                    )}
                    <div className="ml-3 h-7 flex items-center">
                      <button
                        type="button"
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setCartopen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    {step === 1 && (
                      <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                        <div className="mt-8">
                          {uniqueObjects.length === 0 ? (
                            <div
                              className="w-full h-full flex justify-center items-center text-lg bg-primary-txt text-white"
                              style={{ height: "70vh", width: "100%" }}
                            >
                              <h2>No Product Added</h2>
                            </div>
                          ) : (
                            <div className="flow-root">
                              <ul className="-my-6 divide-y divide-border-clr">
                                {added_products.map((product) => (
                                  <Addproduct
                                    key={product.id}
                                    product={product}
                                  />
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="border-t border-border-clr py-6 px-4 sm:px-6">
                      {uniqueObjects.length !== 0 && (
                        <>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>£{price}</p>
                          </div>
                          {step === 3 && (
                            <>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Shipping Charges:</p>
                                <p>£{shippingCharges}</p>
                              </div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Discount:</p>
                                <p>{discount}%</p>
                              </div>

                              <div className="flex border-t mt-3 justify-between text-base font-medium text-gray-900">
                                <p className="text-2xl">TOTAL:</p>
                                <p className="text-2xl">£{totalPrice}</p>
                              </div>
                            </>
                          )}

                          {step === 1 && (
                            <p className="mt-0.5 text-sm text-gray-500">
                              Shipping calculated at checkout.
                            </p>
                          )}
                          <div className="mt-6">
                            {isAuthenticated && step === 1 && (
                              <div
                                onClick={() => setStep(2)}
                                className="flex cursor-pointer justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-txt hover:bg-new"
                              >
                                Continue
                              </div>
                            )}
                            {!isAuthenticated && step === 1 && (
                              <Link
                                onClick={() => setCartopen(false)}
                                to="/sign-in"
                                className="flex cursor-pointer justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-txt hover:bg-new"
                              >
                                Log in Or Create Account
                              </Link>
                            )}
                          </div>
                        </>
                      )}
                      {step === 2 && (
                        <CheckOut
                        setDiscount2={setDiscount}
                          proceedPayment={proceedPayment}
                          setStep={setStep}
                        />
                      )}
                      {step === 3 && <Payment />}
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="text-primary-txt font-medium hover:text-new"
                            onClick={() => setCartopen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={searchOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30"
          onClose={() => setSearchOpen(false)}
        >
          <div className="absolute inset-0">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md bg-white">
                  <div className="flex items-start justify-between px-4 py-2 bg-white border-b mb-3">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      Search Products
                    </Dialog.Title>
                    <div className="ml-3 h-7 flex items-center">
                      <button
                        type="button"
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setSearchOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex-1 py-2 overflow-y-auto px-4 sm:px-6">
                      <div>
                        <input
                          onChange={(e) => searchProduct(e.target.value)}
                          placeholder="Search By Name"
                          className="border w-full px-2 py-2 rounded-md outline-none"
                          type="text"
                        />
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-border-clr">
                            {searchItem !== null && (
                              <>
                                {searchItem?.length !== 0 ? (
                                  <>
                                    {searchItem?.map((product) => (
                                      <SearchProduct
                                        key={product?._id}
                                        product={product}
                                      />
                                    ))}
                                  </>
                                ) : (
                                  <div className="h-full py-32 text-center text-new text-xl">
                                    No Product Found
                                  </div>
                                )}
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

const SearchProduct = ({ product }) => {
  const { handleClick, setToltip } = useContext(RapperContent);
console.log('product', product)
  return (
    <>
      <li className="py-6 flex mt-2">
        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md ">
          <img
            src={product?.images?.[0]?.url}
            alt={product?.images?.[0]?.url}
            className="w-full h-full object-center object-contain"
          />
        </div>

        <div className="ml-4 flex-1 flex flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <Link to={"/product/" + product?._id}>{product?.name}</Link>
              </h3>
              <p className="ml-4">£{product?.price}</p>
            </div>
            <div className="flex items-center gap-2">
              {product?.tags?.map((item) => (
                <p className="mt-1 text-sm text-new">#{item}</p>
              ))}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center text-sm">
            <div className="flex">
              <button
                onClick={() => {
                  setToltip(true);
                  handleClick(product);
                }}
                type="button"
                className="font-medium bg-primary-txt text-white px-2 py-1 text-sm rounded-md"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
