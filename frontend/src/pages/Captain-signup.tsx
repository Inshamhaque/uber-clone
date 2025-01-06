import { Link } from "react-router-dom"
export function CaptainSignup(){
    return(
        <div className=" flex flex-col h-screen justify-between m-4 space-between-4">
            <form className="space-y-4">
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
                    <input type="text" placeholder="First Name" className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg" />
                    <input type="text" placeholder="First Name" className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg" />
                </div>
                <input type="text" placeholder="Enter your email"  className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"/>
                <input type="text" placeholder="Enter your password" className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg" />
                <h1 className="text-lg font-semibold">Vehicle Information</h1>
                <div className="flex flex-col space-y-2">
                    <div className="flex space-x-2">
                        <input type="text" placeholder="Colour" className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"/>
                        <input type="text" placeholder="Plate"  className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg"/>
                    </div>
                    <div className="flex space-x-2">
                        <input type="number" placeholder="Capacity" className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg" />
                        <input type="text" placeholder="Type" className="p-2 w-full bg-gray-200 text-black mt-4 px-5 py-3 rounded-lg" />
                    </div>
                    
                </div>
                <button className="w-full bg-black text-white mt-4 px-4 py-2 text-lg rounded-lg">
                Continue
                </button>
                <p className="flex justify-center items-center mt-3 text-gray-600">
                Already have an Account yet?{" "}
                <a
                    href="/captain-login"
                    className="text-blue-500 underline hover:text-blue-500 ml-1"
                >
                    Login now
                </a>
                </p>
            </form>
            <form>
                <h1></h1>
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
    )
}