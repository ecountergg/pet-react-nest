import { RouteObject } from "react-router-dom";

import AuthGuard from "@/guards/auth.guard";
import { AdminAuthorIndex } from "@/pages/admin/author";
import { AdminAuthorEdit } from "@/pages/admin/author/Edit";
import { AdminAuthorCreate } from "@/pages/admin/author/create";
import { AdminAuthorDetail } from "@/pages/admin/author/detail";

export const AUTHOR_ROUTES: RouteObject[] = [
  {
    path: "admin/master-data/author",
    element: (
      <AuthGuard>
        <AdminAuthorIndex />
      </AuthGuard>
    ),
  },
  {
    path: "admin/master-data/author/create",
    element: (
      <AuthGuard>
        <AdminAuthorCreate />
      </AuthGuard>
    ),
  },
  {
    path: "admin/master-data/author/:id/detail",
    element: (
      <AuthGuard>
        <AdminAuthorDetail />
      </AuthGuard>
    ),
  },
  {
    path: "admin/master-data/author/:id/edit",
    element: (
      <AuthGuard>
        <AdminAuthorEdit />
      </AuthGuard>
    ),
  },
];
