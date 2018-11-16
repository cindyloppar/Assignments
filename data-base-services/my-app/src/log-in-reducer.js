import { createStore, compose } from 'redux';
import { combineForms } from 'react-redux-form';
import logInForm from './LogIn';

const initialState = {
    email: '',
    password: '',
   
};
export default function logDetails(state = initialState, action) {
    switch (action.type) {
        case "SET":
            return state
        default:
            return state
    }
}

const postLogin = (values) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (![ 'john', 'paul', 'george', 'ringo' ].includes(values.username)) {
          reject({
            '': 'Login failed!',
            username: 'User does not exist',
          });
        } else if (values.password !== 'beatles') {
          reject({
            '': 'Login failed!',
            password: 'Wrong password',
          });
        } else {
          resolve(true);
          alert('Successfully submitted!');
          console.log(values);
        }
      });
    });
  }