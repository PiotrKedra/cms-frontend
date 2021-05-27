import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => (
  <div className="container">
    <nav className="desktop-nav-container">
      <div>
        <Link className="logo-container" to="/">
          <p className="logo-text">CONFERENCE<span className="logo-text-second">SYSTEM</span></p>
        </Link>
      </div>
      <div className="desktop-menu-container">
        <Link className="menu-button" to="/login">Login</Link>
        <Link className="major-btn" to="/sign_up">Sign up</Link>
      </div>
    </nav>
  </div>
);

export default Menu;
