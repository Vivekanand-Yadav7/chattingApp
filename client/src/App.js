import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import { Toaster } from "react-hot-toast";
import ProtectRout from "./components/protectRout";
import Loader from "./components/loader";
import { useSelector } from "react-redux";
function App() {
   const loader = useSelector((state)=>state.loaderReducer)
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {loader && <Loader/>}
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectRout><Home/></ProtectRout>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
