import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Button } from "@/components/atoms/button/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card/card";
import { Input } from "@/components/atoms/input/input";
import { ILoginPayload } from "@/services/auth/login.post";
import { useLoginPost } from "@/hooks/auth/mutations/use-login-post.mutation";
import { useToast } from "@/components/atoms/toast/use-toast";

interface ILoginFormProps {
  className: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is a required field"),
  password: yup.string().required("Password is a required field"),
});

export const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPayload>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate, isPending } = useLoginPost({
    onSuccess: (response) => {
      navigate(
        {
          pathname: "admin",
        },
        {
          replace: true,
        },
      );

      localStorage.setItem("authToken", response.data.accessToken);

      toast.toast({
        title: "Welcome!",
      });
    },
  });

  const onSubmit = (payload: ILoginPayload) => {
    mutate(payload);
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Please enter your username and password to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              autoComplete="off"
              placeholder="Username"
              errors={errors}
              {...register("username")}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="off"
              placeholder="Password"
              errors={errors}
              {...register("password")}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button disabled={isPending} loading={isPending}>
          Sign In
        </Button>
      </CardFooter>
    </form>
  );
};
