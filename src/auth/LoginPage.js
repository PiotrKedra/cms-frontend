import './AuthStyle.css';
import React from 'react';
import axios from 'axios';
import BACKEND_URL from '../properties';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

const LoginPage = ({saveLoginData}) => {

  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const credentials = {
      loginOrEmail: email,
      password: password
    }

    axios.post(BACKEND_URL + 'api/auth/', credentials)
      .then(res => {
        console.log(res.data.token);
        const userData = {
          token: res.data.token,
          userEmail: email,
        }
        saveLoginData(userData);
        history.push('/dashboard');
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <h3>Login</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <button type="submit" className="submit-btn" >Submit</button>
        <p className="forgot-password">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  saveLoginData: (userData) => { dispatch(login(userData))}
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
