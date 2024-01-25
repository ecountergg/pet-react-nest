import { RouteObject } from "react-router-dom";

import AuthGuard from "@/guards/auth.guard";
import { AdminIndex } from "@/pages/admin";
import { AdminAuthorIndex } from "@/pages/admin/author";
import { AdminAuthorCreate } from "@/pages/admin/author/create";
import { AdminAuthorDetail } from "@/pages/admin/author/detail";
import { AdminAuthorEdit } from "@/pages/admin/author/Edit";

const ADMIN_ROUTES: RouteObject[] = [
  {
    path: "admin",
    element: (
      <AuthGuard>
        <AdminIndex />
      </AuthGuard>
    ),
  },
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

export default ADMIN_ROUTES;
