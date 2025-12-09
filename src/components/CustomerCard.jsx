import React from "react";

export default function TestimonialCard({ feedback }) {
    const { user_photoURL, comment, name, designation } = feedback
    return (
        <div className="w-96 bg-white shadow-2xl rounded-2xl p-6">
            {/* Quote Icon */}
            <div className="text-green-700 text-4xl mb-3">&ldquo;</div>

            {/* Message */}
            <p className="text-gray-700 text-center mb-6">
               {comment}
            </p>

            {/* Divider */}
            <div className="border-t border-dashed border-[#0F4C49] mb-4"></div>

            {/* Profile */}
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 bg-[#0F4C49] rounded-full">
                    <img className="rounded-full" src={user_photoURL} alt="" />
                </div>

                <div>
                    <h3 className="text-[#0D1F23] font-bold text-lg">Awlad Hossin</h3>
                    <p className="text-gray-500 text-sm">Senior Product Designer</p>
                </div>
            </div>
        </div>
    );
}
