import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { AssetContext } from "@/auth/ContextApi";
import { useForm } from "react-hook-form";
import { ImSpinner3 } from "react-icons/im";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoMdArrowDropright } from "react-icons/io";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
import { Helmet } from "react-helmet-async";
const PetDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useContext(AssetContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { toast } = useToast();
  const { data: pet, isLoading: petLoading } = useQuery({
    queryKey: ["pet"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/pet/${id}`);
      return res.data;
    },
  });

  const {
    data: isRequested = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["isRequested"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/isRequested?petId=${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [spin, setSpin] = useState(false);
  const onSubmit = async (data) => {
    setSpin(true);
    const { email, location, name, number } = data;
    const requestModule = {
      requesterEmail: email,
      requesterImage: user.photoURL,
      requesterLocation: location,
      requesterName: name,
      requesterNumber: number,
      petId: id,
      petImage: pet.pet_image,
      author: pet?.author,
      status: false,
    };
    const res = await axiosSecure.post(
      `/request?email=${email}`,
      requestModule
    );
    if (res.data.insertedId) {
      reset();
      setSpin(false);
      refetch();
      setIsOpenForm(false);
      toast({
        title: "Adoption request sent!",
        description:
          "Your adoption request has been sent successfully. We’ll notify you once the pet’s owner reviews and approves your request.",
      });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handlePetApotion = () => {
    if (user) {
      setIsOpenForm(true);
      return;
    }

    setIsOpen(true);
  };

  const handleContinue = () => {
    navigate("/login");
  };

  return (
    <div className="w-11/12 mx-auto pt-3 md:pt-5">
      <Helmet>
        <title>{`Pet Details - ${id} | Petopia`}</title>
      </Helmet>
      <h1 className="text-lg lg:text-2xl font-bold pb-3 lg:pb-10 ">
        Pet Details
      </h1>
      <div>
        {petLoading ? (
          <div>
            <div className="grid lg:grid-cols-2 gap-3 lg:gap-10">
              <Skeleton className="w-full h-64 lg:h-[500px] rounded-3xl bg-secondary"></Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-4/12 h-4 md:h-8 bg-secondary"></Skeleton>
                <Skeleton className="w-full h-6 md:h-14 bg-secondary"></Skeleton>
                <Skeleton className="w-3/12 h-4 md:h-8 bg-secondary"></Skeleton>
                <Skeleton className="w-3/12 h-4 md:h-8 bg-secondary"></Skeleton>
                <Skeleton className="w-3/12 h-4 md:h-8 bg-secondary"></Skeleton>
                <Skeleton className="w-2/12 h-4 md:h-8 bg-secondary"></Skeleton>
                <Skeleton className="w-5/12 h-2 md:h-5 bg-secondary"></Skeleton>
                <Skeleton className="w-2/12 h-4 md:h-10 bg-secondary"></Skeleton>
              </div>
            </div>
            <Skeleton className="w-full h-14 md:h-32 mt-3 md:mt-5 bg-secondary"></Skeleton>
          </div>
        ) : (
          <div>
            <div className="grid lg:grid-cols-2 gap-3 lg:gap-10">
              <img
                className="w-full h-64 lg:h-[500px] object-cover rounded-3xl"
                src={pet?.pet_image}
                alt="pet image"
              />

              <div className="flex-1">
                <div>
                  <h1 className="text-lg lg:text-2xl font-bold">
                    My name is {pet?.pet_name}!
                  </h1>
                  <p className="flex items-center gap-2 text-sm md:text-base py-1 md:py-2 font-medium">
                    <FaLocationDot />
                    {pet?.pet_location}
                  </p>
                  <p className="font-medium text-sm ">
                    {pet?.short_description}
                  </p>

                  <p className="text-sm md:text-base py-1 md:py-2 font-medium flex items-center gap-1">
                    Age <IoMdArrowDropright /> {pet?.pet_age} years
                  </p>
                  <p className="font-medium flex items-center gap-1 text-sm md:text-base">
                    Category <IoMdArrowDropright /> {pet?.pet_category}
                  </p>
                  <p className=" md:pb-5 text-sm md:text-base pt-1 pb-3 md:pt-2 font-medium flex items-center gap-1">
                    Added on <IoMdArrowDropright />{" "}
                    {moment(pet?.added_date).format("MMM Do YY")}
                  </p>
                </div>

                {pet?.author === user?.email ? (
                  <Link to="/dashboard/my-pets">
                    <Button className="md:text-sm text-xs h-max">Manage</Button>
                  </Link>
                ) : isLoading ? (
                  <Skeleton className="w-28 h-8"></Skeleton>
                ) : isRequested.status === false ? (
                  <Button className="md:text-sm text-xs h-max" disabled>
                    Requested
                  </Button>
                ) : (
                  <Button
                    className="md:text-sm text-xs h-max"
                    onClick={handlePetApotion}
                  >
                    Adopt
                  </Button>
                )}
              </div>
            </div>

            <h2 className="font-semibold pt-3 md:pt-5">Description</h2>
            <div
              className="md:py-3 py-1 text-xs md:text-sm"
              dangerouslySetInnerHTML={{ __html: pet?.long_description }}
            ></div>
          </div>
        )}
      </div>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Access Restricted</AlertDialogTitle>
            <AlertDialogDescription>
              You need to log in to proceed. Please sign in to access this
              feature.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleContinue}>
              Go to Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isOpenForm} onOpenChange={setIsOpenForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adoption Request</DialogTitle>
            <DialogDescription>
              Submit your request and take the first step toward a forever
              friendship.
            </DialogDescription>
          </DialogHeader>
          <div className="flex  text-sm gap-6">
            <img
              className="w-2/5 object-cover h-52 rounded-3xl"
              src={pet?.pet_image}
              alt=""
            />
            <div className="flex-1">
              <h1 className="font-medium grid grid-cols-2 pb-1 w-full">
                <span>Name:</span> {pet?.pet_name}
              </h1>
              <h1 className="font-medium grid grid-cols-2 pb-1 w-full">
                <span>Age:</span> {pet?.pet_age}
              </h1>
              <h1 className="font-medium grid grid-cols-2 pb-1 w-full">
                <span>Category:</span> {pet?.pet_category}
              </h1>
              <h1 className="font-medium pb-1">
                <span>Pet ID:</span> <span className="text-xs">{pet?._id}</span>
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" space-y-3 text-left gap-4 py-4">
              <h1 className="font-semibold pb-2">Add your Information</h1>
              <div className="flex  justify-between items-center  w-full  gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  disabled
                  defaultValue={user?.displayName}
                  className="w-10/12"
                />
              </div>
              <div className="flex justify-between items-center  w-full  gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  {...register("email")}
                  disabled
                  defaultValue={user?.email}
                  className="w-10/12"
                />
              </div>
              <div className="flex justify-between items-center  w-full  gap-4">
                <Label htmlFor="number" className="text-right">
                  Phone
                </Label>
                <div className="w-10/12">
                  <Input
                    id="number"
                    type="number"
                    {...register("number", {
                      required: "Number is required",
                      min: { value: 1, message: "Number must be at least 1" },
                    })}
                    placeholder="Enter your number"
                    className=""
                  />
                  {errors.number && (
                    <p className="text-xs text-red-600 px-2">
                      {errors.number.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center  w-full  gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <div className="w-10/12">
                  <Input
                    {...register("location", {
                      required: "Location is required",
                      minLength: {
                        value: 3,
                        message: "Location must be at least 3 characters long",
                      },
                      maxLength: {
                        value: 50,
                        message: "Location must not exceed 50 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z\s,]+$/,
                        message:
                          "Location must contain only letters, spaces, or commas",
                      },
                    })}
                    id="location"
                    placeholder="Your location"
                    className=""
                  />
                  {errors.location && (
                    <p className="text-xs text-red-600 px-2">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button disabled={spin} className="w-full" type="submit">
                {spin && <ImSpinner3 className="animate-spin" />}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PetDetails;
