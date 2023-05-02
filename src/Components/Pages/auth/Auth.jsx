import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RapperContent, URI } from "../../../App";
import { useHistory } from "react-router-dom";
const Auth = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sName, setSName] = useState("");
  const [sPassword, setSPassword] = useState("");
  const { setIsAuthenticated } =
  useContext(RapperContent);
  const history = useHistory();
  const login = () => {
    let data = new FormData();
    data.append("email", loginEmail);
    data.append("password", loginPassword);

    let config = {
      method: "post",
      url: `${URI}/api/v1/login`,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        toast.success("Login Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("Etoken", response.data.token);
        setIsAuthenticated(true)
        history.push("/")
       
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
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
  const signup = () => {
    const FormData = require("form-data");
    let data = new FormData();
    data.append("name", sName);
    data.append("email", sEmail);
    data.append("password", sPassword);

    let config = {
      method: "post",
      url: `${URI}/api/v1/register`,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        toast.success("Sign Up Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("Etoken", response.data.token);
        setIsAuthenticated(true)
        history.push("/")
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
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
    <div>
      <div
        className="w-full h-40 flex justify-center items-center"
        style={{ background: "#f6f6f6" }}
      >
        <h1 className="text-2xl lg:text-4xl text-blk-txt">
          Login / Create Account
        </h1>
      </div>

      <div className="grid grid-cols-1 mt-12 gap-y-5 lg:divide-x lg:grid-cols-2 lg:gap-6 px-4">
        <div className="w-full">
          <h1 className="text-center text-2xl text-blk-tx font-bold">Login</h1>
          <div className="flex w-full items-center justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
              className="w-full lg:w-96"
            >
              <p className=" mt-3">Email</p>
              <input
                required
                onChange={(e) => setLoginEmail(e.target.value)}
                type="email"
                className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
              />
              <p className=" mt-3">Password</p>
              <input
                required
                onChange={(e) => setLoginPassword(e.target.value)}
                type="password"
                className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
              />
              <div className="w-full flex items-center justify-center mt-3">
                <button
                  type="submit"
                  className="inline-block text-center transition delay-100 ease-linear bg-primary-txt border border-transparent rounded-md py-2 px-8 font-medium text-white hover:bg-blk-txt"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full mt-32 lg:mt-0">
          <h1 className="text-center text-2xl text-blk-tx font-bold">
            Create Account
          </h1>
          <div className="flex w-full items-center justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                signup();
              }}
              className="w-full lg:w-96"
            >
              <p className=" mt-3">Name</p>
              <input
                required
                onChange={(e) => setSName(e.target.value)}
                type="text"
                className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
              />
              <p className=" mt-3">Email</p>
              <input
                type="email"
                onChange={(e) => setSEmail(e.target.value)}
                required
                className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
              />
              <p className=" mt-3">Password</p>
              <input
                required
                onChange={(e) => setSPassword(e.target.value)}
                type="password"
                className=" lg:w-96 w-full rounded-md border outline-none bg-none px-2 py-2 text-sm"
              />
              <div className="w-full flex items-center justify-center mt-3">
                <button
                  type="submit"
                  className="inline-block text-center transition delay-100 ease-linear bg-primary-txt border border-transparent rounded-md py-2 px-8 font-medium text-white hover:bg-blk-txt"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
