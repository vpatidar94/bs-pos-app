import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../core/theme'
const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}><Icon name={props.icon} size={30} color={theme.colors.logo_color} />{props.children}</View>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
   // padding: 35,
    width: '50%',
    borderRadius: 10,
  }
});
export default Card;