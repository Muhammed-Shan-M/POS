// import React from 'react'
import { Routes, Route } from "react-router-dom";
import SelectProducts from "./pages/SelectProducts";
import CheckoutPage from "./pages/ReviewOrder";
import BillPage from "./pages/BillSummery";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SelectProducts/>} />
      <Route path="/billing" element={<CheckoutPage/>} />
      <Route path="/finalBill" element={<BillPage/>} />
    </Routes>
  )
}
