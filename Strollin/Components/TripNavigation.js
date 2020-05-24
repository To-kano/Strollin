import React, { Component , useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';

import {connect} from 'react-redux';

import Map from './map';

function TripNavigation(props) {

  const region = {
      latitude: 48.815641,
      longitude: 2.363224,
      name: '',
  }

  const waypoints = [
    {
      latitude: 47.815641,
      longitude: 2.363224,
      name: '1',
    },{
      latitude: 46.815641,
      longitude: 2.363224,
      name: '2',
    },{
      latitude: 45.815641,
      longitude: 2.363224,
      name: '3',
    },{
      latitude: 44.815641,
      longitude: 2.363224,
      name: '4',
    },
  ]

  const deltaView = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 0.3, marginTop: 40}}>
        <Text style={{fontSize: 30, fontFamily:"lobster", color:"#EEB015"}}>Strollin</Text>
      </View>
      <View style={{flex: 3}}>
        <Map location={region} height={"100%"} width={380} markers={waypoints} deltaView={deltaView} waypoints={waypoints} />
      </View>
      <View style={{flex: 1, position: 'absolute', bottom: 0, left: 0, marginTop: 10}}>
        <Button
          title="End Navigation"
          onPress={() => props.navigation.navigate('Home')}
        />
      </View>
    </View>
  );

}

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(TripNavigation);


export class TripNavigation2 extends React.Component {
  render() {
    //console.disableYellowBox = true;

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
    }

    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={{flex: 0.3, marginTop: 40}}>
          <Text style={{fontSize: 30, fontFamily:"lobster", color:"#EEB015"}}>Strollin</Text>
        </View>
        <View style={{flex: 3}}>
          <Map location={this.state.region} height={"100%"} width={380} markers={[this.state.region]} />
        </View>
        <View style={{flex: 1, position: 'absolute', bottom: 0, left: 0, marginTop: 10}}>
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
    alignItems: "center",
    justifyContent: "center",
  },
});
