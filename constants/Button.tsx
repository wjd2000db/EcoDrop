import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  title: string; 
  onPress: () => void; 
};

const Button: React.FC<ButtonProps> = ({ title, onPress, style, ...props }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...props}>
      <View style={styles.buttonBackground} />
      <View style={styles.buttonInner}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 10,
    height: 40
  },
  buttonInner: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'white',
    textAlign: 'center',
  },
  buttonBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#4CAF50',
    borderRadius: 20, 
    borderWidth: 2, 
    borderColor: 'green',
  },
});

export default Button;
