import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { login } from '../redux/actions';
import { connect } from 'react-redux';
import accountIcon from '../assets/icons/account.png';

const Menu = ({isLogged, userEmail}) => {
  return (
    <div className="container-main">
      <nav className="desktop-nav-container">
        <div>
          <Link className="logo-container" to="/">
            <p className="logo-text">CONF<span className="logo-text-second">SYSTEM</span></p>
          </Link>
        </div>
        <div className="desktop-menu-container">
          {
            isLogged ? (
              <Link className='logged-container' to='/dashboard'>
                <p className='user-name-text'>Hi, {userEmail}</p>
                <div className='account-icon-container'>
                  <img className='account-icon' src={accountIcon} alt='account_icon'/>
                </div>
              </Link>
            ) : (
              <React.Fragment>
                <Link className="menu-button" to="/login">Login</Link>
                <Link className="sing-up-btn" to="/sign_up">Sign up</Link>
              </React.Fragment>
            )
          }
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLogged: state.isLogged,
  userEmail: state.userEmail
})

const mapDispatchToProps = (dispatch) => ({
  saveLoginData: (userData) => { dispatch(login(userData))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
