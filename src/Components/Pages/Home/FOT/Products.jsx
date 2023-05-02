import React from 'react'

import Product from './Product'
import './product.css'
import { URI } from '../../../../App'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Products = () => {
    // const TrendyProduct = products.slice(0, 4)
    const [allProducts, setAllProducts] = useState([])
    useEffect(() => {
      var config = {
        method: "get",
        url: `${URI}/api/v1/products?size=0&new=true`,
     
      };
      axios(config)
        .then(function (response) {
        setAllProducts(response.data?.products?.slice(0,4));
        })
        .catch(function (error) {
          console.log(error);
        });
    
    
    }, []);
    return (
        <>
      
            <div className="bg-white">
                <div className="max-w-2xl relative mx-auto px-4 sm:py-12
                 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-4xl font-medium text-center pb-5 tracking-tight text-blk-txt">New Arrivals</h1>
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">



                        {allProducts.map((product) => <Product product={product} key={product._id} />)}

                    </div>

                </div>
            </div>
        </>
    )
}

export default Products
