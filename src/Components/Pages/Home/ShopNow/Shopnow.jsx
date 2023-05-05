import React from 'react'
import { callouts } from '../../../../Data/Shopnowdata'
import './shopnow.css'
import { Link } from 'react-router-dom'

const Shopnow = () => {
    return (
        <>
            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto py-8 sm:py-24 lg:py-32 lg:max-w-none">
                        <h2 className="text-2xl font-extrabold text-gray-900">Collections</h2>

                        <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-6">
                            {callouts.map((callout, ind) => (
                                <div key={callout.name} className="group relative cursor-pointer">
                                    <div className="relative w-full h-80 bg-white  rounded-lg overflow-hidden ">
                                        <img
                                            src={callout.imageSrc}
                                            alt={callout.imageAlt}
                                            className="w-full h-full object-center object-cover"
                                        />
                                        <div className="group snow absolute top-40 z-10 left-20">
                                            <Link to={ind === 0 ? "perfume?category=men" : "perfume?category=women"} className=" bg-primary-txt flex hover:bg-black text-white border-none items-center bg-tback py-2 px-4 ">Discover Now <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg></Link>
                                        </div>
                                    </div>
                              
                                    <p className="text-xl font-semibold text-gray-900 mt-2 text-center ">{callout.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shopnow
