import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const SquareText = ({ onPress, children, buttonCss, textCss, isDisabled = false }) => {

  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, buttonCss]} disabled={isDisabled}>
      <Text style={[textStyle, textCss]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#343a40',
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
