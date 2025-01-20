import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export function CaptainSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    vehicleColor: "",
    vehiclePlate: "",
    vehicleCapacity: "",
    vehicleType: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody = {
      fullname: {
        firstname: formData.firstName,
        lastname: formData.lastName,
      },
      password: formData.password,
      email: formData.email,
      vehicle: {
        color: formData.vehicleColor,
        plate: formData.vehiclePlate,
        capacity: parseInt(formData.vehicleCapacity, 10),
        vehicleType: formData.vehicleType,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/captain/register",
        requestBody
      );

      if (response.status === 200 || response.status === 201) {
        return toast.success("user registered successfully", {
          position: "top-right",
        });
      }
      return toast.error("some error occurred", {
        position: "top-right",
      });
    } catch (error: any) {
      console.error(
        "Error registering captain:",
        error.response?.data || error.message
      );
      return toast.error("some error occurred", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between m-4 space-between-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex justify-center items-center gap-x-5">
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.cfZ1rn13nWk-VB4jYzH1GwHaHa&pid=Api"
            alt="Uber Captain Logo"
            className="w-20 h-20 mb-4"
          />
          <h1 className="text-3xl">Uber Captain</h1>
        </div>
        <h2 className="text-lg font-semibold">Enter your email and password</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
          />
        </div>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
        />
        <h1 className="text-lg font-semibold">Vehicle Information</h1>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <input
              type="text"
              name="vehicleColor"
              placeholder="Color"
              value={formData.vehicleColor}
              onChange={handleInputChange}
              className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
            />
            <input
              type="text"
              name="vehiclePlate"
              placeholder="Plate"
              value={formData.vehiclePlate}
              onChange={handleInputChange}
              className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
            />
          </div>
          <div className="flex space-x-2">
            <input
              type="number"
              name="vehicleCapacity"
              placeholder="Capacity"
              value={formData.vehicleCapacity}
              onChange={handleInputChange}
              className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
            />
            <input
              type="text"
              name="vehicleType"
              placeholder="Type"
              value={formData.vehicleType}
              onChange={handleInputChange}
              className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white mt-4 px-4 py-2 text-lg rounded-lg"
        >
          Continue
        </button>
        <p className="flex justify-center items-center mt-3 text-gray-600">
          Already have an Account?{" "}
          <Link
            to="/captain-login"
            className="text-blue-500 underline hover:text-blue-500 ml-1"
          >
            Login now
          </Link>
        </p>
      </form>
      <div className="flex justify-center items-center pt-2 pb-2">OR</div>
      <div className="w-full mt-2">
        <Link
          to="/captain-login"
          className="w-full block bg-green-500 text-white text-center mb-4 px-4 py-2 text-lg rounded-lg"
        >
          Continue as User
        </Link>
      </div>
    </div>
  );
}
