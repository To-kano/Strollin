import React, { Component } from 'react';
import {
  Text, View, TouchableHighlight, FlatList, Button, ImageBackground, StyleSheet, Dimensions
} from 'react-native';
import stylesHomepage from '../../styles/homepage';
import stylesGeneric from '../../styles/genericStyle';
import { RondFormeText } from '../../features/geoForme/rondForm';

class ElementHistoryNav extends Component {
  constructor(props) {
    super(props);
    this.state = { showMap: false };
  }

  showMap = () => {
    this.setState({
      showMap: !this.state.showMap
    });
  }

  render() {
    if (this.state.showMap == false) {
      return (
        <View style={{
          margin: 20, flex: 1, alignItems: 'center', justifyContent: 'space-evenly'
        }}
        >
          <TouchableHighlight onPress={this.showMap}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text style={[{ fontWeight: 'bold', fontSize: 20, margin: 15 }]}>
                {this.props.tag}
              </Text>
              <View style={{ backgroundColor: '#39A5D6', borderRadius: 20 }}>
                <Text style={{ fontSize: 20, margin: 15 }}>Bouvelard Saint-Germain</Text>
                <View style={{ flexDirection: 'row-reverse' }}>
                  <Text style={[{
                    textAlign: 'left', fontSize: 15, marginBottom: 20, marginRight: 15
                  }]}
                  >
                    Paris
                  </Text>
                </View>
                <View
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={[{ fontSize: 20, margin: 15 }]}>1,5 H - 2,8 kM</Text>
                  <Text style={[{ fontSize: 20, margin: 15 }]}>3 Pins</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <View>
        <TouchableHighlight onPress={this.showMap}>
          <Text>Map</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default class Home extends React.Component {
  data = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }, { key: 6 }];

  render() {
    // <Text style={[{ textAlign: "right", marginRight: 20, marginBottom: 5, fontSize: 20 }]}>Your previous trip</Text>

    //  <FlatList
    //  data={this.data}
    //  renderItem={({ item }) => <ElementHistoryNav tag={item.key} />}
    /// >

    const { navigation } = this.props;
    console.disableYellowBox = true;

    return (
      <View style={{ flex: 1 }}>
        <View style={[{ flex: 1, backgroundColor: 'white' }]}>
          <ImageBackground
            source={require('../../assets/login_image.jpg')}
            style={{
              width: Dimensions.get('window').width, height: Dimensions.get('window').width / 1.8, justifyContent: 'center', flex: 1
            }}
          >
            <View>
              <View style={[{ flexDirection: 'row', justifyContent: 'center' }]}>
                <RondFormeText text="Strollin'" size={140} />
              </View>
              <View style={[{
                backgroundColor: 'white', width: '120%', height: '32%', rotation: -5, display: 'none'
              }]}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={{ flex: 1.5, marginHorizontal: '35%', backgroundColor: 'white' }}>
          <Button
            title="Log Out"
            color="#89B3D9"
            onPress={() => this.props.navigation.navigate('UserLogin')}
          />
        </View>
        <View style={[{ flex: 0.5, backgroundColor: 'white', justifyContent: 'center' }]}>
          <Button
            color="#D99860"
            title="New Trip"
            onPress={() => this.props.navigation.navigate('TripSuggestion', { uid: navigation.getParam('uid') })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
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
