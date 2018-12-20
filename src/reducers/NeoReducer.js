const INITIAL_STATE = {
    neoCount : 0,
    neoElements : {}
};
  
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "NEO_FETCH_SUCCESS":
            return { 
                ...state, 
                neoCount : action.payload.neoCount, 
                neoElements : action.payload.neoElements
            };
        default:
            return state;
    }
};
