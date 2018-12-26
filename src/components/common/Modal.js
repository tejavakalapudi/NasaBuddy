import React from 'react'
import { Modal, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScaledImage } from '../common';

const DisplayModal = (props) => (
    <Modal 
        visible={ props.display } animationType = "slide" 
        onRequestClose={ () => console.log('closed') }
    >
        <View style={styles.contentContainer}>
            <ScaledImage 
                uri = {props.image}
                width = {400}
            />
        </View>
        <Text style={styles.text} onPress={props.closeModal}>
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
    text: {
        position: 'absolute',
        right: 20,
        top: 50,
    }
})

export { DisplayModal };