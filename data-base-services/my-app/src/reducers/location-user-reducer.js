
const initialState = {
    suburb: '',
    province: '',
    name:''
  };
  export default function locationUserDetails(state = initialState, action) {
    switch (action.type) {
      case "SET":
        return state
      default:
        return state
    }
  }