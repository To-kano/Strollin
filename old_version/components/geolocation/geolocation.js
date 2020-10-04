// geolocaltion.js

import React, { Component } from 'react';
import { Alert } from 'react-native';

export default class App extends Component {
  state = {
    timestamp: 0,
    latitude: 0,
    longitude: 0,
    altitude: 0,
    heading: 0,
    speed: 0,
    accuracy: 0
  };

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      (geolocData) => {
        const { timestamp } = geolocData;
        const { latitude } = geolocData.coords;
        const { longitude } = geolocData.coords;
        const { altitude } = geolocData.coords;
        const { heading } = geolocData.coords;
        const { speed } = geolocData.coords;
        const { accuracy } = geolocData.coords;
        this.setState({ timestamp });
        this.setState({ latitude });
        this.setState({ longitude });
        this.setState({ altitude });
        this.setState({ heading });
        this.setState({ speed });
        this.setState({ accuracy });
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
}
