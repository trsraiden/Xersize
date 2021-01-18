import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { UserSessionProvider } from './contexts/UserSessionContext';
import 'bootstrap/dist/css/bootstrap.min.css';

//authenticate
import Login from "./components/Login";
// import Signup from "./Signup";
// import ForgotPassword from "./ForgotPassword";
import PrivateRoute from './components/PrivateRoute';
import Home from "./components/Home";
import Footer from './components/Footer'
// //manage account
// import ManageAccount from "./ManageAccount";
// import DeleteAccount from "./DeleteAccount";
// import ChangePassword from "./ChangePassword";
// //routines
// import RoutinesDashboard from "./routine-dashboard.component";
// import RoutinesManager from "./routine-manager.component"
// //sessions
// import SessionsDashboard from "./session-dashboard.component";
// import SessionsManager from "./session-manager.component"

function App() {
  return (
    <Router>
        <UserSessionProvider>
          <Switch>
            <PrivateRoute path="/home" component={Home}/>
            {/* <PrivateRoute path="/manageAccount" component={ManageAccount}/> */}
            {/* <PrivateRoute path="/changepassword" component={ChangePassword}/> */}
            {/* <PrivateRoute path="/deleteaccount" component={DeleteAccount}/> */}
            {/* <PrivateRoute path="/workout" component={SessionsManager}/> */}
            {/* <PrivateRoute path="/workoutedit" component={SessionsManager}/> */}
            {/* <PrivateRoute path="/sessions" component={SessionsDashboard}/> */}
            {/* <PrivateRoute path="/routines" component={RoutinesDashboard}/> */}
            {/* <PrivateRoute path="/routinecreate" component={RoutinesManager}/> */}
            {/* <PrivateRoute path="/routineedit" component={RoutinesManager}/> */}
            <Route exact path="/" component={Login}/>
            {/* <Route path="/signup" component={Signup}/> */}
            {/* <Route path="/forgotPassword" component={ForgotPassword}/> */}
          </Switch>
        </UserSessionProvider>
      <Footer/>
    </Router>
  );
}

export default App;
