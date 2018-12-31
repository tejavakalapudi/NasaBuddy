import React, { Component, PropTypes } from "react";
import { Image, ScrollView, View, TouchableWithoutFeedback } from "react-native";
import ImageLoad from 'react-native-image-placeholder';

class ScaledImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realImageLoaded : false
        };
        this.componentMounted = false;
    }

    componentWillMount() {
        this.componentMounted = true;
        Image.getSize(this.props.uri, (width, height) => {
            if (this.componentMounted){
                if (this.props.width && !this.props.height) {
                    this.setState({
                        width: this.props.width,
                        height: height * (this.props.width / width)
                    });
                } else if (!this.props.width && this.props.height) {
                    this.setState({
                        width: width * (this.props.height / height),
                        height: this.props.height
                    });
                } else {
                    this.setState({ width: width, height: height });
                }
            }
        });
    }

    componentWillUnmount(){
        this.componentMounted = false;
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.toggleText}>
                <View>
                    <ImageLoad
                        style={{ height: this.state.height || this.props.width, width: this.state.width || this.props.width }}
                        source={{ uri: this.props.uri }}
                        isShowActivity={false}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export { ScaledImage };