"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/src/components/Common/Navbar";
import Footer from "@/src/components/Common/Footer";
import PropertyCard from "@/src/components/Property/PropertyCard";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Search, Home, Building2, TreePine, Crown, X } from "lucide-react";
import { Property } from "@/src/utils/properties";
import Link from "next/link";
import { useGetFeaturedPropertiesQuery } from "../redux/features/Admin/Properties/propertiesApi";
import aboutImage from "@/assets/about_image.jpg";
import testimonial1 from "@/assets/testimonial_1.jpg";
import testimonial2 from "@/assets/testimonial_2.jpg";
import testimonial3 from "@/assets/testimonial_3.jpg";
import testimonial4 from "@/assets/testimonial_4.jpg";
import ctaImage from "@/assets/cta.jpg";
import Image from "next/image";

const Homepage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const { data: featuredPropertiesData } = useGetFeaturedPropertiesQuery({});

  const openVideoModal = (videoSrc: string) => {
    setCurrentVideoSrc(videoSrc);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setCurrentVideoSrc("");
  };

  const testimonials = [
    {
      image: testimonial1,
      quote:
        "Haven Estates made my dream of owning a home come true. Their team was professional, responsive, and made the entire process seamless. I couldn't be happier with my new property!",
      name: "Sarah Johnson",
      role: "Homeowner",
    },
    {
      image: testimonial2,
      quote:
        "As an investor, I appreciate the transparency and detailed information provided by Haven Estates. Their properties have consistently delivered strong returns.",
      name: "Michael Chen",
      role: "Real Estate Investor",
    },
    {
      image: testimonial3,
      quote:
        "The customer service at Haven Estates is exceptional. They went above and beyond to ensure I found the perfect property that met all my requirements.",
      name: "David Williams",
      role: "Property Owner",
    },
    {
      image: testimonial4,
      quote:
        "From the initial consultation to the final paperwork, Haven Estates provided a stress-free experience. I highly recommend their services to anyone looking for quality properties.",
      name: "Emma Thompson",
      role: "New Homeowner",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    // Update the URL without causing a page refresh
    const queryString = params.toString();
    const newUrl = queryString ? `/?${queryString}` : "/";
    router.push(newUrl, { scroll: false });
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/listings?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/listings");
    }
  };

  const handleCategoryClick = (type: string) => {
    router.push(`/listings?type=${type}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/bg_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#235C47]/60 via-[#235C47]/30 to-[#235C47]/10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in py-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight drop-shadow-lg">
              Find Your Dream Property
            </h1>
            <p className="text-xl sm:text-2xl text-white/95 leading-relaxed drop-shadow-md">
              Discover exceptional homes and investment opportunities in the
              most sought-after locations
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#235C47]" />
                  <Input
                    type="text"
                    placeholder="Search by location, property type, or keyword..."
                    className="pl-12 h-14 border-0 focus-visible:ring-0 text-base text-gray-700 bg-white/80"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                </div>
                <Button
                  size="lg"
                  className="h-14 px-8 bg-[#235C47] hover:bg-[#1a4a38] text-white"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Category Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {[
                { icon: Home, label: "House", type: "house" },
                { icon: Building2, label: "Condo", type: "condo" },
                { icon: TreePine, label: "Land", type: "land" },
                { icon: Crown, label: "Apartment", type: "apartment" },
              ].map((category) => (
                <button
                  key={category.type}
                  onClick={() => handleCategoryClick(category.type)}
                  className="group"
                >
                  <Button
                    variant="outline"
                    className="h-12 px-6 bg-white/80 text-[#235C47] border-white/50 hover:bg-[#F9F7F6] hover:text-[#235C47] backdrop-blur-sm transition-smooth"
                  >
                    <category.icon className="w-5 h-5 mr-2 text-[#235C47]" />
                    {category.label}
                  </Button>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-[#235C47]">
              Featured Properties
            </h2>
            <p className="text-xl text-[#235C47]/80 max-w-2xl mx-auto">
              Handpicked selection of our finest properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredPropertiesData?.data?.map(
              (property: Property, index: number) => (
                <div
                  key={property._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <PropertyCard property={property} />
                </div>
              )
            )}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              asChild
              className="px-8 bg-[#235C47] hover:bg-[#1a4a38] text-white"
            >
              <Link href="/listings">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-[#F9F7F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-serif font-bold text-[#235C47] mt-8">
                About Us
              </h3>
              <h4 className="text-xl font-semibold text-[#235C47]">
                Redefining your standard of living
              </h4>
              <p className="text-lg text-gray-700 leading-relaxed">
                Edison Group was founded in 2009 with the aim to enhance aspects
                of life for people by providing powerful brands, reliable
                products and a wide range of services. It ventured into the real
                estate sector in 2015 with its {`"`}dream team{`"`} dedicated to
                merge value and innovation in the evolving real estate sector of
                Bangladesh. Through considerable focus on design, structural
                dimension, and feasibility in the sense of space and resource
                conservation; as well as environmental soundness; we deliver you
                optimum support in residential and commercial accommodation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Conjoining the expertise of different fields to develop and
                bring in the quintessence of contemporary lifestyle, we provide
                distinguished services and strictly maintain project handover
                deadlines. We assure you to be your most reliable developer in
                Dhaka in terms of integrity and credibility.
              </p>
              <button className="mt-4 px-6 py-3 bg-[#235C47] text-white rounded-lg hover:bg-[#1a4a38] transition-colors">
                Learn More
              </button>
            </div>

            {/* Video Section */}
            <div className="flex justify-center">
              <div
                className="cursor-pointer overflow-hidden rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
                onClick={() =>
                  openVideoModal("https://www.youtube.com/embed/BU_s5NhMLvc")
                }
              >
                <div className="relative">
                  <div className="relative">
                    <Image
                      width={500}
                      height={400}
                      src={aboutImage}
                      alt="About Haven Estates"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-[#235C47]/80 flex items-center justify-center transform transition-transform hover:scale-110">
                        <svg
                          className="w-10 h-10 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-[#235C47]">
              Testimonial
            </h2>
            <h3 className="text-2xl font-semibold text-[#235C47]">
              What customers say about us
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video Testimonial */}
            <div className="flex justify-center">
              <div
                className="cursor-pointer overflow-hidden rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
                onClick={() =>
                  openVideoModal("https://www.youtube.com/embed/8Io_q6Bgijg")
                }
              >
                <div className="relative">
                  <Image
                    width={500}
                    height={400}
                    src={testimonials[currentTestimonialIndex].image}
                    alt={`Customer ${testimonials[currentTestimonialIndex].name}`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#235C47]/80 flex items-center justify-center transform transition-transform hover:scale-110">
                      <svg
                        className="w-10 h-10 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Carousel */}
            <div className="relative">
              <div className="bg-[#F9F7F6] p-8 rounded-xl shadow-lg transition-opacity duration-500">
                <p className="text-lg text-gray-700 italic mb-6">
                  {`"`}
                  {testimonials[currentTestimonialIndex].quote}
                  {`"`}
                </p>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold text-[#235C47] text-lg">
                      {testimonials[currentTestimonialIndex].name}
                    </p>
                    <p className="text-gray-600">
                      {testimonials[currentTestimonialIndex].role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-[#235C47] text-white hover:bg-[#1a4a38] transition-colors"
                  aria-label="Previous testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-[#235C47] text-white hover:bg-[#1a4a38] transition-colors"
                  aria-label="Next testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentTestimonialIndex
                        ? "bg-[#235C47]"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#235C47] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Properties Listed" },
              { number: "1,200+", label: "Happy Clients" },
              { number: "50+", label: "Expert Agents" },
              { number: "$2.5B+", label: "Property Value" },
            ].map((stat, index) => (
              <div
                key={index}
                className="space-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-5xl font-serif font-bold text-[#F9F7F6]">
                  {stat.number}
                </p>
                <p className="text-lg text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Popup Video */}
      <section className="py-20 bg-[#F9F7F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6 text-[#235C47]">
            Experience Our Premium Properties
          </h2>
          <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
            Watch our latest property showcase to see what makes Haven Estates
            the premier choice for luxury living.
          </p>

          <div className="flex justify-center">
            <div
              className="cursor-pointer inline-block overflow-hidden rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
              onClick={() =>
                openVideoModal("https://www.youtube.com/embed/qTQF9q21kOw")
              }
            >
              <div className="relative" style={{ maxWidth: "845px" }}>
                <div className="relative">
                  <Image
                    width={500}
                    height={400}
                    src={ctaImage}
                    alt="Haven Estates Property Showcase"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#235C47]/80 flex items-center justify-center transform transition-transform hover:scale-110">
                      <svg
                        className="w-10 h-10 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 p-2 bg-[#235C47] text-white rounded-full hover:bg-[#1a4a38] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative pb-[56.25%] h-0">
              {" "}
              {/* 16:9 Aspect Ratio */}
              <iframe
                src={currentVideoSrc}
                title="Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
