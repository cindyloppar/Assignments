import { RECEIVED_SEARCH_RESULTS } from '../action-types/index'

export const updateCustomerSearchResults = (data) => {
    return {
        type: RECEIVED_SEARCH_RESULTS,
        payload: data
    }
}

