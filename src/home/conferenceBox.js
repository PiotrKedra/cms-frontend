import React, { useEffect } from 'react';
import './ConferenceBox.css';
import conferenceIcon from '../assets/icons/conference.png';
import { logout, showAlert } from '../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import BACKEND_URL from '../properties';
import { useHistory } from 'react-router-dom';

const ConferenceBox = ({ conference, globalState, alertOn }) => {

  const histroy = useHistory();

  const enroll = () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${globalState.token}`,
      }
    };
    axios.get(BACKEND_URL + `enroll/${conference.id}`, config)
      .then(res => {
        alertOn({
          message: 'Successfully enrolled in' + conference.topic + 'conference'
        })
        histroy.push('/conference/dashboard/10');
      })
      .catch(error => {
        alertOn({
          type: 'error',
          message: 'There was some error, pleas try again later.'
        })
        histroy.push('/conference/dashboard/10');
      });
  }

    return (

        <div className="conferenceBox">
            <div>
                <img src={conferenceIcon} className='conferenceImage' alt="conferenceImage" />
            </div>
            <div className='conferenceProperties'>
                <div>
                    <h3>{conference.topic}</h3>
                </div>
                <div className='conferenceDescriptionBox'>
                    <div className="description">
                        {conference.description}
                    </div>
                    <div className="buttonBox">
                        <button type="button" className="btn btn-primary" onClick={() => enroll()}>Enroll in</button>
                    </div>
                </div>


            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
  globalState: state
})

const mapDispatchToProps = (dispatch) => ({
  alertOn: (alertObj) => { dispatch(showAlert(alertObj))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceBox);
