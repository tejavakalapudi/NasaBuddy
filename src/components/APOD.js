import React, { Component } from 'react';
import { Text, ScrollView, Image, Linking, View, TouchableOpacity } from 'react-native';
import { Card, CardSection, Button, DisplayModal} from './common';

class Apod extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible : false
        }
    }

    toggleModal (){
        this.setState({
            modalVisible : !this.state.modalVisible
        });
    }

    render() {
        const { 
            headingContainerStyle, 
            textStyle, 
            imageContainerStyle, 
            imageStyle, 
            imageInfoContainerStyle,
            imageInfoTextTitle
        } = styles;
    
        const { 
            url, 
            explanation, 
            copyright, 
            title, 
            hdurl 
        } = this.props.apod;
        
        return (
            <Card>
                <CardSection style={ headingContainerStyle }>
                    <Text style={ textStyle }>Today's APOD (Astronomy Picture Of Day)</Text>
                </CardSection>
                <CardSection style={ imageContainerStyle }>
                    <TouchableOpacity style={{flex: 1}} onPress={this.toggleModal.bind(this)}>
                        <Image
                            style={ imageStyle }
                            source={{ uri: url || "https://api.nasa.gov/images/apod.jpg" }}
                        />
                    </TouchableOpacity>
                </CardSection>
                <CardSection style={ imageInfoContainerStyle }>
                    <Text style={ imageInfoTextTitle }>{ title }</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(hdurl)}>
                        <Text style={{ fontWeight: 'bold', fontSize: 12}}>Click for HD</Text>
                    </TouchableOpacity>
                </CardSection>
                <DisplayModal 
                    display= {this.state.modalVisible}
                    image={ url || "https://api.nasa.gov/images/apod.jpg" }
                    closeModal={this.toggleModal.bind(this)}
                />
            </Card>
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
      color: 'grey',
    },
    imageContainerStyle:{
        height: 300
    },
    imageStyle: {
        flex: 1,
        width: undefined
    },
    imageInfoContainerStyle:{
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    imageInfoTextTitle:{
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5
    },
    hdUrlContainer:{
        justifyContent : 'row'
    }
};

export default Apod;
