import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Form, Control } from 'react-redux-form';
import MyForm from './App';
import * as serviceWorker from './serviceWorker';
import { combineForms } from 'redux';
import { Provider } from 'react-redux';
import {store} from './reducer';


    

ReactDOM.render(
    <Provider store={store}>
        <MyForm />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
