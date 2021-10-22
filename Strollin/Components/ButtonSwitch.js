import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import Icon from './components/Icon';

function ButtonSwitch({statue, iconOn, iconOff, onPressOn, onPressOff, position}) {

  if (statue) {
    return (
      <TouchableHighlight
        onPress={onPressOn}
        style={{
          backgroundColor: "#ffffff",
          position: "absolute",
          top: position.top,
          right: position.right,
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
        <Icon name={iconOn} size={29} color='#000000'/>
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableHighlight
        onPress={onPressOff}
        style={{
          backgroundColor: "#ffffff",
          position: "absolute",
          top: position.top,
          right: position.right,
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
          <Icon name={iconOff} size={29} color='#000000'/>
        </TouchableHighlight>
    );
  }
}

//const mapStateToProps = (state) => state;
//export default connect(mapStateToProps)(ButtonIcon);
export default ButtonSwitch;
