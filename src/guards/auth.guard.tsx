import React, { useEffect } from "react";

import { $http } from "@/lib/http.lib";

const AuthGuard = ({ children }: React.PropsWithChildren) => {
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    return await $http.get("user/profile");
  };

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;
