
import { createStore, compose } from 'redux';
import { combineForms } from 'react-redux-form';
import locationDetails from './location-reducer';
import blocksDetails from './block-reducer';
import unitTypesDetails from './unit-types-reducer';
import unitsDetails from './units-reducer';
import signDetails from './sign-up-reducer';
import logDetails from './log-in-reducer';
import signDetailsForBusiness from './sign-up-business-reducer';
import logInDetailsForBusiness from './log-in-business-reducer';
import locationUserDetails from './location-user-reducer';

const enhancers = compose( window.devToolsExtension ? window.devToolsExtension() : f => f)

const initialUser = {
  businessName: '',
  contactName: '',
  telephoneNumber: '',
  contactEmail: '',
};

export const store = createStore(combineForms({
  user: initialUser,
  location: locationDetails,
  blocks: blocksDetails,
  unitTypes: unitTypesDetails,
  units: unitsDetails,
  signUp:signDetails,
  logIn: logDetails,
  signUpBusiness: signDetailsForBusiness,
  logInBusiness: logInDetailsForBusiness,
  LocationUser:locationUserDetails
}),enhancers);
      
