import { Badge } from "@/src/components/ui/badge";
import { MapPin } from "lucide-react";
import { Property } from "./types";

interface PropertyHeaderProps {
  property: Property;
}

export const PropertyHeader = ({ property }: PropertyHeaderProps) => {
  const formatPrice = (price: number) => {
    if (property.status === "rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-4">
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
  );
};