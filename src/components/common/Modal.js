import React from 'react'
import { Modal, View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ScaledImage } from '../common';

const DisplayModal = (props) => (
    <Modal 
        visible={ props.display } animationType = "slide" 
        onRequestClose={ () => console.log('closed') }
    >
        <ScrollView 
            contentContainerStyle={styles.contentContainer}
            maximumZoomScale={5} 
            scrollEnabled={true} 
            minimumZoomScale={1} 
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false}
        >
            <ScaledImage 
                uri = {props.image}
                width = {400}
            />
            { 
            props.showText && props.explanation && 
            <Text style={styles.textStyle}>
                {props.explanation}
            </Text>
            }
        </ScrollView>
        <Text style={styles.closeButton} onPress={props.closeModal}>
            Close
        </Text>   
    </Modal>
)

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
        flexDirection : 'column'
    },
    closeButton : {
        position: 'absolute',
        right: 20,
        top: 50,
    },
    textStyle: {
        fontSize: 12, 
        color: 'black', 
        marginTop: 10, 
        marginLeft:5, 
        marginRight:5
    }
})

export { DisplayModal };