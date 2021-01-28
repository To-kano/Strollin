import React, { Component } from 'react';
import {
  Text, View, Button
} from 'react-native';
import I18n from '../Translation/configureTrans';

class PopUpForm extends Component {
  render() {
    return (
      <View style={{
        height: this.props.height, width: this.props.width, backgroundColor: '#FDFEFE', justifyContent: 'center'
      }}
      >
        <Text style={{
          textAlign: 'center', fontSize: 35, fontFamily: 'lobster', color: 'blue'
        }}
        >
          {I18n.t("PopUpForm.goTo")}
          "
          {this.props.place}
          " ?
        </Text>
        <Button
          title="Yes"
          onPress={() => {
          }}
        />
        <Button
          title="No"
          onPress={() => {
          }}
        />

      </View>
    );
  }
}

export { PopUpForm };
