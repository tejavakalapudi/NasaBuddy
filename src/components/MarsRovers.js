import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ImageLoad from 'react-native-image-placeholder';
import { 
    Text, 
    ScrollView, 
    Image,
    View, 
    TouchableOpacity, 
    FlatList 
} from 'react-native';
import { 
    selectRover,
    updateSolAndEarthDate
} from '../actions';
import { 
    Card, 
    CardSection, 
    Button, 
    DisplayModal, 
    SquareText, 
    Spinner,
    DateInput,
    PickerWithLabel 
} from './common';

class MarsRovers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible : false,
            activeImgSrc : "",
            sortBy : "SOL",
            selectedSol : this.props.marsInfo.selectedSol,
            currentDate: "2016-05-15",
            pickerOpen: false,
            isDefaultDate: true,
            isDefaultSol: true
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
            sortBy: this.state.sortBy === 'SOL' ? 'Date' : 'SOL',
            isDefaultDate: true
        });
    }

    renderImage({item}){
        return(
            <TouchableOpacity style={{flex: 1}} onPress={this.toggleModal.bind(this, item)}>
                <ImageLoad
                    style={{height:100, width:100, marginRight: 5}}
                    source={{ uri: item.img_src }}
                    isShowActivity={false}
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

    togglePicker(){
        this.setState({
            pickerOpen: !this.state.pickerOpen,
            selectedSol : this.props.marsInfo.selectedSol
        });
    }

    updateSelectedSol(value){
        this.setState({
            selectedSol: value
        });
    }

    updateSortByValue(value){
        if(this.state.sortBy === 'SOL'){
            this.togglePicker();
            this.setState({
                isDefaultSol: false
            })
            this.props.updateSolAndEarthDate({
                date: 'none',
                sol: this.state.selectedSol,
                sortBy: this.state.sortBy
            });
        } else {
            this.setState({
                currentDate: value,
                isDefaultDate: false
            });
            this.props.updateSolAndEarthDate({
                date: value,
                sol: 1000,
                sortBy: this.state.sortBy
            });
        }
        this.props.selectRover( this.props.marsInfo.selectedRover );
    }

    hasQueryResults(){

        let queryHasResults = false;

        const arrOfImages = [
            'imagesByFhaz',
            'imagesByNavCam',
            'imagesByMast',
            'imagesByChemCam',
            'imagesByMahli',
            'imagesByMardi',
            'imagesByRhaz',
            'imagesByPanCam',
            'imagesByMinites'
        ];

        queryHasResults = arrOfImages.some((camImages) => {
            return this.props.marsInfo[camImages].length > 0;
        });

        return queryHasResults;   
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

                        {this.props.marsInfo.selectedRover &&
                            <Text style={[styles.roverInfoStyle, {fontWeight: 'bold'}]}>
                                {`Rover Name: ${this.props.marsInfo.selectedRover}`} 
                            </Text>
                        }
                        {this.props.marsInfo.roverInfo.launch_date && !this.props.marsInfo.requestInProgress && 
                            <Text style={styles.roverInfoStyle}>
                                {`Launched on: ${this.props.marsInfo.roverInfo.launch_date}`} 
                            </Text>
                        }
                        {this.props.marsInfo.roverInfo.landing_date && !this.props.marsInfo.requestInProgress && 
                            <Text style={styles.roverInfoStyle}>
                                {`Landed on: ${this.props.marsInfo.roverInfo.landing_date}`} 
                            </Text>
                        }
                        {this.props.marsInfo.roverInfo.status && !this.props.marsInfo.requestInProgress && 
                            <Text style={[styles.roverInfoStyle, {textTransform: 'capitalize'}]}>
                                {`Current Status: ${this.props.marsInfo.roverInfo.status}`} 
                            </Text>  
                        }
                        {this.props.marsInfo.selectedSol &&
                            <Text style={[styles.roverInfoStyle, {fontWeight: 'bold', color: 'green'}]}>
                                {`Sorted by ${
                                    this.props.marsInfo.selectedSol === 'none' ? 
                                    'Earth Date' : 'SOL'
                                }: ${ 
                                this.props.marsInfo.selectedSol === 'none' ? 
                                this.props.marsInfo.selectedEarthDate : 
                                this.props.marsInfo.selectedSol}`
                                } 
                            </Text>  
                        }
                    </CardSection>
                    }

                    {this.props.isNavigated && !this.props.marsInfo.requestInProgress && 
                        <CardSection style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <View style={{justifyContent: 'center'}}>
                                <TouchableOpacity onPress={this.toggleSortBy.bind(this)}>
                                    <Text style={{color: '#336EA9', fontSize: 12}}>Toggle Date/Sol</Text>
                                </TouchableOpacity>
                            </View> 
                            {this.state.sortBy === 'SOL' && 
                                <PickerWithLabel
                                    label={`${this.state.sortBy}`}
                                    selectedValue={this.props.marsInfo.selectedSol}
                                    maxSol={this.props.marsInfo.roverInfo.max_sol}
                                    placeholder={`Max - ${this.props.marsInfo.roverInfo.max_sol}`}
                                    confirmButton={this.updateSortByValue.bind(this)}
                                    togglePicker={this.togglePicker.bind(this)}
                                    updateValue={this.updateSelectedSol.bind(this)}
                                    isPickerLaunched={this.state.pickerOpen}
                                    isDefaultSol={this.state.isDefaultSol}
                                    pickerValue={this.state.selectedSol}
                                />
                            }
                            {this.state.sortBy !== 'SOL' && 
                                <DateInput
                                    placeholder={`Max - ${this.props.marsInfo.roverInfo.max_date}`}
                                    label={`${this.state.sortBy}`}
                                    currentDate={this.state.currentDate}
                                    minDate={this.props.marsInfo.roverInfo.landing_date}
                                    maxDate={this.props.marsInfo.roverInfo.max_date}
                                    onDateChange={this.updateSortByValue.bind(this)}
                                    isDefaultDate={this.state.isDefaultDate}
                                />
                            }  
                        </CardSection>
                    }

                    {this.props.marsInfo.requestInProgress &&
                    <CardSection>
                        <Spinner size="small"/>
                    </CardSection>
                    }

                    {this.hasQueryResults() ?
                        <FlatList
                            data={ cameras }
                            renderItem={ this.renderImagesByCamera.bind(this) }
                            keyExtractor={(item, index) => '' + index}
                            scrollEnabled={false}
                            style={{maxHeight: this.props.isNavigated ? '100%' : 280, minHeight: 280}}
                        /> :
                        !this.props.marsInfo.requestInProgress &&
                        <CardSection style={{ alignItems: 'center', flexDirection: 'column'}}>
                            <Text style={{flex: 1, fontSize:12, fontWeight: 'bold', marginTop: 10, marginBottom:10 }}>No Results!</Text>
                            <Text style={{flex: 1, fontSize:12, marginTop: 10, marginBottom:10, textAlign: 'center'}}>Please check a different rover or try sorting with different input</Text>
                        </CardSection>
                    }
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
  
export default connect( mapStateToProps, { selectRover, updateSolAndEarthDate } )( MarsRovers );
