import React from "react";
import { Link } from "react-router";

const AboutUs = () => {
    const teamMembers = [
        { name: "John Doe", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1603415526960-f7e0328a17d1?auto=format&fit=crop&w=400&q=80" },
        { name: "Jane Smith", role: "Product Manager", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80" },
        { name: "Mike Johnson", role: "Lead Developer", img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a7?auto=format&fit=crop&w=400&q=80" },
    ];

    const faqs = [
        { question: "How do I track my order?", answer: "Once an order is placed, you can track it from the 'My Orders' dashboard section." },
        { question: "Can I manage multiple factories?", answer: "Yes, the platform allows you to manage multiple factories from a single dashboard." },
        { question: "What payment options are available?", answer: "We support Cash on Delivery and online payment through Stripe/PayFast." },
    ];

    const blogPosts = [
        { title: "Top 5 Tips to Manage Garment Production Efficiently", img: "https://images.unsplash.com/photo-1581093588401-9f2d2ff7c7d5?auto=format&fit=crop&w=400&q=80" },
        { title: "How Technology is Transforming the Textile Industry", img: "https://images.unsplash.com/photo-1611599536221-19d3d0d2e8bb?auto=format&fit=crop&w=400&q=80" },
        { title: "Best Practices for Inventory Management in Garments", img: "https://images.unsplash.com/photo-1611605690611-80b14c2232f6?auto=format&fit=crop&w=400&q=80" },
    ];

    return (
        <div className="font-urbanist">

            {/* Hero Section */}
            <section className="relative pt-32 md:pt-36 pb-20 px-6 md:px-12 bg-cover bg-center"
                style={{ backgroundImage: "url('https://i.ibb.co/nq5cVjcW/industrial-sewing-machine-stitching-purple-fabric-factory-textile-production-garment-making-visible.webp')" }}>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative max-w-4xl mx-auto text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">About GarmentFlow</h1>
                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto drop-shadow-sm">
                        Simplifying garment production workflow with smart order tracking, inventory management, and timely delivery.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all">
                        <Link to='/all-products'>
                            View Products
                        </Link>
                    </button>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="py-16 px-6 md:px-12 bg-gray-50">
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    {[
                        { title: "Our Mission", desc: "Simplify production workflow and ensure accurate, timely delivery for garment factories.", img: "https://i.ibb.co/DDLp4nvm/images-2.png" },
                        { title: "Our Vision", desc: "Become the most trusted platform for garment production management worldwide.", img: "https://images.unsplash.com/photo-1600372800842-5ebf59fa16b3?auto=format&fit=crop&w=400&q=80" },
                        { title: "Our Values", desc: "Integrity, Innovation, and Customer Satisfaction in every step of our service.", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80" },
                    ].map((item, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-3xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                            <img src={item.img} alt={item.title} className="w-20 h-20 mx-auto mb-4 rounded-full" />
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-6 md:px-12 bg-white">
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Meet Our Team</h2>
                    <p className="text-gray-600 mt-2">Dedicated professionals ensuring seamless operations.</p>
                </div>
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-gray-50 rounded-3xl shadow-lg p-6 text-center hover:shadow-2xl transition-all transform hover:-translate-y-1">
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-600">
                                <img src={member.img} alt={member.name} className="object-cover w-full h-full" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-6 md:px-12 bg-gray-50">
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Frequently Asked Questions</h2>
                </div>
                <div className="max-w-5xl mx-auto space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all">
                            <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-16 px-6 md:px-12 bg-white">
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Latest Blogs</h2>
                </div>
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                    {blogPosts.map((blog, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
                            <img src={blog.img} alt={blog.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                            <h4 className="font-semibold text-gray-800 mb-2">{blog.title}</h4>
                            <button className="text-blue-600 hover:text-blue-800 font-semibold">Read More</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 px-6 md:px-12 text-center bg-blue-600 text-white">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
                    Ready to Optimize Your Production?
                </h2>
                <p className="mb-6 drop-shadow-sm">
                    Join GarmentFlow today and simplify your garment production workflow.
                </p>
                <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition-all">
                    <Link to='/all-products'>
                        View Products
                    </Link>
                </button>
            </section>
        </div>
    );
};

export default AboutUs;
