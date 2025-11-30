import AdminLayout from "@/src/layout/AdminLayout";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { CreditCard, Mail, Phone, Trash2, Calendar } from "lucide-react";

const BookingsManagement = () => {
  // Mock booking data
  const [bookings, setBookings] = useState([
    {
      id: "1",
      propertyTitle: "Modern Downtown Apartment",
      userName: "John Smith",
      userEmail: "john.smith@email.com",
      userPhone: "+1 (555) 123-4567",
      moveInDate: "2024-12-15",
      amount: 2450,
      status: "pending",
      createdAt: "2024-11-20T10:30:00Z"
    },
    {
      id: "2",
      propertyTitle: "Luxury Waterfront Condo",
      userName: "Sarah Johnson",
      userEmail: "sarah.johnson@email.com",
      userPhone: "+1 (555) 987-6543",
      moveInDate: "2024-12-20",
      amount: 3200,
      status: "confirmed",
      createdAt: "2024-11-18T14:22:00Z"
    },
    {
      id: "3",
      propertyTitle: "Suburban Family Home",
      userName: "Michael Brown",
      userEmail: "michael.brown@email.com",
      userPhone: "+1 (555) 456-7890",
      moveInDate: "2024-12-25",
      amount: 1850,
      status: "cancelled",
      createdAt: "2024-11-22T09:15:00Z"
    },
    {
      id: "4",
      propertyTitle: "City Center Loft",
      userName: "Emily Davis",
      userEmail: "emily.davis@email.com",
      userPhone: "+1 (555) 234-5678",
      moveInDate: "2025-01-10",
      amount: 2800,
      status: "pending",
      createdAt: "2024-11-25T16:45:00Z"
    }
  ]);

  const handleStatusChange = (
    id: string,
    status: "pending" | "confirmed" | "cancelled"
  ) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setBookings(prevBookings =>
        prevBookings.filter(booking => booking.id !== id)
      );
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
          <h1 className="text-4xl font-serif font-bold">Bookings</h1>
          <p className="text-muted-foreground mt-1">
            Manage property bookings and reservations
          </p>
        </div>

        <div className="grid gap-6">
          {bookings.length === 0 ? (
            <Card className="card-shadow">
              <CardContent className="p-12 text-center">
                <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No bookings yet</p>
              </CardContent>
            </Card>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-serif font-bold mb-1">
                        {booking.propertyTitle}
                      </h3>
                      <Badge
                        className={getStatusColor(booking.status)}
                        variant="outline"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(booking.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <p className="font-medium">Client Information</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">
                          {booking.userName}
                        </p>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <a
                            href={`mailto:${booking.userEmail}`}
                            className="hover:text-primary"
                          >
                            {booking.userEmail}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <a
                            href={`tel:${booking.userPhone}`}
                            className="hover:text-primary"
                          >
                            {booking.userPhone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Booking Details</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Move-in: {booking.moveInDate}</span>
                        </div>
                        <p className="text-lg font-bold text-primary">
                          ${booking.amount.toLocaleString()}
                        </p>
                        <p>
                          Booked:{" "}
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {booking.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleStatusChange(booking.id, "confirmed")
                        }
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(booking.id, "cancelled")
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

export default BookingsManagement;
