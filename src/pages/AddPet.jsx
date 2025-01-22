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
import {  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AssetContext } from "@/auth/ContextApi";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import AddPetCategory from "@/components/ui/AddPetCategory";
import { Textarea } from "@/components/ui/textarea";
import QuillEditor from "@/components/ui/QuillEditor";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const imageHostingKey = import.meta.env.VITE_API_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddPet = () => {
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();
  const axioxSecure = useAxiosSecure();
  const { user, editorContent, setEditorContent } = useContext(AssetContext);
  const { toast } = useToast();
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectError, setSelectError] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setSelectError(false);
    }
  }, [selectedCategory]);


  const onSubmit = async (data) => {
    setSpin(true);
   
    if (!selectedCategory) {
      setSpin(false);
      setSelectError(true);
      return;
    }
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(imageHostingAPI, formData);
      const pet_image = res.data.data.display_url;
      const date = new Date().toISOString();
      const pet = {
        pet_image,
        pet_name: data.name,
        pet_age: data.age,
        pet_category: selectedCategory,
        pet_location: data.location,
        short_description: data.shortDescription,
        long_description: editorContent,
        author: user.email,
        added_date: date,
        adopted: false
      };

      axioxSecure.post(`/pets?email=${user.email}`, pet).then((res) => {
        if (res.data.insertedId) {
          setSpin(false);
          reset();
          toast({
            title: "Pet Added Successfully!",
            description:
              "Your pet is successfully uploaded. Now you can manage it from My Pets page.",
          });
          navigate('/dashboard/my-pets')
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

  return (
    <div className="w-11/12 mx-auto flex-col flex justify-center items-center pt-2">
      <Card className="lg:w-3/5  shadow-none border-none">
        <CardHeader className="text-center pt-0 lg:pt-6">
          <CardTitle className="text-xl md:text-2xl font-bold ">Add a Pet</CardTitle>
          <CardDescription className='md:text-sm text-xs'>
            Share the Joy – Upload a Pet and Find Them a Loving Home!
          </CardDescription>
          
        </CardHeader>

        <CardContent className='p-0 pb-10 lg:pb-0'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid pb-5 w-full items-center gap-4">
              <div className="flex  flex-col space-y-1.5">
                <Label htmlFor="name" className='text-xs md:text-sm'>Name</Label>
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
                  className={errors.name ? "border-red-600 text-sm h-max md:text-base" : "text-sm h-max md:text-base"}
                
                  type="text"
                  placeholder="Enter pet name"
                />
                {errors.name && (
                  <p className="text-red-600 text-xs md:text-sm">{errors.name.message}</p>
                )}
              </div>

              <section className="flex w-full justify-between gap-2 md:gap-6">
                <div className="flex flex-col space-y-1.5 w-2/4">
                  <Label htmlFor="age" className='text-xs md:text-sm'>Age</Label>
                  <Input
                    {...register("age", {
                      required: "Age is required",

                      max: {
                        value: 100,
                        message: "Age must be under 100",
                      },
                    })}
                    type="number"
                    className={errors.age ? "border-red-600 text-sm h-max md:text-base" : "text-sm h-max md:text-base"}
                    placeholder="Enter pet age"
                  />
                  {errors.age && (
                    <p className="text-red-600 text-xs md:text-sm">{errors.age.message}</p>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5 w-2/4">
                  <Label htmlFor="location" className='text-xs md:text-sm'>Location</Label>
                  <Input
                    {...register("location", {
                      required: "Location is required",
                      minLength: {
                        value: 3,
                        message: "Location must be at least 3 characters long",
                      },
                      maxLength: {
                        value: 50,
                        message: "Location must be under 50 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: "Location can only contain letters and spaces",
                      },
                    })}
                    className={errors.location ? "border-red-600 text-sm h-max md:text-base" : "text-sm h-max md:text-base"}
                    type="text"
                    placeholder="Your location"
                  />
                  {errors.location && (
                    <p className="text-red-600 text-xs md:text-sm">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </section>
              <section className="flex items-center justify-between gap-2 md:gap-6 ">
                <div className="w-2/4">
                  <Label htmlFor="category" className='text-xs md:text-sm '>Pet Category</Label>
                  <AddPetCategory
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  ></AddPetCategory>
                  {selectError && (
                    <p className="text-xs md:text-sm text-red-600 pt-1">
                      Please select a category
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5 w-2/4">
                  <Label htmlFor="picture" className='text-xs md:text-sm'>Pet Image</Label>
                  <Input
                    {...register("image", {
                      required: "Image file is required",
                      validate: {
                        isImage: (FileList) =>
                          FileList[0]?.type.startsWith("image/") ||
                          "Only image files are allowed",
                      },
                    })}
                    className={errors.image ? "border-red-600 text-sm h-max md:text-base" : "text-sm h-max md:text-base"}
                    type="file"
                  />
                  {errors.image && (
                    <p className="text-red-600 text-xs md:text-sm">
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </section>
              <div>
                <Label htmlFor="short-desc" className='text-xs md:text-sm'>Short Description</Label>
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
                  className={errors.shortDescription ? "border-red-600 text-sm h-max md:text-base" : "text-sm h-max md:text-base"}
                  placeholder="Type something about the pet."
                />
                {errors.shortDescription && (
                  <p className="text-red-600 text-sm">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>

              <div className="text-container">
                <Label htmlFor="short-desc" className='text-xs md:text-sm'>Long Description (optional)</Label>
                <QuillEditor
                  value={editorContent}
                  onChange={setEditorContent}
                />
              </div>
              
            </div>
            <Button disabled={spin} className='md:text-sm w-full text-xs h-max'>
              {spin && <ImSpinner3 className="animate-spin" />}Add
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPet;
