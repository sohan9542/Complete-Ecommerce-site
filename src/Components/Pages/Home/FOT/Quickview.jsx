
import { Fragment, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import { RapperContent } from '../../../../App'
import { Link } from 'react-router-dom'
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Quickview() {
    const { open, setOpen, quickviewProduct, handleClick, setToltip, added_products } = useContext(RapperContent)
    const allBuyFunc = (e) => {
        setToltip(true)
        handleClick(e)
    }


    const checkQuantity = (stock) => {
        if (
          added_products?.filter((item) => item.id === quickviewProduct?._id)?.length > 0
        ) {
          if (
            stock >
            added_products?.filter((item) => item.id === quickviewProduct?._id)?.[0]
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
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-50 inset-0 bg-border-clr bg-opacity-70 overflow-y-auto" onClose={setOpen}>
                <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{ fontSize: 0 }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        enterTo="opacity-100 translate-y-0 md:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 md:scale-100"
                        leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    >
                        <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                            <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                <button
                                    type="button"
                                    className="absolute top-4 right-4 text-new hover:text-primary-txt sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="sr-only">Close</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                                    <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                                        <img src={quickviewProduct?.images?.[0]?.url} alt={quickviewProduct?.images?.[0]?.url} className="object-center object-cover" />
                                    </div>
                                    <div className="sm:col-span-8 lg:col-span-7">
                                        <h2 className="text-2xl font-medium text-gray-900 sm:pr-12">{quickviewProduct.name}</h2>

                                        <section aria-labelledby="information-heading" className="mt-2">
                                            {/* <div className="my-2">
                                                <h4 className="sr-only">Reviews</h4>
                                                <div className="flex items-center">
                                                    <div className="flex items-center">
                                                        {[0, 1, 2, 3, 4].map((rating) => (
                                                            <StarIcon
                                                                key={rating}
                                                                className={classNames(
                                                                    product.rating > rating ? 'text-yellow-500' : 'text-ash',
                                                                    'h-5 w-5 flex-shrink-0'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="sr-only">{product.rating} out of 5 stars</p>
                                                    <Link href="#" className="ml-3 text-sm font-medium text-primary-txt hover:text-new">
                                                        {product.reviewCount} reviews
                                                    </Link>
                                                </div>
                                            </div> */}
                                            <p className="text-2xl text-primary-txt">£{quickviewProduct.price}</p>
                                        </section>

                                        <section aria-labelledby="options-heading" className="mt-10 d">

                                            <div>
                                                <p className="text-ash text-sm">{quickviewProduct?.description}</p>
                                            </div>


                                            <div className="flex items-center flex-wrap justify-between">
                                                {
                                                    quickviewProduct.stock > 0 && checkQuantity(quickviewProduct.stock) ?
                                                        <button
                                                            type="submit"
                                                            onClick={() => allBuyFunc(quickviewProduct)}
                                                            className="mt-6 w-48 bg-primary-txt transition ease-in duration-150 border border-transparent rounded-md py-2 px-6 flex items-center justify-center text-base font-medium text-white hover:bg-new focus:outline-none "
                                                        >
                                                            Add to bag
                                                        </button>
                                                        :
                                                        <button
                                                            type="submit"
                                                            className="mt-6 w-48 bg-primary-txt transition ease-in duration-150 border border-transparent rounded-md py-2 px-6 flex items-center justify-center text-base font-medium text-white hover:bg-new focus:outline-none " style={{ cursor: 'not-allowed' }}
                                                        >
                                                            Add to bag
                                                        </button>
                                                }
                                            
                                            </div>

                                            <div className="mt-4 text-ash capitalize text-sm">
                                                Category :  {quickviewProduct.category}
                                            </div>
                                            <div className="mt-2 text-ash capitalize text-sm">
                                                Smell :  {quickviewProduct.smell}
                                            </div>
                                            <div className="flex items-center mt-4 gap-1 text-lg text-ash">
                                                Share :
                                                <div className="cursor-pointer hover:text-new"><AiFillFacebook /></div>
                                                <div className="cursor-pointer hover:text-new"><AiFillTwitterSquare /></div>
                                                <div className="cursor-pointer hover:text-new"><AiFillInstagram /></div>
                                                <div className="cursor-pointer hover:text-new"><AiFillLinkedin /></div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
