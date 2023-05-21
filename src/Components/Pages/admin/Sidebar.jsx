import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { MenuIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import { Link, NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:min-h-screen">
      <button
        type="button"
        className="bg-white p-2 rounded-md text-gray-400 ml-6 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open menu</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>
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
                <div className="flex flex-col pl-7">
                  <Link
                    className="hover:text-new text-lg pb-2 font-medium"
                    to="/admin/dashboard"
                  >
                    Dashboard
                  </Link>

                  <Link
                    className="hover:text-new text-lg pb-2 font-medium"
                    to="/admin/category"
                  >
                    Category
                  </Link>

                  <Link
                    className="hover:text-new text-lg pb-2 font-medium"
                    to="/admin/products"
                  >
                    All Products
                  </Link>
                  <Link
                    className="hover:text-new pt-2 text-lg pb-2 font-medium"
                    to="/admin/create"
                  >
                    Create Product
                  </Link>
                  <Link
                    className="hover:text-new pt-2 text-lg pb-2  font-medium"
                    to="/admin/orders"
                  >
                    Orders
                  </Link>
                  <Link
                    className="hover:text-new pt-2 text-lg pb-2  font-medium"
                    to="/admin/users"
                  >
                    Users
                  </Link>
                  <Link
                    className="hover:text-new text-lg pb-2 font-medium"
                    to="/admin/cupon"
                  >
                    Coupon
                  </Link>
                </div>
              </Tab.Group>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <div className=" flex-col hidden lg:flex h-full px-10 py-6 pt-20 divide-y bg-card-bg">
        <NavLink
          activeClassName="text-new"
          className="hover:text-new text-lg pb-2 font-medium"
          to="/admin/dashboard"
        >
          Dashboard
        </NavLink>
        <NavLink
          activeClassName="text-new"
          className="hover:text-new pt-2 text-lg pb-2  font-medium"
          to="/admin/category"
        >
          Category
        </NavLink>
        <NavLink
          activeClassName="text-new"
          className="hover:text-new text-lg pb-2 font-medium"
          to="/admin/products"
        >
          All Products
        </NavLink>
        <NavLink
          activeClassName="text-new"
          className="hover:text-new pt-2 text-lg pb-2 font-medium"
          to="/admin/create"
        >
          Create Product
        </NavLink>
        <NavLink
          activeClassName="text-new"
          className="hover:text-new pt-2 text-lg pb-2  font-medium"
          to="/admin/orders"
        >
          Orders
        </NavLink>
        <NavLink
          activeClassName="text-new"
          className="hover:text-new pt-2 text-lg pb-2  font-medium"
          to="/admin/users"
        >
          Users
        </NavLink>
        <NavLink
          activeClassName="text-new"
          className="hover:text-new pt-2 text-lg pb-2  font-medium"
          to="/admin/cupon"
        >
          Coupon
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
