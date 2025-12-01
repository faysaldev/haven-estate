import { Card, CardContent } from "@/src/components/ui/card";
import { MessageSquare } from "lucide-react";
import { InfoRequest } from "./types";
import { RequestCard } from "./RequestCard";

interface RequestListProps {
  requests: InfoRequest[];
  onStatusChange: (id: string, status: "pending" | "responded") => void;
  onDelete: (id: string) => void;
}

export const RequestList = ({
  requests,
  onStatusChange,
  onDelete,
}: RequestListProps) => {
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-[#F9F7F6] p-6 rounded-full mb-4">
          <MessageSquare className="w-12 h-12 text-[#235C47]/70" />
        </div>
        <h3 className="text-xl font-semibold text-[#235C47] mb-2">
          No information requests yet
        </h3>
        <p className="text-[#235C47]/70 max-w-md text-center">
          You don{`'`}t have any information requests at the moment. When
          clients send requests, they{`'`}ll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
