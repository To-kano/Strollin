import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';

function ButtonSwitch({statue, iconOn, iconOff, onPressOn, onPressOff}) {

    if (statue) {
        return (
          <TouchableHighlight onPress={onPressOn}>
            <Image source={iconOn} style={styles.icon} />
          </TouchableHighlight>
        );
    } else {
        return (
            <TouchableHighlight onPress={onPressOff}>
              <Image source={iconOff} style={styles.icon} />
            </TouchableHighlight>
        );
    }
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
export default ButtonSwitch;