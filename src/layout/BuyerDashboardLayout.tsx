"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  CreditCard,
  Home,
  Settings,
} from "lucide-react";

interface BuyerDashboardLayoutProps {
  children: ReactNode;
}

const BuyerDashboardLayout = ({ children }: BuyerDashboardLayoutProps) => {
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/buyer" },
    {
      icon: Calendar,
      label: "Schedule Viewing",
      path: "/buyer/schedule-viewing",
    },
    { icon: MessageSquare, label: "Request Info", path: "/buyer/request-info" },
    { icon: CreditCard, label: "My Bookings", path: "/buyer/bookings" },
    { icon: Settings, label: "General", path: "/buyer/settings" },
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#235C47]/20 bg-[#F9F7F6] fixed h-full">
        <div className="p-6 border-b border-[#235C47]/20">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-serif font-bold text-[#235C47]"
          >
            <Home className="w-6 h-6" />
            Haven Estates
          </Link>
          <p className="text-sm text-[#235C47]/70 mt-1">Buyer Dashboard</p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-[#235C47] text-white"
                    : "text-[#235C47]/70 hover:bg-[#235C47]/10 hover:text-[#235C47]"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 bg-white">{children}</main>
    </div>
  );
};

export default BuyerDashboardLayout;
