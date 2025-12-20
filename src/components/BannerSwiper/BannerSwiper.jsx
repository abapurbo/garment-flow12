import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router';

export default function BannerSwiper() {
    return (
        <div >
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper "
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="relative w-full h-full md:h-[650px] bg-no-repeat bg-cover bg-center bg-[url('https://i.ibb.co/pj5sGYyD/sewing-machines-garment-factory-922936-22515.avif')]">

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>

                        {/* Left Side Content */}
                        <div className="absolute inset-0  flex justify-center items-center">
                            <div className="text-white max-w-3xl px-6 space-y-4 text-center mt-14 md:mt-0">

                                <h1 className="text-3xl md:text-5xl  font-bold">
                                    Biggest Garments Production <br />
                                    House in <span className="text-blue-400">Bangladesh</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-200">
                                    A fully modernized garments production and management platform designed
                                    to streamline orders, monitor real-time production, track inventory,
                                    and ensure global-quality output with maximum efficiency.
                                </p>

                                <button className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition">
                                    Explore More
                                </button>

                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="relative w-full h-full  md:h-[650px] bg-no-repeat bg-cover md:bg-center  bg-[url('https://i.ibb.co/nq5cVjcW/industrial-sewing-machine-stitching-purple-fabric-factory-textile-production-garment-making-visible.webp')]">
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
                        {/* Left Side Content */}
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="text-white max-w-3xl px-6 space-y-4 text-center mt-14 md:mt-0">

                                <h1 className="text-3xl md:text-5xl font-bold">
                                    Seamlessly Track and Manage <br />
                                    All Garment Orders in <span className="text-blue-400">Bangladesh</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-200">
                                    A modern, user-friendly platform designed to streamline orders, monitor every stage of production, manage inventory efficiently, and ensure timely delivery with maximum quality.
                                </p>

                                <Link to='/all-products'>
                                    <button className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition">
                                        View Products
                                    </button>
                                </Link>

                            </div>
                        </div>

                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="relative w-full h-full  md:h-[650px] bg-no-repeat bg-cover bg-center bg-[url('https://i.ibb.co/MxVLZsbP/11062b-943ac8a2ed574e4f9d2481ce75d66f65-mv2.avif')]">
                        {/* Dark Overlay */}
                        <div className="absolute inset-0  bg-black/60 dark:bg-black/70"></div>
                        <div className="absolute inset-0  flex justify-center items-center">
                            <div className="text-white max-w-3xl px-6 space-y-4 text-center mt-14 md:mt-0">

                                <h1 className="text-3xl md:text-5xl font-bold">
                                    Modern Garment Production <br />
                                    & Order Tracking in <span className="text-blue-400">Bangladesh</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-200">
                                    Streamline your garment business with real-time order tracking, production monitoring, inventory management, and on-time delivery using our efficient, all-in-one platform.
                                </p>

                                <button className="mt-4 px-12 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition">
                                    Get Start
                                </button>

                            </div>
                        </div>

                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
}
