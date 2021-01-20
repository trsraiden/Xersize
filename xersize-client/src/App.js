import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { UserSessionProvider } from './contexts/UserSessionContext';
import 'bootstrap/dist/css/bootstrap.min.css';

//authenticate
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from './components/PrivateRoute';
import Home from "./components/Home";
import Footer from './components/Footer'
// //manage account
import ManageAccount from "./components/ManageAccount";
import DeleteAccount from "./components/DeleteAccount";
import ChangePassword from "./components/ChangePassword";
// //routines
import RoutineDashboard from "./components/routine-dashboard.component";
import RoutineManager from "./components/routine-manager.component"
// //sessions
import SessionDashboard from "./components/session-dashboard.component";
import SessionManager from "./components/session-manager.component"

function App() {
  return (
    <Router>
        <UserSessionProvider>
          <Switch>
            <PrivateRoute path="/home" component={Home}/>
            <PrivateRoute path="/manageAccount" component={ManageAccount}/>
            <PrivateRoute path="/changepassword" component={ChangePassword}/>
            <PrivateRoute path="/deleteaccount" component={DeleteAccount}/>
            <PrivateRoute path="/workout" component={SessionManager}/>
            <PrivateRoute path="/workoutedit" component={SessionManager}/>
            <PrivateRoute path="/sessions" component={SessionDashboard}/>
            <PrivateRoute path="/routines" component={RoutineDashboard}/>
            <PrivateRoute path="/routinecreate" component={RoutineManager}/>
            <PrivateRoute path="/routineedit" component={RoutineManager}/>
            <Route exact path="/" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/forgotPassword" component={ForgotPassword}/>
          </Switch>
        </UserSessionProvider>
      <Footer/>
    </Router>
  );
}

export default App;
