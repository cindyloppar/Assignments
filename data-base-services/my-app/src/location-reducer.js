

const initialState = {
  address_line1: '',
  address_line2: '',
  city: '',
  suburb: '',
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
