import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CommunitiesPage from "./pages/CommunitiesPage";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import { ProfilePage } from "./pages/ProfilePage";
export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
