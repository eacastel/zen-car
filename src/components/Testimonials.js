//src/components/Testimonials.js

import React from 'react'
import Slider from 'react-slick'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby'
import testimonialsData from '../data/testimonials.json'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa'

// Custom arrow components
const PrevArrow = ({ onClick }) => (
  <button
    className="
      absolute left-2
      top-48 md:top-1/2
      transform translate-y-0 md:-translate-y-1/2
      bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 z-10
      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
    "
    onClick={onClick}
    aria-label="Previous testimonials"
  >
    <FaChevronLeft className="text-primary" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="
      absolute right-2
      top-48 md:top-1/2
      transform translate-y-0 md:-translate-y-1/2
      bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 z-10
      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
    "
    onClick={onClick}
    aria-label="Next testimonials"
  >
    <FaChevronRight className="text-primary" />
  </button>
);

export default function Testimonials() {
    const data = useStaticQuery(graphql`
        query {
            allFile(filter: { sourceInstanceName: { eq: "images" } }) {
                edges {
                    node {
                        childImageSharp {
                            gatsbyImageData(
                                width: 600
                                height: 400
                                placeholder: BLURRED
                                formats: [AUTO, WEBP]
                                transformOptions: { cropFocus: CENTER }
                            )
                        }
                        name
                    }
                }
            }
        }
    `)

    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 12000,
        arrows: true,
        // adaptiveHeight: true,
        prevArrow: <PrevArrow />, 
        nextArrow: <NextArrow />,
        responsive: [
            { breakpoint: 1100, settings: { slidesToShow: 2, slidesToScroll: 1, adaptiveHeight: false, } },
            { breakpoint: 1020, settings: { slidesToShow: 1, slidesToScroll: 1, adaptiveHeight: true
             } },
        ],
    }

    return (
        <section className="py-20 bg-secondary text-center" aria-labelledby="testimonials-heading">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 id="testimonials-heading" className="text-4xl font-medium text-accent mb-12">
                    What Our <span className="text-accent">Customers</span> Say
                </h2>

                <div className="relative w-full max-w-6xl mx-auto">
                    <Slider {...settings}>
                        {testimonialsData.map((testimonial, index) => {
                            const image = getImage(data.allFile.edges.find(edge =>
                                testimonial.image.includes(edge.node.name)
                            )?.node.childImageSharp.gatsbyImageData)

                            return (
                                <div key={index} className="px-2 md:px-4">
                                    <div className="flex flex-col items-center bg-white p-4 md:p-6 rounded-lg shadow-lg relative">

                                        {testimonial.note && (
                                            <div className="px-2 mb-2 text-accent font-pirulen tracking-widest text-md font-bold uppercase">
                                                {testimonial.note}
                                            </div>
                                        )}

                                        {image ? (
                                            <div className="w-full overflow-hidden rounded-md mb-4">
                                                <GatsbyImage
                                                    image={image}
                                                    alt={`Photo of ${testimonial.name}`}
                                                    className="rounded-md mb-4 w-full max-w-[600px] h-auto object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-24 h-24 bg-gray-300 rounded-full mb-4" />
                                        )}

                                        <p className="text-base italic text-gray-700 px-2">"{testimonial.quote}"</p>

                                        <div className="flex justify-center mt-3" aria-label={`Rated ${testimonial.rating} stars`}>
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={`text-accent text-lg ${i < 5 ? '' : 'opacity-50'}`} />
                                            ))}
                                        </div>

                                        <div className="mt-4 text-lg font-semibold text-primary">{testimonial.name}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Review",
                        "name": "Zen Car Buying Testimonials",
                        "author": {
                            "@type": "Person",
                            "name": testimonialsData[0].name
                        },
                        "itemReviewed": {
                            "@type": "Service",
                            "name": "Car Buying Concierge Service"
                          },
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": "5",
                            "bestRating": "5"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Zen Car Buying"
                        }
                    })}
                </script>
            </div>
        </section>
    )
}
