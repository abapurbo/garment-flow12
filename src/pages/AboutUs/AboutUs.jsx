import React from "react";
import { Link } from "react-router";

const AboutUs = () => {
    const teamMembers = [
        { name: "John Doe", role: "CEO & Founder", img: "https://i.ibb.co.com/nMCR4Rfz/download.jpg" },
        { name: "Jane Smith", role: "Product Manager", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80" },
        { name: "Mike Johnson", role: "Lead Developer", img: "https://i.ibb.co.com/vCLjY18x/images-9.jpg" },
    ];

    const faqs = [
        { question: "How do I track my order?", answer: "Once an order is placed, you can track it from the 'My Orders' dashboard section." },
        { question: "Can I manage multiple factories?", answer: "Yes, the platform allows you to manage multiple factories from a single dashboard." },
        { question: "What payment options are available?", answer: "We support Cash on Delivery and online payment through Stripe/PayFast." },
    ];

    const blogPosts = [
        { title: "Top 5 Tips to Manage Garment Production Efficiently", img: "https://i.ibb.co.com/JFsn48kg/images-10.jpg" },
        { title: "How Technology is Transforming the Textile Industry", img: "https://i.ibb.co.com/tPmH55x1/Untitled-design-2.jpg" },
        { title: "Best Practices for Inventory Management in Garments", img: "https://i.ibb.co.com/jk5W0hp0/apparel-inventory-management-movement.webp" },
    ];

    return (
        <div className="font-urbanist bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

            {/* Hero Section */}
            <section
                className="relative pt-32 md:pt-36 pb-20 px-6 md:px-12 bg-cover bg-center"
                style={{ backgroundImage: "url('https://i.ibb.co/nq5cVjcW/industrial-sewing-machine-stitching-purple-fabric-factory-textile-production-garment-making-visible.webp')" }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative max-w-4xl mx-auto text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                        About GarmentFlow
                    </h1>
                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto drop-shadow-sm">
                        Simplifying garment production workflow with smart order tracking, inventory management, and timely delivery.
                    </p>
                    <Link
                        to='/all-products'
                        className="inline-block bg-purple-600 hover:bg-purple-700 font-semibold py-3 px-8 rounded-full shadow-lg transition-all"
                    >
                        View Products
                    </Link>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    {[
                        { title: "Our Mission", desc: "Simplify production workflow and ensure accurate, timely delivery for garment factories.", img: "https://i.ibb.co.com/Qz8yQxc/295-2958085-our-mission-our-mission-icon-png-removebg-preview.png" },
                        { title: "Our Vision", desc: "Become the most trusted platform for garment production management worldwide.", img: "https://i.ibb.co.com/KcLCXDLd/images-3-removebg-preview.png" },
                        { title: "Our Values", desc: "Integrity, Innovation, and Customer Satisfaction in every step of our service.", img: "https://i.ibb.co.com/SXLbGy7d/372-3729171-core-values-respect-icon-core-values-removebg-preview.png" },
                    ].map((item, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                            <img src={item.img} alt={item.title} className="w-20 object-center mx-auto mb-4 rounded-full" />
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Meet Our Team</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Dedicated professionals ensuring seamless operations.</p>
                </div>
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 text-center hover:shadow-2xl transition-all transform hover:-translate-y-1">
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-600">
                                <img src={member.img} alt={member.name} className="object-cover w-full h-full" />
                            </div>
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-gray-500 dark:text-gray-300">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
                </div>
                <div className="max-w-5xl mx-auto space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all">
                            <h4 className="font-semibold mb-2">{faq.question}</h4>
                            <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Latest Blogs</h2>
                </div>
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                    {blogPosts.map((blog, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
                            <img src={blog.img} alt={blog.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                            <h4 className="font-semibold mb-2">{blog.title}</h4>
                            <button className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold">
                                Read More
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-6 md:px-12 text-center bg-gray-200 dark:bg-gray-800 dark:text-white text-black">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
                    Ready to Optimize Your Production?
                </h2>
                <p className="text-lg md:text-xl mb-8 drop-shadow-sm max-w-2xl mx-auto">
                    Join GarmentFlow today and simplify your garment production workflow with smart order tracking and efficient management.
                </p>
                <Link
                    to='/all-products'
                    className="inline-block bg-purple-600 text-white dark:hover:bg-gray-200 font-bold py-2 px-10 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                    View Products
                </Link>
            </section>


        </div>
    );
};

export default AboutUs;
