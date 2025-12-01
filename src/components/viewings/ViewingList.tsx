import { Calendar } from "lucide-react";
import { PropertyViewing } from "./types";
import { ViewingCard } from "./ViewingCard";

interface ViewingListProps {
  viewings: PropertyViewing[];
  onStatusChange: (
    id: string,
    status: "pending" | "confirmed" | "cancelled"
  ) => void;
  onDelete: (id: string) => void;
}

export const ViewingList = ({
  viewings,
  onStatusChange,
  onDelete,
}: ViewingListProps) => {
  if (viewings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-[#F9F7F6] p-6 rounded-full mb-4">
          <Calendar className="w-12 h-12 text-[#235C47]/70" />
        </div>
        <h3 className="text-xl font-semibold text-[#235C47] mb-2">
          No scheduled viewings yet
        </h3>
        <p className="text-[#235C47]/70 max-w-md text-center">
          You don{`'`}t have any scheduled viewings at the moment. When clients
          schedule viewings, they{`'`}ll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {viewings.map((viewing) => (
        <ViewingCard
          key={viewing.id}
          viewing={viewing}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
