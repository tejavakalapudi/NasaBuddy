import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import { 
    Text, 
    ScrollView, 
    Image, 
    Linking, 
    View, 
    TouchableOpacity, 
    FlatList 
} from 'react-native';
import { selectRover } from '../actions';
import { 
    Card, 
    CardSection, 
    Button, 
    DisplayModal, 
    SquareText, 
    Spinner,
    Input 
} from './common';

class MarsRovers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible : false,
            activeImgSrc : "",
            sortBy : "SO",
            selectedDateOrSol : "",
            currentDate: "2016-05-15"
        }
    }

    toggleModal(item){
        this.setState({
            modalVisible : !this.state.modalVisible,
            activeImgSrc : item ? item.img_src : ""
        });
    }

    navigateToRoversPage(){
        Actions.rovers({isNavigated : true});
    }

    onRoverSelected(roverName){
        this.props.selectRover( roverName );
    }
    
    toggleSortBy(){
        this.setState({
            sortBy: this.state.sortBy === 'SOL' ? 'Date' : 'SOL'
        });
    }

    renderImage({item}){
        return(
            <TouchableOpacity style={{flex: 1}} onPress={this.toggleModal.bind(this, item)}>
                <Image
                    style={{height:100, width:100, marginRight: 5}}
                    source={{ uri: item.img_src }}
                />
            </TouchableOpacity>
        );
    }

    renderImagesByCamera({item}){
        const imageFolderName = `imagesBy${item.name}`;

        if( this.props.marsInfo[ imageFolderName ].length > 0 ){
            return(
                <CardSection style={{maxHeight: 300, flexDirection: 'column'}}>
                    <View>
                        <Text style={ styles.camHeadingStyle }>
                            {`From ${item.name} (${item.full_name})`}
                        </Text>
                    </View>
                    <FlatList
                        data={ this.props.marsInfo[ imageFolderName ] }
                        renderItem={ this.renderImage.bind(this) }
                        horizontal={true}
                        keyExtractor={(item, index) => '' + item.id}
                    />
                    <DisplayModal 
                        display= {this.state.modalVisible}
                        image={this.state.activeImgSrc}
                        closeModal={this.toggleModal.bind(this)}
                    />                    
                </CardSection>
            );
        }
    }

    renderRoverSelectionBar({item}) {
        return(
            <View style={{flex:1}}>
                <SquareText 
                    textCss={{
                        fontSize : 12, 
                        fontWeight: '500',
                        color: this.props.marsInfo.selectedRover === item ? '#fff' : '#343a40',
                        opacity: this.props.marsInfo.requestInProgress && this.props.marsInfo.selectedRover !== item ? 0.5 : 1
                    }}
                    buttonCss={{
                        width:100, 
                        height:40,
                        backgroundColor: this.props.marsInfo.selectedRover === item ? '#336EA9' : '#fff',
                        borderColor: this.props.marsInfo.selectedRover === item ? '#336EA9' : '#fff'
                    }}
                    onPress={this.onRoverSelected.bind(this, item)}
                    isDisabled={this.props.marsInfo.requestInProgress}
                >
                    {item}
                </SquareText>
            </View>
        );
    }

    render() {

        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <Text style={ styles.textStyle }>Images from MARS</Text>
                    </CardSection>

                    {this.props.isNavigated && 
                    <CardSection style={{ alignItems: 'center', flexDirection: 'column'}}>
                        <FlatList
                            data={['Curiosity', 'Opportunity', 'Spirit']}
                            renderItem={this.renderRoverSelectionBar.bind(this)}
                            horizontal={true}
                            keyExtractor={(item, index) => '' + index}
                        />

                        {this.props.marsInfo.roverInfo.name &&
                            <Text style={[styles.roverInfoStyle, {fontWeight: 'bold'}]}>
                                {`Rover Name: ${this.props.marsInfo.roverInfo.name}`} 
                            </Text>
                        }
                        {this.props.marsInfo.roverInfo.launch_date &&
                            <Text style={styles.roverInfoStyle}>
                                {`Launched on: ${this.props.marsInfo.roverInfo.launch_date}`} 
                            </Text>
                        }
                        {this.props.marsInfo.roverInfo.landing_date &&
                            <Text style={styles.roverInfoStyle}>
                                {`Landed on: ${this.props.marsInfo.roverInfo.landing_date}`} 
                            </Text>
                        }
                        {this.props.marsInfo.roverInfo.status &&
                            <Text style={[styles.roverInfoStyle, {textTransform: 'capitalize'}]}>
                                {`Current Status: ${this.props.marsInfo.roverInfo.status}`} 
                            </Text>  
                        }
                    </CardSection>
                    }

                    {this.props.isNavigated && 
                    <CardSection style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View style={{justifyContent: 'center'}}>
                            <TouchableOpacity onPress={this.toggleSortBy.bind(this)}>
                                <Text style={{color: '#336EA9', fontSize: 12}}>Toggle Date/Sol</Text>
                            </TouchableOpacity>
                        </View> 
                        {this.state.sortBy === 'SOL' && 
                            <Input
                                placeholder={`Max - ${this.props.marsInfo.roverInfo.max_sol}`}
                                label={`Enter ${this.state.sortBy}`}
                                value={this.state.selectedDateOrSol}
                            />
                        }
                        {this.state.sortBy !== 'SOL' && 
                            <DatePicker
                                style={{
                                    height: 35,
                                    width: 230,
                                    borderColor: '#ddd',
                                    borderWidth: 1
                                }}
                                date={this.state.currentDate}
                                mode="date"
                                placeholder={`Max - ${this.props.marsInfo.roverInfo.max_date}`}
                                format="YYYY-MM-DD"
                                minDate={this.props.marsInfo.roverInfo.landing_date}
                                maxDate={this.props.marsInfo.roverInfo.max_date}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    dateText:{
                                        color: '#000',
                                        paddingRight: 5,
                                        paddingLeft: 5,
                                        fontSize: 10,
                                        lineHeight: 23,
                                        paddingTop: 0,
                                        marginTop: 0
                                    }
                                // ... You can check the source to find the other keys.
                                }}
                                showIcon= {false}
                                onDateChange={(date) => {this.setState({currentDate: date})}}
                            />
                        }   
                    </CardSection>
                    }

                    {this.props.marsInfo.requestInProgress &&
                    <CardSection>
                        <Spinner size="small"/>
                    </CardSection>
                    }

                    <FlatList
                        data={ cameras }
                        renderItem={ this.renderImagesByCamera.bind(this) }
                        keyExtractor={(item, index) => '' + index}
                        scrollEnabled={false}
                        style={{maxHeight: this.props.isNavigated ? '100%' : 280, minHeight: 280}}
                    />

                    {!this.props.isNavigated && 
                    <CardSection style={ {justifyContent: 'flex-end'}}>
                        <TouchableOpacity onPress={this.navigateToRoversPage}>
                            <Text style={styles.camHeadingStyle}>For more Rovers, Cams, SOLs, Dates...</Text>
                        </TouchableOpacity>
                    </CardSection>
                    } 
                </Card>
            </ScrollView>
        );
    }
};

const styles = {
    headingContainerStyle:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontWeight: 'bold', 
        fontSize: 14, 
        color: 'black', 
        lineHeight: 20
    },
    camHeadingStyle: { 
        fontSize: 14, 
        color: '#336EA9', 
        lineHeight: 20,
        marginTop: 3,
        marginBottom: 5 
    },
    roverInfoStyle: { 
        fontSize: 12, 
        color: 'black', 
        lineHeight: 15,
        marginTop: 3,
        flex: 1
    }
};

const cameras = [{
    "name": "Fhaz",
    "full_name": "Front Hazard Avoidance Camera"
}, {
    "name": "NavCam",
    "full_name": "Navigation Camera"
}, {
    "name": "Mast",
    "full_name": "Mast Camera"
}, {
    "name": "ChemCam",
    "full_name": "Chemistry and Camera Complex"
}, {
    "name": "Mahli",
    "full_name": "Mars Hand Lens Imager"
}, {
    "name": "Mardi",
    "full_name": "Mars Descent Imager"
}, {
    "name": "Rhaz",
    "full_name": "Rear Hazard Avoidance Camera"
},{
    "name": "PanCam",
    "full_name": "Panoramic Camera"
},{
    "name": "Minites",
    "full_name": "Miniature Thermal Emission Spectrometer"
}];

const mapStateToProps = (state) => {
    return { 
        marsInfo : state.marsInfo
    };
};
  
export default connect( mapStateToProps, { selectRover } )( MarsRovers );
