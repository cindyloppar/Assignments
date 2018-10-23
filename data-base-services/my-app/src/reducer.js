
import { createStore, compose } from 'redux';
import { combineForms } from 'react-redux-form';
import MyForm from './App';
import locationDetails from './location-reducer'

const enhancers = compose( window.devToolsExtension ? window.devToolsExtension() : f => f)

const initialUser = {
  businessName: '',
  contactName: '',
  telephoneNumber: '',
  contactEmail: '',
};

export const store = createStore(combineForms({
  user: initialUser,
  location: locationDetails
}),enhancers);
      
