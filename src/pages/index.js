import React, { useState, useEffect } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Car,
  Search,
  FileCheck,
  Star,
  Quote
} from "lucide-react";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import ButtonHeader from "../components/ButtonHeader";

// --- DATA: REVIEWS ---
const REVIEWS = [
  {
    name: "Michael T.",
    text: "Brian went above and beyond to help me find the perfect car within my timeline. The process was completely stress-free.",
    car: "2024 BMW X5"
  },
  {
    name: "Sarah Jenkins",
    text: "I will never buy a car the old way again. Zen Car Buying saved me $4,000 and I didn't have to step foot in a dealership.",
    car: "Mercedes GLE"
  },
  {
    name: "David R.",
    text: "Professional, transparent, and incredibly fast. The car was delivered to my driveway on Wednesday just like promised.",
    car: "Audi Q7"
  }
];

// --- COMPONENT: COMPACT REVIEW CAROUSEL ---
const ReviewCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-10 max-w-md">
      {/* Google Badge */}
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-white p-1 rounded-full shadow-sm">
          <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
        </div>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
        </div>
        <span className="text-xs font-bold text-teal-50 tracking-wide ml-1">5.0 RATING</span>
      </div>

      {/* Review Text */}
      <div className="relative h-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full"
          >
            <div className="flex gap-3">
              <Quote className="text-[#f99f1b] flex-shrink-0" size={24} />
              <div>
                <p className="text-white text-base font-medium leading-relaxed italic opacity-90">
                  "{REVIEWS[index].text}"
                </p>
                <p className="mt-2 text-sm text-teal-200 font-bold">
                  — {REVIEWS[index].name} <span className="text-white/40 font-normal mx-1">|</span> {REVIEWS[index].car}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- REUSABLE SECTIONS ---
const Section = ({ className, children, id }) => (
  <section id={id} className={`py-16 md:py-24 px-4 ${className}`}>
    <div className="container mx-auto max-w-6xl">{children}</div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white p-8 rounded-2xl shadow-lg border border-teal-50 text-center hover:-translate-y-1 transition-transform duration-300"
  >
    <div className="bg-[#eaf3f3] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-[#6b8385]">
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </motion.div>
);

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-slate-800">{question}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          color="#f99f1b"
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function LandingPage() {
  const SECURE_LINK = "/vip-consultation/?access=vip";

  const data = useStaticQuery(graphql`
    query {
      # THE NEW HERO BACKGROUND
      heroBg: file(relativePath: { eq: "hero-bg.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 90
          )
        }
      }
      # THE LOTUS FLOWER
      lotus: file(relativePath: { eq: "zen-car-lotus.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 800
            placeholder: NONE
            formats: [AUTO, WEBP]
          )
        }
      }
      consultation: file(relativePath: { eq: "consultation.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 800
            placeholder: BLURRED
          )
        }
      }
      deliveryKeys: file(relativePath: { eq: "delivery-keys.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 800
            placeholder: BLURRED
          )
        }
      }
    }
  `);

  const heroImg = getImage(data.heroBg);
  const lotusImg = getImage(data.lotus);
  const consultImg = getImage(data.consultation);
  const deliveryImg = getImage(data.deliveryKeys);

  return (
    <Layout>
      {/* 1. HERO SECTION */}
      {/* LAYOUT STRATEGY: 
          - Mobile: Flex Column (Image Top, Text Bottom).
          - Desktop: Block with Absolute Positioning (Text Left, Image Right Overlay).
      */}
      <div className="relative bg-[#6b8385] text-white overflow-hidden min-h-[auto] md:min-h-[95vh] flex flex-col md:block">

        {/* BACKGROUND LOTUS (Hidden on mobile to reduce noise, visible on desktop) */}
        <div className="hidden md:block absolute right-0 bottom-0 opacity-10 w-2/3 md:w-1/2 pointer-events-none z-0 transform translate-x-1/4 translate-y-1/4">
          <GatsbyImage image={lotusImg} alt="" className="w-full h-auto" />
        </div>

        {/* HERO IMAGE */}
        {/* MOBILE: Relative height (350px), sits at top. Fades out at bottom.
           DESKTOP: Absolute right, covers 45% width. Fades out at left.
        */}
        <div className="relative w-full h-[350px] md:absolute md:top-0 md:right-0 md:h-full md:w-[45%] z-0 order-1 md:order-none">
          <div className="h-full w-full relative [mask-image:linear-gradient(to_bottom,black_60%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_20%)]">
            <GatsbyImage
              image={heroImg}
              alt="Luxury Car"
              className="h-full w-full object-cover object-center"
              style={{ position: "absolute" }}
            />
            {/* Overlay for tinting */}
            <div className="absolute inset-0 bg-[#6b8385]/10 mix-blend-multiply" />
          </div>
        </div>

        {/* TEXT CONTENT */}
        {/* MOBILE: Order-2 (Bottom). Standard padding.
           DESKTOP: Vertically centered (flex h-full). Width 70% to fix "squeezed" look.
        */}
        <div className="container mx-auto px-4 relative z-20 py-12 md:py-0 md:h-[95vh] md:flex md:items-center order-2 md:order-none">
          {/* Changed width from md:w-1/2 to md:w-[70%] for more horizontal space */}
          <div className="w-full md:w-[70%]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-pirulen text-teal-200">
                The Modern Approach to Car Buying
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-sm">
                Car buying made <span className="text-[#f99f1b]">simple</span> and <span className="text-[#f99f1b]">stress-free</span>.
              </h1>

              {/* Increased max-width from max-w-lg to max-w-2xl so text spreads out */}
              <p className="text-lg md:text-2xl text-teal-50 mb-8 max-w-2xl leading-relaxed drop-shadow-sm">
                Skip the dealership. We find the perfect car, negotiate the best price, and deliver it to your door.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <ButtonHeader
                  to={SECURE_LINK}
                  size="lg"
                  className="w-full sm:w-auto text-center justify-center shadow-lg shadow-[#f99f1b]/20"
                >
                  Start Your Search
                </ButtonHeader>
                <Link
                  to="/how-it-works"
                  className="px-8 py-3 rounded-md font-bold text-white border-2 border-white/30 hover:bg-white/10 transition-colors text-center"
                >
                  How it works
                </Link>
              </div>

              <ReviewCarousel />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. VALUE PROPS */}
      <Section className="bg-[#eaf3f3]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Your Car, The Zen Way
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            We stripped away the salespeople, the pressure, and the hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={FileCheck}
            title="1. Tell Us What You Want"
            desc="Complete a short profile. We specialize in finding the exact make, model, and trim you desire."
            delay={0.1}
          />
          <FeatureCard
            icon={Search}
            title="2. We Find & Negotiate"
            desc="We search nationwide inventory and use our data to negotiate a price below market value."
            delay={0.2}
          />
          <FeatureCard
            icon={Car}
            title="3. You Verify & Drive"
            desc="We handle the paperwork and coordinate delivery. You just sign and accept the keys."
            delay={0.3}
          />
        </div>
      </Section>

      {/* 3. PACKAGES STRIP */}
      <div className="bg-[#6b8385] py-20 px-4 text-white">
        <div className="container mx-auto max-w-5xl bg-[#5a6f71] rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">

          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-4">Packages start at just $450</h2>
            <p className="text-teal-50 text-lg mb-6 leading-relaxed">
              Why pay thousands in dealer markups? Our flat-fee service saves you money and eliminates the stress of negotiation.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {["Nationwide Search", "Price Negotiation", "Trade-In Support", "Doorstep Delivery"].map(item => (
                <li key={item} className="flex items-center gap-2 text-base font-medium">
                  <CheckCircle2 size={20} className="text-[#f99f1b]" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-1/3 w-full">
            <ButtonHeader
              to={SECURE_LINK}
              className="w-full text-center justify-center py-4 text-lg"
            >
              Get Started
            </ButtonHeader>
            <p className="text-center text-xs text-white/50 mt-3">
              No hidden fees. 100% Transparent.
            </p>
          </div>

        </div>
      </div>

      {/* 4. SPLIT FEATURE SECTIONS */}
      <Section className="bg-white">
        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <GatsbyImage
                image={consultImg}
                alt="Zen Guide looking at laptop"
                className="aspect-video object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              We handle the hard part: <span className="text-[#f99f1b]">Research & Negotiation</span>
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              You have better things to do than argue with a sales manager for 4 hours.
              Our experts know the real invoice prices and incentives. We speak their language so you don't have to.
            </p>
            <Link to="/services" className="text-[#6b8385] font-bold hover:text-[#f99f1b] underline decoration-2 underline-offset-4">
              Explore our services
            </Link>
          </div>
        </div>

        {/* Feature 2 (Reversed) */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <GatsbyImage
                image={deliveryImg}
                alt="Handing over car keys"
                className="aspect-video object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Delivery Wednesday — <span className="text-[#f99f1b]">Your Car, Right to Your Door</span>
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              Whether it’s sourced locally or from across the country, we coordinate the logistics.
              Review the car, sign the papers, and enjoy the ride.
            </p>
          </div>
        </div>
      </Section>

      {/* 5. FAQ SECTION */}
      <Section className="bg-[#f8fafc]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <FaqItem
            question="What car brands do you specialize in?"
            answer="We specialize in German luxury vehicles including Mercedes-Benz, BMW, Audi, and Porsche. However, we can assist with most major makes and models."
          />
          <FaqItem
            question="Do I pay the dealer or you?"
            answer="You pay the dealer directly for the vehicle. You pay us a small flat fee for our service. We never mark up the price of the car."
          />
          <FaqItem
            question="Can you help with trade-ins?"
            answer="Absolutely. We can solicit bids for your trade-in from multiple sources to ensure you get the highest possible value, rather than just what one dealer offers."
          />
          <FaqItem
            question="How does delivery work?"
            answer="If the car is local, you can pick it up or we can arrange drop-off. If it is out of state, we coordinate with trusted transport carriers to bring it to your driveway."
          />
        </div>
      </Section>

      {/* 6. FINAL CTA */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">
            Start Your Car Buying Journey With a <span className="text-[#f99f1b]">Zen Guide</span>
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            No pressure. No obligation. Just a 15-minute chat to see if we can help you find your dream car.
          </p>
          <ButtonHeader
            to={SECURE_LINK}
            size="lg"
            className="px-12 py-5 text-xl shadow-xl shadow-orange-200"
          >
            Book Your Free Consultation
          </ButtonHeader>
        </div>
      </section>
    </Layout>
  );
}

export const Head = () => (
  <Seo
    title="Zen Car Buying | Luxury Car Buying Made Simple"
    description="Skip the dealership. We find, negotiate, and deliver your perfect Mercedes, BMW, or Audi."
  />
);