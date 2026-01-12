import { Badge } from "@/src/components/ui/badge";

interface BookingStatusBadgeProps {
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export const BookingStatusBadge = ({ status }: BookingStatusBadgeProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-[#235C47]/10 text-[#235C47] border border-[#235C47]/20";
    }
  };

  return (
    <Badge className={getStatusColor(status)} variant="outline">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};
