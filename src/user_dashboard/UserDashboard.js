import React from 'react';
import { login, logout } from '../redux/actions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const UserDashboard = ({clearUserData}) => {
  const history = useHistory();
  return (
    <div>
      <p>Dashboard</p>
      <button onClick={() => {
        clearUserData();
        history.push('/');
      }}>Logout</button>

      <button onClick={() => {
        history.push('/conference/create/1');
      }}>Create conference</button>
    </div>
  );
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  clearUserData: () => { dispatch(logout())}
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
