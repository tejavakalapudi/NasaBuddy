const INITIAL_STATE = {
    imagesByFhaz : [],
    imagesByNavCam : [],
    imagesByMast : [],
    imagesByChemCam : [],
    imagesByMahli : [],
    imagesByMardi : [],
    imagesByRhaz : [],
    imagesByPanCam : [],
    imagesByMinites : [],
    selectedRover : 'Curiosity',
    requestInProgress : false,
    roverInfo: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FHAZ_IMAGES_SUCCESS":
            return { 
                ...state, 
                imagesByFhaz: action.payload
            };
        case "NAVCAM_IMAGES_SUCCESS":
            return { 
                ...state, 
                imagesByNavCam: action.payload
            };
        case "MAST_IMAGES_SUCCESS":
            return { 
                ...state, 
                imagesByMast: action.payload
            };
        case "CHEMCAM_IMAGES_SUCCESS":
            return { 
                ...state, 
                imagesByChemCam: action.payload
            };
        case "MAHLI_IMAGES_SUCCESS":
            return { 
                ...state, 
                imagesByMahli: action.payload
            };
        case "MARDI_IMAGES_SUCCESS":
            return { 
                ...state, 
                imagesByMardi: action.payload
            };
        case "RHAZ_IMAGES_SUCCESS":
            return { 
                ...state, 
                imagesByRhaz: action.payload
            };
        case "PANCAM_IMAGES_SUCCESS":
            return { 
                ...state, 
                imagesByPanCam: action.payload
            };
        case "MINITES_IMAGES_SUCCESS":
            return { 
                ...state, 
                imagesByMinites: action.payload
            };
        case "ROVER_SELECTED":
            return{
                ...state,
                selectedRover: action.roverName
            }
        case "RESET_ALL_CAMS":
            return INITIAL_STATE;

        case "TOGGLE_REQUEST_STATUS":
            return {
                ...state,
                requestInProgress: !state.requestInProgress
            }
        case "SET_ROVER_INFO":
            return{
                ...state,
                roverInfo: action.payload
            }
        default:
            return state;
    }
};
