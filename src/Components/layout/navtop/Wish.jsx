import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { RapperContent } from '../../../App'

const Wish = ({ product }) => {
    const { handleClick, wishRemvoe } = useContext(RapperContent)
    return (
        <>
            <li key={product.id} className="py-6 flex">
                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md ">
                    <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="w-full h-full object-center object-cover"
                    />
                </div>

                <div className="ml-4 flex-1 flex flex-col">
                    <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                                <Link href={product.href}>{product.name}</Link>
                            </h3>
                            <p className="ml-4">${product.price}</p>
                        </div>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      {
                          product.stock ? 
                          <p onClick={() => handleClick(product)} className="bg-primary-txt px-2 py-1 text-white transition delay-150 ease-in cursor-pointer rounded hover:bg-new ">Add To Cart</p>
                          :
                          <p className="bg-primary-txt px-2 py-1 text-white transition delay-150 ease-in cursor-pointer rounded hover:bg-new " style={{cursor:'not-allowed'}}>Add To Cart</p>
                      }
                        <div className="flex">
                            <button onClick={() => wishRemvoe(product)} type="button" className="font-medium text-primary-txt hover:text-new">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}

export default Wish
