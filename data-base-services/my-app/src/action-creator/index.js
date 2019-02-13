import { RECEIVED_SEARCH_RESULTS } from '../action-types/index';
import {RECEIVED_BUSINESS_OWNER_RESULTS} from '../action-types/index';

export const updateCustomerSearchResults = (data) => {
    return {
        type: RECEIVED_SEARCH_RESULTS,
        payload: data
    }
}

export const updateBusinessSearchResults = (data) => {
    return {
        type: RECEIVED_BUSINESS_OWNER_RESULTS,
        payload: data
    }
    
}
