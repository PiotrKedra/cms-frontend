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


function App() {
  return (
    <Router>
      <Menu />
      <Switch>
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

export default App;
