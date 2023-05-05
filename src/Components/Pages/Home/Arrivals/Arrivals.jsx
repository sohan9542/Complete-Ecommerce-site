import React, {useEffect, useState} from 'react'

import Product from '../FOT/Product'

import { URI } from '../../../../App'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'

const navigation = {
    
    categories: [

        {
            id: 'women',
            name: 'Women',

        },
        {
            id: 'men',
            name: 'Men',

        },
        {
            id: 'cloth',
            name: 'Clothes',

        },
        {
            id: 'shoes',
            name: 'Shoes',

        },
    ],

}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const Arrivals = () => {
  


    const [allProducts, setAllProducts] = useState([])
    const [bakhoors, setBakhoors] = useState([])
    useEffect(() => {
      var config = {
        method: "get",
        url: `${URI}/api/v1/products?size=0&perfume=true`,
     
      };
      axios(config)
        .then(function (response) {
        setAllProducts(response.data?.products);
        })
        .catch(function (error) {
          console.log(error);
        });



      var config2= {
        method: "get",
        url: `${URI}/api/v1/products?size=0&bakhoor=true`,
     
      };


      axios(config2)
        .then(function (response) {
            setBakhoors(response.data?.products);
        })
        .catch(function (error) {
          console.log(error);
        });
    
    
    }, []);
    return (
        <>
            <div className="bg-white">``
                <div className="max-w-2xl mx-auto px-5 sm:py-12
                 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-4xl font-medium text-center pb-2 tracking-tight text-blk-txt">Top Perfumes</h1>
                
                    <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
                        {
                            allProducts.map((product) => <Product product={product} key={product.id} />)
                        }
                    </div>
                    <div className="flex justify-center items-center">
                        <Link to="/perfume" className="text-center my-4 bg-new text-white px-3 ease-linear rounded py-2 transition delay-100 hover:bg-primary-txt">Load More</Link>
                    </div>
                </div>

            </div>
            <div className="bg-white">``
                <div className="max-w-2xl mx-auto px-5 sm:py-12
                 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-4xl font-medium text-center pb-2 tracking-tight text-blk-txt">Top Bakhoors</h1>
                
                    <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
                        {
                            bakhoors.map((product) => <Product product={product} key={product.id} />)
                        }
                    </div>
                    <div className="flex justify-center items-center">
                        <Link to="/bakhoor" className="text-center my-4 bg-new text-white px-3 ease-linear rounded py-2 transition delay-100 hover:bg-primary-txt">Load More</Link>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Arrivals
