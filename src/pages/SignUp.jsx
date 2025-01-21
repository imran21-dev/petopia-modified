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
import { Link, useNavigate } from "react-router-dom";
import googlePng from "../assets/google.png";
import facebookPng from "../assets/facebook.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AssetContext } from "@/auth/ContextApi";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "@/auth/firebase.config";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import signUp from '../assets/Animation - 1737429852609.json'
import Lottie from "lottie-react";

const imageHostingKey = import.meta.env.VITE_API_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const SignUp = () => {
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

  const { registration, googleLogin, facebookLogin } = useContext(AssetContext);
  const { toast } = useToast();
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setSpin(true);
    const { name, email, password } = data;
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(imageHostingAPI, formData);
      registration(email, password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: res.data.data.display_url,
          })
            .then(() => {
              signOut(auth)
              .then(() => {
                reset();
                setSpin(false)
                toast({
                  title: "Account Created Successfully!",
                  description:
                    "Your account has been successfully created. Log in to get started!",
                });
                navigate('/login')

              })
              .catch(error => {
                reset();
                setSpin(false)
                toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description: `${error.code}`,
                  action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                  ),
                });
              })
                 
            })
            .catch((error) => {
              setSpin(false);
              reset();
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: `${error.code}`,
                action: (
                  <ToastAction altText="Try again">Try again</ToastAction>
                ),
              });
            });
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
    } catch (error) {
      setSpin(false);
      reset();
      console.log("failed to upload", error);
    }
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast({
          title: 'Successfully Logged In!',
           description: "Welcome back! You're now signed in and ready to explore.",
         })
        navigate("/");
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
          title: 'Successfully Logged In!',
           description: "Welcome back! You're now signed in and ready to explore.",
         })
        navigate('/')
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error.code}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  }

  return (
    <div className="w-11/12 mx-auto flex-col flex justify-center items-center pt-10">
      <div className="absolute left-0 bottom-0 w-96">
        <Lottie animationData={signUp}></Lottie>
      </div>
      <Card className="w-2/5  shadow-none border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold ">
            Create Your Account{" "}
          </CardTitle>
          <CardDescription>
            Join us and start your journey today!
          </CardDescription>
        </CardHeader>
        <section className="w-full flex flex-col items-center">
          <div className="space-x-4 pb-5">
            <Button onClick={handleGoogleLogin} variant="outline">
              <img className="w-4" src={googlePng} alt="" />
              Continue with Google
            </Button>
            <Button onClick={handleFacebookLogin} variant="outline">
              <img className="w-4" src={facebookPng} alt="" />
              Continue with Facebook
            </Button>
          </div>
          <div className="flex items-center gap-2 pb-5 text-sm opacity-70">
            <div className="w-32 h-[1px] bg-secondary-foreground/20" />
            or use email
            <div className="w-32 h-[1px] bg-secondary-foreground/20" />
          </div>
        </section>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid pb-5 w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 50,
                      message: "Name must not exceed 50 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Name can only contain letters and spaces",
                    },
                  })}
                  className={errors.name && "border-red-600"}
                  type="text"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={errors.email && "border-red-600"}
                  type="email"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">
                  Password (must be at least 6 characters)
                </Label>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/,
                      message:
                        "Password must include uppercase, lowercase, number, and special character",
                    },
                  })}
                  type={isChecked ? "text" : "password"}
                  placeholder="Password"
                  className={errors.password && "border-red-600"}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={handleCheckbox}
                  id="password-show"
                />
                <label
                  htmlFor="password-show"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show password
                </label>
              </div>

              <div className="flex flex-col space-y-1.5 w-max">
                <Label htmlFor="picture">Profile Picture</Label>
                <Input
                  {...register("image", {
                    required: "Image file is required",
                    validate: {
                      isImage: (FileList) =>
                        FileList[0]?.type.startsWith("image/") ||
                        "Only image files are allowed",
                    },
                  })}
                  className={errors.image && "border-red-600"}
                  type="file"
                />
                {errors.image && (
                  <p className="text-red-600 text-sm">{errors.image.message}</p>
                )}
              </div>
            </div>
            <Button disabled={spin} className="w-full">
              {spin && <ImSpinner3 className="animate-spin" />}Sign Up
            </Button>
          </form>
          <h1 className="text-xs text-center py-2 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Login
            </Link>
          </h1>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
