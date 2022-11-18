import Header from "./components/Header";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Policy from "./pages/Policy";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import Footer from "./components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { RingLoader } from "react-spinners";

export const useAuth = () => {
  const token = localStorage.getItem("token");

  return token;
};

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div
        className={`z-10 bg-indigo-500 absolute w-full h-screen flex justify-center items-center transition-all duration-1000 ${
          loading ? "top-[-1px]" : "top-[-900px] opacity-0"
        }`}
      >
        <RingLoader color={"#ffffff"} loading={loading} size={80} />
      </div>
      <div className="flex flex-col justify-between">
        <Header />
        <div className="container mx-auto overflow-hidden">
          <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route element={<PrivateRoutes />}>
              <Route index path="/dashboard" element={<Dashboard />} exact />
              <Route path="/accounts" element={<Account />} />
              <Route path="/policies" element={<Policy />} />
            </Route>

            <Route element={<PublicRoutes />}>
              <Route index path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route index path="*" element={<Index />}></Route>
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
