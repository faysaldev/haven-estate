import AdminLayout from "@/src/layout/AdminLayout";
import ProtectedProvider from "@/src/Provider/ProtectedProvider";
import { ReactNode } from "react";

export default function AdminLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedProvider allowedRoles={["admin"]}>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedProvider>
  );
}
