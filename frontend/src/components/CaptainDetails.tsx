import axios from "axios";
import { useEffect, useState } from "react";
// type captain = {
//   fullname : {
//     firstname : string,
//     lastname : string
//   },
//   vehicle : {
//     capacity : number,
//     plate : string,
//     colour : string
//   }
// }
export function CaptainDetails() {
  const [captain, setcaptain] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    money: 0,
    distance: 0,
    jobs: 0,
  });
  useEffect(() => {
    const fetchCaptain = async () => {
      console.log(localStorage.getItem("token2"));
      const response = await axios.get(
        "http://localhost:8080/captain/profile",
        {
          headers: {
            authorization: localStorage.getItem("token2"),
          },
        }
      );
      console.log(response.data);
      setcaptain(response.data ?? "");
    };
    fetchCaptain();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Driver"
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          <div>
            <div className="font-bold text-black">
              {captain.fullname.firstname} {captain.fullname.lastname}
            </div>
            <div className="text-sm text-gray-500">Basic level</div>
          </div>
        </div>
        <div className="text-lg font-bold text-black">${captain.money}.00</div>
      </div>

      <div className="flex justify-between text-center text-sm text-gray-700">
        <div>
          <div className="font-bold text-black">{captain.distance}KM</div>
          <div className="text-xs">TOTAL DISTANCE</div>
        </div>
        <div>
          <div className="font-bold text-black">{captain.jobs}</div>
          <div className="text-xs">TOTAL JOBS</div>
        </div>
      </div>
    </div>
  );
}
