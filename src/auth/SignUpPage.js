import React from 'react';
import './AuthStyle.css';
import axios from 'axios';
import BACKEND_URL from '../properties';
import { useHistory } from 'react-router-dom';
import { login, showAlert } from '../redux/actions';
import { connect } from 'react-redux';

const SignUpPage = ({alertOn}) => {

  const history = useHistory();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [passConfirmation, setPassConfirmation] = React.useState('');

  const handleSubmit = (event) => {

    event.preventDefault();
    if(password !== repeatPassword) {
      setPassConfirmation('Given passwords doesn\'t match');
      return;
    } else {
      setPassConfirmation('');
    }

    const new_user = {
      username: name,
      email: email,
      password: password
    }


    axios.post(BACKEND_URL + 'api/auth/register/', new_user)
      .then(res => {

        alertOn({
          message: 'Your account was created.'
        })
        history.push('/login');
      })
      .catch(function (error) {
        if (error.response.status === 409) {
          alertOn({
            type: 'error',
            message: 'This mail is already registered.'
          })
        } else {
          alertOn({
            type: 'error',
            message: 'There was some error, pleas try again.'
          })
        }
      });

  }

  return (
    <div className="login-container">

      <form className="form-container" onSubmit={handleSubmit}>
        <h3>Welcome</h3>

        <div className="form-group">
          <label>Name/nickname</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Repeat password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <p className="warring">{passConfirmation}</p>
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" required/>
            <label className="custom-control-label" htmlFor="customCheck1">I have read and accepted our <a href="#">policy.</a></label>
          </div>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  alertOn: (alertObj) => { dispatch(showAlert(alertObj))}
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
