import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyForm from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './reducer';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import UnitTypeForm from './components/unit-types';
import UnitsForm from './components/units';
import LocationForm from './components/location';
import BlocksForm from './components/blocks';
import LogIn from './components/LogIn';
import SignUp from './components/sign-up';
import MainScreen from './components/main-screen';
import LocationUser from './components/location-user';
import About from './about';
import LogInBusiness from './components/log-in-business-owner';
import SignUpBusiness from './components/sign-up-business';
import LogOut from './components/log-out';
import display from './components/user-details';
import axios from 'axios';


async function checkUser() {
    var token = sessionStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
        return true
    } else {
        axios.defaults.headers.common['Authorization'] = null;
        return false;
    }
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    logOut(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        checkUser()  ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />
    )} />
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={MainScreen} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/about" component={About} />
                <Route exact path="/logout" component={LogOut} />
                <Route exact path="/signupbusinessowner" component={SignUpBusiness} />
                <Route exact path="/logginbusinessowner" component={LogInBusiness} />
                <PrivateRoute exact path="/locationuser" component={LocationUser} />
                <PrivateRoute exact path="/business" component={MyForm} />
                <PrivateRoute exact path="/units" component={UnitsForm} />
                <PrivateRoute exact path="/location" component={LocationForm} />
                <PrivateRoute exact path="/blocks" component={BlocksForm} />
                <Route exact path="/unittypes" component={UnitTypeForm} />
                <Route exact path="/userdetails" component={display} />
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
