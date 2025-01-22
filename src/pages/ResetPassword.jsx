import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/auth/firebase.config";

const ResetPassword = () => {
    const {state} = useLocation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { toast } = useToast();
  const [spin, setSpin] = useState(false);
  const onSubmit = async (data) => {
    setSpin(true);
    const email = data.email;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSpin(false);
        toast({
          title: "Password reset email sent!",
          description: `A password reset email is sent to your ${email}`,
        });
      })
      .catch((error) => {
        setSpin(false)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error.code}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };
  return (
    <div>
      <div className="w-11/12 mx-auto flex-col flex justify-center items-center pt-44">
  
        <Card className="xl:w-2/5  shadow-none border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-lg md:text-2xl font-bold">
              Reset Your Password
            </CardTitle>
            <CardDescription className='md:text-base text-xs'>
              Enter your email address below and we'll send you a link to reset
              your password.
            </CardDescription>
          </CardHeader>

          <CardContent  className='p-0'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid pb-5 w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className='text-xs md:text-sm'>Email</Label>
                  <Input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    defaultValue={state?.email}
                    className={errors.email ? "border-red-600 text-sm h-max md:text-base" : "text-sm h-max md:text-base"}
                    type="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs md:text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <Button disabled={spin} className='md:text-sm text-xs h-max w-full'>
                {spin && <ImSpinner3 className="animate-spin" />}send
              </Button>
            </form>
            <h1 className="text-[10px] md:text-xs text-center py-2 font-medium">
              Go back to
              <Link
                to="/login"
                className="text-primary font-bold hover:underline pl-1"
              >
                login
              </Link>
            </h1>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
