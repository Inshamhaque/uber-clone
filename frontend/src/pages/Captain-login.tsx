import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Captainlogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/captain/login",
        formData
      );

      if (response.status === 201) {
        // Redirect or store token here if needed
        const token = response.data.token;
        localStorage.setItem("token2", token);
        toast.success("User login successfull", {
          position: "top-right",
        });
        navigate("/captain-dashboard");
        return;
      }
    } catch (error: any) {
      console.error("Error logging in:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="mt-4 p-4 flex flex-col h-screen items-center w-full justify-between">
      <div className=" border px-4 py-2 rounded-lg w-[375px] flex flex-col justify-between h-screen">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-x-5">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.cfZ1rn13nWk-VB4jYzH1GwHaHa&pid=Api"
              alt="Uber Captain Logo"
              className="w-20 h-20 mb-4"
            />
            <h1 className="text-3xl">Uber Captain</h1>
          </div>
          <h2 className="text-lg font-semibold">
            Enter your email and password
          </h2>
          <input
            className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
            type="text"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full bg-black text-white mt-4 px-4 py-2 text-lg rounded-lg"
          >
            Continue
          </button>
          <p className="flex justify-center items-center mt-3 text-gray-600">
            Don't have an Account yet?{" "}
            <Link
              to="/captain-signup"
              className="text-blue-500 underline hover:text-blue-500 ml-1"
            >
              Signup Now
            </Link>
          </p>
        </form>
        <div className="w-full">
          <Link
            to="/user-login"
            className="w-full block bg-green-600 text-white text-center mb-4 px-4 py-2 text-lg rounded-lg"
          >
            Continue as User
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
