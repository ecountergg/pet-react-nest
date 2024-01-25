import { RouteObject } from "react-router-dom";

import AuthGuard from "@/guards/auth.guard";
import { AdminIndex } from "@/pages/admin";
import { AUTHOR_ROUTES } from "./author";
import { BOOK_ROUTES } from "./book";

const ADMIN_ROUTES: RouteObject[] = [
  {
    path: "admin",
    element: (
      <AuthGuard>
        <AdminIndex />
      </AuthGuard>
    ),
  },
  ...AUTHOR_ROUTES,
  ...BOOK_ROUTES,
];

export default ADMIN_ROUTES;
