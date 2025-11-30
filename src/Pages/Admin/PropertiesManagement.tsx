"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Image from "next/image";
import AdminLayout from "@/src/layout/AdminLayout";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";

// Function to generate a unique ID
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

const PropertiesManagement = () => {
  // Mock properties data
  const [properties, setProperties] = useState([
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
  const [editingProperty, setEditingProperty] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    type: "house",
    status: "sale" as "sale" | "rent",
    bedrooms: "",
    bathrooms: "",
    area: "",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    description: "",
    features: "",
    agentName: "",
    agentPhone: "",
    agentEmail: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const property = {
      id: editingProperty || generateId(),
      title: formData.title,
      price: parseFloat(formData.price),
      location: formData.location,
      type: formData.type,
      status: formData.status,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : 0,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : 0,
      area: parseFloat(formData.area),
      image: formData.image,
      description: formData.description,
      features: formData.features.split(",").map((f) => f.trim()),
      agent: {
        name: formData.agentName,
        phone: formData.agentPhone,
        email: formData.agentEmail,
      },
      impressions: 0, // New properties start with 0 impressions
    };

    if (editingProperty) {
      setProperties((prevProperties) =>
        prevProperties.map((p) =>
          p.id === editingProperty ? { ...property } : p
        )
      );
    } else {
      setProperties((prevProperties) => [...prevProperties, property]);
    }

    setIsAddDialogOpen(false);
    setEditingProperty(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      location: "",
      type: "house",
      status: "sale",
      bedrooms: "",
      bathrooms: "",
      area: "",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      description: "",
      features: "",
      agentName: "",
      agentPhone: "",
      agentEmail: "",
    });
  };

  const handleEdit = (property: any) => {
    setFormData({
      title: property.title,
      price: property.price.toString(),
      location: property.location,
      type: property.type,
      status: property.status,
      bedrooms: property.bedrooms?.toString() || "",
      bathrooms: property.bathrooms?.toString() || "",
      area: property.area.toString(),
      image: property.image,
      description: property.description,
      features: property.features.join(", "),
      agentName: property.agent.name,
      agentPhone: property.agent.phone,
      agentEmail: property.agent.email,
    });
    setEditingProperty(property.id);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property.id !== id)
      );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-serif font-bold">Properties</h1>
            <p className="text-muted-foreground mt-1">
              Manage all property listings
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                  setEditingProperty(null);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProperty ? "Edit" : "Add"} Property
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "sale" | "rent") =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">For Sale</SelectItem>
                        <SelectItem value="rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Area (sq ft)</Label>
                    <Input
                      type="number"
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({ ...formData, area: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bedrooms</Label>
                    <Input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) =>
                        setFormData({ ...formData, bedrooms: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bathrooms</Label>
                    <Input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) =>
                        setFormData({ ...formData, bathrooms: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Features (comma-separated)</Label>
                  <Textarea
                    value={formData.features}
                    onChange={(e) =>
                      setFormData({ ...formData, features: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Agent Name</Label>
                    <Input
                      value={formData.agentName}
                      onChange={(e) =>
                        setFormData({ ...formData, agentName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Agent Phone</Label>
                    <Input
                      value={formData.agentPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, agentPhone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Agent Email</Label>
                    <Input
                      type="email"
                      value={formData.agentEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, agentEmail: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  {editingProperty ? "Update" : "Add"} Property
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="card-shadow">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <Image
                    src={property.image}
                    alt={property.title}
                    className="w-48 h-32 object-cover rounded-lg"
                    width={192}
                    height={128}
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-serif font-bold">
                          {property.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {property.location}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(property)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(property.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      ${property.price.toLocaleString()}
                      {property.status === "rent" ? "/month" : ""}
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{property.bedrooms} beds</span>
                      <span>{property.bathrooms} baths</span>
                      <span>{property.area} sq ft</span>
                      <span className="capitalize">{property.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span>{property.impressions} views</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default PropertiesManagement;
