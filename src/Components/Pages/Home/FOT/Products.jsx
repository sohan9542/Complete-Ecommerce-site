import React, { useContext } from 'react'
import { RapperContent } from '../../../../App'
import { products } from '../../../../Data/Product'
import Product from './Product'
import './product.css'
const Products = () => {
    const TrendyProduct = products.slice(0, 4)
    const { setToltip, toltip, wtoltip, setWtoltip } = useContext(RapperContent)
    if (toltip) {
        setTimeout(() => {
            setToltip(false)
        }, 1000);
    }
    if (wtoltip) {
        setTimeout(() => {
            setWtoltip(false)
        }, 1000);
    }
    return (
        <>
            <div className="bg-white">
                <div className="max-w-2xl relative mx-auto px-4 sm:py-12
                 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-4xl font-medium text-center pb-5 tracking-tight text-blk-txt">Trendy Products</h1>
                    <div class="flex w-70 top-56 z-20 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800" style={toltip ? { position: 'fixed', right: '0px', transition: '.3s ease' } : { position: 'fixed', right: '-250px', transition: '.3s ease' }}>
                        <div class="flex items-center justify-center w-12 bg-new">
                            <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                            </svg>
                        </div>

                        <div class="px-2 py-3 -mx-3">
                            <div class="mx-3">
                                <span class="font-semibold text-new ">Product added to Cart</span>

                            </div>
                        </div>
                    </div>
                    <div class="flex w-70 top-56 z-20 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800" style={wtoltip ? { position: 'fixed', right: '0px', transition: '.3s ease' } : { position: 'fixed', right: '-250px', transition: '.3s ease' }}>
                        <div class="flex items-center justify-center w-12 bg-primary-txt">
                            <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                            </svg>
                        </div>

                        <div class="px-2 py-3 -mx-3">
                            <div class="mx-3">
                                <span class="font-semibold text-primary-txt ">Added to WishList</span>

                            </div>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">



                        {TrendyProduct.map((product) => <Product product={product} key={product.id} />)}

                    </div>

                </div>
            </div>
        </>
    )
}

export default Products
