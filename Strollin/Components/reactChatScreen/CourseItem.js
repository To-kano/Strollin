import React, { useState, useEffect } from 'react';

import { IP_SERVER, PORT_SERVER } from '../../env/Environement';

import { Image } from 'react-native';
import Popup from '../Popup';
import CoursePreviewItem from './CoursePreviewItem';
import {
    StyleSheet, View, FlatList, Text, TouchableOpacity, Button
  } from 'react-native';
import Store from '../../Store/configureStore';

function CourseItem(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [courseObject, setCourseObject] = useState(null);
    const store = Store.getState();
    
    
    const getCourseObject = (id) => {
        console.log("id =", id);
        
        fetch(`https://${IP_SERVER}:${PORT_SERVER}/course/get_courses_by_id`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            access_token: store.profil.access_token,
            courses_id_list: id,
          },
          method: 'GET',
        })
          .then((response) => response.json())
          .then((response) => {
            console.log("got response = ", response);
            setCourseObject(response.courses_list[0]);
          })
          .catch((error) => {
            console.log('error', error);
          });
        };

    if (!courseObject) {
        console.log("props.id =", props.id)
        getCourseObject(props.id);
        return (
          <View>
            <Image
                source={require('../../images/loading.jpg')}
                style={props.style}
            />
        </View>
        );
      } else {
        return (
          <View>
            <TouchableOpacity  onPress={() => setModalVisible(true)} style={props.style}>
              <Image
                  source={require('../../images/logo/marker_small.png')}
                  style={{ width: 220, height: 220, borderRadius: 15, marginLeft: "12%" }}
                />
                <Text style={styles.message} ellipsizeMode="tail">
                    {courseObject.name}
                </Text>
            </TouchableOpacity>
            <Popup message={"Preview of course"} modalVisible={modalVisible} setModalVisible={setModalVisible}>
                <CoursePreviewItem navigation={props.navigation} courseObject={courseObject}/>
            </Popup>
          </View>
        );
      }}

const styles = StyleSheet.create({
  message: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  view_message: {
    justifyContent: 'flex-start', flexDirection: 'row',
  },
  view_message_mine: {
    justifyContent: 'flex-start', flexDirection: 'row-reverse',
  },
  greyDisplay: {
    maxWidth: '77%',
    borderRadius: 22,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  blueDisplay: {
    maxWidth: '77%',
    borderRadius: 22,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#0092A7',
    alignItems: 'flex-end',
  },
  messageGrey: {
    fontSize: 16,
    color: '#000',
  },
  messageBlue: {
    fontSize: 16,
    color: '#fff',
  },
  expeditor: {
    fontSize: 10,
    marginLeft: 5,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    textAlign: "left",
  },
  expeditorUser: {
    fontSize: 10,
    marginRight: 5,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    textAlign: "right",
  },
  icon: {
    width: "20%",
    height: "20%",
    resizeMode: 'contain',
  },
});
//const mapStateToProps = (state) => state;
//export default connect(mapStateToProps)(CourseItem);
export default CourseItem