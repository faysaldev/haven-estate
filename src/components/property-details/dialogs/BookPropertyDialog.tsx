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
import { User, Mail, Phone, DollarSign, Calendar } from "lucide-react";
import { Property } from "../types";

interface BookPropertyDialogProps {
  property: Property;
  trigger: React.ReactNode;
}

export const BookPropertyDialog = ({ property, trigger }: BookPropertyDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState(property.price.toString());

  const formatPrice = (price: number) => {
    if (property.status === "rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ name, email, phone, date, price });
    // Reset form after submission
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setPrice(property.price.toString());
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-[#235C47]/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-[#235C47]">
            Book Property
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="book-name" className="text-[#235C47]">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="book-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="book-email" className="text-[#235C47]">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="book-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="book-phone" className="text-[#235C47]">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="book-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="book-date" className="text-[#235C47]">Booking Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="book-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="book-price" className="text-[#235C47]">Price</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="book-price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter price"
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