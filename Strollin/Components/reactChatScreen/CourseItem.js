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
        
        fetch(`http://${IP_SERVER}:${PORT_SERVER}/course/get_courses_by_id`, {
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
            <Text style={styles.expeditor} ellipsizeMode="tail">
              {props.pseudo}
            </Text>
        </View>
        );
      } else {
        return (
          <View>
            <TouchableOpacity  onPress={() => setModalVisible(true)}>
              <Image
                  source={require('../../images/logo/marker_small.png')}
                  style={{ width: 300, height: 300, borderRadius: 15, marginLeft: "1%" }}
                />
                <Text style={styles.message} ellipsizeMode="tail">
                    {courseObject.name}
                </Text>
            </TouchableOpacity>
            <Popup message={"Preview of course"} modalVisible={modalVisible} setModalVisible={setModalVisible}>
                <CoursePreviewItem navigation={props.navigation} courseObject={courseObject}/>
            </Popup>
            <Text style={styles.expeditor} ellipsizeMode="tail">
              {props.pseudo}
            </Text>
          </View>
        );
      }}

const styles = StyleSheet.create({
  message: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});
//const mapStateToProps = (state) => state;
//export default connect(mapStateToProps)(CourseItem);
export default CourseItem