import { Property } from "./types";
import { PropertyCard } from "./PropertyCard";
import { Home } from "lucide-react";

interface PropertyListProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

export const PropertyList = ({ properties, onEdit, onDelete }: PropertyListProps) => {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-[#F9F7F6] p-6 rounded-full mb-4">
          <Home className="w-12 h-12 text-[#235C47]/70" />
        </div>
        <h3 className="text-xl font-semibold text-[#235C47] mb-2">No properties yet</h3>
        <p className="text-[#235C47]/70 max-w-md text-center">
          You don't have any properties listed at the moment. Add a property to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};