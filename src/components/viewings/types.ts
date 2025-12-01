export interface PropertyViewing {
  id: string;
  propertyTitle: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}