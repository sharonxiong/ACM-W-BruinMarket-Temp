
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import "./Header.css";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `navbar__link${isActive ? " navbar__link--active" : ""}`;

export default function Header() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMarketplace = pathname === "/marketplace";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) setSearchParams({ q: val }, { replace: true });
    else setSearchParams({}, { replace: true });
  };

  return (
    <header className="navbar">
      <NavLink className="navbar__brand" to="/" aria-label="Bruin Market home">
        <img src="/logo.svg" alt="Bruin Market" className="navbar__logo" />
      </NavLink>

      <div className="navbar__search-wrap" style={{ visibility: isMarketplace ? "visible" : "hidden" }}>
        <svg className="navbar__search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.75"/>
          <line x1="12.5" y1="12.5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
        </svg>
        <input
          className="navbar__search"
          type="text"
          placeholder="Search listings…"
          value={searchParams.get("q") ?? ""}
          onChange={handleSearch}
          tabIndex={isMarketplace ? 0 : -1}
        />
      </div>

      <nav className="navbar__links" aria-label="Primary">
        <NavLink className={linkClass} to="/marketplace">Marketplace</NavLink>
        <NavLink className={linkClass} to="/events">Events</NavLink>
        <NavLink className={linkClass} to="/sell">Sell</NavLink>
        <NavLink className={linkClass} to="/profile">Profile</NavLink>
      </nav>

      <div className="navbar__actions">
        <button className="navbar__button navbar__button--ghost" type="button" onClick={() => navigate("/signin")}>
          Sign in
        </button>
        
          <NavLink className={linkClass} to="/sell">
          <button className="navbar__button" type="button">
          Post listing
          </button>
          </NavLink>
        
      </div>
    </header>
  );
}