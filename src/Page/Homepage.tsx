"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/src/components/Common/Navbar";
import Footer from "@/src/components/Common/Footer";
import PropertyCard from "@/src/components/Property/PropertyCard";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Search, Home, Building2, TreePine, Crown } from "lucide-react";
import { properties, Property } from "@/src/utils/properties";
import heroImage from "@/assets/hero_image.jpg";
import Link from "next/link";
import { useGetFeaturedPropertiesQuery } from "../redux/features/Admin/Properties/propertiesApi";

const Homepage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const featuredProperties = properties.slice(0, 3);
  const { data: featuredPropertiesData } = useGetFeaturedPropertiesQuery({});
  console.log(featuredPropertiesData);

  // Update URL when search query changes
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
  }, [searchQuery, router, searchParams]);

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
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#235C47]/60 via-[#235C47]/50 to-[#235C47]/70" />
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
            {featuredProperties.map((property: Property, index: number) => (
              <div
                key={property._id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
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

      <Footer />
    </div>
  );
};

export default Homepage;
