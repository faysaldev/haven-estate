import AdminLayout from "@/src/layout/AdminLayout";
import { ReactNode } from "react";

export default function AdminLayoutWrapper({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}