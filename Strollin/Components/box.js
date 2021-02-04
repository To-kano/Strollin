import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList
} from 'react-native';
import React from 'react';
import Location_List from './locations_list';

function GotoComment(props) {
  props.navigation.setParams({ data: props.data });
  props.navigation.navigate('CommentScreen');
}

function Box(props) {
  // //console.log("props = ", props);
  return (
    <View style={{
      justifyContent: 'space-around', flex: 1, marginTop: 20, marginHorizontal: '5%', backgroundColor: 'rgba(255,255,255, 0.9)', borderRadius: 5, width: '90%'
    }}
    >
      <Text style={[{
        textAlign: 'center', fontSize: 30, color: '#39A5D6', margin: 5
      }]}
      >
        {props.data["name"]}
      </Text>
      <Text style={[{ fontSize: 25, marginLeft: '5%' }]}>
        
        {"Budget: " + props.data["price_range"][0] + " ~ " + props.data["price_range"][1]}
      </Text>
      <Text style={[{ fontSize: 25, marginLeft: '5%' }]}>
        { "Période : " + props.data["timetable"]}
      </Text>
      <Text style={[{ fontSize: 25, marginLeft: '5%' }]}>
        Destinations:
      </Text>
      <FlatList
          data={props.data["locations_list"]}
          renderItem={({ item }) => (
            <Location_List
              {...props}
              data={item}
            />
          )}
        keyExtractor={(item) => item["_id"]}
      />
      <Button
        title="Commentaires"
        onPress={() => GotoComment(props)}
      />
    </View>
  );
}

/* import I18n from "../Translation/configureTrans";

export default class Box extends Component {
  render() {
    return (
      <View style={styles.cont}>
        <Text style={{ fontSize: 40 }}> {I18n.t("trendingTrip")} </Text>
        <View style={styles.cont}>
          <Image style={{ resizeMode: 'stretch' }} source={require('../ressources/plum2.jpg')} />
        </View>
      </View>
    );
  }
} */

export default Box;

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  text: {
    fontSize: 22,
    marginBottom: 5,
    opacity: 0.5
  },
  img: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.1,
    backgroundColor: 'red',
    width: '80%'
  },
  whiteBox: {
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 20,
    marginHorizontal: '10%',
    backgroundColor: 'rgba(255,255,255, 0.9)',
    borderRadius: 20,
    textAlign: 'left',
    width: '80%',
    resizeMode: 'stretch',
  }
});
