import { createStore, compose } from 'redux';
import { combineForms } from 'react-redux-form';
import unitsForm from './units';

const initialState = {
 name: '',
 selectBlock: '',
 selectUnitType: ''
};
export default function unitsDetails(state = initialState, action) {
  switch (action.type) {
    case "SET":
      return state
    default:
      return state
  }
}