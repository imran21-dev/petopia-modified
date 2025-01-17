import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AssetContext } from "@/auth/ContextApi";
import { ImSpinner3 } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useParams } from "react-router-dom";

const CheckoutForm = () => {
  const { user, setIsOpenPayment , demoLoad, setDemoLoad} = useContext(AssetContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()
  const {id} = useParams()
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();

  const [spin, setSpin] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

   const {data: camp} = useQuery({
    queryKey: ['camp'],
    queryFn: async () => {
        const res = await axiosPublic.get(`/campaign-details?id=${id}`)
        return res.data
    }
   })
   const donationLimit = parseInt(camp?.maxAmount - camp?.donatedAmount)
  

  const handlePaymentSecret = (e) => {
    if (e.target.value > 0) {
        
        axiosSecure
          .post("/create-payment-intent", { price: e.target.value })
          .then((res) => {
       
            setClientSecret(res.data.clientSecret);
          });
    }
  };


  const onSubmit = async (data) => {
    setSpin(true);

if (data.amount > donationLimit) {
    setSpin(false);
    reset();
    toast({
        variant: "destructive",
        title: "Your donation cannot exceed the target amount.",
        description: `You can contribute up to $${donationLimit} maximum.`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return
}

    if (!stripe || !elements) {
      setSpin(false);
      reset();
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      setSpin(false);
      reset();
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setSpin(false);
      reset();
      toast({
        variant: "destructive",
        title: `${error.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      setSpin(false);
      reset();
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || anonymous,
            name: user?.displayName || anonymous,
          },
        },
      });

    if (confirmError) {
      setSpin(false);
      reset();
      toast({
        variant: "destructive",
        title: `${confirmError?.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      if (paymentIntent.status === "succeeded") {
        setSpin(false);
        reset();
        setIsOpenPayment(false);
        setDemoLoad(demoLoad + 1)
        toast({
          title: "Donation Successfull!",
          description: `Your transaction ID ${paymentIntent.id}`,
        });
        axiosSecure.patch(`/capmaign-amount-update?email=${user.email}&id=${id}&amount=${paymentIntent.amount}`)
        .then(() => {
            
        })
        const payment = {
            userName: user?.displayName,
            userEmail: user?.email,
            userPhoto: user?.photoURL,
            campaignId: id,
            transactionId: paymentIntent.id,
            donatedAmount: paymentIntent.amount
        }
        axiosSecure.post(`/payment?email=${user?.email}`, payment)
        .then(() => {
            
        })
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className=" w-full">
        <Label htmlFor="amount" className="text-right">
          Amount
        </Label>
        <Input
          onKeyUp={handlePaymentSecret}
          id="amount"
          type="number"
          {...register("amount", {
            required: "Amount is required",
            min: {
              value: 1,
              message: "Amount must be at least $1",
            },
            max: {
              value: 10000,
              message: "Amount cannot exceed $10,000",
            },
          })}
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}
      </div>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button type="submit" disabled={!stripe || !clientSecret || spin}>
        {spin && <ImSpinner3 className="animate-spin" />} Pay
      </Button>
    </form>
  );
};

export default CheckoutForm;
