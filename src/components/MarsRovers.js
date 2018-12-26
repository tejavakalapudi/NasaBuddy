import React, { Component } from 'react';
import { Text, ScrollView, Image, Linking, View, TouchableOpacity, FlatList } from 'react-native';
import { Card, CardSection, Button, DisplayModal } from './common';
import { connect } from 'react-redux';

class MarsRovers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible : false,
            activeImgSrc : ""
        }
    }

    toggleModal(item){
        this.setState({
            modalVisible : !this.state.modalVisible,
            activeImgSrc : item.item.img_src
        });
    }

    renderImage(item){
        return(
            <TouchableOpacity style={{flex: 1}} onPress={this.toggleModal.bind(this, item)}>
                <Image
                    style={{height:100, width:100, marginRight: 5}}
                    source={{ uri: item.item.img_src }}
                />
            </TouchableOpacity>
        );
    }

    renderImagesByCamera(item){
        const imageFolderName = `imagesBy${item.item}`;

        if( this.props.marsInfo[ imageFolderName ].length > 0 ){
            return(
                <CardSection style={{maxHeight: 300, flexDirection: 'column'}}>
                    <View>
                        <Text style={ styles.camHeadingStyle }>{`From ${item.item}`}</Text>
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
                    />                    
                </CardSection>
            );
        }
    }

    render() {
        const { 
            headingContainerStyle, 
            textStyle,
            camHeadingStyle
        } = styles;

        const cameras = [
            "Fhaz",
            "NavCam",
            "Mast",
            "ChemCam",
            "Mahli",
            "Mardi",
            "Rhaz"
        ];

        return (
            <Card>
                <CardSection>
                    <Text style={ textStyle }>Images from MARS</Text>
                </CardSection>
                <FlatList
                    data={ cameras }
                    renderItem={ this.renderImagesByCamera.bind(this) }
                    keyExtractor={(item, index) => '' + index}
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
    }
};

const mapStateToProps = (state) => {
    return { 
        marsInfo : state.marsInfo
    };
};
  
export default connect( mapStateToProps)( MarsRovers );
