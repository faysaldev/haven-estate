import { Bed, Bath, Maximize } from "lucide-react";
import { Property } from "@/src/utils/properties";

interface PropertyStatsProps {
  property: Property;
}

export const PropertyStats = ({ property }: PropertyStatsProps) => {
  return (
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
  );
};
