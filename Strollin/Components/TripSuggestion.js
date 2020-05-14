import React from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid } from 'react-native';
import { Map } from './map'
//import { getGoogleApiSearch } from '../api/google-api/google-api';
////import { getTags } from '../../dataBase/actions'
//import Geolocation from '@react-native-community/geolocation';
//import Geolocation from 'react-native-geolocation-service';

export default class TripSuggestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 48.815641,
        longitude: 2.363224,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        name: '',
      },
      user: {
        latitude: 48.815641,
        longitude: 2.363224,
        title: "USER",
        subtitle: "User position"
      },
      count: 0,
      needCoords: true,
      permission: false,
      needTrip: true,
      ready: false
    }
    //this.updateCoordinates();
  };

  //updatePosition(position) {
  //  console.log("update posiition ", position);
//
  //  let newLatitude = position.coords.latitude;
  //  let newLongitude = position.coords.longitude;
//
  //  this.state.user = {
  //    latitude: newLatitude,
  //    longitude: newLongitude,
  //    title: "USER",
  //    subtitle: "User position"
  //  };
    /*this.setState({
      user: {
        latitude: newLatitude,
        longitude: newLongitude,
        title: "USER",
        subtitle: "User position"
      }
    })*/
  //}
  //updateCoordinates = () => {
  //  console.log("permission = ", this.state.permission)
  //  if (this.state.permission == true) {
  //    Geolocation.getCurrentPosition(
  //      this.updatePosition.bind(this),
  //      (error) => {
  //      },
  //      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //    );
  //  }
  //  this.setState({ needCoords: false });
  //}
  //async requestGeolocalisationPermission() {
  //  try {
  //    const granted = await PermissionsAndroid.request(
  //      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //      {
  //        title: 'Strollin ask geolocalisation Permission',
  //        message:
  //          'Cool Photo App needs access to your camera ' +
  //          'so you can take awesome pictures.',
  //        buttonNeutral: 'Ask Me Later',
  //        buttonNegative: 'Cancel',
  //        buttonPositive: 'OK',
  //      },
  //    );
  //    console.log("is permission = ", granted === PermissionsAndroid.RESULTS.GRANTED);
  //    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //      this.state.permission = true;
  //      //this.setState({ permission: true })
  //      console.log('You can use the geolocalisation');
  //    } else {
  //      console.log('geolocalisation permission denied');
  //    }
  //  } catch (err) {
  //    console.warn(err);
  //  }
  //}
  //async componentDidMount() {
  //  await this.requestGeolocalisationPermission().then(() => {
  //    this.updateCoordinates();
  //  })
  //}

  //async getTagFromDatabase(uid) {
  //  return new Promise((resolve, reject) => {
  //    getTags(uid)
  //      .then(tagList => {
  //        resolve(tagList);
  //      })
  //  })
  //}
  //async getRegionFromAPI(count, tagList) {
  //  return new Promise((resolve, reject) => {
  //    console.log("need trip = ", this.state.needTrip)
  //    let size = 0;
  //    tagList.forEach(() => {
  //      size++;
  //    });
  //    let random = Math.floor(Math.random() * size - 1) + 1;
  //    getGoogleApiSearch("json", this.state.user.latitude, this.state.user.longitude, '1000', tagList[random])
  //      .then(response => {
  //        console.log("REP =" + response[count]);
  //        console.log("RESULT =" + response.data[count].name, response.data[count].geometry.location.lat, response.data[count].geometry.location.lng);
  //        this.state.needTrip = false;
  //        this.setState({
  //          region: {
  //            latitude: response.data[count].geometry.location.lat,
  //            longitude: response.data[count].geometry.location.lng,
  //            latitudeDelta: 0.0012,
  //            longitudeDelta: 0.0011,
  //            name: response.data[count].name,
  //          },
  //          count: this.state.count += 1,
  //          needTrip: false,
  //        })
  //        resolve(true);
  //      })
  //      .catch(error => {
  //        console.log('error', error)
  //        reject(false);
  //      });
  //  });
  //}
  //async getNewTrip(count, uid) {
  //  this.getTagFromDatabase(uid).then((tagList) => {
  //    console.log("BEFORE NEX TRIP\n\n\n\n\n\n\n\n = " + tagList);
  //    this.getRegionFromAPI(count, tagList).then((result) => {
  //      console.log("BEFORE NEX TRIP = " + result);
  //      this.setState({ ready: true })
  //    })
  //  })//.bind(count);
  //}
  render() {
    console.disableYellowBox = true;
    const { navigation } = this.props;
    //let uid = navigation.getParam('uid');
    if (this.state.ready != false) {
      //this.getNewTrip(this.state.count, uid);
      return (<View></View>)
    } else {
      //console.log("this.state user ", this.state.user, "\n", "this state region ", this.state.region, "\ncount ", this.state.count, "\nuid ", uid)
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.5}}>
            <Text style={{ textAlign: "center", fontSize: 30, fontFamily: "lobster", color: "#EEB015", marginTop: 10 }}>Strollin</Text>
            <Text style={[{ textAlign: "center", fontSize: 20, margin: 10 }]}>Trip Suggestion</Text>
          </View>
          <View style={{ flex: 1, marginTop: 50, backgroundColor: 'rgba(255,255,255, 0.9)', borderRadius: 0 }}>
            <Text style={[{ textAlign: "center", fontSize: 30, color: "#39A5D6", margin: 5 }]}>Heading to:</Text>
            <Text style={[{ textAlign: "center", fontSize: 40 }]}>{this.state.region.name}</Text>
          </View>
          <View style={{ flex: 3.5, marginTop: 50 }}>
            <Map location={this.state.region} height={'100%'} width={360} markers={[this.state.region]} />
          </View>
          <View style={{ flex: 0.4, flexDirection: "row", justifyContent: "space-around", paddingTop: 10, marginBottom: 10 }}>
          <Button
              title="Another One!"
              color="#EEB015"
              onPress={() =>
                this.getNewTrip(this.state.count, uid)
            }
            />
            <Button
              title="Let's go!"
              color="#89B3D9"
              onPress={() =>
                this.props.navigation.navigate('TripNavigation', { region: this.state.region })
              }
            />

          </View>
        </View>
      );
    }
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
