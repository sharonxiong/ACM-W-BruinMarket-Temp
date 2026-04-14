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
        <NavLink className={linkClass} to="/">
          Marketplace
        </NavLink>
        <NavLink className={linkClass} to="/communities">
          Communitues
        </NavLink>
        <NavLink className={linkClass} to="/events">
          Events
        </NavLink>
        <NavLink className={linkClass} to="/profile">
          Profile
        </NavLink>
      </nav>

      <div className="navbar__actions">
       
        <button className="navbar__button" type="button">
          + Sell Item
        </button>
      </div>
    </header>
  );
}
