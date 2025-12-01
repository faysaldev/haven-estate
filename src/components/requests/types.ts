export interface InfoRequest {
  id: string;
  propertyTitle: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  message: string;
  status: "pending" | "responded";
  createdAt: string;
}