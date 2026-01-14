/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { User, Mail, Phone, DollarSign } from "lucide-react";
import { useAppSelector } from "@/src/redux/hooks";
import { Property } from "@/src/utils/properties";
import { useCreateBookingRequestMutation } from "@/src/redux/features/Buyer/buyers";
import { toast } from "sonner";

interface BookPropertyDialogProps {
  property: Property;
  trigger: React.ReactNode;
}

export const BookPropertyDialog = ({
  property,
  trigger,
}: BookPropertyDialogProps) => {
  const [createBooking] = useCreateBookingRequestMutation();
  const showLoginToast = useAppSelector((state) => state.auth.showLoginToast);

  const formatPrice = (price: number) => {
    if (property.status === "rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Extract values from FormData
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const amount = formData.get("amount") as string;

    // Validate that amount doesn't exceed property price
    const amountValue = parseFloat(amount);
    if (amountValue > property.price) {
      toast.error(
        `Amount cannot exceed property price of $${property.price.toLocaleString()}`
      );
      return;
    }

    try {
      // Prepare the data in the required format
      const bookingData = {
        name,
        email,
        phone,
        property: property._id,
        amount: amountValue,
      };

      // Call the createBooking mutation
      const result = await createBooking(bookingData).unwrap();

      // Check if result contains a URL for redirect
      if (result.data && result.data.url) {
        // Redirect to the payment URL
        window.location.href = result.data.url;
      } else {
        // Show success message if no redirect URL
        toast.success(result.message || "Property booked successfully!");
        console.log("Booking result:", result);

        // Reset the form
        form.reset();
      }
    } catch (error: any) {
      toast.error(
        error?.data?.error || "Failed to book property. Please try again."
      );
    }
  };

  // Don't render the dialog if login toast is showing
  if (showLoginToast) {
    return <>{trigger}</>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-[#235C47]/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-[#235C47]">
            Book Property
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="book-name" className="text-[#235C47]">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="book-name"
                name="name"
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="book-email" className="text-[#235C47]">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="book-email"
                name="email"
                type="email"
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="book-phone" className="text-[#235C47]">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="book-phone"
                name="phone"
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="book-amount" className="text-[#235C47]">
              Advanced Amount
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="book-amount"
                name="amount"
                type="number"
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter amount"
                min="1"
                max={property.price.toString()}
                required
              />
            </div>
            <p className="text-sm text-[#235C47]/70">
              Property price: {formatPrice(property.price)}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#235C47] hover:bg-[#235C47]/90 text-white mt-4"
          >
            Book Property
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
