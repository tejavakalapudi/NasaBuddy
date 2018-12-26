const INITIAL_STATE = {
    neoCount : 0,
    neoElements : []
};
  
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "NEO_FETCH_SUCCESS":
            const neoElements = [];
            for( key in action.payload.neoElements ){
                neoElements.push({ date: key, elements: action.payload.neoElements[key], key });
            }

            //sort elements from today to future
            neoElements.sort((a,b) => {
                return new Date(a.date) - new Date(b.date);
            });

            return { 
                ...state, 
                neoCount : action.payload.neoCount, 
                neoElements : neoElements
            };
        default:
            return state;
    }
};
