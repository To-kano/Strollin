import React, { Component } from 'react';
import { Text, View, TouchableHighlight, FlatList, Button, ImageBackground, StyleSheet, Dimensions } from 'react-native';
//import stylesHomepage from '../../styles/homepage'
//import stylesGeneric from '../../styles/genericStyle'
//import { RondFormeText } from "../../features/geoForme/rondForm"

import {connect} from 'react-redux';


class ElementHistoryNav extends Component {
  constructor(props) {
    super(props)
    this.state = { showMap: false }
  }

  showMap = () => {
    this.setState({
      showMap: !this.state.showMap
    })
  }

  render() {
    if (this.state.showMap == false) {
      return (
        <View style={{ margin: 20, flex: 1, alignItems: "center", justifyContent: "space-evenly" }}>
          <TouchableHighlight onPress={this.showMap}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text style={[{ fontWeight: 'bold', fontSize: 20, margin: 15 }]}>
                {this.props.tag}
              </Text>
              <View style={{ backgroundColor: "#39A5D6", borderRadius: 20 }}>
                <Text style={{ fontSize: 20, margin: 15 }}>Bouvelard Saint-Germain</Text>
                <View style={{ flexDirection: 'row-reverse' }}>
                  <Text style={[{ textAlign: 'left', fontSize: 15, marginBottom: 20, marginRight: 15 }]}>Paris</Text>
                </View>
                <View
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[{ fontSize: 20, margin: 15 }]}>1,5 H - 2,8 kM</Text>
                  <Text style={[{ fontSize: 20, margin: 15 }]}>3 Pins</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableHighlight onPress={this.showMap}>
            <Text>Map</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
}

function Home(props) {

  return (
    <View style={{ flex: 1 }}>
        <View style={[{ flex: 1 , backgroundColor : "white"}]}>
        </View>
        <View style={{ flex: 1.5, marginHorizontal: "35%" , backgroundColor : "white"}}>
          <Button
            title="Log Out"
            color="#89B3D9"
            onPress={() =>
              props.navigation.navigate('userLogin')
            }
          />
        </View>
        <View style={[{ flex: 0.5, backgroundColor : "white" , justifyContent : "center"}]}>
          <Button
            color='#D99860'
            title="New Trip"
            onPress={() => props.navigation.navigate('TripSuggestion')}
          />
        </View>
      </View>
  );
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Home);


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    // backgroundColor: "gray"
  },
  center: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "gray"
  }
});