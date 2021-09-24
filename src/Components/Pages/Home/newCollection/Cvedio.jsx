import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import './cvedio.css'

const Cvedio = () => {
    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)
    return (
        <>
            <div className="max-w-2xl my-4 cvedio relative mx-auto px-4 sm:py-12
                 sm:px-6 lg:max-w-7xl lg:px-8" >
                <div className="flex items-center py-16 flex-col justify-center" style={{width: '100%', height: '100%'}}>
                    <h3 className="font-bold text-white lg:text-3xl text-2xl sm:text-lg">NEW COLLECTION</h3>
                    <h1 className="font-bold text-white lg:text-7xl text-4xl sm:text-2xl">Winter’19 / Spring’20</h1>
                    <button className="bg-new p-2 animate-pulse rounded-full text-white ease-in-out hover:scale-50 transition delay-200 hover:bg-primary-txt mt-5 top-40 left-96" onClick={() => setOpen(true)}><svg style={{height: '50px', width: '50px'}} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg></button>
                </div>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >

                            <div class="relative inline-block" style={{ width: '90%', height: '600px' }}>
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/RXr8Qc-GM_k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>

                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default Cvedio
