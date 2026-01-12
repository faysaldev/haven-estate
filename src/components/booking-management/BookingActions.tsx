import { Button } from "@/src/components/ui/button";

interface BookingActionsProps {
  bookingId: string;
  onStatusChange: (
    id: string,
    status: "pending" | "confirmed" | "completed" | "cancelled"
  ) => void;
}

export const BookingActions = ({
  bookingId,
  onStatusChange,
}: BookingActionsProps) => {
  return (
    <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3 justify-end">
      <Button
        variant="outline"
        className="border-[#235C47] text-[#235C47] hover:bg-[#235C47]/10"
        onClick={() => onStatusChange(bookingId, "cancelled")}
      >
        Cancel Booking
      </Button>
      <Button
        className="bg-[#235C47] text-white hover:bg-[#235C47]/90"
        onClick={() => onStatusChange(bookingId, "confirmed")}
      >
        Confirm Booking
      </Button>
    </div>
  );
};
