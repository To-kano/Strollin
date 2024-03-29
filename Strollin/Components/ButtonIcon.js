import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';

function ButtonIcon(props) {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <Image source={props.icon} style={styles.icon} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    backgroundColor: 'white',
    borderColor: 'gray'
  },
});

//const mapStateToProps = (state) => state;
//export default connect(mapStateToProps)(ButtonIcon);
export default ButtonIcon;