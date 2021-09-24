import React from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { tabsClasses } from '@mui/material/Tabs';
import { useContext } from 'react';
import { RapperContent } from '../../../App';
import { useParams } from 'react-router';
import { products } from '../../../Data/Product';
const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    rating: 3.9,
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProductDetails = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { handleClick, handlewish, setWtoltip, setToltip } = useContext(RapperContent)
    const { KeyID } = useParams()
    const thisproduct = products.filter(pd => pd.id === parseInt(KeyID))
    const handleadtocart = (e)=>{
        handleClick(e)
        setToltip(true)
    }
    const handleallWish = (e)=>{
        handlewish(e)
        setWtoltip(true)
    }
    return (
        <>
            <div className="bg-white">
                <div className="pt-6 lg:grid lg:grid-cols-2 lg:gap-x-8 gap-1">
                    <div className="mt-6 sm:px-6 lg:px-8 grid grid-cols-3 px-3 gap-x-3 lg:grid lg:grid-cols-3 lg:gap-x-4">

                        <div className="grid grid-cols-1 gap-y-3 lg:grid lg:grid-cols-1  lg:gap-y-4">
                            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">

                                <img
                                    src={thisproduct[0].imageSrc}
                                    alt={product.images[1].alt}
                                    className="w-full h-48 object-center object-cover "

                                />
                            </div>
                            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">

                                <img
                                    src={thisproduct[0].imageSrc}
                                    alt={product.images[1].alt}
                                    className="w-full h-48 object-center object-cover "

                                />
                            </div>
                            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">

                                <img
                                    src={thisproduct[0].imageSrc}
                                    alt={product.images[1].alt}
                                    className="w-full h-48 object-center object-cover "

                                />
                            </div>


                        </div>
                        <div className="aspect-w-4 col-span-2 lg:col-span-2 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                            <img
                                src={thisproduct[0].imageSrc}
                                alt={product.images[3].alt}
                                className="w-full h-full object-center object-cover"
                            />
                        </div>

                    </div>

                    <div className="max-w-2xl px-3 mx-auto pt-10 pb-16 sm:px-6">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-normal tracking-tight text-blk-ash sm:text-3xl">{thisproduct[0].name}</h1>
                        </div>
                        <div className="mt-3">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                reviews.average > rating ? 'text-yellow-500' : 'text-ash',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <a href={reviews.href} className="ml-3 text-sm font-medium text-primary-txt hover:text-new">
                                    {reviews.totalCount} reviews
                                </a>
                            </div>
                        </div>
                        {/* Options */}
                        <div className="mt-3 lg:mt-0 lg:row-span-3">

                            <p className="text-2xl text-primary-txt">${thisproduct[0].price}</p>
                            <div>
                                <div className="space-y-6 mt-2">
                                    <p className="text-sm text-ash">Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu,</p>
                                </div>
                            </div>
                            <div className="w-52 mt-4 flex justify-between items-center">
                                <p>  Size:</p>
                                <select className="border border-ash text-sm w-36 py-2 px-1 text-ash">
                                    <option>Select A size</option>
                                    <option>Small</option>
                                    <option>Medium</option>
                                    <option>Large</option>
                                </select>
                            </div>
                            <div className="w-52 mt-2 flex justify-between items-center">
                                <p> Qty:</p>
                                <div className="flex items-center justify-between w-36 border border-ash py-2">
                                    <div className="flex justify-center items-center cursor-pointer w-10">+</div>
                                    <div className="flex justify-center items-center ">1</div>
                                    <div className="flex justify-center items-center cursor-pointer w-10">-</div>
                                </div>
                            </div>

                            <div className="mt-5 flex items-center flex-wrap md:flex-none justify-around">
                                {
                                    thisproduct[0].stock ?
                                        <button
                                        onClick={()=> handleadtocart(thisproduct[0])}
                                            className=" w-52 bg-primary-txt transition delay-100 border border-transparent rounded-md py-2 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-new">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Add to Cart
                                        </button>
                                        :
                                        <button
                                       
                                            className=" w-52 bg-primary-txt transition delay-100 border border-transparent rounded-md py-2 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-new" style={{cursor:'not-allowed'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Add to Cart
                                        </button>
                                       
                                }
                                <button
                                    onClick={(e)=> handleallWish(thisproduct[0])}
                                    className="w-52 bg-new transition delay-100 border border-transparent rounded-md py-2 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-primary-txt"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    Add To Wishlist
                                </button>

                            </div>
                            <div className="text-ash border-t border-border-clr mt-2 pt-2">
                                <p className="text-sm">Category: Coffee & Tables, Furniture, Tables</p>
                            </div>
                            <div className="flex items-center mt-4 gap-1 text-lg text-ash">
                                Share :
                                <div className="cursor-pointer hover:text-new"><AiFillFacebook /></div>
                                <div className="cursor-pointer hover:text-new"><AiFillTwitterSquare /></div>
                                <div className="cursor-pointer hover:text-new"><AiFillInstagram /></div>
                                <div className="cursor-pointer hover:text-new"><AiFillLinkedin /></div>
                            </div>

                        </div>


                    </div>
                </div>
                <div className="m-7">
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box >
                                <TabList onChange={handleChange} aria-label="lab API tabs example" centered variant="scrollable"
                                    scrollButtons
                                    sx={{
                                        [`& .${tabsClasses.scrollButtons}`]: {
                                            '&.Mui-disabled': { opacity: 0.3 },
                                        },
                                    }}>
                                    <Tab label="Description" value="1" />
                                    <Tab label="Additional Information" value="2" />
                                    <Tab label="Shipping & Returns" value="3" />
                                    <Tab label="Reviews (2)" value="4" />
                                </TabList>
                            </Box>
                            <div className="border">
                                <TabPanel value="1">
                                    <p className="text-sm">Product Information</p>
                                    <p className="text-xs text-ash py-1">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.</p>
                                    <ul className="list-disc py-2 px-3 text-ash text-xs">
                                        <li>Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit.</li>
                                        <li>Vivamus finibus vel mauris ut vehicula.</li>
                                        <li>Nullam a magna porttitor, dictum risus nec, faucibus sapien.</li>
                                    </ul>
                                    <p className="text-xs text-ash py-1">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.


                                    </p>
                                </TabPanel>
                                <TabPanel value="2">
                                    <p className="text-sm">Information</p>
                                    <p className="text-xs text-ash py-1">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.</p>
                                    <p className="text-sm py-2">Fabric & care</p>
                                    <p className="text-xs text-ash py-1">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.</p>
                                    <p className="text-sm py-2">Size</p>
                                    <p className="text-xs text-ash py-1">
                                        One size
                                    </p>

                                </TabPanel>
                                <TabPanel value="3">
                                    <p className="text-sm">Delivery & returns</p>
                                    <p className="text-xs text-ash py-1">
                                        We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our Delivery information </p>
                                    <p className="text-xs text-ash py-1">We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our Returns information</p>

                                </TabPanel>
                                <TabPanel value="4">
                                    <p className="text-sm font-semibold pb-3 gap-2">Reviews (2)</p>
                                    <div className="divide-y divide-border-clr">

                                        <div className="grid mb-1 pt-1 md:mb-3 md:pb-3 lg:mb-3 lg:pb-3 md:grid-cols-11 lg:grid-cols-10">
                                            <div className="md:col-span-2 lg:col-span-1">
                                                <p className="text-sm">John Doe</p>
                                                <div className="flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                product.rating > rating ? 'text-yellow-500' : 'text-ash',
                                                                'h-4 w-4 flex-shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-sm text-ash">3 days ago</p>
                                            </div>
                                            <div className="col-span-10 md:col-span-9 lg:col-span-9 lg:pl-4">
                                                <p className="text-blk-ash text-lg">Very good</p>
                                                <p className="text-xs text-ash">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid md:mt-3 md:pt-6 lg:mt-3 lg:pt-6 md:grid-cols-11 lg:grid-cols-10">
                                            <div className="md:col-span-2 lg:col-span-1">
                                                <p className="text-sm">John Doe</p>
                                                <div className="flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                product.rating > rating ? 'text-yellow-500' : 'text-ash',
                                                                'h-4 w-4 flex-shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-sm text-ash">3 days ago</p>
                                            </div>
                                            <div className="col-span-10 md:col-span-9 lg:col-span-9 lg:pl-4">
                                                <p className="text-blk-ash text-lg">Very good</p>
                                                <p className="text-xs text-ash">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold py-3 gap-2">Add a Review</p>
                                    <p className="text-ash text-xs py-2">Your email address will not be published. Required fields are marked *</p>
                                    <form className="w-full">
                                        <select name="" id="" className="w-48 text-sm text-ash my-2 border p-2 ouline-new">
                                            <option value="">Select Your Rating</option>
                                            <option value="">1</option>
                                            <option value="">2</option>
                                            <option value="">3</option>
                                            <option value="">4</option>
                                            <option value="">5</option>
                                        </select>
                                        <textarea className="w-full border outline-white p-2 text-sm" cols="30" rows="10" placeholder="Write Your Message" required />
                                        <div className="grid gap-3 grid-cols-2 my-2">
                                            <input type="text" className="border outline-white p-2 text-sm" placeholder="Name*" required />
                                            <input type="text" className="border outline-white p-2 text-sm" placeholder="Email*" required />
                                        </div>
                                        <input type="checkbox" className="mt-2" name="checkbox" id="" />
                                        <label htmlFor="checkbox" className="text-ash text-sm ml-2">Save my name, email, and website in this browser for the next time I comment.</label>
                                        <br />
                                        <input type="submit" className="px-5 mt-3 py-2 bg-primary-txt text-white transition delay-100 ease-linear hover:bg-new" value="Submit" />
                                    </form>
                                </TabPanel>
                            </div>
                        </TabContext>
                    </Box>
                </div>


            </div>
        </>
    )
}

export default ProductDetails
