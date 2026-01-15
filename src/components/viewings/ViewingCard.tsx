import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Calendar, Mail, Phone, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { PropertyViewing } from "./types";

interface ViewingCardProps {
  viewing: PropertyViewing;
  onStatusChange: (
    id: string,
    status: "Scheduled" | "Completed" | "Cancelled"
  ) => void;
  onDelete: (id: string) => void;
}

export const ViewingCard = ({
  viewing,
  onStatusChange,
  onDelete,
}: ViewingCardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getStatusColor = (status: string) => {
    // "Scheduled" | "Completed" | "Cancelled";
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-[#235C47]/10 text-[#235C47] border border-[#235C47]/20";
    }
  };

  const handleDelete = () => {
    onDelete(viewing.id);
    setShowDeleteModal(false);
  };

  return (
    <Card className="border border-[#235C47]/20 bg-[#F9F7F6]">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#235C47] mb-1">
              {viewing.propertyTitle}
            </h3>
            <Badge className={getStatusColor(viewing.status)} variant="outline">
              {viewing.status}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#235C47]/20 text-[#235C47] hover:bg-[#235C47]/10"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <p className="font-medium text-[#235C47]">Client Information</p>
            <div className="space-y-1 text-sm text-[#235C47]/70">
              <p className="font-medium text-[#235C47]">{viewing.userName}</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href={`mailto:${viewing.userEmail}`}
                  className="hover:text-[#235C47]"
                >
                  {viewing.userEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a
                  href={`tel:${viewing.userPhone}`}
                  className="hover:text-[#235C47]"
                >
                  {viewing.userPhone}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-[#235C47]">Viewing Details</p>
            <div className="space-y-1 text-sm text-[#235C47]/70">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(new Date(viewing.date), "MMM dd, yyyy")} at{" "}
                  {viewing.time}
                </span>
              </div>
              <p>
                Requested: {format(new Date(viewing.createdAt), "MMM dd, yyyy")}
              </p>
            </div>
          </div>
        </div>

        {viewing.status === "Scheduled" && (
          <div className="flex gap-2 cursor-pointer">
            <Button
              size="sm"
              className="bg-[#235C47] text-white hover:bg-[#235C47]/90"
              onClick={() => onStatusChange(viewing.id, "Completed")}
            >
              Completed
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-[#235C47] text-[#235C47] hover:bg-[#235C47]/10"
              onClick={() => onStatusChange(viewing.id, "Cancelled")}
            >
              Cancel
            </Button>
          </div>
        )}

        {/* Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-[#235C47] mb-2">
                Confirm Deletion
              </h3>
              <p className="text-[#235C47]/70 mb-6">
                Are you sure you want to delete this viewing for {`"`}
                {viewing.propertyTitle}
                {`"`}? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  className="border-[#235C47] text-[#235C47] hover:bg-[#F9F7F6]"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#235C47] text-white hover:bg-[#235C47]/90"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
