import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Marketplace from "./pages/Marketplace";
import EventsPage from "./pages/EventsPage";
import AddEventPage from "./pages/AddEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import SellPage from "./pages/SellPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/add" element={<AddEventPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/listings/:id" element={<ListingDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}