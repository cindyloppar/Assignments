import { createStore, compose } from 'redux';
import { combineForms } from 'react-redux-form';
import blocksForm from './blocks';

const initialState = {
 name: '',
 blocksName: '',
 selectLocation: ''
};
export default function blocksDetails(state = initialState, action) {
  switch (action.type) {
    case "SET":
      return state
    default:
      return state
  }
}