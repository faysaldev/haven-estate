import AdminLayout from "@/src/layout/AdminLayout";
import { useAppData } from "@/contexts/AppDataContext";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { MessageSquare, Mail, Phone, Trash2 } from "lucide-react";

const RequestsManagement = () => {
  const { infoRequests, updateRequestStatus, deleteRequest } = useAppData();

  const handleStatusChange = (id: string, status: "pending" | "responded") => {
    updateRequestStatus(id, status);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this request?")) {
      deleteRequest(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-serif font-bold">Info Requests</h1>
          <p className="text-muted-foreground mt-1">
            Manage property information requests
          </p>
        </div>

        <div className="grid gap-6">
          {infoRequests.length === 0 ? (
            <Card className="card-shadow">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No information requests yet
                </p>
              </CardContent>
            </Card>
          ) : (
            infoRequests.map((request) => (
              <Card key={request.id} className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-serif font-bold mb-1">
                        {request.propertyTitle}
                      </h3>
                      <Badge
                        className={
                          request.status === "responded"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        }
                        variant="outline"
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(request.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="font-medium">Client Information</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">
                          {request.userName}
                        </p>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <a
                            href={`mailto:${request.userEmail}`}
                            className="hover:text-primary"
                          >
                            {request.userEmail}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <a
                            href={`tel:${request.userPhone}`}
                            className="hover:text-primary"
                          >
                            {request.userPhone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Message</p>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                        {request.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Received:{" "}
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {request.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          handleStatusChange(request.id, "responded")
                        }
                      >
                        Mark as Responded
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default RequestsManagement;
