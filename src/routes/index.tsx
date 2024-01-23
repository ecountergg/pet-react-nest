import { App } from "@/App";
import ADMIN_ROUTES from "./admin";

const APP_ROUTES = [
  {
    path: "/",
    element: <App />,
  },
  ADMIN_ROUTES,
];

export default APP_ROUTES;
