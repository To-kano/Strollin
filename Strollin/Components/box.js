import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList
} from 'react-native';
import React from 'react';

function GotoComment(props) {
  props.navigation.setParams({ data: props.data });
  props.navigation.navigate('CommentScreen');
}

function Box(props) {
  // console.log("props = ", props);
  return (
    <View style={{
      justifyContent: 'space-around', flex: 1, marginTop: 20, marginHorizontal: '10%', backgroundColor: 'rgba(255,255,255, 0.9)', borderRadius: 20, width: '80%'
    }}
    >
      <Text style={[{
        textAlign: 'center', fontSize: 30, color: '#39A5D6', margin: 5
      }]}
      >
        {props.data.name}
      </Text>
      <Text style={[{ fontSize: 25, marginLeft: '5%' }]}>
        Budget :
        {props.data.budget}
      </Text>
      <Text style={[{ fontSize: 25, marginLeft: '5%' }]}>
        Période :
        {props.data.period}
      </Text>
      <Text style={[{ fontSize: 25, marginLeft: '5%' }]}>
        1/
        {props.data.destinations[0]}
      </Text>
      <Text style={[{ fontSize: 25, marginLeft: '5%' }]}>
        2/
        {props.data.destinations[1]}
      </Text>
      <Text style={[{ fontSize: 25, marginLeft: '5%' }]}>
        3/
        {props.data.destinations[2]}
      </Text>
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
