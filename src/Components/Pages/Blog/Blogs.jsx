import React from 'react'
import { Popover } from '@headlessui/react'
import {Link} from 'react-router-dom'
const navigation = {

    categories: [

        {
            id: 'Lifestyle',
            name: 'Lifestyle (3)',

        },
        {
            id: 'Shopping',
            name: 'Shopping (1)',

        },
        {
            id: 'Travel',
            name: 'Travel (1)',

        },
        {
            id: 'Hobies',
            name: 'Hobies (2)',

        },
        {
            id: 'Fashion',
            name: 'Fashion (3)',

        },
    ],
    blogs: [
        {
            id:1,
            date: 'Sep 22, 2020',
            img: 'https://vertexcables.com/wp-content/uploads/2020/07/blog-9.jpg',
            name: 'Cras ornare trisbtique elit.',
            categories: ['Shopping', 'Lifestyle'],
            shortdes: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.',

        },
        {
            id:2,
            date: 'Sep 21, 2020',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcgXg4wVf_V-69Dcl7c2NdlHUC0EPfHcyeledWC6ElPi2LJZFYsZ3PQt5_A4ibISiuEsw&usqp=CAU',
            name: 'Vivamus vestibulum ntulla ne cante.',
            categories: ['Lifestyle'],
            shortdes: 'Morbi purus libero, faucibus commodo quis, gravida id, est. Vestibulumvo lutpat, lacus a ultrices sagittis...',

        },
        {
            id:3,
            date: 'Sep 18, 2020',
            img: 'https://mailchamp.ru/wp-content/uploads/2020/09/Demo34_Blog_03.jpg',
            name: 'Utaliquam sollicitudsvin leo.',
            categories: ['Shopping', 'Lifestyle'],
            shortdes: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.',

        },
        {
            id:4,
            date: 'Sep 22, 2020',
            img: 'https://youmatter.world/app/uploads/sites/2/2019/11/travel-world.jpg',
            name: 'Fusce pellentesvque suscipit.',
            categories: ['Travel'],
            shortdes: 'Morbi purus libero, faucibus commodo quis, gravida id, est. Vestibulumvo lutpat, lacus a ultrices sagittis...',

        },
        {
            id:5,
            date: 'Sep 8, 2020',
            img: 'http://www.holysmithereens.com/wp-content/uploads/2019/02/The-Traveler-1024x683.jpg',
            name: 'Aenean dignissim pellente ssdvquefelis.',
            categories: ['Travel', "Hobies"],
            shortdes: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.',

        },
        {
            id:6,
            date: 'Sep 22, 2020',
            img: 'https://blog.editors.ca/wp-content/uploads/2014/06/2423286.jpg',
            name: 'Quisque volutbsbpat mattiseros.',
            categories: ['Hobies'],
            shortdes: 'Morbi purus libero, faucibus commodo quis, gravida id, est. Vestibulumvo lutpat, lacus a ultrices sagittis...',

        },
        {
            id:7,
            date: 'Sep 13, 2020',
            img: 'https://pushselectmagazine.com/wp-content/uploads/2020/08/Travel-Tips1.jpg',
            name: 'Utaliquam sollivscitudin leo.',
            categories: ['Travel'],
            shortdes: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.',

        },
        {
            id:6,
            date: 'Sep 20, 2020',
            img: 'https://img.freepik.com/free-photo/pretty-young-stylish-sexy-woman-pink-luxury-dress-summer-fashion-trend-chic-style-sunglasses-blue-studio-background-shopping-holding-paper-bags-talking-mobile-phone-shopaholic_285396-2957.jpg?size=626&ext=jpg',
            name: 'Quisque a lsvsectus',
            categories: ['Fashion'],
            shortdes: 'Morbi purus libero, faucibus commodo quis, gravida id, est. Vestibulumvo lutpat, lacus a ultrices sagittis...',

        },
    ]

}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Blogs = () => {
    return (
        <>
            <div>
                <div className="w-full h-40 flex justify-center items-center" style={{ background: '#f6f6f6' }}>
                    <h1 className="text-4xl text-blk-txt">Blog Section</h1>
                </div>
                <div className="h-8 flex items-center justify-center my-8 px-4">

                    <Popover.Group className="">
                        <div className="h-full flex items-center justify-center flex-wrap space-x-8">
                            {navigation.categories.map((category) => (
                                <Popover key={category.name} className="flex">
                                    {({ open }) => (
                                        <>
                                            <div className="relative flex py-1">
                                                <Popover.Button
                                                    className={classNames(
                                                        open
                                                            ? 'border-primary-txt pb-1 text-primary-txt font-light'
                                                            : 'border-transparent text-gray-700 font-light hover:text-gray-800',
                                                        'relative z-10 flex items-center transition-colors font-light ease-out duration-200 text-sm  border-b-2 -mb-px pt-px'
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
                <div className="grid grid-cols-1 gap-y-5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6 px-4">
                    {
                        navigation.blogs.map((blog, index) => (
                            <div key={index} className="text-center">
                                <img className="h-52 w-80 mx-auto lg:w-full" src={blog.img} alt="" />
                                <div className="p-2">
                                    <p className="text-ash text-sm text-center py-2">{blog.date} | 2 comments</p>
                                    <h1 className="font-bold text-xl"><Link className="hover:text-primary-txt" to={"/blog/" + blog.id}>{blog.name}</Link></h1>
                                    <p className="flex items-center text-ash text-sm py-2 justify-center gap-2">in {blog.categories.map(pd => <p>{pd} </p>)}</p>
                                    <p className="text-ash text-sm">{blog.shortdes}..</p>
                                </div>

                            </div>
                        ))
                    }

                </div>
            </div>

        </>
    )
}

export default Blogs
