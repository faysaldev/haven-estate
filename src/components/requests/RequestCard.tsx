import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Mail, Phone, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { InfoRequest } from "./types";

interface RequestCardProps {
  request: InfoRequest;
  onStatusChange: (id: string, status: "pending" | "responded") => void;
  onDelete: (id: string) => void;
}

export const RequestCard = ({ request, onStatusChange, onDelete }: RequestCardProps) => {
  return (
    <Card className="border border-[#235C47]/20 bg-[#F9F7F6]">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#235C47] mb-1">
              {request.propertyTitle}
            </h3>
            <Badge
              className={
                request.status === "responded"
                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                  : "bg-[#235C47]/10 text-[#235C47] border border-[#235C47]/20"
              }
              variant="outline"
            >
              {request.status}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#235C47]/20 text-[#235C47] hover:bg-[#235C47]/10"
            onClick={() => onDelete(request.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium text-[#235C47]">Client Information</p>
            <div className="space-y-1 text-sm text-[#235C47]/70">
              <p className="font-medium text-[#235C47]">
                {request.userName}
              </p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href={`mailto:${request.userEmail}`}
                  className="hover:text-[#235C47]"
                >
                  {request.userEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a
                  href={`tel:${request.userPhone}`}
                  className="hover:text-[#235C47]"
                >
                  {request.userPhone}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-[#235C47]">Message</p>
            <p className="text-sm text-[#235C47]/70 bg-white/50 p-4 rounded-lg">
              {request.message}
            </p>
            <p className="text-xs text-[#235C47]/70">
              Received: {format(new Date(request.createdAt), 'MMM dd, yyyy')}
            </p>
          </div>

          {request.status === "pending" && (
            <Button
              size="sm"
              className="bg-[#235C47] text-white hover:bg-[#235C47]/90"
              onClick={() =>
                onStatusChange(request.id, "responded")
              }
            >
              Mark as Responded
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};