import React, { useState } from 'react';
import {
  Text, View, Share, Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { ShareDialog } from 'react-native-fbsdk';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Store, { store } from '../Store/configureStore';
import FormUpdateLocationCourse from './form/FormUpdateLocationCourse';
import FormDeleteLocationCourse from './form/FormDeleteLocationCourse';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';

function CourseElement({item}) {

    const navigation = useNavigation();
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    async function addPartnerPlace(loc) {
      const store = Store.getState();
      const access_Token = store.profil.access_token;
      var action = {
        type: 'SET_PARTNER_LOCATION',
        value: loc
      };
      Store.dispatch(action);
      const test = JSON.stringify({ owner_id: 22 });
      await fetch(`http://${IP_SERVER}:${PORT_SERVER}/location/update_location`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_Token,
        'location_id': loc.id
      },
      body: test,
      method: 'POST',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("json: ", json);
      })
    }

    return (

        <View style={styles.view_boxIn}>
            <TouchableOpacity
              style={styles.view_box}
              onPress={() => {addPartnerPlace(item)}}
            >
                <View style={styles.view_information}>
                    <Image style={styles.img_information} source={require('../images/icons/white/marker.png')} />
                    <Text style={styles.text_information}>{item.address}, {item.city}</Text>
                </View>
                <Text style={styles.text_name}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    view_boxIn: {
      flex: 1,
      flexDirection: 'column-reverse',
      borderRadius: 12,
      paddingTop: 15,
      paddingLeft: 30,
      paddingRight: 5,
      paddingBottom: 20,
      borderRadius: 12,
      width: 330,
      height: 179,
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    view_information: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    img_information: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    text_information: {
      textTransform: 'capitalize',
      color: '#FFFFFF',
      fontSize: 12,
      paddingRight: 50,
    },
    text_name: {
      textTransform: 'capitalize',
      fontSize: 20,
      letterSpacing: 2,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 2.5,
      paddingRight: 20,
    },
    view_share: {
      flex: 1,
      flexDirection: 'row-reverse',
    },
    img_share: {
      width: 25,
      height: 25,
      marginRight: 10,
    },
    view_box: {
        //backgroundColor: '#000000',
        //borderRadius: 12,
        //width: 330,
        //height: 179,
        //marginBottom: 12.5,
      },
  });
  
  const mapStateToProps = (state) => state;
  export default connect(mapStateToProps)(CourseElement);