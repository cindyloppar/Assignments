import { createStore, compose } from 'redux';
import { combineForms } from 'react-redux-form';
import signUpForm from './sign-up';

const initialState = {
    name: '',
    last_name: '',
    email: '',
    password: ''
};
export default function signDetails(state = initialState, action) {
    switch (action.type) {
        case "SET":
            return state
        default:
            return state
    }
}