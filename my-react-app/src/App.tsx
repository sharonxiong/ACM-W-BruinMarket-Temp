import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Marketplace from "./pages/Marketplace";
import CommunitiesPage from "./pages/CommunitiesPage";
import SellPage from "./pages/SellPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}