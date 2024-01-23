import AuthGuard from "@/guards/auth.guard";
import { AdminIndex } from "@/pages/admin";
import { AdminAuthorIndex } from "@/pages/admin/author";

const ADMIN_ROUTES = [
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
];

export default ADMIN_ROUTES;
