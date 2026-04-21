import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Marketplace from "./pages/Marketplace";
import EventsPage from "./pages/EventsPage";
import SellPage from "./pages/SellPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}