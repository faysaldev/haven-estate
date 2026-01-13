import BuyerDashboardLayout from "@/src/layout/BuyerDashboardLayout";
import ProtectedProvider from "@/src/Provider/ProtectedProvider";
import { ReactNode } from "react";

export default function BuyerLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedProvider allowedRoles={["user"]}>
      <BuyerDashboardLayout>{children}</BuyerDashboardLayout>
    </ProtectedProvider>
  );
}
