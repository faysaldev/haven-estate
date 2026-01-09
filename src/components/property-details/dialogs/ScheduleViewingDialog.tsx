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
import { Calendar, Clock, User, Mail, Phone } from "lucide-react";
import { useAppSelector } from "@/src/redux/hooks";
import { Property } from "@/src/utils/properties";
import { useCreateScheduleViewingMutation } from "@/src/redux/features/Buyer/buyers";
import { toast } from "sonner";

interface ScheduleViewingDialogProps {
  property: Property;
  trigger: React.ReactNode;
}

export const ScheduleViewingDialog = ({
  property,
  trigger,
}: ScheduleViewingDialogProps) => {
  const [createScheduleView] = useCreateScheduleViewingMutation();
  const showLoginToast = useAppSelector((state) => state.auth.showLoginToast);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Extract values from FormData
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const view_date = formData.get("view_date") as string;
    const view_time = formData.get("view_time") as string;

    try {
      // Prepare the data in the required format
      const scheduleData = {
        name,
        email,
        phone,
        view_date,
        view_time,
        property_id: property._id,
      };

      // Call the createScheduleView mutation
      const result = await createScheduleView(scheduleData).unwrap();

      // Show success message
      toast.success("Viewing scheduled successfully!");
      console.log("Schedule viewing result:", result);

      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error scheduling viewing:", error);
      toast.error("Failed to schedule viewing. Please try again.");
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
            Schedule a Viewing
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#235C47]">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="name"
                name="name"
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#235C47]">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="email"
                name="email"
                type="email"
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#235C47]">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
              <Input
                id="phone"
                name="phone"
                className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="view_date" className="text-[#235C47]">
                Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
                <Input
                  id="view_date"
                  name="view_date"
                  type="date"
                  className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="view_time" className="text-[#235C47]">
                Time
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-4 h-4 text-[#235C47]/60" />
                <Input
                  id="view_time"
                  name="view_time"
                  type="time"
                  className="pl-10 border-[#235C47]/20 focus:border-[#235C47] focus:ring-[#235C47] bg-[#F9F7F6]"
                  required
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#235C47] hover:bg-[#235C47]/90 text-white mt-4"
          >
            Schedule Viewing
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
