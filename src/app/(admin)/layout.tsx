"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const pathname = usePathname();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  // Conditionally apply padding for chat and wiki pages
  const pagePadding = 'p-4 md:p-6';

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin} h-screen overflow-y-auto flex flex-col`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className={
          pathname.startsWith('/kunden/') || pathname === '/chat' || pathname === '/wiki' || pathname === '/calendar' || pathname === '/geschaeftsfuehrung/aufgaben'
            ? `flex-grow w-full flex flex-col ${pagePadding}`
            : `mx-auto flex-grow flex flex-col w-full ${pagePadding}`
        }>{children}</div>
      </div>
    </div>
  );
}
