import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import Icon from './components/Icon';

function ButtonSwitch({statue, iconOn, iconOff, onPressOn, onPressOff}) {

  if (statue) {
    return (
      <TouchableHighlight
        onPress={onPressOn}
        style={{
          backgroundColor: "#ffffff",
          position: "absolute",
          top: 16,
          right: 16,
          padding: 16,
          borderRadius: 32,
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
      }}>
        <Icon name="sound_active" size={29} color='#000000'/>
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableHighlight
        onPress={onPressOff}
        style={{
          backgroundColor: "#ffffff",
          position: "absolute",
          top: 16,
          right: 16,
          padding: 16,
          borderRadius: 32,
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
        }}>
          <Icon name="sound_inactive" size={29} color='#000000'/>
        </TouchableHighlight>
    );
  }
}

//const mapStateToProps = (state) => state;
//export default connect(mapStateToProps)(ButtonIcon);
export default ButtonSwitch;