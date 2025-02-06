import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
type params = {
  email: string;
  password: string;
};

export function Userlogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<params>({
    email: "",
    password: "",
  });
  const onSubmitClick = async (e: any) => {
    e.preventDefault();
    try {
      console.log(credentials);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        credentials
      );
      if (res.status == 201) {
        toast.success("user logged in successfully", {
          position: "top-right",
        });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (e) {
      console.error("some error occurred", e);
      toast.error("Failed to login, please check your credentials", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="mt-4 p-4 flex flex-col h-screen items-center justify-between">
      <div className=" border px-4 py-2 rounded-lg w-[375px] flex flex-col justify-between h-screen">
        <form onSubmit={onSubmitClick}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
            className="w-20 mt-6 h-auto mb-4"
          />
          <h2 className="text-lg font-semibold">
            Enter your email and password
          </h2>
          <input
            className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
            type="text"
            placeholder="enter your email"
            onChange={(e: any) => {
              setCredentials({
                ...credentials,
                email: e.target.value,
              });
            }}
          />
          <input
            className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
            type="password"
            placeholder="enter your password"
            onChange={(e: any) => {
              setCredentials({
                ...credentials,
                password: e.target.value,
              });
            }}
          />
          <button
            type="submit"
            className="w-full bg-black text-white mt-4 px-4 py-2 text-lg rounded-lg"
          >
            Continue
          </button>
          <p className="flex justify-center items-center mt-3 text-gray-600">
            Don't have an Account yet?{" "}
            <a
              href="/user-signup"
              className="text-blue-500 underline hover:text-blue-500 ml-1"
            >
              Signup Now
            </a>
          </p>
        </form>
        <div className="w-full">
          <Link
            to="/captain-login"
            className="w-full block bg-yellow-600 text-white text-center mb-4 px-4 py-2 text-lg rounded-lg"
          >
            Continue as Captain
          </Link>
        </div>
      </div>
    </div>
  );
}
