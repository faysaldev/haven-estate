import { Property } from "@/src/utils/properties";

interface PropertyDescriptionProps {
  property: Property;
}

export const PropertyDescription = ({ property }: PropertyDescriptionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-semibold text-[#235C47]">
        About This Property
      </h2>
      <p className="text-[#235C47]/80 leading-relaxed text-lg">
        {property.description}
      </p>
    </div>
  );
};
