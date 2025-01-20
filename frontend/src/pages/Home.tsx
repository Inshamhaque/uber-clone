import { Link } from "react-router-dom";
import image from "/image.avif?url";

export function Home() {
  return (
    <div className="flex justify-center ">
      <div className="flex w-[375px] flex-col justify-between h-screen">
        <div
          className="flex-1"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
            className="w-20 h-auto mt-8 mx-8"
          />
        </div>
        <div className="p-4">
          <Link
            to={"/user-login"}
            className="text-3xl text-black font-semibold"
          >
            Get started with Uber
          </Link>
          <button className="flex justify-center w-full mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
            Continue
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
