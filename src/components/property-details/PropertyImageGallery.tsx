import { Property } from "@/src/utils/properties";
import Image from "next/image";
interface PropertyImageGalleryProps {
  property: Property;
}

export const PropertyImageGallery = ({
  property,
}: PropertyImageGalleryProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
      <div className="lg:col-span-2 h-[500px] overflow-hidden rounded-xl bg-[#F9F7F6]">
        <Image
          src={property.images[0]}
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
  );
};
