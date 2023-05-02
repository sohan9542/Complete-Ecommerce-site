import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { RapperContent } from '../../../App'

const Addproduct = ({ product }) => {
    const { added_products, handleRemvoe } = useContext(RapperContent)
    const quantity = added_products.filter(pd => pd.name === product.name)
    
    return (
        <>
            <li key={product._id} className="py-6 flex">
                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md ">
                    <img
                        src={product?.image}
                        alt={product?.images}
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
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                        <p className="text-gray-500">Quantity: {product.quantity}</p>

                        <div className="flex">
                            <button onClick={()=> handleRemvoe(product)} type="button" className="font-medium text-primary-txt hover:text-new">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}

export default Addproduct
