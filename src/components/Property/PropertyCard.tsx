import { Property } from "@/src/utils/properties";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Bed, Bath, Maximize, MapPin, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  // Handle both image and images properties
  const imageUrl = property.images?.length
    ? property.images[0]
    : property.image || "/placeholder-property.jpg";

  const formatPrice = (price: number) => {
    if (property.status === "rent") {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${(price / 1000000).toFixed(2)}M`;
  };

  return (
    <Link
      href={`/listings/${property._id}`}
      className="block group"
      aria-label={`View details for ${property.title}`}
    >
      <Card className="overflow-hidden card-shadow transition-smooth hover:scale-[1.02] cursor-pointer border-border group relative pt-0">
        {/* Image Section */}
        <div className="relative aspect-video h-[60%] overflow-hidden">
          <Image
            src={imageUrl}
            alt={property.title || "Property image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
            priority={false}
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge className="bg-[#235C47] text-white font-medium text-xs py-1 px-2.5">
              For {property.status === "sale" ? "Sale" : "Rent"}
            </Badge>
            <Badge
              variant="outline"
              className="bg-white/80 text-[#235C47] capitalize border-[#235C47]/30 text-xs py-1 px-2.5"
            >
              {property.type}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-5 space-y-4">
          {/* Title and Location */}
          <div className="space-y-1.5">
            <h3 className="text-lg font-serif font-semibold text-[#235C47] group-hover:text-[#1a4a38] transition-colors line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center gap-1.5 text-[#235C47]/80 text-sm">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>
          </div>

          {/* Property Stats */}
          <div className="flex items-center gap-4 text-[#235C47]/70 text-xs">
            {property.bedrooms !== undefined && property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-[#235C47]/70" />
                <span>{property.bedrooms} bed</span>
              </div>
            )}
            {property.bathrooms !== undefined && property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-[#235C47]/70" />
                <span>{property.bathrooms} bath</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5 text-[#235C47]/70" />
              <span>{property.area.toLocaleString()} sqft</span>
            </div>
          </div>

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {property.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-[#F9F7F6] text-[#235C47]/80 px-2 py-1 rounded capitalize"
                >
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="text-xs bg-[#F9F7F6] text-[#235C47]/80 px-2 py-1 rounded">
                  +{property.features.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="pt-2.5 border-t border-[#235C47]/10">
            <p className="text-xl font-serif font-semibold text-[#235C47]">
              {formatPrice(property.price)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
