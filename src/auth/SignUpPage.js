import React from 'react';
import './AuthStyle.css';
import axios from 'axios';
import BACKEND_URL from '../properties';
import { useHistory } from 'react-router-dom';

const SignUpPage = () => {

  const history = useHistory();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [passConfirmation, setPassConfirmation] = React.useState('');
  const [isError, setIsError] = React.useState(false);

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
        history.push('/login');
      })
      .catch(error => {
        setIsError(true);
        setTimeout(() => setIsError(false), 5000);
      });

  }

  return (
    <div className="login-container">

      {
        isError && (
          <div className="alert alert-danger" role="alert">
            There was some error, pleas try again.
          </div>
        )
      }

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

export default SignUpPage;
