import React, { Component } from 'react';
import { Text, Linking, TouchableOpacity, Dimensions } from 'react-native';
import { Card, CardSection, DisplayModal} from './common';
import ImageLoad from 'react-native-image-placeholder';

class Apod extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible : false,
            showtext : false
        }
    }

    toggleModal (){
        this.setState({
            modalVisible : !this.state.modalVisible
        });
    }

    toggleText (){
        this.setState({
            showtext : !this.state.showtext
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
                        <ImageLoad
                            style={ imageStyle }
                            source={{ uri: url }}
                            isShowActivity={false}
                        />
                    </TouchableOpacity>
                </CardSection>
                <CardSection style={ imageInfoContainerStyle }>
                    <Text style={ imageInfoTextTitle }>{ title }</Text>
                    {copyright && <Text>{`Copyright: ${copyright}`}</Text>}
                    <TouchableOpacity onPress={() => Linking.openURL(hdurl)}>
                        <Text style={{ fontWeight: 'bold', fontSize: 12}}>Click for HD</Text>
                    </TouchableOpacity>
                </CardSection>
                <DisplayModal
                    display= {this.state.modalVisible}
                    image={ url }
                    closeModal={this.toggleModal.bind(this)}
                    showText={this.state.showtext}
                    explanation={explanation}
                    toggleText={this.toggleText.bind(this)}
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
        height: Dimensions.get('window').height / 2
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
