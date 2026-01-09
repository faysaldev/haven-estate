import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { User, Mail, Phone, MessageSquare } from "lucide-react";
import { useAppSelector } from "@/src/redux/hooks";
import { Property } from "@/src/utils/properties";
import { useCreateRequestViewingMutation } from "@/src/redux/features/Buyer/buyers";
import { toast } from "sonner";

interface RequestInfoDialogProps {
  property: Property;
  trigger: React.ReactNode;
}

export const RequestInfoDialog = ({
  property,
  trigger,
}: RequestInfoDialogProps) => {
  const [createRequestInfo] = useCreateRequestViewingMutation();
  const showLoginToast = useAppSelector((state) => state.auth.showLoginToast);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Extract values from FormData
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    try {
      // Prepare the data in the required format
      const requestData = {
        name,
        email,
        phone,
        message,
        property_id: property._id,
      };

      // Call the createRequestInfo mutation
      const result = await createRequestInfo(requestData).unwrap();

      // Show success message
      toast.success("Information request sent successfully!");
      console.log("Request info result:", result);

      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error sending request info:", error);
      toast.error("Failed to send request. Please try again.");
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
            Request Information
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="info-name" className="text-[#235C47]">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="info-name"
                name="name"
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="info-email" className="text-[#235C47]">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="info-email"
                name="email"
                type="email"
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="info-phone" className="text-[#235C47]">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="info-phone"
                name="phone"
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-[#235C47]">
              Message
            </Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Textarea
                id="message"
                name="message"
                className="pl-10 min-h-[100px] border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your message"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#235C47] hover:bg-[#235C47]/90 text-white mt-4"
          >
            Send Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
