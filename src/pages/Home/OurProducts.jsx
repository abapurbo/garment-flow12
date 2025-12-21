import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../../components/SectionTitle";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router";
import Loading from "../../components/Loading";
import useFetchProducts from "../../hooks/useFetchPrdoucts";
import "../../components/NavbarStyles.css";

/* Animation Variants */
const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const OurProducts = () => {
  const { allProducts, isLoading } = useFetchProducts();

  return (
    <section
      className="
        products-container
        py-12 lg:px-16 md:px-10 px-6
        bg-white
        dark:bg-gradient-to-b
        dark:from-[#151826]
        dark:via-[#141728]
        dark:to-[#0F1220]
      "
    >
      {/* Section Title */}
      <motion.div
        variants={itemVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <SectionTitle
          title="Our Products"
          subtitle="Check out our newest arrivals – stylish, high-quality products crafted for modern living."
          description="Explore our diverse range of garments designed to meet your fashion needs with quality and style."
        />
      </motion.div>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6 container mx-auto lg:px-10"
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {isLoading ? (
          <div className="col-span-3">
            <Loading />
          </div>
        ) : allProducts.length === 0 ? (
          <div className="col-span-3 text-center">
            <h1 className="text-2xl font-semibold py-20 text-blue-500 dark:text-purple-600">
              No Products Found
            </h1>
          </div>
        ) : (
          allProducts.map((card) => (
            <motion.div key={card._id} variants={itemVariant}>
              <ProductCard card={card} />
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Button */}
      <motion.div
        variants={itemVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Link to="/all-products">
          <button
            className="
              mt-10 mx-auto block cursor-pointer
              border border-blue-500 text-blue-500
              hover:bg-blue-700 hover:text-white
              dark:border-[#2B6FFF] dark:text-[#6FA3FF]
              dark:hover:bg-[#2B6FFF] dark:hover:text-white
              font-semibold py-2 px-8 rounded-full
              shadow-lg hover:shadow-xl transition-all duration-300
            "
          >
            All Products
          </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default OurProducts;
