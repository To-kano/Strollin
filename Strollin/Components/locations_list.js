import {
  StyleSheet, Text,
} from 'react-native';
import React from 'react';


function Location_List(props) {
  //console.log("nouvelle page : ", props.data["name"]);
  return (
    <Text style={[{ fontSize: 25, marginLeft: '5%' }]}>
      {"- " + props.data["name"]}
    </Text>
  );
}

export default Location_List;

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
