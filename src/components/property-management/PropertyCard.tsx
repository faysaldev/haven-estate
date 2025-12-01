import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import { Property } from "./types";
import { Pencil, Trash2, Eye } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

export const PropertyCard = ({ property, onEdit, onDelete }: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-6">
        <div className="flex gap-6">
          <div className="relative w-48 h-32 flex-shrink-0">
            <Image
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover rounded-lg"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#235C47]">
                  {property.title}
                </h3>
                <p className="text-[#235C47]/70">
                  {property.location}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#235C47]/20 text-[#235C47] hover:bg-[#235C47]/10"
                  onClick={() => onEdit(property)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#235C47]/20 text-[#235C47] hover:bg-[#235C47]/10"
                  onClick={() => onDelete(property.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-2xl font-bold text-[#235C47]">
              ${property.price.toLocaleString()}
              {property.status === "rent" ? "/month" : ""}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-[#235C47]/70">
              <span>{property.bedrooms} beds</span>
              <span>{property.bathrooms} baths</span>
              <span>{property.area} sq ft</span>
              <span className="capitalize">{property.type}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#235C47]/70">
              <Eye className="w-4 h-4" />
              <span>{property.impressions} views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};