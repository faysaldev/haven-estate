import { Button } from "@/src/components/ui/button";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { BookingActions } from "./BookingActions";
import { Mail, Phone, Calendar, User, DollarSign, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Booking } from "./types";

interface BookingCardProps {
  booking: Booking;
  onStatusChange: (
    id: string,
    status: "pending" | "confirmed" | "cancelled"
  ) => void;
  onDelete: (id: string) => void;
}

export const BookingCard = ({
  booking,
  onStatusChange,
  onDelete,
}: BookingCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#235C47] mb-2">
              {booking.propertyTitle}
            </h3>
            <BookingStatusBadge status={booking.status} />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#235C47]/20 text-[#235C47] hover:bg-[#235C47]/10 hover:text-[#235C47]"
            onClick={() => onDelete(booking.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-[#235C47]/80 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Client Information
              </h4>
              <div className="space-y-2 pl-1">
                <p className="font-medium text-[#235C47]">{booking.userName}</p>
                <div className="flex items-center gap-2 text-[#235C47]/70">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a
                    href={`mailto:${booking.userEmail}`}
                    className="hover:text-[#235C47] transition-colors underline break-all"
                  >
                    {booking.userEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[#235C47]/70">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a
                    href={`tel:${booking.userPhone}`}
                    className="hover:text-[#235C47] transition-colors underline break-all"
                  >
                    {booking.userPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-[#235C47]/80 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Booking Details
              </h4>
              <div className="space-y-2 pl-1">
                <div className="flex items-center gap-2 text-[#235C47]/70">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>
                    Move-in:{" "}
                    {format(new Date(booking.moveInDate), "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#235C47]/70">
                  <DollarSign className="w-4 h-4 flex-shrink-0" />
                  <span className="text-lg font-bold text-[#235C47]">
                    ${booking.amount.toLocaleString()}
                  </span>
                </div>
                <p className="text-[#235C47]/70">
                  Booked: {format(new Date(booking.createdAt), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {booking.status === "pending" && (
          <BookingActions
            bookingId={booking.id}
            onStatusChange={onStatusChange}
          />
        )}
      </div>
    </div>
  );
};
