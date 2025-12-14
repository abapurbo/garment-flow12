import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import CustomerCard from "../../components/CustomerCard";
import SectionTitle from "../../components/SectionTitle";
import './customerSwiper.css';

export default function CustomerFeedback() {
  const feedbacks = [
    {
      name: "John Doe",
      designation: "CEO, Company A",
      user_photoURL: "https://randomuser.me/api/portraits/men/32.jpg",
      comment: "Great product and amazing support!"
    },
    {
      name: "Jane Smith",
      designation: "Marketing Head, Company B",
      user_photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
      comment: "Our team loves the features and usability."
    },
    {
      name: "Alice Johnson",
      designation: "Developer, Company C",
      user_photoURL: "https://randomuser.me/api/portraits/women/55.jpg",
      comment: "Highly recommend for anyone looking for quality."
    },
    {
      name: "Michael Brown",
      designation: "Project Manager, Company D",
      user_photoURL: "https://randomuser.me/api/portraits/men/66.jpg",
      comment: "Excellent customer service and easy to use."
    },
    {
      name: "Emma Wilson",
      designation: "Designer, Company E",
      user_photoURL: "https://randomuser.me/api/portraits/women/22.jpg",
      comment: "The UI is very intuitive and clean!"
    },
    {
      name: "David Lee",
      designation: "CTO, Company F",
      user_photoURL: "https://randomuser.me/api/portraits/men/11.jpg",
      comment: "A solid product that meets all our needs."
    }
  ];

  return (
    <section
      className="
        px-16 py-16
        bg-gray-50
        dark:bg-gradient-to-b
        dark:from-[#151826]
        dark:via-[#141728]
        dark:to-[#0F1220]
      "
    >
      {/* Section Title */}
      <SectionTitle
        title="What Our Clients Say"
        subtitle="Customer Feedback on Garments Order & Production Tracker System"
        description="Our clients trust us to streamline their garment production workflow. 
        Here's what they have to say about the platform's ease of use, 
        reliability, and efficiency in managing orders and production."
      />

      {/* Swiper Carousel */}
      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 20,
          stretch: "10%",
          depth: 200,
          modifier: 1,
          scale: 0.8,
          slideShadows: false
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        pagination={true}
        modules={[Autoplay, Pagination, EffectCoverflow]}
        className="my-swiper dark:text-[#E6E8F0]"
      >
        {feedbacks.map((card, index) => (
          <SwiperSlide key={index}>
            {/* Card will inherit dark styles */}
            <CustomerCard feedback={card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
