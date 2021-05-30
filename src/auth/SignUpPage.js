import React from 'react';
import './AuthStyle.css';

const SignUpPage = () => {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [passConfirmation, setPassConfirmation] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(repeatPassword);
    if(password !== repeatPassword) {
      setPassConfirmation('Given passwords doesn\'t match');
    } else {
      setPassConfirmation('');
    }
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

export default SignUpPage;
