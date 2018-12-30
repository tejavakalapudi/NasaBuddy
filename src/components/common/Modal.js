import React from 'react'
import { Modal, View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ScaledImage } from '../common';

const DisplayModal = ({display, image, showText, explanation, closeModal, children}) => (
    <Modal 
        visible={ display } animationType = "slide" 
        onRequestClose={ () => console.log('closed') }
    >   
        {image &&
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
                    width = {400}
                />
                { 
                showText && explanation && 
                <Text style={styles.textStyle}>
                    {explanation}
                </Text>
                }            
            </ScrollView>
        }
        {children && 
            <View style={{flex:1,justifyContent: 'center', top: 20}}>
                {children}
            </View>
        }

        <Text style={styles.closeButton} onPress={closeModal}>
            Close
        </Text>   
    </Modal>
);

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
        marginLeft:10, 
        marginRight:10,
        textAlign : 'center'
    }
})

export { DisplayModal };