import React, { Component, PropTypes } from "react";
import { Image, ScrollView, View } from "react-native";
import ImageLoad from 'react-native-image-placeholder';

class ScaledImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realImageLoaded : false
        };
    }

    componentWillMount() {
        Image.getSize(this.props.uri, (width, height) => {
            if (this.props.width && !this.props.height ) {
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
        });
    }

    componentWillUnmount(){
    }

    render() {
        return (
            <ImageLoad
                style={{ height: this.state.height || 400, width: this.state.width || 400 }}
                source={{ uri: this.props.uri }}
            />
        );
    }
}

export { ScaledImage };