import { RECEIVED_SEARCH_RESULTS } from '../action-types/index';
// import {SAVED_DATA_OF_USER} from '.../action-types/index';


export const updateCustomerSearchResults = (data) => {
    return {
        type: RECEIVED_SEARCH_RESULTS,
        payload: data
    }
}

// export const updateCustomerRentedDetails = (data) => {
//     return {
//         type: SAVED_DATA_OF_USER,
//         payload: data
//     }
// }