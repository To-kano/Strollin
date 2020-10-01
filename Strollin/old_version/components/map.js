import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid, View, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

// apiKey AIzaSyDGvC3HkeGolvgvOevKuaE_6LmS9MPjlvE

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: false,
      user: {
        latitude: 48.815641,
        longitude: 2.363224,
        title: 'USER',
        subtitle: 'User position'
      }
    };
    this.updateCoordinates();
  }

  componentDidMount() {
    this.requestGeolocalisationPermission();
    this.updateCoordinates();
    console.log(this.state.permission);
  }

  updatePosition(position) {
    // console.log(position);
    const newLatitude = position.coords.latitude;
    const newLongitude = position.coords.longitude;

    this.setState({
      user: {
        latitude: newLatitude,
        longitude: newLongitude,
        title: 'USER',
        subtitle: 'User position'
      }
    });
  }

  updateCoordinates = () => {
    if (this.state.permission == false) {
      Geolocation.getCurrentPosition(
        this.updatePosition.bind(this),
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };

  async requestGeolocalisationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Strollin ask geolocalisation Permission',
          message: '',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.state.permission = true;
        this.setState({ permission: true });
        console.log('You can use the geolocalisation');
      } else {
        console.log('geolocalisation permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  onRegionChange(region) {
    // console.log(region);

    // this.setState({ region });
  }

  render() {
    const origin = { latitude: this.state.user.latitude, longitude: this.state.user.longitude };
    const destination = { latitude: this.props.location.latitude, longitude: this.props.location.longitude };
    const GOOGLE_MAPS_APIKEY = 'AIzaSyB-xO-UPVjhXP85uteh1n5hIbUeXqqjWRI';
    if (this.state.permission) {
      return (
        <MapView
          style={{ height: this.props.height, width: this.props.width }}
          region={{
            latitude: this.state.user.latitude,
            longitude: this.state.user.longitude,
            latitudeDelta: this.props.location.latitudeDelta,
            longitudeDelta: this.props.location.longitudeDelta
          }}
          onRegionChange={this.onRegionChange}
        >
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={7}
            strokeColor="#39A5D6"
          />
          <Marker
            coordinate={{ latitude: this.state.user.latitude, longitude: this.state.user.longitude }}
            title="USER"
            description="User position"
          />
          {this.props.markers.map((marker) => (
            <Marker
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.name}
              description="Destination"
            />
          ))}

        </MapView>
      );
    }
    return (
      <View>
        <Text>No permision</Text>
      </View>
    );
  }
}

export { Map };
