import React, { Fragment, useState } from "react";

import { Country, State } from "country-state-city";
import axios from "axios";
import { URI } from "../../../App";
import { toast } from "react-toastify";

const CheckOut = ({ setStep, proceedPayment, setDiscount2 }) => {
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [pinCode, setPinCode] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [promoCode, setPromoCode] = useState("");
  // shipping data saving
  const shippingSubmit = (e) => {
    e.preventDefault();
    const data = { address, city, state, country, pinCode, phoneNo };
    localStorage.setItem("shippingInfo", JSON.stringify(data));
    proceedPayment();
    setStep(3);
  };

  const [discount, setDiscount] = useState(null)
  const validity = () => {
    let data = JSON.stringify({
      promoTitle: promoCode,
    });

    let config = {
      method: "post",
      url: `${URI}/api/v1/promo/verify`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data?.valid) {
          setDiscount(response.data?.promo?.discount)
          setDiscount2(response.data?.promo?.discount)
          // sessionStorage.setItem("disXcount", response.data?.promo?.discount);
       
        }
        else{
          toast.error("Coupon no longer valid!", {
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
      })
      .catch((error) => {
        toast.error("Coupon not found", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  return (
    <Fragment>
      <div className="flow-root  h-full">
        <div className="shippingBox">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validity();
            }}
            className="flex items-center gap-1"
          >
             <input
                type="text"
                required
                placeholder="Coupon Code (Optional)"
                className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
             
                onChange={(e) => setPromoCode(e.target.value)}
              />
            <button type="submit" className="px-3 py-2 text-sm text-white bg-primary-txt rounded-md">
              Check
            </button>
          </form>
         {discount && <p className="text-new text-center mt-3">Congratulation! You got {discount}% discount</p>}

          <form
            className="shippingForm"
            // encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <p className="text-center text-xl mt-5">Info</p>

            <div>
              <input
                type="text"
                placeholder="Address"
                required
                className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm mt-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="City"
                required
                className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm mt-3"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="postcode"
                required
                className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm mt-3"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Phone Number"
                required
                className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm mt-3"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <select
                required
                className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm mt-3"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <select
                  className=" lg:w-96 w-full rounded-md border  outline-none bg-none px-2 py-2 text-sm mt-3"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="flex w-full cursor-pointer mt-6 justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-txt hover:bg-new"
            >
              Checkout With Stripe
            </button>
            <div
              onClick={() => setStep(1)}
              className="flex cursor-pointer mt-3 justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-new hover:bg-primary-txt"
            >
              Back
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckOut;
