import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const SquareText = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#1b1e21',
    fontSize: 16,
    fontWeight: '600'
  },
  buttonStyle: {
    height: 50,
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    justifyContent: 'center'
  }
};

export { SquareText };