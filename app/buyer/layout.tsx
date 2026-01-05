import BuyerDashboardLayout from "@/src/layout/BuyerDashboardLayout";
import { ReactNode } from "react";

export default function BuyerLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <BuyerDashboardLayout>{children}</BuyerDashboardLayout>;
}
