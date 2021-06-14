import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import '../auth/AuthStyle.css';
import './ConfStyle.css';
import axios from 'axios';
import BACKEND_URL from '../properties';
import { Modal, Form } from 'react-bootstrap';
import { refresh, showAlert } from '../redux/actions';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment'; // or 'antd/dist/antd.less'


const ConferenceFormPresentation = ({token, refreshHome, alertOn}) => {

  const history = useHistory();
  const location = useLocation();

  const [presentation, setPresentation] = React.useState([]);
  const [selectedDate, handleDateChange] = React.useState(new Date());


  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    event.preventDefault();
    setShow(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const press = presentation.map(p => {
      return {
        name: p.title,
        startTime: moment(p.day + '/' + p.startTime.format('hh:mm'), 'YYYY-MM-DD/hh:mm').format('YYYY-MM-DDTHH:mm'),
        endTime: moment(p.day + '/' + p.endTime.format('hh:mm'), 'YYYY-MM-DD/hh:mm').format('YYYY-MM-DDTHH:mm')
      }
    })

    const body = {
      ...location.state,
      presentations: press
    }

    console.log(body)

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    };

    axios.post(BACKEND_URL + 'conference/', body, config)
      .then(res => {
        alertOn({
          message: 'Conference ' + location.state.topic + ' was created.'
        })
        refreshHome();
        history.push('/');
      })
      .catch(error => {
        alertOn({
          type: 'error',
          message: 'There was some error, pleas try again later.'
        })
      });

  }

  const addNewPresentation = (event) => {
    event.preventDefault();
    const newPresentation = {
      title,
      startTime,
      endTime,
      day
    }
    let hmm = moment(day + '/' + startTime.format('hh:mm'), 'YYYY-MM-DD/hh:mm');
    hmm.format('YYYY-MM-DDTHH:mm:ss:SSZ')

    console.log(newPresentation)
    setTitle('')
    setStartTime(null)
    setEndTime(null)
    presentation.push(newPresentation);
    handleClose();
  }

  const [title, setTitle] = React.useState('');
  const [startTime, setStartTime] = React.useState();
  const [endTime, setEndTime] = React.useState();
  const [day, setDay] = React.useState();

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <h3>Schedule presentations</h3>

        <div className="form-group">
          <label>Add as many presentation as you want within your conference.</label>
        </div>

        <div className="form-group">
          {
            presentation.length === 0 ? (
                <div className="presentation-container">
                  <p className="no-pres-text">No presentation, add some.</p>
                </div>
                ) :
              presentation.map(pres => {
                return (
                  <div className="presentation-container" key={pres.title}>
                    <p className="time-text">{pres.day + ' '} ({pres.startTime.format('hh:mm')} - {pres.endTime.format('hh:mm')})</p>
                    <p className="title-text">{pres.title}</p>
                  </div>
                )
              }
            )
          }
          <button className="minor-btn" onClick={(event) => handleShow(event)}>Add presentation</button>
        </div>

        <button type="submit" className="submit-btn" >Create conference</button>
      </form>
      <Modal show={show} onHide={handleClose} className="modal">
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.token
})

const mapDispatchToProps = (dispatch) => ({
  refreshHome: () => {dispatch(refresh())},
  alertOn: (alertObj) => {dispatch(showAlert(alertObj))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceFormPresentation);
