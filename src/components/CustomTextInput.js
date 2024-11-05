import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const CustomTextInput = ({placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default'}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor="#999"
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default CustomTextInput;
