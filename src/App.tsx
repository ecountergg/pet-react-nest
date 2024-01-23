import { Card } from "./components/atoms/card/card";
import { LoginForm } from "./components/molecules/login-form/login-form";
import { Blank } from "./components/templates/blank/blank";

export const App = () => {
  return (
    <Blank>
      <div className="h-screen flex items-center">
        <Card className="flex m-auto w-3/5">
          <img
            alt="photos"
            width="100"
            height="224"
            className="w-3/5 bg-cover"
            src="/images/bg-cover.jpg"
          />
          <LoginForm className="w-full" />
        </Card>
      </div>
    </Blank>
  );
};
