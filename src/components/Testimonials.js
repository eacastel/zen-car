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
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 z-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={onClick}
        aria-label="Previous testimonials"
    >
        <FaChevronLeft className="text-primary" />
    </button>
)

const NextArrow = ({ onClick }) => (
    <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 z-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={onClick}
        aria-label="Next testimonials"
    >
        <FaChevronRight className="text-primary" />
    </button>
)

export default function Testimonials() {
    // **Fetch images**
    const data = useStaticQuery(graphql`
        query {
            allFile(filter: { sourceInstanceName: { eq: "images" } }) {
                edges {
                    node {
                        childImageSharp {
                            gatsbyImageData(
                                width: 300
                                height: 200
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

    // **Slick Slider Settings**
    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    }

    return (
        <section className="py-20 bg-secondary text-center" aria-labelledby="testimonials-heading">
            <div className="container mx-auto px-10">
                {/* ✅ Section Title */}
                <h2 id="testimonials-heading" className="text-4xl font-bold text-primary mb-12">
                    What Our <span className="text-accent">Happy Customers</span> Say
                </h2>

                {/* ✅ Slick Carousel Container */}
                <div className="relative w-full max-w-6xl mx-auto">
                    <Slider {...settings}>
                    {testimonialsData.map((testimonial, index) => {
    const image = getImage(data.allFile.edges.find(edge =>
        testimonial.image.includes(edge.node.name)
    )?.node.childImageSharp.gatsbyImageData)

    return (
        <div key={index} className="px-4">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg relative">
                

                {/* ✅ Profile Image */}
                {image ? (
                    <GatsbyImage
                        image={image}
                        alt={`Photo of ${testimonial.name}`}
                        className="rounded-md mb-4 w-[300px] h-[200px] object-cover object-center"
                    />
                ) : (
                    <div className="w-24 h-24 bg-gray-300 rounded-full mb-4" />
                )}

                {/* ✅ Savings Note (Above Image) */}
                {testimonial.note && (
                    <div className=" top-0 mt-0 px-4 my-4 text-accent font-poppins  tracking-widest mb-3 uppercase">
                        {testimonial.note}
                    </div>
                )}

                {/* ✅ Quote */}
                <p className="text-l italic text-gray-700">"{testimonial.quote}"</p>

                {/* ✅ Star Rating */}
                <div className="flex justify-center mt-3" aria-label={`Rated ${testimonial.rating} stars`}>
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`text-accent text-lg ${i < 5 ? '' : 'opacity-50'}`} />
                    ))}
                </div>

                {/* ✅ Name */}
                <div className="mt-4 text-lg font-semibold text-primary">{testimonial.name}</div>
            </div>
        </div>
    )
})}
                    </Slider>
                </div>

                {/* ✅ SEO Schema Markup for Reviews */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Review",
                        "name": "Zen Car Buying Testimonials",
                        "author": {
                            "@type": "Person",
                            "name": testimonialsData[0].name
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
