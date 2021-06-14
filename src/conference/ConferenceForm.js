import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import '../auth/AuthStyle.css';
import axios from 'axios';
import BACKEND_URL from '../properties';

const ConferenceForm = ({token}) => {

  const history = useHistory();

  const [topic, setTopic] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = {
      topic,
      startDate: startTime,
      endDate: endTime,
      description
    }

    history.push('/conference/create/2', form);

  }

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <h3>New conference</h3>

        <div className="form-group">
          <label>Topic</label>
          <input
            className="form-control"
            placeholder="Enter topic"
            value={topic}
            required
            onChange={(e) => setTopic(e.target.value)}/>
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

        <button type="submit" className="submit-btn" >Next</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.token
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceForm);
