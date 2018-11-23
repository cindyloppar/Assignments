import { createStore, compose } from 'redux';
import { combineForms } from 'react-redux-form';
import signUpBusiness from '../sign-up-business';

const initialState = {
    name: '',
    last_name: '',
    email: '',
    password: ''
};
export default function signDetailsForBusiness(state = initialState, action) {
    switch (action.type) {
        case "SET":
            return state
        default:
            return state
    }
}