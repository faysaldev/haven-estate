import { Property } from "@/src/utils/properties";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface PropertyImageGalleryProps {
  property: Property;
}

// Modal Component
const ImageModal = ({
  isOpen,
  onClose,
  imageUrl,
  altText,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText: string;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a4a3854] bg-opacity-75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-[5px] right-[40px] z-10 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          onClick={onClose}
          aria-label="Close modal"
        >
          <XIcon className="h-6" />
        </button>
        <div className="flex justify-center">
          <Image
            src={imageUrl}
            alt={altText}
            width={800}
            height={600}
            className="max-h-[80vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
};

export const PropertyImageGallery = ({
  property,
}: PropertyImageGalleryProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(property.images[0]);
  const [currentAlt, setCurrentAlt] = useState(property.title);

  const openModal = (image: string, alt: string) => {
    setCurrentImage(image);
    setCurrentAlt(alt);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Re-enable scrolling when modal closes
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
        <div
          className="lg:col-span-2 h-[500px] overflow-hidden rounded-xl bg-[#F9F7F6] cursor-pointer"
          onClick={() => openModal(property.images[0], property.title)}
        >
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
            className="h-64 overflow-hidden rounded-xl bg-[#F9F7F6] cursor-pointer"
            onClick={() => openModal(image, `${property.title} ${index + 2}`)}
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

      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        imageUrl={currentImage}
        altText={currentAlt}
      />
    </>
  );
};
