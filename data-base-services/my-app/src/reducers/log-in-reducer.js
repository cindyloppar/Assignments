

const initialState = {
    email: '',
    password: '',
   
};
export default function logDetails(state = initialState, action) {
    switch (action.type) {
        case "SET":
            return state
        default:
            return state
    }
}

