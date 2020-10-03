import React, { Component ,useState, useEffect} from 'react';
import { Text, View, TouchableHighlight, FlatList, Button, ImageBackground, StyleSheet, Dimensions } from 'react-native';
//import stylesHomepage from '../../styles/homepage'
//import stylesGeneric from '../../styles/genericStyle'
//import { RondFormeText } from "../../features/geoForme/rondForm"

import Map from './map';
import { ShareDialog } from 'react-native-fbsdk';
import {connect} from 'react-redux';

// const shareLinkWithShareDialog(toShare) {
//   var tmp = this;
//   ShareDialog.canShow(this.state.shareLinkContent).then(
//     function(canShow) {
//       if (canShow) {
//         return ShareDialog.show(tmp.state.shareLinkContent);
//       }
//     }
//   ).then(
//     function(result) {
//       if (result.isCancelled) {
//         console.log('Share cancelled');
//       } else {
//         console.log('Share success with postId: '
//           + result.postId);
//       }
//     },
//     function(error) {
//       console.log('Share fail with error: ' + error);
//     }
//   );
// }

function ElementHistoryNav(props) {

  const [showMap, setShowMap] = useState(false);

  const waypoints = props.data;

  const deltaView = {
    latitudeDelta: 0.1622,
    longitudeDelta: 0.1021,
  }

  // const [shareLink, toShare] = React.useState({});


  Map.region = {
    latitude: props.position.position.latitude,
    longitude: props.position.position.longitude,
    latitudeDelta: deltaView.latitudeDelta,
    longitudeDelta: deltaView.longitudeDelta
  }

  if (showMap == false) {
    return (
      <View style={{ margin: 10, paddingTop: 10, flex: 1, alignItems: "center", justifyContent: "space-evenly" }}>
        <FlatList
            data={waypoints}
            renderItem={({ item }) => (
              <View style={{ margin: 5, marginBottom: 10}}>
                <Text style={{fontWeight: "bold", color: "#F07323"}}>Step: {item.id} </Text>
                <Text>Name: {item.name} </Text>
                <Text>Adress: {item.address} </Text>
              </View>
            )}
        />
        <View style={{width: '100%', flexDirection: 'row', flex: 1}}>
          <View style={{flex: 0.5, marginLeft: '5%', marginRight: '5%'}}>
            <Button
              title="Show Map"
              color="#89B3D9"
              onPress={() => setShowMap(!showMap)}
            />
          </View>
          <View style={{flex: 0.5, marginLeft: '5%', marginRight: '5%'}}>
            <Button
              title="Share"
              color="#3b5998"
              // onPress={() => shareLinkWithShareDialog()}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{margin: 10, flex: 1, justifyContent: "space-evenly", alignItems: "center" }}>
        <View style={{ margin: 5, marginBottom: 10}}>
          <Map height={310} width={310} deltaView={deltaView} waypoints={waypoints} />
        </View>

        <View style={{width: '100%', flexDirection: 'row', flex: 1}}>
          <View style={{flex: 0.5, marginLeft: '5%', marginRight: '5%'}}>
            <Button
              title="Show step"
              color="#89B3D9"
              onPress={() => setShowMap(!showMap)}
            />
          </View>
          <View style={{flex: 0.5, marginLeft: '5%', marginRight: '5%'}}>
            <Button
              title="Share"
              color="#3b5998"
              onPress={() => setShowMap(!showMap)}
            />
          </View>
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(ElementHistoryNav);

//export default ElementHistoryNav;


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