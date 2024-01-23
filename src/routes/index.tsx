import { App } from "@/App";
import ADMIN_ROUTES from "./admin";
import UnAuthGuard from "@/guards/un-auth.guard";

const APP_ROUTES = [
  {
    path: "/",
    element: (
      <UnAuthGuard>
        <App />
      </UnAuthGuard>
    ),
  },
  ...ADMIN_ROUTES,
];

export default APP_ROUTES;
