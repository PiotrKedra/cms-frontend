import './AuthStyle.css';
import React from 'react';

const LoginPage = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
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

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
          </div>
        </div>

        <button type="submit" className="submit-btn" >Submit</button>
        <p className="forgot-password">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
