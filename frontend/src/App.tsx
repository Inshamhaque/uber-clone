import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Userlogin } from "./pages/User-login";
import { Usersignup } from "./pages/User-signup";
import { Captainlogin } from "./pages/Captain-login";
import { CaptainSignup } from "./pages/Captain-signup";
import { Dashboard } from "./pages/Dashboard";
 
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/user-login" element={<Userlogin />} />
        <Route path="/user-signup" element = {<Usersignup />}/>
        <Route path="/captain-login" element = {< Captainlogin />}/>
        <Route path="/captain-signup" element = {<CaptainSignup />} />
        <Route path="/dashboard" element = {<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
 
export default App
