import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { navigation } from '../../../Data/NavbarData'

import { useContext } from 'react'
import { RapperContent } from '../../../App'
import Addproduct from './Addproduct'
import Wish from './Wish'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [cartopen, setCartopen] = useState(false)
  const [wish, setWish] = useState(false)
  const { added_products, added_wish } = useContext(RapperContent)
  const uniqueObjects = [...new Map(added_products.map(item => [item.id, item])).values()]
  let arr = []
  added_products.forEach((e) => {
    arr = [...arr, e.price]
  })
  const uniqueWish = [...new Map(added_wish.map(item => [item.id, item])).values()]
  const price = arr.reduce((total, num) => total + num, 0)
  return (
    <>
      <div className="bg-white  sticky top-0 inset-x-0 z-30" >
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
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
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-border-clr">
                    <Tab.List className="-mb-px flex px-4 space-x-8">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'text-primary-txt border-primary-txt' : 'text-gray-900 border-transparent',
                              'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                              </div>
                              <Link to={item.href} className="mt-6 block font-medium text-gray-900 hover:text-primary-txt">
                                <span className="absolute z-10 inset-0" aria-hidden="true" />
                                {item.name}
                              </Link>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul

                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {/* role="list" */}
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <Link to={item.href} className="-m-2 p-2 block text-gray-500 hover:text-primary-txt">
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>


                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  <div className="flow-root">
                    <Link href="#" className="-m-2 p-2 block font-medium text-gray-900 hover:text-primary-txt">
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="#" className="-m-2 p-2 block transition font-medium text-gray-900 hover:text-primary-txt">
                      Create account
                    </Link>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white">
          <p className="bg-gray h-10 flex items-center justify-center text-sm font-medium text-ash px-4 sm:px-6 lg:px-8">
            Get free delivery on orders over $100
          </p>

          <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="ml-4 flex lg:ml-0">
                  <Link to="/">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto"
                      src="https://d-themes.com/react/molla/demo-1/images/logo.png"
                      alt=""
                    />
                  </Link>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="h-full flex space-x-8">
                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        {({ open }) => (
                          <>
                            <div className="relative flex">
                              <Popover.Button
                                className={classNames(
                                  open
                                    ? 'border-primary-txt text-primary-txt'
                                    : 'border-transparent text-gray-700 transition duration-300 ease-linear hover:text-primary-txt',
                                  'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                                )}
                              >
                                {category.name}
                              </Popover.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                <div className="relative bg-white">
                                  <div className="max-w-7xl mx-auto px-8">
                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                      <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                        {category.featured.map((item) => (
                                          <div key={item.name} className="group relative text-base sm:text-sm">
                                            <div className="aspect-w-1 aspect-h-1 transition duration-300 ease-linear rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                              <img
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-center object-cover"
                                              />
                                            </div>
                                            <Link to={item.href} className="mt-6 block font-medium text-gray-900">
                                              <span className="absolute z-10 inset-0" aria-hidden="true" />
                                              {item.name}
                                            </Link>
                                            <p aria-hidden="true" className="mt-1">
                                              Shop now
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                        {category.sections.map((section) => (
                                          <div key={section.name}>
                                            <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                              {section.name}
                                            </p>
                                            <ul

                                              aria-labelledby={`${section.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {/* role="list" */}
                                              {section.items.map((item) => (
                                                <li key={item.name} className="flex">
                                                  <Link to={item.href} className="transition duration-300 ease-linear hover:text-primary-txt">
                                                    {item.name}
                                                  </Link>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}


                  </div>
                </Popover.Group>

                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link href="#" className="text-sm transition duration-300 ease-linear font-medium text-gray-700 hover:text-primary-txt">
                      Sign in
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link href="#" className="text-sm transition duration-300 ease-linear font-medium text-gray-700 hover:text-primary-txt">
                      Create account
                    </Link>
                  </div>



                  {/* Search */}
                  <div className="flex lg:ml-6">
                    <Link href="#" className="p-2 text-gray-400 transition duration-300 ease-linear hover:text-primary-txt">
                      <span className="sr-only">Search</span>
                      <SearchIcon className="w-6 h-6" aria-hidden="true" />
                    </Link>
                  </div>

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <div className="group cursor-pointer -m-2 p-2 flex items-center" onClick={() => setWish(true)}>
                      <span class="relative inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blk-txt transform translate-x-1/2 -translate-y-1/2 bg-primary-txt rounded-full">{added_wish.length}</span>
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flow-root lg:ml-6">
                    <div className="group cursor-pointer -m-2 p-2 flex items-center" onClick={() => setCartopen(true)}>
                      <span class="relative inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blk-txt transform translate-x-1/2 -translate-y-1/2 bg-primary-txt rounded-full">{added_products.length}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

      </div>
      <Transition.Root show={cartopen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-30" onClose={() => setCartopen(false)}>
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
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Your Products</Dialog.Title>
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

                      <div className="mt-8">
                        {uniqueObjects.length === 0 ?
                          <div className="w-full h-full flex justify-center items-center text-lg bg-primary-txt text-white" style={{ height: '70vh', width: '100%' }}><h2>No Product Added</h2></div>
                          :
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-border-clr">
                              {uniqueObjects.map((product) => <Addproduct key={product.id} product={product} />)}
                            </ul>
                          </div>
                        }
                      </div>
                    </div>

                    <div className="border-t border-border-clr py-6 px-4 sm:px-6">
                      {uniqueObjects.length !== 0 &&
                        <>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${price}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                          <div className="mt-6">
                            <Link
                              href="#"
                              className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-txt hover:bg-new"
                            >
                              Checkout
                            </Link>
                          </div>
                        </>

                      }
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="text-primary-txt font-medium hover:text-new"
                            onClick={() => setCartopen(false)}
                          >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
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
      <Transition.Root show={wish} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-30" onClose={() => setWish(false)}>
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
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Your Wishlist</Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setWish(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {uniqueWish.length === 0 ?
                          <div className="flex justify-center items-center text-lg bg-new text-white" style={{ height: '70vh', width: '100%' }}><h2>No Wish To Show</h2></div>
                          :
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-border-clr">
                              {uniqueWish.map((product) => <Wish key={product.id} product={product} />)}
                            </ul>
                          </div>
                        }
                      </div>
                    </div>

                    <div className="border-t border-border-clr py-6 px-4 sm:px-6">
                      
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          <button
                            type="button"
                            className="text-new font-medium hover:text-primary-txt"
                            onClick={() => setWish(false)}
                          >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
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
    </>
  )
}
