import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useToast } from "@/components/atoms/toast/use-toast";
import { $http } from "@/lib/http";
import { ErrorResponse } from "@/types/response.type";
import { Toaster } from "@/components/atoms/toast/toaster";

const queryClient = new QueryClient();

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export const Wrapper = ({ children }: Props) => {
  const { toast } = useToast();

  $http.interceptors.request.use((config) => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  });

  $http.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorResponse: ErrorResponse = error.response
        ? error.response.data
        : null;

      toast({
        variant: "destructive",
        title: errorResponse.error,
        description: errorResponse.message,
      });
      return Promise.reject(error);
    },
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};
