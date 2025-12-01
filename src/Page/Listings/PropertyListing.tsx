"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/src/components/Common/Navbar";
import Footer from "@/src/components/Common/Footer";
import PropertyCard from "@/src/components/Property/PropertyCard";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Slider } from "@/src/components/ui/slider";
import { properties } from "@/src/utils/properties";
import { Search, SlidersHorizontal } from "lucide-react";

const Listings = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState(
    searchParams.get("type") || "all"
  );
  const [propertyStatus, setPropertyStatus] = useState(
    searchParams.get("status") || "all"
  );
  const [priceRange, setPriceRange] = useState([0, 5000000]);

  // Use useMemo to filter properties efficiently and prevent unnecessary re-renders
  const filteredProperties = useMemo(() => {
    let result = properties;

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by property type
    if (propertyType !== "all") {
      result = result.filter((property) => property.type === propertyType);
    }

    // Filter by property status
    if (propertyStatus !== "all") {
      result = result.filter((property) => property.status === propertyStatus);
    }

    // Filter by price range (for sale properties)
    result = result.filter((property) => {
      if (property.status === "sale") {
        return (
          property.price >= priceRange[0] && property.price <= priceRange[1]
        );
      }
      return true;
    });

    return result;
  }, [searchQuery, propertyType, propertyStatus, priceRange]);

  // Update URL parameters when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (propertyType !== "all") params.set("type", propertyType);
    if (propertyStatus !== "all") params.set("status", propertyStatus);

    // Update the URL without causing a page refresh
    const queryString = params.toString();
    const newUrl = queryString ? `/listings?${queryString}` : "/listings";
    router.push(newUrl, { scroll: false });
  }, [propertyType, propertyStatus, router]);

  const resetFilters = () => {
    setSearchQuery("");
    setPropertyType("all");
    setPropertyStatus("all");
    setPriceRange([0, 5000000]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-[#235C47]">
              Property Listings
            </h1>
            <p className="text-xl text-[#235C47]/80">
              Browse our collection of exceptional properties
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 bg-[#FFFFFF]">
            {/* Filters Sidebar */}
            <aside className="lg:w-80 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-[#235C47]/20 card-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-semibold flex items-center gap-2 text-[#235C47]">
                    <SlidersHorizontal className="w-5 h-5 text-[#235C47]" />
                    Filters
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    className="px-8 bg-[#235C47] hover:bg-[#1a4a38] text-white hover:text-white"
                  >
                    Reset
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <Label htmlFor="search" className="text-[#235C47]">
                      Search
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#235C47]/70" />
                      <Input
                        id="search"
                        placeholder="Location or keyword..."
                        className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-[#235C47]">
                      Property Type
                    </Label>
                    <Select
                      value={propertyType}
                      onValueChange={setPropertyType}
                    >
                      <SelectTrigger id="type" className="border-[#235C47]/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Property Status */}
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-[#235C47]">
                      Status
                    </Label>
                    <Select
                      value={propertyStatus}
                      onValueChange={setPropertyStatus}
                    >
                      <SelectTrigger
                        id="status"
                        className="border-[#235C47]/20"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="sale">For Sale</SelectItem>
                        <SelectItem value="rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-4">
                    <Label className="text-[#235C47]">Price Range (Sale)</Label>
                    <div className="space-y-4">
                      <Slider
                        min={0}
                        max={5000000}
                        step={100000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-[#235C47]/70">
                        <span>${(priceRange[0] / 1000000).toFixed(1)}M</span>
                        <span>${(priceRange[1] / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Property Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[#235C47]/80">
                  Showing{" "}
                  <span className="font-semibold text-[#235C47]">
                    {filteredProperties.length}
                  </span>{" "}
                  properties
                </p>
              </div>

              {filteredProperties.length === 0 ? (
                <div className="text-center py-20 bg-[#F9F7F6] p-8 rounded-xl">
                  <p className="text-xl text-[#235C47]/80 mb-4">
                    No properties found
                  </p>
                  <Button
                    onClick={resetFilters}
                    className="bg-[#235C47] hover:bg-[#235C47]/90 text-white"
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property, index) => (
                    <div
                      key={property.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Listings;
