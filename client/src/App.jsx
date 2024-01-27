import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserOrder from "./pages/userOrderPages/UserOrder";
import AdminRoot from "./pages/AdminDashboard/AdminRoot";
import Dashboard from "./pages/AdminDashboard/dashboard/Dashboard";
import TodaySales from "./pages/AdminDashboard/Sales/TodaySales/TodaySales";
import AllSales from "./pages/AdminDashboard/Sales/AllSALES/AllSales";
import Test2 from "./pages/QrCode/Test2";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/userOrder" element={<UserOrder />} />
            <Route path="/test2" element={<Test2 />} />
          </Route>
          <Route path="/adminRoot" element={<AdminRoot />}>
            <Route path="/adminRoot/dashboard" element={<Dashboard />} />
            <Route
              path="/adminRoot/dashboard/todaySales"
              element={<TodaySales />}
            />
            <Route
              path="/adminRoot/dashboard/allSales"
              element={<AllSales />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
