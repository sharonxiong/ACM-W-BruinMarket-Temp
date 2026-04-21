import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__brand">BruinMarket</span>
      <nav className="footer__links" aria-label="Footer">
        <a className="footer__link" href="#">About</a>
        <a className="footer__link" href="#">Contact</a>
        <NavLink className="footer__link" to="/sell">Sell</NavLink>
        <a className="footer__link" href="#">Events</a>
      </nav>
    </footer>
  );
}
