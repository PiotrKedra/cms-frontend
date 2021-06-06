import React, { useEffect } from 'react';
import './ConferenceBox.css';
import conferenceIcon from '../assets/icons/conference.png';

const ConferenceBox = ({ conference }) => {

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
                        <button type="button" className="btn btn-primary">Enroll in</button>
                    </div>
                </div>


            </div>
        </div>
    );
}


export default ConferenceBox;
