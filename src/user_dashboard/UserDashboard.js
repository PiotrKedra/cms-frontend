import React from 'react';
import { login, logout, showAlert } from '../redux/actions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../conference/ConfStyle.css'
import './Dashboard.css';
import profilePict from '../assets/icons/profile.png';
import axios from 'axios';
import BACKEND_URL from '../properties';



const UserDashboard = ({globalState, clearUserData, alertOn}) => {
  const history = useHistory();

  const [usersConfs, setUsersConfs] = React.useState([]);


  React.useEffect(() => {
    const config = {
      headers: {
        'Authorization': `Bearer ${globalState.token}`,
      }
    };
    axios.get(BACKEND_URL + 'my-conferences', config)
      .then(res => {
        setUsersConfs(res.data);
      })
      .catch(error => console.log(error));
  }, [alertOn, globalState.token]);

  const removeConf = (id) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${globalState.token}`,
      }
    };
    axios.delete(BACKEND_URL + `conference/${id}`, config)
      .then(res => {
        setUsersConfs(usersConfs.filter((conf) => conf.id !== id))
        alertOn({
          message: 'Successfully removed conference'
        })
      })
      .catch(error => {
        alertOn({
          type: 'error',
          message: 'Couldn\'t remove conference.'
        })
      });
  }

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

            {
              usersConfs.map((conf) => (
                <div className="presentation-container">
                  <p className="time-text">17:00 - 23:33</p>
                  <h2 className="title-text">{conf.topic}</h2>
                  <p className="author-text">You are the owner</p>
                  <p className="description-text">{conf.description}</p>
                  <div className="conf-btn-container">
                    <button className="remove-btn btn-left-margin" onClick={(event) => removeConf(conf.id)}>Remove</button>
                    <button className="edit-btn btn-left-margin">Edit</button>
                    <button className="major-btn btn-left-margin">Notify</button>
                  </div>
                </div>
              ))
            }

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
  clearUserData: () => { dispatch(logout())},
  alertOn: (alertObj) => { dispatch(showAlert(alertObj))}
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
