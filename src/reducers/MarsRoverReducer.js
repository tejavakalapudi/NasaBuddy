const INITIAL_STATE = {
    imagesByFhaz : [],
    imagesByNavCam : [],
    imagesByMast : [],
    imagesByChemCam : [],
    imagesByMahli : [],
    imagesByMardi : [],
    imagesByRhaz : []
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
        default:
            return state;
    }
};
