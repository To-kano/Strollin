import React from 'react';
import {
  StyleSheet, Text, View, Button, Image
} from 'react-native';
import stylesGeneric from '../../styles/genericStyle';

import { Map } from '../map';

export default class TripNavigation extends React.Component {
  render() {
    console.disableYellowBox = true;

    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.3, marginTop: 40 }}>
          <Text style={{ fontSize: 30, fontFamily: 'lobster', color: '#EEB015' }}>Strollin</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Map location={navigation.getParam('region')} height="100%" width={380} markers={[navigation.getParam('region')]} />
        </View>
        <View style={{
          flex: 1, position: 'absolute', bottom: 0, left: 0, marginTop: 10
        }}
        >
          <Button
            title="End Navigation"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
