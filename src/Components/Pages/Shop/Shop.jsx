import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import { products } from '../../../Data/Product'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { RapperContent } from '../../../App';
const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]

const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'New Arrivals', checked: false },
            { value: 'sale', label: 'Sale', checked: false },
            { value: 'travel', label: 'Travel', checked: true },
            { value: 'organization', label: 'Organization', checked: false },
            { value: 'accessories', label: 'Accessories', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Shop = () => {
    const { handleClick, handlewish, setOpen, setQuickviewProduct, setWtoltip, setToltip } = useContext(RapperContent)
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const filtercategory = products.map(pd => pd.category)

    let newproduct = [];
    filtercategory.forEach((pd) => {
        if (!newproduct.includes(pd)) {
            newproduct.push(pd)
        }
    })
    const showProduct = products.slice(0, 5)
    const handlequickview = (e) => {
        setOpen(true)
        setQuickviewProduct(e)
    }
    const handleadtocart = (e)=>{
        handleClick(e)
        setToltip(true)
    }
    const handleallWish = (e)=>{
        handlewish(e)
        setWtoltip(true)
    }
    return (
        <>
            <div className="bg-white">
                <div>
                    {/* Mobile filter dialog */}
                    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
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
                                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                                    <div className="px-4 flex items-center justify-between">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
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
                                    <form className="mt-4 border-t border-border-clr">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul className="font-medium text-gray-900 px-2 py-3">
                                            {newproduct.map((category) => (
                                                <li key={category}>
                                                    <Link href={category} className="block px-2 py-3 transition delay-150 text-ash ease-linear capitalize hover:text-primary-txt">
                                                        {category}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>

                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-border-clr px-4 py-6 ">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium transition delay-150 ease-linear text-gray-900 hover:text-new">{section.name}</span>
                                                                <span className="ml-6 flex items-center text-ash">
                                                                    {open ? (
                                                                        <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </div>
                            </Transition.Child>
                        </Dialog>
                    </Transition.Root>

                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-border-clr">
                            <h1 className="text-4xl text-center  font-medium text-blk-txt">New <span className="text-primary-txt">Shop</span></h1>

                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Sort
                                            <ChevronDownIcon
                                                className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {sortOptions.map((option) => (
                                                    <Menu.Item key={option.name}>
                                                        {({ active }) => (
                                                            <Link
                                                                href={option.href}
                                                                className={classNames(
                                                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                {option.name}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                <button type="button" className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View grid</span>
                                    <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
                                </button>
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
                            <h2 id="products-heading" className="sr-only">
                                Products
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                                {/* Filters */}
                                <form className="hidden lg:block">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-border-clr text-ash">
                                        {newproduct.map((category) => (
                                            <li key={category}>
                                                <Link className="capitalize transition delay-150 ease-linear hover:text-primary-txt" href={category}>{category}</Link>
                                            </li>
                                        ))}
                                    </ul>

                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-b border-border-clr py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900 delay-150 ease-linear text-gray-900 hover:text-new">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-4">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        defaultChecked={option.checked}
                                                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-600"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>


                                <div className="lg:col-span-3">

                                    <div className="lg:h-full border h-au">
                                        {
                                            showProduct.map(pro => (
                                                <>
                                                    <div className="grid lg:grid-cols-4 md:grid-cols-1 md:justify-center md:items-center sm:justify-center sm:items-center sm:grid-cols-1 py-2 border-b border-border-clr mx-2">
                                                        <div style={{ margin: '0 auto' }}>
                                                            <img src={pro.imageSrc} alt={pro.imageAlt} />
                                                        </div>
                                                        <div className="col-span-2 px-3 text-ash flex flex-col justify-center">
                                                            <p className="text-sm capitalize">{pro.for}</p>
                                                            <h2 className="py-2 text-primary-txt font-medium"><Link className="hover:text-new"  to={"/productDetails/" + pro.id}>{pro.name}</Link></h2>
                                                            <p className="text-sm">Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus.</p>
                                                        </div>
                                                        <div className="flex flex-col px-3 justify-center">
                                                            <h1 className="px-2 text-lg font-semibold text-primary-txt py-1">${pro.price}</h1>
                                                            <div className="flex px-2 items-center gap-1 py-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 " viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 " viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 " viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 " viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 " viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>


                                                            </div>
                                                            <div className="flex px-2 items-center justify-between py-1 text-ash">
                                                                <span onClick={() => handlequickview(pro)} className="flex cursor-pointer items-center text-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 mr-1 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg> Quick View</span>
                                                                <span onClick={() => handleallWish(pro)} className="flex cursor-pointer items-center  py-1 text-sm">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 mr-1 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                                    </svg> Wishlist
                                                                </span>
                                                            </div>
                                                            <div style={{ width: '100%' }} className="px-2">
                                                                {
                                                                    pro.stock ?
                                                                        <div onClick={() => handleadtocart(pro)} className="border-1 border-primary-txt text-center transition delay-200 ease-linear text-primary-txt cursor-pointer py-2 hover:bg-primary-txt hover:text-white">ADD TO CART</div>
                                                                        :
                                                                        <div className="border-1 border-primary-txt text-center transition delay-200 ease-linear text-primary-txt py-2 hover:bg-primary-txt hover:text-white" style={{ cursor: 'not-allowed' }}>Out Of Stock</div>

                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ))
                                        }

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
                                                <div>
                                                    <p className="text-sm text-gray-700">
                                                        Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                                                        <span className="font-medium">10</span> results
                                                    </p>
                                                </div>
                                                <div>
                                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                        <Link
                                                            href="#"
                                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                        >
                                                            <span className="sr-only">Previous</span>
                                                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                                        </Link>
                                                        {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                                                        <Link
                                                            href="#"
                                                            aria-current="page"
                                                            className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                        >
                                                            1
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                        >
                                                            2
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                                                        >
                                                            3
                                                        </Link>
                                                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                                            ...
                                                        </span>
                                                        <Link
                                                            href="#"
                                                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                                                        >
                                                            8
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                        >
                                                            9
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                        >
                                                            10
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                        >
                                                            <span className="sr-only">Next</span>
                                                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                                        </Link>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Shop
