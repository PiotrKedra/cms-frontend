import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './home/HomePage';
import SignUpPage from './auth/SignUpPage';
import LoginPage from './auth/LoginPage';
import Menu from './home/Menu';

function App() {
  return (
    <Router>
      <Menu />
      <Switch>
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
