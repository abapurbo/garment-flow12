import React, { use } from "react";
import BrandCard from '../../components/BrandCard'
import SectionTitle from '../../components/SectionTitle'
import Marquee from "react-fast-marquee";
const productBrands = fetch('/brands.json').then(res => res.json())

const ProductsBrandsSection = () => {
  const brands = use(productBrands)


  return (
    <section className="py-12  px-6 md:px-12">
      {/* Section Title */}
      <SectionTitle
        title="Our Partner Brands"
        subtitle="Brands Collaborating with GarmentFlow Products"
        description="These trusted brands work alongside us to ensure quality, style, and timely delivery for all our products."
      />

      {/* Brands Grid */}
      <div>
        <Marquee
          pauseOnHover={true}
          loop={0}
          gradient={true}
          speed={80}
        >
          <div className="flex items-center py-4">
            {brands.map((brand, idx) => (
              <BrandCard key={idx} brand={brand} />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default ProductsBrandsSection;
