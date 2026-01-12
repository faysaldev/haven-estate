export interface Booking {
  id: string;
  propertyTitle: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  moveInDate: string;
  amount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}