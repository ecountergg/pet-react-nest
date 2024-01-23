import { LayoutDashboard, ListTodo, Users } from "lucide-react";

import { NavItem } from "@/types/nav-item.type";

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    title: "Users",
    icon: Users,
    href: "/users",
    color: "text-green-500",
  },
  {
    title: "TodoList",
    icon: ListTodo,
    href: "/todolist",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "Todo1",
        icon: ListTodo,
        color: "text-red-500",
        href: "/todolist/todo1",
      },
      {
        title: "Todo2",
        icon: ListTodo,
        color: "text-green-500",
        href: "/todolist/todo2",
      },
      {
        title: "Todo3",
        icon: ListTodo,
        color: "text-blue-500",
        href: "/todolist/todo3",
      },
    ],
  },
];
