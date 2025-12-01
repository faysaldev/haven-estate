import { Booking } from "./types";
import { BookingCard } from "./BookingCard";
import { CreditCard } from "lucide-react";

interface BookingListProps {
  bookings: Booking[];
  onStatusChange: (
    id: string,
    status: "pending" | "confirmed" | "cancelled"
  ) => void;
  onDelete: (id: string) => void;
}

export const BookingList = ({
  bookings,
  onStatusChange,
  onDelete,
}: BookingListProps) => {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-[#F9F7F6] p-6 rounded-full mb-4">
          <CreditCard className="w-12 h-12 text-[#235C47]/70" />
        </div>
        <h3 className="text-xl font-semibold text-[#235C47] mb-2">
          No bookings yet
        </h3>
        <p className="text-[#235C47]/70 max-w-md text-center">
          You don{`'`}t have any bookings at the moment. When new bookings are
          made, they{`'`}ll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
