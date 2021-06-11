import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import BACKEND_URL from '../properties';
import { logout, showAlert } from '../redux/actions';
import { connect } from 'react-redux';
import '../user_dashboard/Dashboard.css';
import profilePict from '../assets/icons/profile.png';

const ConferenceDashboard = ({globalState}) => {

  const { id } = useParams();

  const [conf, setConf] = React.useState({});
  const [participants, setParticipants] = React.useState({});


  React.useEffect(() => {
    const config = {
      headers: {
        'Authorization': `Bearer ${globalState.token}`,
      }
    };
    axios.get(BACKEND_URL + 'conferences/' + id, config)
      .then(res => {
        setConf(res.data)
        console.log(res.data)
      })
      .catch(error => console.log(error));

    axios.get(BACKEND_URL + 'participants/' + id, config)
      .then(res => {
        setParticipants(res.data)
        console.log(res.data)
      })
      .catch(error => console.log(error));

  }, [globalState, id])

  return (
    <>
      <h1 className="hello-title">{conf.topic}</h1>
      <div className="dashboard-container">
        <div className="container_1">
          <div className="author_and_time-container">
            <p>{conf.author === undefined ? '...' : conf.author.firstName}</p>
            <p>{conf.startDate + '-' + conf.endDate}</p>
          </div>
          <p className="description-text-main">{conf.description}</p>
          <div className="conferences-container">
            <h3 className="enrolled-conferences-title">All participants</h3>
          </div>
        </div>
        <div className="container_2">
          <div className="conferences-container">
            <h3>Possible actions</h3>
            <div className="button-container">
              <button>Disenroll</button>
              <button>Remove</button>
              <button>Edit</button>
              <button>Notify</button>
            </div>
          </div>
          <div className="conferences-container">
            <h3 className="enrolled-conferences-title">Scheduled presentations</h3>
              <div className="presentation-container">
                <p className="time-text">17:00 - 23:33</p>
                <h2 className="title-text">Mocked topic</h2>
                <p className="author-text">You are the owner</p>
                <p className="description-text">Some lorem impsum</p>
                <div className="conf-btn-container">
                  <button className="remove-btn btn-left-margin">Remove</button>
                  <button className="edit-btn btn-left-margin">Edit</button>
                  <button className="major-btn btn-left-margin">Notify</button>
                </div>
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
  alertOn: (alertObj) => { dispatch(showAlert(alertObj))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceDashboard);
