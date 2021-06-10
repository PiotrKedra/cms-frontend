import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './home/HomePage';
import SignUpPage from './auth/SignUpPage';
import LoginPage from './auth/LoginPage';
import Menu from './home/Menu';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import UserDashboard from './user_dashboard/UserDashboard';
import ConferenceForm from './conference/ConferenceForm';
import ConferenceFormPresentation from './conference/ConferenceFormPresentation';
import { Alert } from 'react-bootstrap';
import { cleanAlert } from './redux/actions';
import { connect } from 'react-redux';


function App({isAlert, alert, alertOff}) {

  React.useEffect(() => {
    setTimeout(() => alertOff(), 3000);
  }, [isAlert, alertOff]);

  return (
    <Router>
      <Menu />

      {
        isAlert
        && (
          <div className="alert-custom">
            <Alert variant={alert.type === 'error' ? 'danger' : 'primary'}>
              {alert.message}
            </Alert>
          </div>
        )
      }

      <Switch>
        <Route path="/conference/create/2">
          <ConferenceFormPresentation />
        </Route>
        <Route path="/conference/create/1">
          <ConferenceForm />
        </Route>
        <Route path="/dashboard">
          <UserDashboard />
        </Route>
        <Route path="/sign_up">
          <SignUpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  isAlert: state.isAlert,
  alert: state.alert
})

const mapDispatchToProps = (dispatch) => ({
  alertOff: () => {dispatch(cleanAlert())}
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
