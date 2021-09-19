import React from 'react'
import { Link } from 'react-router-dom'
import { RiFacebookCircleFill } from 'react-icons/ri'
import {AiFillInstagram, AiFillTwitterCircle} from 'react-icons/ai'
const Footer = () => {
  return (
    <div>
      <footer class="footer-1  flex items-center justify-center bg-gray-100 py-8 sm:py-12">
        <div class="container mx-auto px-4">
          <div class="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
            <div class="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6">
              <h5 class="text-xl font-bold mb-6">Features</h5>
              <ul class="list-none footer-links">
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Cool stuff</Link>
                </li>
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Random feature</Link>
                </li>
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Team feature</Link>
                </li>
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Stuff for developers</Link>
                </li>
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Another one</Link>
                </li>
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Last time</Link>
                </li>
              </ul>
            </div>
            <div class="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 sm:mt-0">
              <h5 class="text-xl font-bold mb-6">Resources</h5>
              <ul class="list-none footer-links">
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Resource</Link>
                </li>
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Resource name</Link>
                </li>
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Another resource</Link>
                </li>
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Final resource</Link>
                </li>
              </ul>
            </div>
            <div class="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
              <h5 class="text-xl font-bold mb-6">About</h5>
              <ul class="list-none footer-links">
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Team</Link>
                </li>
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Locations</Link>
                </li>
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Privacy</Link>
                </li>
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Terms</Link>
                </li>
              </ul>
            </div>
            <div class="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
              <h5 class="text-xl font-bold mb-6">Help</h5>
              <ul class="list-none footer-links">
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Support</Link>
                </li>
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Help Center</Link>
                </li>
                <li class="mb-2">
                  <Link href="#" class="border-b border-solid border-transparent hover:text-primary-txt ">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div class="px-4 mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto">
              <h5 class="text-xl font-bold mb-6 sm:text-center xl:text-left">Stay connected</h5>
              <div class="flex sm:justify-center xl:justify-start">
                <h1 className="text-3xl mr-2 cursor-pointer"> <RiFacebookCircleFill /></h1>
                <h1 className="text-3xl mr-2 cursor-pointer"> <AiFillInstagram /></h1>
                <h1 className="text-3xl cursor-pointer"> <AiFillTwitterCircle /></h1>
              </div>
            </div>
          </div>

          <div class="sm:flex sm:flex-wrap sm:-mx-4 mt-6 pt-6 sm:mt-12 sm:pt-12 border-t border-border-clr">
            <div class="sm:w-full px-4 md:w-1/6">
              <strong>FWR</strong>
            </div>
            <div class="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
              <h6 class="font-bold mb-2">Address</h6>
              <address class="not-italic mb-4 text-sm">
                123 6th St.<br />
                Melbourne, FL 32904
              </address>
            </div>
            <div class="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
              <h6 class="font-bold mb-2">Free Resources</h6>
              <p class="mb-4 text-sm">Use our HTML blocks for <strong>FREE</strong>.<br />
                <em>All are MIT License</em></p>
            </div>
            <div class="px-4 md:w-1/4 md:ml-auto mt-6 sm:mt-4 md:mt-0">
              <button class="px-4 py-2 transition delay-300 ease-linear bg-primary-txt hover:bg-blk-txt rounded text-white">Get Started</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
