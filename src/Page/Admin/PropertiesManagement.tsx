"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Plus } from "lucide-react";
import { PropertyList } from "@/src/components/property-management/PropertyList";
import { PropertyForm } from "@/src/components/property-management/PropertyForm";
import { Property } from "@/src/components/property-management/types";

const PropertiesManagement = () => {
  // Mock properties data
  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      title: "Modern Downtown Apartment",
      price: 450000,
      location: "Downtown, New York",
      type: "apartment",
      status: "sale",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
      ],
      description:
        "Beautiful modern apartment in the heart of downtown with stunning city views.",
      features: ["Swimming Pool", "Gym", "Parking", "Security"],
      agent: {
        id: "1",
        name: "John Smith",
        phone: "+1 (555) 123-4567",
        email: "john.smith@realestate.com",
      },
      impressions: 245,
    },
    {
      id: "2",
      title: "Luxury Waterfront Villa",
      price: 850000,
      location: "Miami Beach, Florida",
      type: "house",
      status: "sale",
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      image: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d",
      images: [
        "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d200d",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      ],
      description:
        "Stunning waterfront villa with private beach access and panoramic ocean views.",
      features: ["Private Beach", "Pool", "Garden", "Garage"],
      agent: {
        id: "2",
        name: "Sarah Johnson",
        phone: "+1 (555) 987-6543",
        email: "sarah.j@realestate.com",
      },
      impressions: 312,
    },
    {
      id: "3",
      title: "Suburban Family Home",
      price: 320000,
      location: "Portland, Oregon",
      type: "house",
      status: "rent",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      ],
      description:
        "Charming family home in a quiet neighborhood with excellent schools nearby.",
      features: ["Yard", "Fireplace", "Garage", "Basement"],
      agent: {
        id: "3",
        name: "Michael Brown",
        phone: "+1 (555) 456-7890",
        email: "m.brown@realestate.com",
      },
      impressions: 178,
    },
    {
      id: "4",
      title: "City Center Loft",
      price: 2800,
      location: "Chicago, Illinois",
      type: "apartment",
      status: "rent",
      bedrooms: 1,
      bathrooms: 1,
      area: 900,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      images: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      ],
      description:
        "Stylish loft in the heart of the city with high ceilings and modern amenities.",
      features: ["High Ceilings", "Exposed Brick", "Rooftop Access"],
      agent: {
        id: "4",
        name: "Emily Davis",
        phone: "+1 (555) 234-5678",
        email: "emily.d@realestate.com",
      },
      impressions: 156,
    },
  ]);

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsAddDialogOpen(true);
  };

  const handleSave = (property: Property) => {
    if (editingProperty) {
      // Update existing property
      setProperties((prev) =>
        prev.map((p) => (p.id === property.id ? property : p))
      );
    } else {
      // Add new property
      setProperties((prev) => [...prev, property]);
    }
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setProperties((prev) => prev.filter((property) => property.id !== id));
    }
  };

  const handleCancel = () => {
    setIsAddDialogOpen(false);
    setEditingProperty(null);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#235C47]">
            Properties Management
          </h1>
          <p className="text-[#235C47]/80 mt-2">Manage all property listings</p>
        </div>

        <div className="flex justify-end">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAddProperty}
                className="bg-[#235C47] text-white hover:bg-[#235C47]/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border border-[#235C47]/20 bg-white">
              <DialogHeader>
                <DialogTitle className="text-[#235C47]">
                  {editingProperty ? "Edit Property" : "Add Property"}
                </DialogTitle>
              </DialogHeader>
              <PropertyForm
                property={editingProperty || undefined}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </DialogContent>
          </Dialog>
        </div>

        <PropertyList
          properties={properties}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default PropertiesManagement;

// {
//   "title": "Luxury Villa in California",
//   "price": 850000,
//   "location": "California, USA",
//   "type": "luxury",
//   "status": "sale",
//   "bedrooms": 5,
//   "bathrooms": 4,
//   "area": 4000,
//   "image": "https://example.com/images/luxury-villa.jpg",
//   "images": [
//     "https://example.com/images/luxury-villa1.jpg",
//     "https://example.com/images/luxury-villa2.jpg"
//   ],
//   "description": "A beautiful luxury villa with stunning ocean views.",
//   "features": ["Swimming Pool", "Gym", "Sauna", "Private Beach"],
//   "agent": {
//     "name": "John Doe",
//     "phone": "+1 123 456 7890",
//     "email": "johndoe@example.com"
//   }
// }
