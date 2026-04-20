import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `navbar__link${isActive ? " navbar__link--active" : ""}`;

export default function Header() {
  return (
    <header className="navbar">
      <NavLink className="navbar__brand" to="/">
        BruinMarket
      </NavLink>

      <nav className="navbar__links" aria-label="Primary">
        <NavLink className={linkClass} to="/marketplace">
          Marketplace
        </NavLink>
        <NavLink className={linkClass} to="/communities">
          Communities
        </NavLink>
        <NavLink className={linkClass} to="/sell">
          Sell
        </NavLink>
        <NavLink className={linkClass} to="/profile">
          Profile
        </NavLink>
      </nav>

      <div className="navbar__actions">
        <button className="navbar__button navbar__button--ghost" type="button">
          Sign in
        </button>
        <button className="navbar__button" type="button">
          Post listing
        </button>
      </div>
    </header>
  );
}