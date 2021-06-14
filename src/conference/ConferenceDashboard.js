import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import BACKEND_URL from '../properties';
import { logout, refresh, showAlert } from '../redux/actions';
import { connect } from 'react-redux';
import '../user_dashboard/Dashboard.css';
import profilePict from '../assets/icons/profile.png';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const ConferenceDashboard = ({globalState, alertOn, refreshHome}) => {

  const history = useHistory();

  const { id } = useParams();

  const [conf, setConf] = React.useState({});
  const [participants, setParticipants] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [refresh, changeRefresh] = React.useState(false);

  React.useEffect(() => {
    const config = {
      headers: {
        'Authorization': `Bearer ${globalState.token}`,
      }
    };
    axios.get(BACKEND_URL + 'conferences/' + id, config)
      .then(res => {
        console.log('DUPKA @@@@@@@@@@')
        console.log(res.data)
        setConf(res.data)
      })
      .catch(error => console.log(error));

    axios.get(BACKEND_URL + 'participants/' + id, config)
      .then(res => {
        setParticipants(res.data)
      })
      .catch(error => console.log(error));

    axios.get(BACKEND_URL + 'my-user/', config)
      .then(res => {
        setUser(res.data)
      })
      .catch(error => console.log(error));

  }, [globalState, id, refresh])

  const isOwner = () => {
    console.log('dupa')
    console.log(conf.creator)
    console.log(conf.creator === undefined)
    const ownerId = conf.creator === undefined ? -1 : conf.creator.id
    const userId = user.id;
    return ownerId === userId;
  }

  const isEnrolled = () => {
    const userEmail = user.email;
    const isIn = participants.filter((men) => men.email === userEmail).length;
    return isIn === 1;
  }

  const enroll = () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${globalState.token}`,
      }
    };
    axios.get(BACKEND_URL + `enroll/${conf.id}`, config)
      .then(res => {
        changeRefresh(!refresh);
        alertOn({
          message: 'Successfully enrolled in' + conf.topic + 'conference'
        })
      })
      .catch(error => {
        alertOn({
          type: 'error',
          message: 'There was some error, pleas try again later.'
        })
      });
  }

  const disenroll = () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${globalState.token}`,
      }
    };
    axios.get(BACKEND_URL + `disenroll/${conf.id}`, config)
      .then(res => {
        changeRefresh(!refresh);
        alertOn({
          message: 'Successfully disenrolled from' + conf.topic + 'conference'
        })
      })
      .catch(error => {
        alertOn({
          type: 'error',
          message: 'There was some error, pleas try again later.'
        })
      });
  }

  const removeConf = () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${globalState.token}`,
      }
    };
    axios.delete(BACKEND_URL + `conference/${id}`, config)
      .then(res => {
        refreshHome();
        alertOn({
          message: 'Successfully removed conference'
        });
        history.push('/')
      })
      .catch(error => {
        alertOn({
          type: 'error',
          message: 'Couldn\'t remove conference.'
        })
      });
  }

  function formatData(date){
    const d = new Date(date);
    const month = d.getMonth() + 1
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return day + '.' + month + '.' + year
  }

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    event.preventDefault();
    setShow(true);
  }

  const handleSendXd = () => {
    setShow(false);
    alertOn({
      message: 'Emails weren\'t send since this functionality wasn\'t yet implemented'
    });
  }

  return (
    <>
      <h1 className="hello-title">{conf.topic}</h1>
      <div className="dashboard-container">
        <div className="container_1">
          <div className="author_and_time-container">
            <p>{conf.creator === undefined ? '...' : conf.creator.email}</p>
            <p>{formatData(conf.startDate) + '-' + formatData(conf.endDate)}</p>
          </div>
          <p className="description-text-main">{conf.description}</p>
          <div className="conferences-container">
            <h3 className="enrolled-conferences-title">All participants</h3>
            <div className="participant-container">
              {
                participants.map(men => (
                  <div className="participant" key={men.email}>
                    <img className="participant-img" src={profilePict}/>
                    <p>{men.email}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="container_2">
          <div className="conferences-container">
            <h3>Possible actions</h3>
            <div className="button-container">
              {
                isOwner() ? (
                  <>
                    <div className="conf-btn-container">
                      <button className="edit-btn btn-left-margin">Add presentation</button>
                      <button className="major-btn btn-left-margin" onClick={() => setShow(true)}>Notify</button>
                      <button className="remove-btn" onClick={() => removeConf()}>Remove</button>
                    </div>
                  </>
                ) : (
                  isEnrolled()
                    ? <button onClick={() => disenroll()}>Disenroll</button>
                    : <button onClick={() => enroll()}>Enroll</button>
                )
              }
            </div>
          </div>
          <div className="conferences-container">
            <h3 className="enrolled-conferences-title">Scheduled presentations</h3>
              <div className="presentation-container">
                <p className="time-text">17:00 - 23:33</p>
                <h2 className="title-text">Mocked topic</h2>
                <div className="conf-btn-container">
                  <button className="remove-btn btn-left-margin">Remove</button>
                </div>
              </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} className="modal hmm">
        <div className="hehe">
          <h3>Notify all participants</h3>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Message goes here"
              required
              rows={5}
            />
          </div>
          <div className="xdxd">
            <button className="xd-btn" onClick={() => handleClose()}>cancel</button>
            <button className="major-btn" onClick={() => handleSendXd()}>send</button>
          </div>
        </div>
      </Modal>

    </>
  );
}

const mapStateToProps = (state) => ({
  globalState: state
})

const mapDispatchToProps = (dispatch) => ({
  alertOn: (alertObj) => { dispatch(showAlert(alertObj))},
  refreshHome: () => { dispatch(refresh())}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceDashboard);
