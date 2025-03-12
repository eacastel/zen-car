import React, { useState } from "react";

const encode = (data) => {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
};

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.target);
        const encodedData = encode(Object.fromEntries(formData));

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encodedData,
            });

            if (response.ok) {
                setSubmitted(true);
                event.target.reset();
            } else {
                alert("There was an error sending the form. Please try again.");
            }
        } catch (error) {
            alert("Error sending form.");
        }

        setIsSubmitting(false);
    };

    return (
        <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary text-center mb-4">
                Contact Form
            </h2>

            {submitted ? (
                <div
                    className="bg-primary text-white text-center py-4 rounded-md shadow-sm"
                    aria-live="polite"
                >
                    Thank you for your interest in Zen Car Buying. Your message was
                    successfully submitted and we will get back to you as soon as possible.
                </div>
            ) : (
                <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    className="space-y-6 max-w-lg mx-auto"
                    onSubmit={handleSubmit}
                >
                    {/* Hidden Netlify Field */}
                    <input type="hidden" name="form-name" value="contact" />

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-primary font-bold mb-2"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full p-3 border border-primary rounded focus:ring-2 focus:ring-accent"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-primary font-bold mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full p-3 border border-primary rounded focus:ring-2 focus:ring-accent"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-primary font-bold mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            required
                            className="w-full p-3 border border-primary rounded focus:ring-2 focus:ring-accent"
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-primary text-white px-8 py-3 rounded-lg font-bold transition-all duration-300
                                ${isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "hover:bg-accent hover:text-white hover:shadow-md hover:shadow-accent/50"
                                } focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2`}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>

                    </div>
                </form>
            )}
        </section>
    );
};

export default ContactForm;
