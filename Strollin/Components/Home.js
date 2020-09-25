import React from 'react';
import {
  View, Button, StyleSheet
} from 'react-native';

import { connect } from 'react-redux';

function Home(props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={[{ flex: 1, backgroundColor: 'white' }]} />
      <View style={{ flex: 1.5, marginHorizontal: '35%', backgroundColor: 'white' }}>
        <Button
          title="historic"
          color="#89B3D9"
          onPress={() => props.navigation.navigate('historicUser')}
        />
        <Button
          title="Log Out"
          color="#89B3D9"
          onPress={() => props.navigation.navigate('userLogin')}
        />
      </View>
      <View style={[{ flex: 0.5, backgroundColor: 'white', justifyContent: 'center' }]}>
        <Button
          color="#D99860"
          title="New Trip"
          onPress={() => props.navigation.navigate('TripSuggestion')}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
