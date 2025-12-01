import { useState, useRef, ChangeEvent } from "react";
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
import { Agent } from "./Agent";

interface PropertyFormProps {
  property?: Property;
  onSave: (property: Property) => void;
  onCancel: () => void;
}

export const PropertyForm = ({ property, onSave, onCancel }: PropertyFormProps) => {
  const isEditing = !!property;

  // Sample agents data - in a real app, this would come from an API
  const agents: Agent[] = [
    {
      id: "1",
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john.smith@realestate.com",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      email: "sarah.j@realestate.com",
    },
    {
      id: "3",
      name: "Michael Brown",
      phone: "+1 (555) 456-7890",
      email: "m.brown@realestate.com",
    },
    {
      id: "4",
      name: "Emily Davis",
      phone: "+1 (555) 234-5678",
      email: "emily.d@realestate.com",
    },
    {
      id: "5",
      name: "Robert Wilson",
      phone: "+1 (555) 876-5432",
      email: "robert.w@realestate.com",
    },
  ];

  const [selectedAgentId, setSelectedAgentId] = useState(property?.agent?.id || agents[0]?.id || "");

  const [title, setTitle] = useState(property?.title || "");
  const [price, setPrice] = useState(property?.price?.toString() || "");
  const [location, setLocation] = useState(property?.location || "");
  const [type, setType] = useState(property?.type || "house");
  const [status, setStatus] = useState(property?.status || "sale");
  const [bedrooms, setBedrooms] = useState(property?.bedrooms?.toString() || "");
  const [bathrooms, setBathrooms] = useState(property?.bathrooms?.toString() || "");
  const [area, setArea] = useState(property?.area?.toString() || "");
  const [description, setDescription] = useState(property?.description || "");
  const [features, setFeatures] = useState(property?.features?.join(", ") || "");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    property?.images || (property?.image ? [property.image] : [])
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newFiles = [...imageFiles, ...files];

      // Limit to 8 images total
      if (newFiles.length > 8) {
        alert("You can upload a maximum of 8 images");
        return;
      }

      // Update file list
      setImageFiles(newFiles);

      // Create previews
      const newPreviews = [...imagePreviews];
      files.forEach(file => {
        const previewUrl = URL.createObjectURL(file);
        newPreviews.push(previewUrl);
      });

      setImagePreviews(newPreviews);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImagePreviews = [...imagePreviews];
    const newImageFiles = [...imageFiles];

    // Remove the preview and file
    newImagePreviews.splice(index, 1);
    newImageFiles.splice(index, 1);

    setImagePreviews(newImagePreviews);
    setImageFiles(newImageFiles);

    // Release object URLs to free memory
    URL.revokeObjectURL(imagePreviews[index]);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Find the selected agent
    const selectedAgent = agents.find(agent => agent.id === selectedAgentId);

    if (!selectedAgent) {
      alert("Please select an agent");
      return;
    }

    // Create FormData to send to the backend
    const formData = new FormData();

    // Add text fields to FormData
    formData.append("title", title);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("type", type);
    formData.append("status", status);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("area", area);
    formData.append("description", description);
    formData.append("features", features);
    formData.append("agentId", selectedAgent.id);
    formData.append("agentName", selectedAgent.name);
    formData.append("agentPhone", selectedAgent.phone);
    formData.append("agentEmail", selectedAgent.email);

    // Add image files to FormData
    imageFiles.forEach((file, index) => {
      formData.append("images", file);
    });

    // Log the form data for debugging (remove in production if not needed)
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Create the property object based on the form data
    const newProperty: Property = {
      id: property?.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title,
      price: parseFloat(price),
      location,
      type,
      status: status as "sale" | "rent",
      bedrooms: bedrooms ? parseInt(bedrooms) : 0,
      bathrooms: bathrooms ? parseInt(bathrooms) : 0,
      area: parseFloat(area),
      // Use the first image as the main image
      image: imagePreviews.length > 0 ? imagePreviews[0] : "",
      // Add the rest of images if there are more than one
      images: imagePreviews.length > 1 ? imagePreviews.slice(1) : undefined,
      description,
      features: features.split(",").map((f) => f.trim()),
      agent: selectedAgent,
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#235C47]">Price *</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#235C47]">Location *</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#235C47]">Type</Label>
            <Select
              value={type}
              onValueChange={setType}
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
              value={status}
              onValueChange={setStatus}
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
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#235C47]">Bedrooms</Label>
              <Input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#235C47]">Bathrooms</Label>
              <Input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#235C47]">Property Images (Max 8) *</Label>
            <div
              className="border-2 border-dashed border-[#235C47]/30 rounded-lg p-6 text-center cursor-pointer bg-[#F9F7F6]/30 hover:bg-[#F9F7F6]/50 transition-colors"
              onClick={triggerFileInput}
            >
              <p className="text-[#235C47]/70 mb-1">Click to upload images</p>
              <p className="text-[#235C47]/50 text-sm">JPG, PNG (Max 8 files)</p>
            </div>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
              multiple
            />
          </div>
        </div>
      </div>

      {/* Image previews */}
      {imagePreviews.length > 0 && (
        <div className="space-y-4">
          <Label className="text-[#235C47]">Selected Images</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-[#235C47]/20"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-[#235C47]">Description *</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] min-h-[100px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-[#235C47]">Features (comma-separated) *</Label>
        <Textarea
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] min-h-[80px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-[#235C47]">Agent *</Label>
        <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
          <SelectTrigger className="border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47]">
            <SelectValue placeholder="Select an agent" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#235C47]/20">
            {agents.map((agent) => (
              <SelectItem key={agent.id} value={agent.id}>
                {agent.name} - {agent.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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