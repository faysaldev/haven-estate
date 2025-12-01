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
      description:
        "Beautiful modern apartment in the heart of downtown with stunning city views.",
      features: ["Swimming Pool", "Gym", "Parking", "Security"],
      agent: {
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
      description:
        "Stunning waterfront villa with private beach access and panoramic ocean views.",
      features: ["Private Beach", "Pool", "Garden", "Garage"],
      agent: {
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
      description:
        "Charming family home in a quiet neighborhood with excellent schools nearby.",
      features: ["Yard", "Fireplace", "Garage", "Basement"],
      agent: {
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
      description:
        "Stylish loft in the heart of the city with high ceilings and modern amenities.",
      features: ["High Ceilings", "Exposed Brick", "Rooftop Access"],
      agent: {
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
      setProperties(prev =>
        prev.map(p => p.id === property.id ? property : p)
      );
    } else {
      // Add new property
      setProperties(prev => [...prev, property]);
    }
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setProperties(prev => prev.filter(property => property.id !== id));
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
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#235C47]">Properties Management</h1>
          <p className="text-[#235C47]/80 mt-2">
            Manage all property listings
          </p>
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
