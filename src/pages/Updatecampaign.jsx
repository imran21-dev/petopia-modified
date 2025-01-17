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
import { useNavigate, useParams } from "react-router-dom";

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
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const imageHostingKey = import.meta.env.VITE_API_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const UpdateCampaign = () => {
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

  const { id } = useParams();
  const {
    data: campaign,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["campaign", user],
    queryFn: async () => {
      const res = await axioxSecure.get(
        `/single-campaign?id=${id}&email=${user.email}`
      );

      return res.data;
    },
  });


  const onSubmit = async (data) => {
    setSpin(true);
    console.log(data.date)

    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    if (!imageFile) {
      const campaignModule = {
        petImage: campaign.petImage,
        petName: data.name,
        maxAmount: data.amount,
        lastDate: data.date,
        longDescription: data.longDescription,
        shortDescription: data.shortDescription,
      };
      axioxSecure
        .patch(`/campaign?email=${user.email}&id=${id}`, campaignModule)
        .then((res) => {

          if (res.data.modifiedCount) {
            reset();
            setSpin(false);
            refetch();
            toast({
              title: "Campaign Updated Successfully!",
              description:
                "Your campaign is successfully updated. Now you can see it from My Campaigns page.",
            });
            navigate("/dashboard/my-campaign");
          }
          else{
            setSpin(false)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: `Change something for update`,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              });
          }
          
        });
        return
    } else {
      try {
        const res = await axios.post(imageHostingAPI, formData);
        const pet_image = res.data.data.display_url;

        const campaignModule = {
          petImage: pet_image,
          petName: data.name,
          maxAmount: data.amount,
          lastDate: data.date,
          longDescription: data.longDescription,
          shortDescription: data.shortDescription,
        };
        axioxSecure
          .patch(`/campaign?email=${user.email}&id=${id}`, campaignModule)
          .then((res) => {
            if (res.data.modifiedCount) {
              reset();
              setSpin(false);
              refetch();
              toast({
                title: "Campaign Updated Successfully!",
                description:
                  "Your campaign is successfully updated. Now you can see it from My Campaigns page.",
              });
              navigate("/dashboard/my-campaign");
            }
          });
      } catch (error) {
        setSpin(false);
        reset();
        refetch();
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error?.code}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    return isBefore(date, today);
  };

  return (
    <div className="w-11/12 mx-auto flex-col flex justify-center items-center pt-2">
      {isLoading ? (
        <div className="w-full pt-10 flex gap-3 flex-col items-center">
          <Skeleton className="w-1/5 h-10"></Skeleton>
          <Skeleton className="w-3/5 h-10"></Skeleton>
          <Skeleton className="w-3/5 h-10"></Skeleton>
          <Skeleton className="w-3/5 h-10"></Skeleton>
          <Skeleton className="w-3/5 h-24"></Skeleton>
          <Skeleton className="w-3/5 h-60"></Skeleton>
        </div>
      ) : (
        <Card className="w-3/5  shadow-none border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold ">
              Edit this Campaign
            </CardTitle>
            <CardDescription>
              Refine Your Campaign, Inspire More Change.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid pb-5  items-center gap-4">
                <section className="flex gap-6 ">
                  <div className="flex flex-col w-2/4 space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      defaultValue={campaign.petName}
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
                      placeholder="Enter pet name"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5 w-2/4">
                    <Label htmlFor="image">Pet Image</Label>
                    <Input {...register("image", {})} type="file" />
                    {errors.image && (
                      <p className="text-red-600 text-sm">
                        {errors.image.message}
                      </p>
                    )}
                  </div>
                </section>
                <section className="flex gap-6 ">
                  <div className="flex w-2/4 flex-col space-y-1.5">
                    <Label htmlFor="amount">Maximum Amount</Label>
                    <Input
                      defaultValue={campaign.maxAmount}
                      {...register("amount", {
                        required: "Amount is required",
                        min: {
                          value: 1,
                          message: "Amount must be at least 1",
                        },
                      })}
                      type="number"
                      placeholder="Enter maximum amount"
                    />
                    {errors.amount && (
                      <p className="text-red-600 text-sm">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-2/4 space-y-1.5 ">
                    <Label htmlFor="date">Select Last Donation Date</Label>
                    <Controller
                      defaultValue={campaign.lastDate}
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
                                "justify-start text-left font-normal",
                                !value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
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
                      <p className="text-red-600 text-sm">
                        {errors.date.message}
                      </p>
                    )}
                  </div>
                </section>

                <div>
                  <Label htmlFor="short-desc">Short Description</Label>
                  <Textarea
                    defaultValue={campaign.shortDescription}
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
                    placeholder="Type something about the pet."
                  />
                  {errors.shortDescription && (
                    <p className="text-red-600 text-sm">
                      {errors.shortDescription.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="long-desc">Long Description</Label>
                  <Textarea
                    defaultValue={campaign.longDescription}
                    className="h-44"
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
                    placeholder="Type the details about the campaign."
                  />
                  {errors.longDescription && (
                    <p className="text-red-600 text-sm">
                      {errors.longDescription.message}
                    </p>
                  )}
                </div>
              </div>
              <Button disabled={spin} className="w-full">
                {spin && <ImSpinner3 className="animate-spin" />}Update
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UpdateCampaign;
