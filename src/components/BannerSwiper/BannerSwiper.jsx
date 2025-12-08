import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
export default function BannerSwiper() {
    return <div className='container mx-auto'>
        <Swiper
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className="relative w-full h-[500px] md:h-[650px] bg-no-repeat bg-cover bg-center bg-[url('https://i.ibb.co.com/pj5sGYyD/sewing-machines-garment-factory-922936-22515.avif')]">

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/60"></div>

                    {/* Left Side Content */}
                    <div className="absolute  inset-0 flex justify-center items-center">
                        <div className="text-white max-w-3xl  px-6 space-y-4">

                            <h1 className="text-3xl md:text-5xl font-bold ">
                                <span className="">Biggest Garments Production</span>
                                <span> House in  <span className=" text-blue-400">Bangladesh</span></span>
                                
                            </h1>

                            {/* Subtitle / Log Description */}
                            <p className="text-lg md:text-xl text-gray-200">
                                A fully modernized garments production and management platform designed
                                to streamline orders, monitor real-time production, track inventory,
                                and ensure global-quality output with maximum efficiency.
                            </p>

                            {/* CTA Button */}
                            <button className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition">
                                Explore More
                            </button>

                        </div>
                    </div>

                </div>
            </SwiperSlide>


            <SwiperSlide>
                <div className="relative w-full h-full bg-no-repeat bg-cover bg-center bg-[url('https://i.ibb.co.com/wN6pZy3z/sewing-line-layout-3.jpg')]">
                    {/* Black Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="relative w-full h-full bg-no-repeat bg-cover bg-center bg-[url('https://i.ibb.co.com/xtdt1gLD/1710944496267.png')]">
                    {/* Black Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
            </SwiperSlide>

        </Swiper>
    </div>;
}
