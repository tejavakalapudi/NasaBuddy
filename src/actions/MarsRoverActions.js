import axios from 'axios';
import { API_KEY } from '../constants';

const cameraNames = [
    "FHAZ",
    "NAVCAM",
    "MAST",
    "CHEMCAM",
    "MAHLI",
    "MARDI",
    "RHAZ",
    "PANCAM",
    "MINITES"
];

let cameraIndex = 0;
let roverInfoSet = false;

const setRoverImagesByCam = (camera, payload) => ({
    type: `${camera}_IMAGES_SUCCESS`,
    payload
});

const setSelectedRover = (roverName) => ({
    type: 'ROVER_SELECTED',
    roverName
});

const resetAllCams = () => ({
    type: 'RESET_ALL_CAMS'
});

const toggleRequestStatus = () => ({
    type: 'TOGGLE_REQUEST_STATUS'
});

const setRoverInfo = (payload) => ({
    type: 'SET_ROVER_INFO',
    payload
});

export const fetchRoverImages = ( roverName, camera ) => {
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
            if( !roverInfoSet && res.data.photos.length > 0 ){   
                roverInfoSet = true;
                dispatch(setRoverInfo(res.data.photos[0].rover));
            }

            dispatch( setRoverImagesByCam( camera, res.data.photos ) );
            
            cameraIndex++;
            if( cameraIndex === (cameraNames.length)){
                dispatch(toggleRequestStatus());
                cameraIndex = 0;
            }
        })
        .catch((e) => {

            console.log("Error fetching Rover Images", e);
            cameraIndex++;

            if( cameraIndex === (cameraNames.length)){
                dispatch(toggleRequestStatus());
                cameraIndex = 0;
            }
        })
    }
}

export const fetchRoverInfo = ( roverName ) => {
    return(dispatch) => {
        axios({
            method: 'get',
            url: `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}`,
            params: {
                api_key: API_KEY
            }
        })
        .then((res) => {

            //dispatch( setRoverImagesByCam( camera, res.data.photos ) );

            console.log("Rover Info", res.data);

        })
        .catch((e) => {
            console.log("Error fetching Rover Info", e);
        })
    }
}


export const selectRover = ( roverName ) => {
    return(dispatch) => {

        roverInfoSet = false;
        dispatch(resetAllCams());
        dispatch(toggleRequestStatus());
        //dispatch(fetchRoverInfo( roverName ));

        cameraNames.forEach((camera, index) => {
            dispatch(fetchRoverImages(roverName, camera));
        });
        
        dispatch(setSelectedRover( roverName ));
    }
}