import React from 'react';
import { login, logout } from '../redux/actions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../conference/ConfStyle.css'
import './Dashboard.css';
import profilePict from '../assets/icons/profile.png';


const UserDashboard = ({globalState, clearUserData}) => {
  const history = useHistory();
  console.log(globalState)
  return (
    <>
      <h1 className="hello-title">Hello, {globalState.userEmail}</h1>
      <div className="dashboard-container">
        <div className="container_1">
          <img className="profile-img" src={profilePict} alt="profile picture"/>

          <button className="regular-btn" >Edit account</button>
          <button className="regular-btn" onClick={() => {
            history.push('/conference/create/1');
          }}>Create conference</button>
          <button className="regular-btn" >Settings</button>
          <button className="regular-btn" onClick={() => {
            clearUserData();
            history.push('/');
          }}>Logout</button>

        </div>
        <div className="container_2">
          <div className="conferences-container">
            <h3>Your conferences</h3>
            <div className="presentation-container">
              <p className="time-text">17:00 - 23:33</p>
              <h2 className="title-text">Spring boot conf</h2>
              <p className="author-text">You are the owner</p>
              <p className="description-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
              <div className="conf-btn-container">
                <button className="remove-btn btn-left-margin">Remove</button>
                <button className="edit-btn btn-left-margin">Edit</button>
                <button className="major-btn btn-left-margin">Notify</button>
              </div>
            </div>
          </div>

          <div className="conferences-container">
            <h4 className="enrolled-conferences-title">Conferences you are enrolled in</h4>
            <div className="enrolled-conferences-empty">
              <p className="enrolled-conferences-empty-text">You have not enrolled into any conferences, yet.</p>
              <button
                className="major-btn btn-left-margin search-fot-conf-btn"
                onClick={() => {
                  history.push('/');
                }}
              >Search for conferences</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  globalState: state
})

const mapDispatchToProps = (dispatch) => ({
  clearUserData: () => { dispatch(logout())}
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
