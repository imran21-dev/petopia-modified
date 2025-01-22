import { Button } from "@/components/ui/button";
import { ImSpinner3 } from "react-icons/im";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";

import axios from "axios";
import { AssetContext } from "@/auth/ContextApi";
import { format, isBefore } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Textarea } from "@/components/ui/textarea";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Helmet } from "react-helmet-async";

const imageHostingKey = import.meta.env.VITE_API_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const CreateCampaign = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const axioxSecure = useAxiosSecure();
  const { user } = useContext(AssetContext);
  const { toast } = useToast();
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setSpin(true);

    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(imageHostingAPI, formData);
      const pet_image = res.data.data.display_url;
      const date = new Date().toISOString();
      const campaign = {
        addedDate: date,
        petImage: pet_image,
        petName: data.name,
        maxAmount: data.amount,
        lastDate: data.date,
        longDescription: data.longDescription,
        shortDescription: data.shortDescription,
        donatedAmount: 0,
        active: true,
        author: user.email,
      };
      axioxSecure
        .post(`/campaign?email=${user.email}`, campaign)
        .then((res) => {
          if (res.data.insertedId) {
            reset();
            setSpin(false);
            toast({
              title: "Campaign Created Successfully!",
              description:
                "Your campaign is successfully uploaded. Now you can manage it from My Campaigns page.",
            });
            navigate("/dashboard/my-campaign");
          }
        });
    } catch (error) {
      setSpin(false);
      reset();
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error?.code}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  const isDateDisabled = (date) => {
    const today = new Date();
    return isBefore(date, today);
  };
  return (
    <div className="w-11/12 mx-auto flex-col flex justify-center items-center pt-2">
      <Helmet>
        <title>Create Campaign | Petopia</title>
      </Helmet>
      <Card className="lg:w-3/5  shadow-none border-none">
        <CardHeader className="text-center pt-0 lg:pt-6">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Create a Campaign
          </CardTitle>
          <CardDescription className="md:text-sm text-xs">
            Launch Your Mission, Inspire Change.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 pb-10 lg:pb-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid pb-5  items-center gap-4">
              <section className="flex gap-2 md:gap-6 ">
                <div className="flex flex-col w-2/4 space-y-1.5">
                  <Label htmlFor="name" className="text-xs md:text-sm">
                    Name
                  </Label>
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
                    className={
                      errors.name
                        ? "border-red-600 text-sm h-max md:text-base"
                        : "text-sm h-max md:text-base"
                    }
                    type="text"
                    placeholder="Enter pet name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs md:text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5 w-2/4">
                  <Label htmlFor="image" className="text-xs md:text-sm">
                    Pet Image
                  </Label>
                  <Input
                    {...register("image", {
                      required: "Image file is required",
                      validate: {
                        isImage: (FileList) =>
                          FileList[0]?.type.startsWith("image/") ||
                          "Only image files are allowed",
                      },
                    })}
                    className={
                      errors.image
                        ? "border-red-600 text-sm h-max md:text-base"
                        : "text-sm h-max md:text-base"
                    }
                    type="file"
                  />
                  {errors.image && (
                    <p className="text-red-600 text-xs md:text-sm">
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </section>
              <section className="flex gap-2 md:gap-6 ">
                <div className="flex w-2/4 flex-col space-y-1.5">
                  <Label htmlFor="amount" className="text-xs md:text-sm">
                    Maximum Amount
                  </Label>
                  <Input
                    {...register("amount", {
                      required: "Amount is required",
                      min: {
                        value: 1,
                        message: "Amount must be at least 1",
                      },
                    })}
                    className={
                      errors.amount
                        ? "border-red-600 text-sm h-max md:text-base"
                        : "text-sm h-max md:text-base"
                    }
                    type="number"
                    placeholder="Enter maximum amount"
                  />
                  {errors.amount && (
                    <p className="text-red-600 text-xs md:text-sm">
                      {errors.amount.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-2/4 space-y-1.5 ">
                  <Label htmlFor="date" className="text-xs md:text-sm">
                    Last Donation Date
                  </Label>
                  <Controller
                    name="date"
                    control={control}
                    rules={{
                      required: "Date is required",
                      validate: (value) => {
                        const today = new Date();
                        return (
                          !isBefore(value, today) ||
                          "You cannot select a date in the past"
                        );
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-xs overflow-hidden h-max md:text-sm text-left font-normal",
                              !value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="md:mr-2 -ml-2 h-4 w-4" />
                            {value ? (
                              format(value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={value}
                            onSelect={onChange}
                            initialFocus
                            disabled={isDateDisabled} // Disable dates based on your logic
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.date && (
                    <p className="text-red-600 text-xs md:text-sm">
                      {errors.date.message}
                    </p>
                  )}
                </div>
              </section>

              <div>
                <Label htmlFor="short-desc" className="text-xs md:text-sm">
                  Short Description
                </Label>
                <Textarea
                  {...register("shortDescription", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message:
                        "Description must be at least 10 characters long",
                    },
                    maxLength: {
                      value: 200,
                      message: "Description must be under 200 characters",
                    },
                  })}
                  className={
                    errors.shortDescription
                      ? "border-red-600 text-sm h-max md:text-base"
                      : "text-sm h-max md:text-base"
                  }
                  placeholder="Type something about the pet."
                />
                {errors.shortDescription && (
                  <p className="text-red-600 text-xs md:text-sm">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="long-desc" className="text-xs md:text-sm">
                  Long Description
                </Label>
                <Textarea
                  {...register("longDescription", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message:
                        "Description must be at least 10 characters long",
                    },
                    maxLength: {
                      value: 2000,
                      message: "Description must be under 2000 characters",
                    },
                  })}
                  className={
                    errors.longDescription
                      ? "border-red-600 h-44 text-sm md:text-base"
                      : "text-sm md:text-base h-44"
                  }
                  placeholder="Type the details about the campaign."
                />
                {errors.longDescription && (
                  <p className="text-red-600 text-xs md:text-sm">
                    {errors.longDescription.message}
                  </p>
                )}
              </div>
            </div>
            <Button disabled={spin} className="md:text-sm text-xs h-max w-full">
              {spin && <ImSpinner3 className="animate-spin" />}Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCampaign;
