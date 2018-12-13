
import { createStore, compose } from 'redux';
import { combineForms } from 'react-redux-form';
import locationDetails from './reducers/location-reducer';
import blocksDetails from './reducers/block-reducer';
import unitTypesDetails from './reducers/unit-types-reducer';
import unitsDetails from './reducers/units-reducer';
import signDetails from './reducers/sign-up-reducer';
import logDetails from './reducers/log-in-reducer';
import signDetailsForBusiness from './reducers/sign-up-business-reducer';
import logInDetailsForBusiness from './reducers/log-in-business-reducer';
import locationUserDetails from './reducers/location-user-reducer';
import customerReducer from './reducers/customer-reducer'
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
  LocationUser:locationUserDetails,
  CustomerStore:customerReducer
}),enhancers);
      
