import React, { Component } from 'react';
import {
  Text, View, Button, StyleSheet, TouchableOpacity
} from 'react-native';
import I18n from '../Translation/configureTrans';

class PopUpForm extends Component {
  render() {
    return (
      <View style={styles.view_box}>
        <Text style={styles.text_question}>
          {I18n.t("PopUpForm.goTo")}
          "
          {this.props.place}
          " ?
        </Text>
        <View style={styles.view_button}>
          <TouchableOpacity style={styles.button_yes}>
            {I18n.t("PopUpForm.yes")}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button_no}>
            {I18n.t("PopUpForm.no")}
          </TouchableOpacity>
        </View>
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

const styles = StyleSheet.create({
  view_box: {
    height: "100%", 
    width: "100%", 
    backgroundColor: '#FDFEFE', 
    justifyContent: 'center'
  },
});