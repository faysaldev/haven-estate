"use client";
import AdminLayout from "@/src/layout/AdminLayout";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { MessageSquare, Mail, Phone, Trash2 } from "lucide-react";

const RequestsManagement = () => {
  // Mock info requests data
  const [infoRequests, setInfoRequests] = useState([
    {
      id: "1",
      propertyTitle: "Modern Downtown Apartment",
      userName: "John Smith",
      userEmail: "john.smith@email.com",
      userPhone: "+1 (555) 123-4567",
      message:
        "I'm interested in learning more about this property. Is it still available for viewing this week?",
      status: "pending",
      createdAt: "2024-11-25T10:30:00Z",
    },
    {
      id: "2",
      propertyTitle: "Luxury Waterfront Condo",
      userName: "Sarah Johnson",
      userEmail: "sarah.johnson@email.com",
      userPhone: "+1 (555) 987-6543",
      message:
        "Could you please send me more details about the amenities included in this property?",
      status: "responded",
      createdAt: "2024-11-24T14:22:00Z",
    },
    {
      id: "3",
      propertyTitle: "Suburban Family Home",
      userName: "Michael Brown",
      userEmail: "michael.brown@email.com",
      userPhone: "+1 (555) 456-7890",
      message:
        "What's the process for scheduling a home inspection? I'm very interested in this property.",
      status: "pending",
      createdAt: "2024-11-23T09:15:00Z",
    },
    {
      id: "4",
      propertyTitle: "City Center Loft",
      userName: "Emily Davis",
      userEmail: "emily.davis@email.com",
      userPhone: "+1 (555) 234-5678",
      message:
        "I saw this listing online and would like to know if the price is negotiable.",
      status: "responded",
      createdAt: "2024-11-22T16:45:00Z",
    },
  ]);

  const handleStatusChange = (id: string, status: "pending" | "responded") => {
    setInfoRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this request?")) {
      setInfoRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
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
