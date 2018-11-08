import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Form, Control } from 'react-redux-form';
import MyForm from './App';
import * as serviceWorker from './serviceWorker';
import { combineForms } from 'redux';
import { Provider } from 'react-redux';
import { store } from './reducer';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import unitTypeForm from './unit-types';
import unitsForm from './units';
import locationForm from './location';
import blocksForm from './blocks';
import logInForm from './LogIn';
import signUpForm from './sign-up';
import MainScreen from './main-screen'
import LocationUser from './location-user';


ReactDOM.render(
    <Provider store={store}>
        <Router>

            <div>
                {/* <Route exact path="/login" render={() => (
                    logInForm ? (
                        <Redirect to="/location" />
                    ) : (
                            <locationForm />
                        )
                )} /> */}
                <Route exact path="/" component={MainScreen} />                
                <Route exact path="/login" component={logInForm} />
                <Route exact path="/signup" component={signUpForm} />
                <Route exact path="/locationuser" component={LocationUser} />
                <Route exact path="/business" component={MyForm} />
                <Route exact path="/units" component={unitsForm} />
                <Route exact path="/location" component={locationForm} />
                <Route exact path="/blocks" component={blocksForm} />
                <Route exact path="/unittypes" component={unitTypeForm} />


            </div>

        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
