//src/components/HowItWorks.js

import React from "react";
import { motion } from "framer-motion";
import { openCalendlyPopup } from "../../utils/openCalendly"; // ✅ Import your Calendly popup utility

export default function HowItWorks() {
    const steps = [
        {
            step: '1',
            title: 'Schedule Consultation',
            desc: (
                <>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            openCalendlyPopup();
                        }}
                        className="text-gray-200 underline focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-label="Schedule a free 15-minute consultation. Talk with a Zen Guide to define your ideal used car and budget"
                    >
                        Book your free 15-minute call
                    </button>{" "}
                    to define your ideal used car and budget.
                </>
            )
        },
        {
            step: '2',
            title: 'Get Recommendations',
            desc: 'Receive a tailored proposal with ideal vehicles, trims, and years.',
        },
        {
            step: '3',
            title: 'Review Inventory',
            desc: 'We locate and provide the best vehicles matching your recommendation.',
        },
        {
            step: '4',
            title: 'Purchase Assistance',
            desc: 'Let your Zen Guides do the work so you don’t have to including negotiating the best price and coordinating the transaction with the dealer.',
        },
    ];

    return (
        <section className="bg-primary text-white py-20" aria-labelledby="how-it-works">
            <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px]">
                <h2 id="how-it-works" className="text-4xl font-medium text-center text-white mb-12">
                    Our <span className="text-white">Proven 4-Step Process</span>
                </h2>
                <p className="text-base md:text-lg text-primary mb-4">At Zen Car Buying we remove the stress and simplify the complex world of used car buying. It all starts with a free 15-minute consultation.</p>
                <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="text-center p-6 bg-white/10 rounded-lg shadow-lg border-primary border-2 hover:shadow-xl transition-shadow duration-300"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-4xl font-bold text-accent bg-primary px-5 py-2 inline-block rounded-full mb-3">
                                {step.step}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-200">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
