import React from "react";
import loading from '../assets/lottie/loading.json'
import Lottie from "lottie-react";
export default function Loading() {
    return (
        <div className="min-h-screen  flex flex-col justify-center items-center ">
            <div className="w-[400px]">
                <Lottie animationData={loading} loop={true} />
            </div>
        </div>
    )
}
