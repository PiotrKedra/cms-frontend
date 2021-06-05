import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import '../auth/AuthStyle.css';
import './ConfStyle.css';
import axios from 'axios';
import BACKEND_URL from '../properties';
import { Button, Modal } from 'react-bootstrap';

const ConferenceFormPresentation = ({token}) => {

  const history = useHistory();
  const location = useLocation();
  console.log(location.state);
  console.log(token)

  const [presentation, setPresentation] = React.useState([]);

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    };

    axios.post(BACKEND_URL + 'conference/', location.state, config)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    history.push('/')
  }

  const addNewPresentation = (event) => {
    event.preventDefault();
    const newPresentation = {
      title,
      startTime,
      endTime,
      author,
      description
    }
    setTitle('')
    setStartTime('')
    setEndTime('')
    setDescription('')
    setAuthor('')
    presentation.push(newPresentation);
    handleClose();
  }

  const [title, setTitle] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [description, setDescription] = React.useState('');

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
                  <div className="presentation-container">
                    <p className="time-text">{pres.startTime} - {pres.endTime}</p>
                    <p className="title-text">{pres.title}</p>
                    <p className="author-text">{pres.author}</p>
                    <p className="description-text">{pres.description}</p>
                  </div>
                )
              }
            )
          }
          <button className="minor-btn" onClick={handleShow}>Add presentation</button>
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
            <label>Author</label>
            <input
              className="form-control"
              placeholder="Enter author name"
              value={author}
              required
              onChange={(e) => setAuthor(e.target.value)}/>
          </div>

          <div className="form-group">
            <label>Start time</label>
            <input
              type="date"
              className="form-control"
              value={startTime}
              required
              onChange={(e) => setStartTime(e.target.value)}/>
          </div>

          <div className="form-group">
            <label>End time</label>
            <input
              type="date"
              className="form-control"
              value={endTime}
              required
              onChange={(e) => setEndTime(e.target.value)}/>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              placeholder="Description goes here"
              value={description}
              required
              rows={5}
              onChange={(e) => setDescription(e.target.value)}/>
          </div>

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
})

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceFormPresentation);
