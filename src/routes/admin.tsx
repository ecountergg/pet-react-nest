import AuthGuard from "@/guards/auth.guard";
import { AdminIndex } from "@/pages/admin";

const ADMIN_ROUTES = {
  path: "admin",
  element: (
    <AuthGuard>
      <AdminIndex />
    </AuthGuard>
  ),
};

export default ADMIN_ROUTES;
