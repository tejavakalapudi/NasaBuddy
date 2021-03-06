import React, {Component} from 'react'
import { 
    Modal, 
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    ScrollView, 
    Dimensions, 
    CameraRoll, 
    Alert, 
    Platform,
    PermissionsAndroid
} from 'react-native';
import { ScaledImage } from './ScaledImage';
import RNFetchBlob from 'rn-fetch-blob';

class DisplayModal extends Component {

    constructor(props) {
        super(props);
        this.saveImageToCameraRoll = this.saveImageToCameraRoll.bind(this);
    }


    requestExternalStoragePermission = async (image) => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'NasaBuddy Permission',
                message: 'NasaBuddy needs access to your storage ' +
                    'so you can save your photos'
            },
          );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                RNFetchBlob
                .config({
                    fileCache : true,
                    appendExt : 'jpg'
                })
                .fetch('GET', image)
                .then((res) => {
                    CameraRoll.saveToCameraRoll(res.path())
                    .then( response => Alert.alert('Success', 'Photo added to camera roll!'))
                    .catch(err => console.log('err:', err))
                });
            }
        } catch (err) {
          console.error('Failed to request permission ', err);
          return null;
        }
    };

    saveImageToCameraRoll(image){
        CameraRoll.saveToCameraRoll(image);

        if (Platform.OS === 'android') {
            this.requestExternalStoragePermission(image);
          } else {
            CameraRoll.saveToCameraRoll(image)
            .then(Alert.alert('Success', 'Photo added to camera roll!'))
        }
    }

    triggerAlert(){
        Alert.alert(
            'Save Image to Camera Roll',
            '',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.saveImageToCameraRoll(this.props.image)},
            ],
            { cancelable: false }
          );
    }

    render(){

        const {display, image, showText, explanation, closeModal, children, toggleText} = this.props;

        return(
            <Modal 
                visible={ display } 
                animationType = "slide" 
                onRequestClose={ () => console.log('closed') }
            >   
                {image &&
                <TouchableWithoutFeedback onPress={toggleText} onLongPress={this.triggerAlert.bind(this)}>
                    <View style={{flex:1}}>
                        <ScrollView 
                            contentContainerStyle={styles.contentContainer}
                            maximumZoomScale={5} 
                            scrollEnabled={true} 
                            minimumZoomScale={1} 
                            showsHorizontalScrollIndicator={false} 
                            showsVerticalScrollIndicator={false}
                        >   
                            
                            <ScaledImage 
                                uri = {image}
                                width = {Dimensions.get('window').width}
                            />
                            { showText && explanation && 
                                <View style={{flex:1,position: 'absolute',flexDirection: 'column', justifyContent: 'flex-end'}}>
                                    <Text style={styles.textStyle}>
                                        {explanation}
                                    </Text>
                                </View>
                            }            
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
                }
                {children && 
                    <View style={{
                        paddingTop: 70
                    }}>
                        <ScrollView>
                            {children}
                        </ScrollView>
                    </View>
                }
        
                <Text style={styles.closeButton} onPress={closeModal}>
                    Close
                </Text>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
        flexDirection : 'column',
        marginTop: 20
    },
    closeButton : {
        position: 'absolute',
        right: 20,
        top: 40,
    },
    textStyle: {
        fontSize: 12, 
        color: 'white', 
        marginTop: 10, 
        marginLeft:10, 
        marginRight:10,
        textAlign : 'center'
    }
})

export { DisplayModal };