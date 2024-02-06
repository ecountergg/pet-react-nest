import { RouteObject } from "react-router-dom";

import AuthGuard from "@/guards/auth.guard";
import { AdminBookIndex } from "@/pages/admin/book";
import { AdminBookEdit } from "@/pages/admin/book/edit";
import { AdminBookCreate } from "@/pages/admin/book/create";
import { AdminBookDetail } from "@/pages/admin/book/detail";

export const BOOK_ROUTES: RouteObject[] = [
  {
    path: "admin/master-data/book",
    element: (
      <AuthGuard>
        <AdminBookIndex />
      </AuthGuard>
    ),
  },
  {
    path: "admin/master-data/book/create",
    element: (
      <AuthGuard>
        <AdminBookCreate />
      </AuthGuard>
    ),
  },
  {
    path: "admin/master-data/book/:id/detail",
    element: (
      <AuthGuard>
        <AdminBookDetail />
      </AuthGuard>
    ),
  },
  {
    path: "admin/master-data/book/:id/edit",
    element: (
      <AuthGuard>
        <AdminBookEdit />
      </AuthGuard>
    ),
  },
];
