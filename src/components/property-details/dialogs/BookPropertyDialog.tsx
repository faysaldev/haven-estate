import { useRef } from "react";
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
import { useAppSelector } from "@/src/redux/hooks";
import { Property } from "@/src/utils/properties";

interface BookPropertyDialogProps {
  property: Property;
  trigger: React.ReactNode;
}

export const BookPropertyDialog = ({
  property,
  trigger,
}: BookPropertyDialogProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const showLoginToast = useAppSelector((state) => state.auth.showLoginToast);

  const formatPrice = (price: number) => {
    if (property.status === "rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get values from refs
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const phone = phoneRef.current?.value || "";
    const date = dateRef.current?.value || "";
    const price = priceRef.current?.value || property.price.toString();

    // Log the form values
    console.log({ name, email, phone, date, price });

    // Reset the form
    if (e.target instanceof HTMLFormElement) {
      e.target.reset();
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
                ref={nameRef}
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
                type="email"
                ref={emailRef}
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
                ref={phoneRef}
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="book-date" className="text-[#235C47]">
              Booking Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="book-date"
                type="date"
                ref={dateRef}
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="book-price" className="text-[#235C47]">
              Price
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="book-price"
                type="number"
                ref={priceRef}
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter price"
                defaultValue={property.price.toString()}
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
