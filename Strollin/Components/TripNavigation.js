import React, { useState, useEffect } from 'react';
import {
  StyleSheet, AppState, View, Button, BackHandler
} from 'react-native';

import { connect } from 'react-redux';

import AndroidPip from 'react-native-android-pip';
import Map from './map';

import { PopUpForm } from './PopUpForm';
function TripNavigation(props) {
  const [background, setBackground] = useState(false);

  useEffect(() => {
    const backAction = () => {
      AndroidPip.enterPictureInPictureMode();
      setBackground(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background') {
        AndroidPip.enterPictureInPictureMode();
        setBackground(true);
      } else {
        setBackground(false);
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const { waypoints } = props.map;

  const deltaView = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const deltaViewBackground = {
    latitudeDelta: 0.0052,
    longitudeDelta: 0.0121,
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <Map {...props} height="100%" width={background ? 270 : 360} deltaView={background ? deltaViewBackground : deltaView} waypoints={waypoints} background={background} />
      </View>

      <View style={{
        flex: 1, position: 'absolute', bottom: 0, left: 0, marginTop: 10
      }}
      >
          <PopUpForm place="Chez Didier'" height={250} width={300}/>
        {!background ? (
          <Button
            title="End Navigation"
            onPress={() => {
              const action = { type: 'ADD_HISTORIC', value: waypoints };
              props.dispatch(action);
              props.navigation.navigate('HomePage');
            }}
          />
        )
          : <></>}
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(TripNavigation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
