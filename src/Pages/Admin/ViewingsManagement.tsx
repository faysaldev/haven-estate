import AdminLayout from "@/src/layout/AdminLayout";
import { useAppData } from "@/contexts/AppDataContext";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Calendar, Mail, Phone, Trash2 } from "lucide-react";

const ViewingsManagement = () => {
  const { scheduledViewings, updateViewingStatus, deleteViewing } =
    useAppData();

  const handleStatusChange = (
    id: string,
    status: "pending" | "confirmed" | "cancelled"
  ) => {
    updateViewingStatus(id, status);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this viewing?")) {
      deleteViewing(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-serif font-bold">Scheduled Viewings</h1>
          <p className="text-muted-foreground mt-1">
            Manage property viewing appointments
          </p>
        </div>

        <div className="grid gap-6">
          {scheduledViewings.length === 0 ? (
            <Card className="card-shadow">
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No scheduled viewings yet
                </p>
              </CardContent>
            </Card>
          ) : (
            scheduledViewings.map((viewing) => (
              <Card key={viewing.id} className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-serif font-bold mb-1">
                        {viewing.propertyTitle}
                      </h3>
                      <Badge
                        className={getStatusColor(viewing.status)}
                        variant="outline"
                      >
                        {viewing.status}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(viewing.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <p className="font-medium">Client Information</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">
                          {viewing.userName}
                        </p>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <a
                            href={`mailto:${viewing.userEmail}`}
                            className="hover:text-primary"
                          >
                            {viewing.userEmail}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <a
                            href={`tel:${viewing.userPhone}`}
                            className="hover:text-primary"
                          >
                            {viewing.userPhone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Viewing Details</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {viewing.date} at {viewing.time}
                          </span>
                        </div>
                        <p>
                          Requested:{" "}
                          {new Date(viewing.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {viewing.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleStatusChange(viewing.id, "confirmed")
                        }
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(viewing.id, "cancelled")
                        }
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewingsManagement;
