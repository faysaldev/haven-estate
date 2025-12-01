import { Check } from "lucide-react";
import { Property } from "./types";

interface PropertyFeaturesProps {
  property: Property;
}

export const PropertyFeatures = ({ property }: PropertyFeaturesProps) => {
  return (
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
  );
};