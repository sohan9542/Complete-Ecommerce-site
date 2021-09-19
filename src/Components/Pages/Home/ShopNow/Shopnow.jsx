import React from 'react'
import { callouts } from '../../../../Data/Shopnowdata'
import './shopnow.css'

const Shopnow = () => {
    return (
        <>
            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto py-8 sm:py-24 lg:py-32 lg:max-w-none">
                        <h2 className="text-2xl font-extrabold text-gray-900">Collections</h2>

                        <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                            {callouts.map((callout) => (
                                <div key={callout.name} className="group relative">
                                    <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden ">
                                        <img
                                            src={callout.imageSrc}
                                            alt={callout.imageAlt}
                                            className="w-full h-full object-center object-cover"
                                        />
                                        <div className="group snow absolute top-40 left-20">
                                            <button className="border-2 border-white flex text-white items-center bg-tback py-2 px-4 ">Discover Now <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg></button>
                                        </div>
                                    </div>
                                    <h3 className="mt-6 text-sm text-gray-500">
                                        <a href={callout.href}>
                                            <span className="absolute inset-0" />
                                            {callout.name}
                                        </a>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">{callout.description}</p>
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
