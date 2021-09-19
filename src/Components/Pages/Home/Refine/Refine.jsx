import React from 'react'
import { products } from '../../../../Data/Product'
import Product from '../FOT/Product'
const Refine = () => {
    const refine = products.slice(1, 3)
    return (
        <>
            <div className="grid lg:grid-cols-3 p-10 refine justify-between md:grid-cols-4 sm:grid-cols-4" >
                <div className="col-span-2">
                    <h6 className="text-center mb-2 text-new">Special</h6>
                    <h1 className="text-center mb-2 text-blk-txt font-medium text-4xl">Refine Your Style</h1>
                    <p className="text-center">Get on our exclusive email list and be the first to hear about sales, coupons, new arrivals and more!</p>
                    <div className="grid grid-cols-2 gap-4 mx-3 my-3 ">
                        {refine.map(pd=> <Product product={pd} key={pd.id}/>)}
                    </div>
                </div>
                <div className="realtive" style={{ height: '100%' }} >
                    <img style={{ height: '500px', width:'100%'}} src="https://i.pinimg.com/736x/a4/c4/d9/a4c4d988423d9a550d115cdf35d533f7.jpg" alt="" />
                    <div className="absolute top-0">
                        <h2>Causual Basics And 
                            <br />
                            Trendy Key Pieces
                        </h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Refine
