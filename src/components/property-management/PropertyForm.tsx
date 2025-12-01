import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Property } from "./types";

interface PropertyFormProps {
  property?: Property;
  onSave: (property: Property) => void;
  onCancel: () => void;
}

export const PropertyForm = ({ property, onSave, onCancel }: PropertyFormProps) => {
  const isEditing = !!property;
  
  const [formData, setFormData] = useState({
    title: property?.title || "",
    price: property?.price?.toString() || "",
    location: property?.location || "",
    type: property?.type || "house",
    status: property?.status || "sale",
    bedrooms: property?.bedrooms?.toString() || "",
    bathrooms: property?.bathrooms?.toString() || "",
    area: property?.area?.toString() || "",
    image: property?.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    description: property?.description || "",
    features: property?.features?.join(", ") || "",
    agentName: property?.agent?.name || "",
    agentPhone: property?.agent?.phone || "",
    agentEmail: property?.agent?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProperty: Property = {
      id: property?.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title: formData.title,
      price: parseFloat(formData.price),
      location: formData.location,
      type: formData.type,
      status: formData.status as "sale" | "rent",
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
      impressions: property?.impressions || 0,
    };

    onSave(newProperty);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[#235C47]">Title *</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-[#235C47]">Price *</Label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-[#235C47]">Location *</Label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-[#235C47]">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-[#235C47]/20">
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[#235C47]">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-[#235C47]/20">
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-[#235C47]">Area (sq ft) *</Label>
            <Input
              name="area"
              type="number"
              value={formData.area}
              onChange={handleChange}
              className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#235C47]">Bedrooms</Label>
              <Input
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#235C47]">Bathrooms</Label>
              <Input
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-[#235C47]">Image URL *</Label>
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-[#235C47]">Description *</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] min-h-[100px]"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-[#235C47]">Features (comma-separated) *</Label>
        <Textarea
          name="features"
          value={formData.features}
          onChange={handleChange}
          className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] min-h-[80px]"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-[#235C47]">Agent Name *</Label>
          <Input
            name="agentName"
            value={formData.agentName}
            onChange={handleChange}
            className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[#235C47]">Agent Phone *</Label>
          <Input
            name="agentPhone"
            value={formData.agentPhone}
            onChange={handleChange}
            className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[#235C47]">Agent Email *</Label>
          <Input
            name="agentEmail"
            type="email"
            value={formData.agentEmail}
            onChange={handleChange}
            className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          className="border-[#235C47] text-[#235C47] hover:bg-[#235C47]/10"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-[#235C47] text-white hover:bg-[#235C47]/90"
        >
          {isEditing ? "Update Property" : "Add Property"}
        </Button>
      </div>
    </form>
  );
};