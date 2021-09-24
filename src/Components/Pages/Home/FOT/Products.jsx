import React from 'react'
import { products } from '../../../../Data/Product'
import Product from './Product'
import './product.css'

const Products = () => {
    const TrendyProduct = products.slice(0, 4)
   
    return (
        <>
      
            <div className="bg-white">
                <div className="max-w-2xl relative mx-auto px-4 sm:py-12
                 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-4xl font-medium text-center pb-5 tracking-tight text-blk-txt">Trendy Products</h1>
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">



                        {TrendyProduct.map((product) => <Product product={product} key={product.id} />)}

                    </div>

                </div>
            </div>
        </>
    )
}

export default Products
