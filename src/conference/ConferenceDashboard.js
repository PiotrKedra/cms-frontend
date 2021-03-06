import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import BACKEND_URL from '../properties';
import { logout, refresh, showAlert } from '../redux/actions';
import { connect } from 'react-redux';
import '../user_dashboard/Dashboard.css';
import profilePict from '../assets/icons/profile.png';
import { useHistory } from 'react-router-dom';
import { Form, Modal } from 'react-bootstrap';
import { TimePicker } from 'antd';
import moment from 'moment';

const ConferenceDashboard = ({globalState, alertOn, refreshHome}) => {

  const history = useHistory();

  const { id } = useParams();

  const [conf, setConf] = React.useState({});
  const [presentation, setPresentations] = React.useState([]);
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
        setConf(res.data)
        setPresentations(res.data.presentations)
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

  const [title, setTitle] = React.useState('');
  const [startTime, setStartTime] = React.useState();
  const [endTime, setEndTime] = React.useState();
  const [day, setDay] = React.useState();

  const [showAdd, setShowAdd] = React.useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = (event) => {
    event.preventDefault();
    setShowAdd(true);
  }

  const addNewPresentation = (e) => {
    e.preventDefault()
    const preska =  {
      name: title,
      startTime: moment(day + '/' + startTime.format('hh:mm'), 'YYYY-MM-DD/hh:mm').format('YYYY-MM-DDTHH:mm'),
      endTime: moment(day + '/' + endTime.format('hh:mm'), 'YYYY-MM-DD/hh:mm').format('YYYY-MM-DDTHH:mm')
    }

    console.log(preska)

    const config = {
      headers: {
        'Authorization': `Bearer ${globalState.token}`,
      }
    };

    axios.post(BACKEND_URL + 'conference/' + id + '/presentation', preska, config)
      .then(res => {
        changeRefresh(!refresh)
        alertOn({
          message: 'Presentation was added.'
        })
        handleCloseAdd();
      })
      .catch(error => {
        alertOn({
          type: 'error',
          message: 'There was some error, pleas try again later.'
        })
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
                participants.length === 0 ? (
                  <p>There is no participant in this conference</p>
                ) : (
                    participants.map(men => (
                      <div className="participant" key={men.email}>
                        <img className="participant-img" src={profilePict}/>
                        <p>{men.email}</p>
                      </div>
                    ))
                )
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
                      <button className="edit-btn btn-left-margin" onClick={() => setShowAdd(true)}>Add presentation</button>
                      <button className="major-btn btn-left-margin" onClick={() => setShow(true)}>Notify</button>
                      <button className="remove-btn" onClick={() => removeConf()}>Remove</button>
                    </div>
                  </>
                ) : (
                  isEnrolled()
                    ? <button className="minor-btn" onClick={() => disenroll()}>Disenroll</button>
                    : <button className="major-btn" onClick={() => enroll()}>Enroll</button>
                )
              }
            </div>
          </div>
          <div className="conferences-container">
            <h3 className="enrolled-conferences-title">Scheduled presentations</h3>
            {
              presentation.map(p => (
                <div className="presentation-container">
                  <p className="time-text">{moment(p.startTime).format('YYYY-MM-DD') + ' (' + moment(p.startTime).format('hh:mm') + '-' + moment(p.endTime).format('hh:mm')+')'} </p>
                  <h2 className="title-text">{p.name}</h2>
                  <div className="conf-btn-container">
                    <button className="major-btn">Get attachment</button>
                  </div>
                </div>
              ))
            }

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
      <Modal show={showAdd} onHide={handleCloseAdd} className="modal">
        <form className="form-container" onSubmit={(e) => addNewPresentation(e)}>
          <h3>Add new presentation</h3>

          <div className="form-group">
            <label>Topic</label>
            <input
              className="form-control"
              placeholder="Enter title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}/>
          </div>

          <div className="form-group">
            <label>Day</label>
            <input
              type="date"
              className="form-control"
              value={day}
              required
              onChange={(e) => setDay(e.target.value)}/>
          </div>

          <div className="lolz">
            <div className="lolz2">
              <label>Start time</label>
              <TimePicker value={startTime} onChange={(start) => setStartTime(start)} format={'HH:mm'} />
            </div>

            <div className="lolz2">
              <label>End time</label>
              <TimePicker value={endTime} onChange={(end) => setEndTime(end)} format={'HH:mm'} />
            </div>
          </div>

          <Form.Group>
            <Form.File id="exampleFormControlFile1" label="Attach presentation file" />
          </Form.Group>

          <button type="submit" className="submit-btn" >Add</button>
        </form>
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
