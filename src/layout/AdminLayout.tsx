"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Calendar,
  MessageSquare,
  CreditCard,
  Home,
  Settings,
} from "lucide-react";
import { logout } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Building2, label: "Properties", path: "/admin/properties" },
    { icon: Calendar, label: "Viewings", path: "/admin/viewings" },
    { icon: MessageSquare, label: "Requests", path: "/admin/requests" },
    { icon: CreditCard, label: "Bookings", path: "/admin/bookings" },
    { icon: Settings, label: "General", path: "/admin/general" },
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#235C47]/20 bg-[#F9F7F6] fixed h-full">
        <div className="p-6 border-b border-[#235C47]/20">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg md:text-xl font-serif font-bold text-[#235C47]"
          >
            <Home className="w-6 h-6" />
            Haven Estates
          </Link>
          <p className="text-sm text-[#235C47]/70 mt-1">Admin Panel</p>
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
        {/* Logout Button */}
        <div className="p-4 border-t border-[#235C47]/20">
          <button
            onClick={() => dispatch(logout())}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-colors bg-[#F9F7F6] text-[#235C47] hover:bg-[#235C47] hover:text-white"
          >
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 bg-white">{children}</main>
    </div>
  );
};

export default AdminLayout;
