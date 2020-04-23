// geolocaltion.js

import React, { Component } from 'react';
import { Alert} from 'react-native';

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
      geolocData => {
        const timestamp = geolocData.timestamp;
        const latitude = geolocData.coords.latitude;
        const longitude = geolocData.coords.longitude;
        const altitude = geolocData.coords.altitude;
        const heading = geolocData.coords.heading;
        const speed = geolocData.coords.speed;
        const accuracy = geolocData.coords.accuracy;
        this.setState({ timestamp });
        this.setState({ latitude });
        this.setState({ longitude });
        this.setState({ altitude });
        this.setState({ heading });
        this.setState({ speed });
        this.setState({ accuracy });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
}