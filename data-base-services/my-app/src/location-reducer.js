import { createStore, compose } from 'redux';
import { combineForms } from 'react-redux-form';
import locationForm from './location';

const initialState = {
  address_line1: '',
  address_line2: '',
  suburb: '',
  country: '',
  region: '',
  store: '',
  selectBusiness:''
};
export default function locationDetails(state = initialState, action) {
  switch (action.type) {
    case "SET":
      return state
    default:
      return state
  }
}
