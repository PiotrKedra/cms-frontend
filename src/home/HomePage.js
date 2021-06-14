import React from 'react';
import ConferenceBox from './conferenceBox';
import './HomePage.css';
import { logout } from '../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import BACKEND_URL from '../properties';

const HomePage = ({globalState}) => {

  const [conferences, setConferences] = React.useState([]);
  const [conferencesv1, setConferencesv1] = React.useState([]);

  const [searchConference, setSearchConference] = React.useState('');

  const handleSearchInput = (value) => {
    setSearchConference(value);
    if(value.length > 2) {
      console.log('search fonrererer')
      setConferences(conferencesv1.filter(c => c.topic.includes(value)))
    }
    else {
      console.log(' all conferences')
      setConferences(conferencesv1)
    }
  }

  const handleChange = (e) => {
    console.log(e.target.value)
  }

  React.useEffect(() => {
    const config = {
      headers: {
        'Authorization': `Bearer ${globalState.token}`,
      }
    };
    axios.get(BACKEND_URL + 'conferences/', config)
      .then(res => {
        console.log(res.data)
        const confers = res.data.reverse();
        setConferences(confers);
        setConferencesv1(confers);
      })
      .catch(error => {
        console.log(error);
      });
  }, [globalState.token, globalState.refresh])

  return (
    <div className="homePage">
      <h1>Upcoming conferences</h1>

      <div className="homeHeader">
        <div className="homeSearchBar">
          <input className="searchBar" placeholder="Search" value={searchConference} onChange={(e) => handleSearchInput(e.target.value)} />
        </div>
        <div className="sortBox">
          <label className="sortLabel">Sort by: </label>
          <select className="btn btn-primary dropdown-toggle" name="Sort by" onChange={handleChange}>
            <option value="name">Name</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>
      <div>
        {
          conferences.map(conference => (
            <ConferenceBox conference={conference} key={conference.id}/>
          ))
        }
      </div>
    </div>
  );
}


const mapStateToProps = (state) => ({
  globalState: state
})

const mapDispatchToProps = (dispatch) => ({
  clearUserData: () => { dispatch(logout())}
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
