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
    if(globalState.isLogged === false) {
      alertOn({
        message: 'You need account in order to enroll in conference.'
      })
      histroy.push('/sign_up');
      return;
    }
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
        histroy.push('/conference/dashboard/10' + conference.id);
      })
      .catch(error => {
        alertOn({
          type: 'error',
          message: 'There was some error, pleas try again later.'
        })
      });
  }

  const goToConf = () => {
    if(globalState.isLogged === false) {
      alertOn({
        message: 'You need account in order see conference.'
      })
      histroy.push('/sign_up');
      return;
    }
    histroy.push('/conference/dashboard/' + conference.id)
  }

  function formatData(date){
    const d = new Date(date);
    const month = d.getMonth() + 1
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return day + '.' + month + '.' + year
  }

    return (

        <div className="conferenceBox" onClick={() => goToConf()}>
            <div>
                <img src={conferenceIcon} className='conferenceImage' alt="conferenceImage" />
            </div>
            <div className='conferenceProperties'>
                <div>
                    <h3>{conference.topic}</h3>
                    <h6>
                      {conference.creator === undefined ? '..' : conference.creator.email + '           '}
                      | {formatData(conference.startDate) + '-' + formatData(conference.endDate)}
                    </h6>
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
