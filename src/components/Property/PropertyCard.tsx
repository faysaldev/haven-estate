import { Property } from "@/src/utils/properties";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    if (property.status === "rent") {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${(price / 1000000).toFixed(2)}M`;
  };

  return (
    <Link href={`/listings/${property.id}`}>
      <Card className="group overflow-hidden card-shadow card-shadow-hover transition-smooth hover:scale-[1.02] cursor-pointer border-border">
        <div className="relative overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            width={400}
            height={300}
            className="w-full h-64 object-cover transition-smooth group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-accent text-accent-foreground font-medium">
              For {property.status === "sale" ? "Sale" : "Rent"}
            </Badge>
            <Badge variant="secondary" className="capitalize">
              {property.type}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-smooth">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Maximize className="w-4 h-4" />
              <span>{property.area.toLocaleString()} sq ft</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-2xl font-serif font-semibold text-primary">
              {formatPrice(property.price)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
