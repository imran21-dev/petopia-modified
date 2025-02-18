import { Button } from "@/components/ui/button";
import { ImSpinner3 } from "react-icons/im";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import googlePng from "../assets/google.png";
import facebookPng from "../assets/facebook.png";
import { useForm } from "react-hook-form";

import { AssetContext } from "@/auth/ContextApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Helmet } from "react-helmet-async";
import { set } from "date-fns";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckbox = (checked) => {
    setIsChecked(checked);
  };
  const { state } = useLocation();

  const { login, googleLogin, facebookLogin } = useContext(AssetContext);
  const { toast } = useToast();
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setSpin(true);
    const { email, password } = data;
    login(email, password)
      .then(() => {
        toast({
          title: "Successfully Logged In!",
          description:
            "Welcome back! You're now signed in and ready to explore.",
        });
        setSpin(false);
        reset();
        if (state) {
          navigate(state.from);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setSpin(false);
        reset();
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error.code}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast({
          title: "Successfully Logged In!",
          description:
            "Welcome back! You're now signed in and ready to explore.",
        });
        if (state) {
          navigate(state.from);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error.code}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  const handleFacebookLogin = () => {
    facebookLogin()
      .then(() => {
        toast({
          title: "Successfully Logged In!",
          description:
            "Welcome back! You're now signed in and ready to explore.",
        });
        if (state) {
          navigate(state.from);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error.code}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  const [emailValue, setEmailValue] = useState("");
  const handleEmail = (e) => {
    setEmailValue(e.target.value);
  };

  return (
    <div className="w-11/12 mx-auto flex-col flex  justify-center items-center pt-10">
      <Helmet>
        <title>Login | Petopia</title>
      </Helmet>
      <Card className="xl:w-2/5  shadow-none border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-lg md:text-2xl font-bold ">
            Welcome back!
          </CardTitle>
          <CardDescription className="md:text-base text-xs">
            Log in to continue your journey with us.
          </CardDescription>
        </CardHeader>
        <section className="w-full flex flex-col items-center">
          <div className="pb-3 md:pb-5 flex justify-center flex-wrap gap-2">
            <Button
              className="md:text-sm text-xs h-max"
              onClick={handleGoogleLogin}
              variant="outline"
            >
              <img className="w-3 md:w-4" src={googlePng} alt="" />
              Continue with Google
            </Button>
            <Button
              className="md:text-sm text-xs h-max"
              onClick={handleFacebookLogin}
              variant="outline"
            >
              <img className="w-3 md:w-4" src={facebookPng} alt="" />
              Continue with Facebook
            </Button>
          </div>
          <div className="flex items-center gap-2 pb-3 md:pb-5 md:text-sm text-xs opacity-70">
            <div className="w-20  md:w-32 h-[1px] bg-secondary-foreground/20" />
            or
            <div className="w-20  md:w-32 h-[1px] bg-secondary-foreground/20" />
          </div>
        </section>
        <CardContent className="p-0">
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid pb-5 w-full items-center gap-3 md:gap-4">
              <Dialog>
                <DialogTrigger className="text-sm text-primary hover:underline">
                  Se Admin credential
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Use Admin Credential</DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                      Email: imransorker456@gmail.com <br />
                      Password: 9c@#$Ma7
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-xs md:text-sm">
                  Email
                </Label>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={
                    errors.email
                      ? "border-red-600 text-sm h-max md:text-base"
                      : "text-sm h-max md:text-base"
                  }
                  type="email"
                  onKeyUp={handleEmail}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs md:text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-xs md:text-sm">
                  Password
                </Label>
                <Input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={isChecked ? "text" : "password"}
                  placeholder="Password"
                  className={
                    errors.password
                      ? "border-red-600 text-sm h-max md:text-base"
                      : "text-sm h-max md:text-base"
                  }
                />
                {errors.password && (
                  <p className="text-red-600 text-xs md:text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={handleCheckbox}
                  id="password-show"
                />
                <label
                  htmlFor="password-show"
                  className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show password
                </label>
                <Link
                  state={{ email: emailValue }}
                  to="/reset-password"
                  className="text-[10px] md:text-xs flex-1 text-right text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button disabled={spin} className="md:text-sm text-xs h-max w-full">
              {spin && <ImSpinner3 className="animate-spin" />}Login
            </Button>
          </form>
          <h1 className="text-[10px] md:text-xs text-center py-2 font-medium">
            Do not have an account?{" "}
            <Link
              to="/registration"
              className="text-primary font-bold hover:underline"
            >
              Sign Up
            </Link>
          </h1>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
