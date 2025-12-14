import React from "react";

export default function TestimonialCard({ feedback }) {
  const { user_photoURL, comment, name, designation } = feedback;

  return (
    <div
      className="
        w-96 p-6 rounded-2xl
        bg-white dark:bg-[#1C1F2A]
        border border-transparent dark:border-[#2B2F3E]
        shadow-2xl dark:shadow-[0_12px_30px_rgba(0,0,0,0.6)]
        transition-all duration-500
      "
    >
      {/* Quote Icon */}
      <div className="text-green-700 dark:text-[#6FA3FF] text-4xl mb-3">
        &ldquo;
      </div>

      {/* Message */}
      <p className="text-gray-700 dark:text-[#B5BBC9] text-center mb-6">
        {comment}
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-[#0F4C49] dark:border-[#2B2F3E] mb-4"></div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 bg-[#0F4C49] dark:bg-[#2B6FFF] rounded-full overflow-hidden">
          <img className="rounded-full w-full h-full object-cover" src={user_photoURL} alt="" />
        </div>

        <div>
          <h3 className="text-[#0D1F23] dark:text-[#E6E8F0] font-bold text-lg">
            {name}
          </h3>
          <p className="text-gray-500 dark:text-[#9AA3B2] text-sm">
            {designation}
          </p>
        </div>
      </div>
    </div>
  );
}
