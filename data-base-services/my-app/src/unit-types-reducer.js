import { createStore, compose } from 'redux';
import { combineForms } from 'react-redux-form';
import unitTypesForm from './unit-types';

const initialState = {
 name: '',
 length: '',
 width: '',
 height: ''
};
export default function unitTypesDetails(state = initialState, action) {
  switch (action.type) {
    case "SET":
      return state
    default:
      return state
  }
}