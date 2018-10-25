import { createStore, compose } from 'redux';
import { combineForms } from 'react-redux-form';
import blocksForm from './blocks';

const initialState = {
 blockName: '',
};
export default function blocksDetails(state = initialState, action) {
  switch (action.type) {
    case "SET":
      return state
    default:
      return state
  }
}