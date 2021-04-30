import { IP_SERVER, PORT_SERVER } from '../../env/Environement';
import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity
} from 'react-native';
import React from 'react';
import Store from '../../Store/configureStore';
import { connect } from 'react-redux';
import SendCourseScreen from './SendCourseScreen';
import {contextSocket} from '../Socket';
import { useNavigation } from '@react-navigation/native';

function SendCourseItem(props) {
  const {sendCourse} = contextSocket();
  const navigation = useNavigation();

  console.log("props.courseObject", props.courseObject);
  return (
    <View style={{
      marginVertical: "5%", marginHorizontal: '10%', backgroundColor: 'rgba(255,255,255, 0.9)', borderRadius: 20
    }}
    >
      <TouchableOpacity onPress={() => {
        sendCourse(props.courseObject.id);
        navigation.goBack();
      }}>
        <Image
            source={require('../../images/logo/marker_small.png')}
            style={{ width: 110, height: 160, justifyContent: 'center',
            alignSelf: 'center'}}
        />
        <Text style={[{ fontSize: 26 }]}></Text>
        <Text style={[{ fontSize: 26, alignSelf: 'center', justifyContent: 'center'}]}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SendCourseItem);

const styles = StyleSheet.create({
  whiteBox: {
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 20,
    marginHorizontal: '10%',
    backgroundColor: 'rgba(255,255,255, 0.9)',
    borderRadius: 20,
    textAlign: 'left',
    width: '80%'
  }

});
