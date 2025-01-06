import { Link } from "react-router-dom";

export function Captainlogin() {
  return (
    <div className="mt-4 p-4 flex flex-col h-screen w-full justify-between">
      <form>
        <div className="flex justify-center items-center gap-x-5">
            <img
            src="https://tse4.mm.bing.net/th?id=OIP.cfZ1rn13nWk-VB4jYzH1GwHaHa&pid=Api"
            alt="Uber Captain Logo"
            className="w-20 h-20 mb-4"
            />
            <h1 className="text-3xl">Uber Captain</h1>

        </div>
        <h2 className="text-lg font-semibold">Enter your email and password</h2>
        <input
          className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
          type="text"
          placeholder="Enter your email"
        />
        <input
          className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"
          type="password"
          placeholder="Enter your password"
        />
        <button className="w-full bg-black text-white mt-4 px-4 py-2 text-lg rounded-lg">
          Continue
        </button>
        <p className="flex justify-center items-center mt-3 text-gray-600">
          Don't have an Account yet?{" "}
          <a
            href="/captain-signup"
            className="text-blue-500 underline hover:text-blue-500 ml-1"
          >
            Signup Now
          </a>
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
    </div>
  );
}
