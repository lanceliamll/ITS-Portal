import React, { Fragment, useEffect } from "react";
//Redux Provider
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/authAction";
import MakeAdmin from "./components/admin/MakeAdmin";
import Students from "./components/admin/Students";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Grade from "./components/grades/Grade";
import Alert from "./components/layout/Alert";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Profile from "./components/profile/Profile";
import PrivateRoute from "./components/routing/PrivateRoute";
import setAuthToken from "./helpers/setAuthToken";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div>
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/students" component={Students} />
              <PrivateRoute exact path="/makeadmin" component={MakeAdmin} />
              <PrivateRoute exact path="/grade/:id" component={Grade} />
            </Switch>
          </div>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
