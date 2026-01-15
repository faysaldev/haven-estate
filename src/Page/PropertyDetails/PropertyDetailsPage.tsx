"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/src/components/Common/Navbar";
import Footer from "@/src/components/Common/Footer";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PropertyImageGallery } from "@/src/components/property-details/PropertyImageGallery";
import { PropertyHeader } from "@/src/components/property-details/PropertyHeader";
import { PropertyStats } from "@/src/components/property-details/PropertyStats";
import { PropertyDescription } from "@/src/components/property-details/PropertyDescription";
import { PropertyFeatures } from "@/src/components/property-details/PropertyFeatures";
import { PropertyAgentCard } from "@/src/components/property-details/PropertyAgentCard";
import { useGetSinglePropertiesQuery } from "@/src/redux/features/Admin/Properties/propertiesApi";

const PropertyDetail = () => {
  const params = useParams();
  const propertyId = params.id as string;

  const {
    data: propertyData,
    isLoading,
    isError,
  } = useGetSinglePropertiesQuery(propertyId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold mb-4 text-[#235C47]">
              Loading Property...
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !propertyData) {
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

  // Process features if they come as a string
  const processedProperty = {
    ...propertyData,
    features: Array.isArray(propertyData.features)
      ? propertyData.features
      : typeof propertyData.features === "string"
      ? propertyData?.features
          .split(",")
          .map((feature: string) => feature.trim())
      : [],
  };

  console.log(processedProperty, "Processed");
  console.log(propertyData.features, "property Fetured");

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

          <PropertyImageGallery property={processedProperty} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <PropertyHeader property={processedProperty} />
              <PropertyStats property={processedProperty} />
              <PropertyDescription property={processedProperty} />
              <PropertyFeatures property={processedProperty} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <PropertyAgentCard property={processedProperty} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
