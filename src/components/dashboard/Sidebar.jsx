import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, LinkIcon, History, Settings } from "lucide-react";

export default function Sidebar() {
  const sidebarMenu = [
    {
      tabName: "대시보드",
      to: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { tabName: "URL 목록", to: "/urls", icon: <LinkIcon size={18} /> },
    { tabName: "변경 내역", to: "/history", icon: <History size={18} /> },
    { tabName: "설정", to: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-60 min-h-screen bg-white border-r shadow-sm p-4">
      <h1 className="text-xl font-bold text-primary mb-6 text-center">
        WhatJustChanged
      </h1>
      <nav className="flex flex-col gap-2">
        {sidebarMenu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium transition ${
                isActive ? "bg-gray-100 text-primary" : "text-gray-700"
              }`
            }
          >
            {item.icon}
            {item.tabName}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
