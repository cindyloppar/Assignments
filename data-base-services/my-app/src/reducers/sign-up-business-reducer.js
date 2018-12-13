
const initialState = {
    name: '',
    last_name: '',
    email: '',
    password: ''
};
export default function signDetailsForBusiness(state = initialState, action) {
    switch (action.type) {
        case "SET":
            return state
        default:
            return state
    }
}