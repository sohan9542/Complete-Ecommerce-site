import React from 'react'
import Arrivals from './Arrivals/Arrivals'
import Products from './FOT/Products'
import Hero from './Hero/Hero'
import Cvedio from './newCollection/Cvedio'
import Shopnow from './ShopNow/Shopnow'

const Home = () => {
    return (
        <>
            <Hero />
          
            <Shopnow />
            <Products />
            <Cvedio />
           <Arrivals />
        </>
    )
}

export default Home
