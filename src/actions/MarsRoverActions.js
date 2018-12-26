import axios from 'axios';
import { API_KEY } from '../constants';

const roverNames = [
    "Curiosity",
    "Opportunity",
    "Spirit"
];

const cameraNames = [{
    "name": "FHAZ",
    "full_name": "Front Hazard Avoidance Camera"
}, {
    "name": "NAVCAM",
    "full_name": "Navigation Camera"
}, {
    "name": "MAST",
    "full_name": "Mast Camera"
}, {
    "name": "CHEMCAM",
    "full_name": "Chemistry and Camera Complex"
}, {
    "name": "MAHLI",
    "full_name": "Mars Hand Lens Imager"
}, {
    "name": "MARDI",
    "full_name": "Mars Descent Imager"
}, {
    "name": "RHAZ",
    "full_name": "Rear Hazard Avoidance Camera"
}];

const setRoverImagesByCam = (camera, payload) => ({
    type: `${camera}_IMAGES_SUCCESS`,
    payload
});

export const fetchRoverImages = ( roverName,camera ) => {
    return(dispatch) => {
        axios({
            method: 'get',
            url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos`,
            params: {
                api_key: API_KEY,
                sol: 1000,
                camera
            }
        })
        .then((res) => {
            dispatch( setRoverImagesByCam( camera, res.data.photos ) );
        })
        .catch((e) => {
            console.log("Error fetching Rover Images", e);
        })
    }
}