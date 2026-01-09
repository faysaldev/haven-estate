/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { AgentsResponse } from "./Agent";
import {
  useCreatePropertiesMutation,
  useUpdatePropertiesMutation,
} from "@/src/redux/features/Admin/Properties/propertiesApi";
import { useGetAgentsQuery } from "@/src/redux/features/Admin/Generals/generalApi";
import Image from "next/image";
import { XIcon } from "lucide-react";

interface PropertyFormProps {
  property?: Property;
  onSave: (property: Property) => void;
  onCancel: () => void;
}

export const PropertyForm = ({
  property,
  onSave,
  onCancel,
}: PropertyFormProps) => {
  const isEditing = !!property;
  const {
    data: allAgents,
    isLoading: agentsLoading,
    isError: agentsError,
  } = useGetAgentsQuery({});
  const [selectedAgentId, setSelectedAgentId] = useState(
    property?.agent?.id || ""
  );
  const [createProperties] = useCreatePropertiesMutation();
  const [updateProperty] = useUpdatePropertiesMutation();

  const [title, setTitle] = useState(property?.title || "");
  const [price, setPrice] = useState(property?.price?.toString() || "");
  const [location, setLocation] = useState(property?.location || "");
  const [type, setType] = useState(property?.type || "house");
  const [status, setStatus] = useState(property?.status || "sale");
  const [bedrooms, setBedrooms] = useState(
    property?.bedrooms?.toString() || ""
  );
  const [bathrooms, setBathrooms] = useState(
    property?.bathrooms?.toString() || ""
  );
  const [area, setArea] = useState(property?.area?.toString() || "");
  const [description, setDescription] = useState(property?.description || "");
  const [features, setFeatures] = useState(
    property?.features?.join(", ") || ""
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    property?.images || (property?.image ? [property.image] : [])
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Calculate total images after adding new ones
      const totalImagesAfterUpload = imagePreviews.length + files.length;

      // Limit to 8 images total
      if (totalImagesAfterUpload > 8) {
        alert(
          `You can upload a maximum of 8 images. You can add up to ${
            8 - imagePreviews.length
          } more image(s).`
        );
        return;
      }

      const newFiles = [...imageFiles, ...files];

      // Update file list
      setImageFiles(newFiles);

      // Create previews
      const newPreviews = [...imagePreviews];
      files.forEach((file) => {
        const previewUrl = URL.createObjectURL(file);
        newPreviews.push(previewUrl);
      });

      setImagePreviews(newPreviews);
    }
  };

  const handleRemoveImage = (index: number) => {
    // Prevent removing the last image if there's only one
    if (imagePreviews.length <= 1) {
      alert("You must have at least 1 image for the property");
      return;
    }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that there's at least 1 image
    if (imagePreviews.length < 1) {
      alert("You must have at least 1 image for the property");
      return;
    }

    // Find the selected agent
    const selectedAgent = allAgents.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (agent: any) => agent._id === selectedAgentId
    );

    if (!selectedAgent) {
      alert("Please select an agent");
      return;
    }

    // If editing, log the changes
    if (isEditing && property) {
      const changes: Record<string, any> = {};

      if (title !== property.title) changes.title = title;
      if (price !== property.price?.toString()) changes.price = price;
      if (location !== property.location) changes.location = location;
      if (type !== property.type) changes.type = type;
      if (status !== property.status) changes.status = status;
      if (bedrooms !== property.bedrooms?.toString())
        changes.bedrooms = bedrooms;
      if (bathrooms !== property.bathrooms?.toString())
        changes.bathrooms = bathrooms;
      if (area !== property.area?.toString()) changes.area = area;
      if (description !== property.description)
        changes.description = description;
      if (features !== property.features?.join(", "))
        changes.features = features;
      if (selectedAgentId !== property.agent?.id)
        changes.agent = selectedAgent._id;

      // Check if images have changed
      if (imageFiles.length > 0) {
        changes.images = imageFiles; // New images added
      } else if (
        JSON.stringify(imagePreviews) !==
        JSON.stringify(
          property?.images || (property?.image ? [property.image] : [])
        )
      ) {
        changes.images = imagePreviews; // Images were modified
      }

      console.log("Updated fields:", changes);
    }

    try {
      console.log(isEditing, property);
      if (isEditing && property) {
        console.log("im calling");
        // For updates, only send changed fields
        const formData = new FormData();
        const changes: Record<string, any> = {};

        if (title !== property.title) {
          formData.append("title", title);
          changes.title = title;
        }
        if (price !== property.price?.toString()) {
          formData.append("price", price);
          changes.price = price;
        }
        if (location !== property.location) {
          formData.append("location", location);
          changes.location = location;
        }
        if (type !== property.type) {
          formData.append("type", type);
          changes.type = type;
        }
        if (status !== property.status) {
          formData.append("status", status);
          changes.status = status;
        }
        if (bedrooms !== property.bedrooms?.toString()) {
          formData.append("bedrooms", bedrooms);
          changes.bedrooms = bedrooms;
        }
        if (bathrooms !== property.bathrooms?.toString()) {
          formData.append("bathrooms", bathrooms);
          changes.bathrooms = bathrooms;
        }
        if (area !== property.area?.toString()) {
          formData.append("area", area);
          changes.area = area;
        }
        if (description !== property.description) {
          formData.append("description", description);
          changes.description = description;
        }
        if (features !== property.features?.join(", ")) {
          formData.append("features", features);
          changes.features = features;
        }
        if (selectedAgentId !== property.agent?.id) {
          formData.append("agent", selectedAgent._id);
          changes.agent = selectedAgent._id;
        }

        // Check if images have changed
        if (imageFiles.length > 0) {
          // New images added
          imageFiles.forEach((file) => {
            formData.append("image", file);
          });
          changes.images = imageFiles;
        } else if (
          JSON.stringify(imagePreviews) !==
          JSON.stringify(
            property?.images || (property?.image ? [property.image] : [])
          )
        ) {
          // Images were modified (some removed)
          changes.images = imagePreviews;
        }

        console.log("this is me calling everything");
        // Call the updateProperty mutation with only changed fields
        const result = await updateProperty({
          id: property._id,
          data: formData,
        }).unwrap();
        console.log("Property updated successfully:", result);
        onSave(result); // Call onSave with the updated property
      } else {
        // For creates, send all fields
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
        formData.append("agent", selectedAgent._id);

        // Add image files to FormData
        imageFiles.forEach((file) => {
          formData.append("image", file);
        });

        // Call the createProperties mutation
        const result = await createProperties(formData).unwrap();
        console.log("Property created successfully:", result);
        onSave(result); // Call onSave with the created property
      }
    } catch (error) {
      console.error(
        isEditing ? "Failed to update property:" : "Failed to create property:",
        error
      );
      alert(
        isEditing
          ? "Failed to update property. Please try again."
          : "Failed to create property. Please try again."
      );
    }
  };

  if (agentsLoading) return <div>Loading agents...</div>;
  if (agentsError) return <div>Error loading agents</div>;

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
              onValueChange={(
                value: "house" | "apartment" | "condo" | "land"
              ) => setType(value)}
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
              onValueChange={(value: "sale" | "rent") => setStatus(value)}
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
              <p className="text-[#235C47]/50 text-sm">
                JPG, PNG (Max 8 files)
              </p>
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
                <Image
                  width={400}
                  height={200}
                  src={
                    preview.startsWith("blob:")
                      ? preview // For new image files
                      : preview.startsWith("http")
                      ? preview // For full URLs
                      : preview // For API image paths
                  }
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-[#235C47]/20"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
                >
                  <XIcon className="h-4 w-4" />
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
            {allAgents.map((agent: AgentsResponse) => (
              <SelectItem key={agent._id} value={agent._id}>
                {agent.name} - {agent.email?.trim()}
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
