"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useGetProfilesQuery,
  useUpdateProfileMutation,
} from "@/src/redux/features/Buyer/buyers";
import { toast } from "sonner";

interface UserSettings {
  name: string;
  email: string;
  phone: string;
  notifications: boolean;
  newsletter: boolean;
}

const GeneralSettingsPage = () => {
  const { data: profileData, isLoading } = useGetProfilesQuery({});
  const [updateProfile] = useUpdateProfileMutation();
  const router = useRouter();
  const [formData, setFormData] = useState<UserSettings>({
    name: "",
    email: "",
    phone: "",
    notifications: true,
    newsletter: false,
  });

  // Initialize form data when profile data is loaded
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        phone: profileData.phoneNumber || "",
        notifications: true, // Default to true
        newsletter: false, // Default to false
      });
    }
  }, [profileData]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSaving(true);
      try {
        // Call the updateProfile mutation with the form data
        await updateProfile({
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
        }).unwrap();

        toast.success("Settings updated successfully!");
      } catch (error) {
        console.error("Failed to update profile:", error);
        toast.error("Failed to update settings. Please try again.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#235C47]">
            General Settings
          </h1>
          <p className="text-[#235C47]/80 mt-2">
            Manage your account preferences
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#235C47]/20 max-w-2xl">
          <p className="text-center text-[#235C47]/70">
            Loading profile data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#235C47]">
          General Settings
        </h1>
        <p className="text-[#235C47]/80 mt-2">
          Manage your account preferences
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-[#235C47]/20 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#235C47] mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#235C47]/50 ${
                errors.name ? "border-red-500" : "border-[#235C47]/30"
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#235C47] mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#235C47]/50 ${
                errors.email ? "border-red-500" : "border-[#235C47]/30"
              }`}
              placeholder="Enter your email address"
              disabled // Email should typically not be editable directly
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#235C47] mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#235C47]/50 ${
                errors.phone ? "border-red-500" : "border-[#235C47]/30"
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-[#235C47]">
                  Email Notifications
                </h3>
                <p className="text-sm text-[#235C47]/70">
                  Receive email notifications for property updates
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#235C47]"></div>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => router.push("/buyer")}
              className="px-6 py-2 border border-[#235C47] text-[#235C47] rounded-md hover:bg-[#F9F7F6] focus:outline-none focus:ring-2 focus:ring-[#235C47]/50"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#235C47] text-white rounded-md hover:bg-[#235C47]/90 focus:outline-none focus:ring-2 focus:ring-[#235C47]/50 disabled:opacity-50"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneralSettingsPage;
