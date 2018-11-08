import { createStore, compose } from 'redux';
import { combineForms } from 'react-redux-form';
import logInForm from './LogIn';

const initialState = {
    name: '',
    password: '',
    remember: ''
};
export default function logDetails(state = initialState, action) {
    switch (action.type) {
        case "SET":
            return state
        default:
            return state
    }
}