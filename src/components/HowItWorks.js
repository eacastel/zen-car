//src/components/HowItWorks.js
import React from "react";
import { Link } from "gatsby"
import { motion } from "framer-motion";


export default function HowItWorks() {
    const steps = [
        {
            step: '1',
            title: 'Start Your Zen Experience',
            desc: (
                <>
                    Choose a service package or book a quick intro call to learn more.
                </>
            )
        },
        {
            step: '2',
            title: 'Receive Expert Recommendations',
            desc: 'We select your ideal vehicle based on your needs not the dealer\'s.',
        },
        {
            step: '3',
            title: 'Review Curated Inventory',
            desc: 'We source the best available listings nationwide, verify them and present them to you with key details.',
        },
        {
            step: '4',
            title: 'Enjoy Purchase & Delivery Support',
            desc: 'We negotiate, coordinate paperwork and set up delivery so you can buy with confidence and ease.',
        },
    ];

    return (
        <section className="bg-primary text-white py-20" aria-labelledby="how-it-works">
            <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px]">
                <h2 id="how-it-works" className="text-4xl font-medium text-center text-white mb-2">Our Proven 4-Step Process</h2>
                <h3 id="how-it-works" className="text-2xl font-medium text-center text-white mb-12">
                    How We Save You <span className="text-white">Time, Money and Stress</span>
                </h3>

                <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-12">
                    {steps.map((step) => (
                        <Link
                            key={step.step}
                            to="/services/"
                            className="block text-inherit no-underline"
                            aria-label={`Learn more about step ${step.step}`}
                        >
                            <motion.div
                                className="text-center p-6 bg-white/10 rounded-lg shadow-lg border-primary border-2 hover:shadow-xl transition-shadow duration-300 h-full"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-4xl font-bold text-accent bg-primary px-5 py-2 inline-block rounded-full mb-3">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-200">{step.desc}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
