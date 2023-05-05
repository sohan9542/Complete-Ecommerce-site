import React, { Fragment, useEffect, useRef } from "react";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";
import { RapperContent, URI, headerToken } from "../../../App";
import { toast } from "react-toastify";
import { useContext } from "react";

import { useState } from "react";

const Payment = () => {
  const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentCompoent />
      </Elements>
    </>
  );
};

const PaymentCompoent = () => {

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice),
  };

  let shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  const { added_products } = useContext(RapperContent);

  //   order define
  const order = {
    shippingInfo: shippingInfo,
    orderItems: added_products,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  // createing the order
  const createOrder = async (order) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
        },
      };
      const { data } = await axios.post(
        `${URI}/api/v1/order/new`,
        order,
        config
      );
      console.log("orderData", data);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //   getting my profile data
  const [user, setUser] = useState(null);
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${URI}/api/v1/me`,
      ...headerToken,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data?.user) {
          setUser(response.data?.user);
        }
      })
      .catch((error) => {});
  }, []);

  // Processing the stripe payment
  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Etoken")}`,
        },
      };
      const { data } = await axios.post(
        `${URI}/api/v1/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.name,
            email: user?.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          createOrder(order);
          window.location.href = "/success";
          // history.push("/success");
        } else {
          toast.error("There's some issue while processing payment", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;

      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
      <h1>Card Info</h1>
      <div>
        <CardNumberElement className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm mt-3" />
      </div>
      <div>
        <CardExpiryElement className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm mt-3" />
      </div>
      <div>
        <CardCvcElement className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm mt-3" />
      </div>

      <input
        type="submit"
        value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
        ref={payBtn}
        className="flex w-full cursor-pointer mt-3 justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-txt hover:bg-new"
      />
    </form>
  );
};

export default Payment;
