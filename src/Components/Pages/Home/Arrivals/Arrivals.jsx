import React from 'react'
import { products } from '../../../../Data/Product'
import Product from '../FOT/Product'
import { useState } from 'react'
import { Popover} from '@headlessui/react'
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
    const [filterProduct, setFilterProduct] = useState(products)
    const handle__Arriaval__filter = (e)=>{
        const fproduct = products.filter(pd=> pd.category === e || pd.for === e)
        setFilterProduct(fproduct)
    }
    return (
        <>
            <div className="bg-white">``
                <div className="max-w-2xl mx-auto px-5 sm:py-12
                 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-4xl font-medium text-center pb-2 tracking-tight text-blk-txt">New Arrivals</h1>
                    <div className="bg-white">


                        <header className="relative bg-white">

                            <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div >
                                    <div className="h-8 flex items-center justify-center">

                                        <Popover.Group className="">
                                            <div className="h-full flex space-x-8">
                                                {navigation.categories.map((category) => (
                                                    <Popover key={category.name} className="flex">
                                                        {({ open }) => (
                                                            <>
                                                                <div className="relative flex" onClick={(e)=>handle__Arriaval__filter(category.id)}>
                                                                    <Popover.Button
                                                                        className={classNames(
                                                                            open
                                                                                ? 'border-new text-new text-lg'
                                                                                : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                            'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                                                                        )}
                                                                    >
                                                                        {category.name}
                                                                    </Popover.Button>
                                                                </div>


                                                            </>
                                                        )}
                                                    </Popover>
                                                ))}
                                            </div>
                                        </Popover.Group>
                                    </div>
                                </div>
                            </nav>
                        </header>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-4 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-6">
                        {
                            filterProduct.map((product) => <Product product={product} key={product.id} />)
                        }
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="text-center my-4 bg-new text-white px-3 ease-linear rounded py-2 transition delay-100 hover:bg-primary-txt">Load More</button>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Arrivals
