import {RECEIVED_SEARCH_RESULTS} from "../action-types/index"

const initialState = {
    searchResults: [],
  };
  export default function customerReducer(state = initialState, action) {
    switch (action.type) {
      case RECEIVED_SEARCH_RESULTS:
        return {...state, searchResults:[action.payload]}
      default:
        return state
    }
  }
  