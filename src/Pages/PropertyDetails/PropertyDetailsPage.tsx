"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { properties } from "@/src/utils/properties";
import Navbar from "@/src/components/Common/Navbar";
import Footer from "@/src/components/Common/Footer";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Check,
} from "lucide-react";

const PropertyDetail = () => {
  const params = useParams();
  const propertyId = params.id as string;
  const property = properties.find((p) => p.id === propertyId);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold mb-4 text-[#235C47]">
              Property Not Found
            </h1>
            <Button
              asChild
              className="bg-[#235C47] hover:bg-[#235C47]/90 text-white"
            >
              <Link href="/listings">Back to Listings</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (property.status === "rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            variant="outline"
            asChild
            className="mb-6 border-[#235C47] text-[#235C47] hover:bg-[#F9F7F6] hover:text-[#235C47]"
          >
            <Link href="/listings">
              <ArrowLeft className="w-4 h-4 mr-2 text-[#235C47]" />
              Back to Listings
            </Link>
          </Button>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12 animate-fade-in">
            <div className="lg:col-span-2 h-[500px] overflow-hidden rounded-xl bg-[#F9F7F6]">
              <Image
                src={property.image}
                alt={property.title}
                width={800}
                height={500}
                className="w-full h-full object-cover hover:scale-105 transition-smooth"
              />
            </div>
            {property.images?.slice(1).map((image, index) => (
              <div
                key={index}
                className="h-64 overflow-hidden rounded-xl bg-[#F9F7F6]"
              >
                <Image
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover hover:scale-105 transition-smooth"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="space-y-4 animate-slide-up">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-[#235C47] text-white">
                    For {property.status === "sale" ? "Sale" : "Rent"}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="capitalize bg-[#F9F7F6] text-[#235C47]"
                  >
                    {property.type}
                  </Badge>
                </div>

                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#235C47]">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-[#235C47]/80">
                  <MapPin className="w-5 h-5 text-[#235C47]" />
                  <span className="text-lg">{property.location}</span>
                </div>

                <p className="text-4xl font-serif font-bold text-[#235C47]">
                  {formatPrice(property.price)}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#235C47]/20">
                {property.bedrooms && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F9F7F6] rounded-lg flex items-center justify-center">
                      <Bed className="w-6 h-6 text-[#235C47]" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#235C47]">
                        {property.bedrooms}
                      </p>
                      <p className="text-sm text-[#235C47]/70">Bedrooms</p>
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F9F7F6] rounded-lg flex items-center justify-center">
                      <Bath className="w-6 h-6 text-[#235C47]" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#235C47]">
                        {property.bathrooms}
                      </p>
                      <p className="text-sm text-[#235C47]/70">Bathrooms</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#F9F7F6] rounded-lg flex items-center justify-center">
                    <Maximize className="w-6 h-6 text-[#235C47]" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#235C47]">
                      {property.area.toLocaleString()}
                    </p>
                    <p className="text-sm text-[#235C47]/70">Sq Ft</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-[#235C47]">
                  About This Property
                </h2>
                <p className="text-[#235C47]/80 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold text-[#235C47]">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#F9F7F6] rounded-full flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-[#235C47]" />
                      </div>
                      <span className="text-[#235C47]/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Card */}
              <Card className="card-shadow sticky top-32 border-[#235C47]/20">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-serif font-semibold mb-2 text-[#235C47]">
                      Contact Agent
                    </h3>
                    <p className="text-[#235C47]/80">
                      Get in touch with our expert agent
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-lg text-[#235C47]">
                        {property.agent.name}
                      </p>
                      <div className="flex items-center gap-2 text-[#235C47]/70">
                        <Phone className="w-4 h-4 text-[#235C47]" />
                        <a
                          href={`tel:${property.agent.phone}`}
                          className="hover:text-[#235C47] transition-smooth"
                        >
                          {property.agent.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-[#235C47]/70">
                        <Mail className="w-4 h-4 text-[#235C47]" />
                        <a
                          href={`mailto:${property.agent.email}`}
                          className="hover:text-[#235C47] transition-smooth"
                        >
                          {property.agent.email}
                        </a>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-[#235C47] hover:bg-[#235C47]/90 text-white"
                      size="lg"
                    >
                      Schedule Viewing
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#235C47] text-[#235C47] hover:bg-[#F9F7F6] hover:text-[#235C47]"
                      size="lg"
                    >
                      Request Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
