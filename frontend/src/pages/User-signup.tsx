import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export function Usersignup() {
  const [credentials, setCredentials] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });

  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "firstname" || name === "lastname") {
      setCredentials((prev) => ({
        ...prev,
        fullname: { ...prev.fullname, [name]: value },
      }));
    } else {
      setCredentials((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const onSubmitClick = async (e: any) => {
    e.preventDefault(); // Fix preventDefault
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        credentials
      );

      if (res.status === 201) {
        console.log("User created successfully");
        toast.success("User created successfully", {
          position: "top-right",
        });
      }
      if(res.status==400){
        toast.error("User already exists",{
            position : "top-right"
        })
      }
    } catch (e: any) {
      console.error("Some error occurred: ", e);
      toast.error("Failed to create user. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="overflow-hidden flex flex-col h-screen justify-between m-4">
      <form className="space-y-4" onSubmit={onSubmitClick}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
          className="w-20 mt-6 h-auto mb-4"
        />
        <h2 className="text-lg font-semibold">Enter your email and password</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            name="firstname"
            value={credentials.fullname.firstname}
            onChange={onInputChange}
            placeholder="First Name"
            className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
          />
          <input
            type="text"
            name="lastname"
            value={credentials.fullname.lastname}
            onChange={onInputChange}
            placeholder="Last Name"
            className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
          />
        </div>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={onInputChange}
          placeholder="Enter your email"
          className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={onInputChange}
          placeholder="Enter your password"
          className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-black text-white mt-4 px-4 py-2 text-lg rounded-lg"
        >
          Continue
        </button>
        <p className="flex justify-center items-center mt-3 text-gray-600">
          Already have an Account?{" "}
          <Link
            to="/user-login"
            className="text-blue-500 underline hover:text-blue-500 ml-1"
          >
            Login now
          </Link>
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
      <ToastContainer />
    </div>
  );
}
