import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby'
import testimonialsData from '../data/testimonials.json'
import { FaStar } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function TestimonialsPricing() {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(
                width: 100
                height: 100
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
    autoplaySpeed: 10000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <section className="py-10 bg-white text-center" aria-labelledby="testimonials-pricing-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Slider {...settings} className="max-w-5xl mx-auto">
          {testimonialsData.map((testimonial, index) => {
            const image = getImage(
              data.allFile.edges.find(edge => testimonial.image.includes(edge.node.name))
                ?.node.childImageSharp.gatsbyImageData
            )

            return (
              <div key={index} className="px-4">
                <div className="bg-secondary rounded-xl shadow-xl p-6 md:p-8 h-full flex flex-col justify-center max-w-md mx-auto">
                  <div className="flex items-start gap-4 text-left">
                    {image && (
                      <GatsbyImage
                        image={image}
                        alt={`Photo of ${testimonial.name}`}
                        className="rounded-full w-[64px] h-[64px] object-cover flex-shrink-0"
                      />
                    )}

                    <div className="flex flex-col">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-accent text-xl mr-1" />
                        ))}
                      </div>
                      {testimonial.note && (
                        <p className="text-sm uppercase tracking-wide text-accent font-semibold mb-1">
                          {testimonial.note}
                        </p>
                      )}
                      <h3 className="text-lg font-bold text-primary mb-2">{testimonial.name}</h3>

                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    </section>
  )
}
