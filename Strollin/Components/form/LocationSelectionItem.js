import React, { useState, useEffect } from 'react';
import {
  Text, View, Share, Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { ShareDialog } from 'react-native-fbsdk';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Switch from '../Switch';

function LocationSelectionItem({item, actionSelectedItem, actionRemoveItem}) {

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if (isSelected) {
            actionSelectedItem(item.id);
        } else {
            actionRemoveItem(item.id);
        }
    }, [isSelected])
    return (

        <View style={styles.view_boxIn}>
            <TouchableOpacity
              style={styles.view_box}
              onPress={() => {navigation.navigate('LocationPage', {location: item})}}
            >
                <View style={styles.view_information}>
                    <Image style={styles.img_information} source={require('../../images/icons/white/marker.png')} />
                    <Text style={styles.text_information}>{item.address}, {item.city}</Text>
                </View>
                <Text style={styles.text_name}>{item.name}</Text>
            </TouchableOpacity>
            <View style={styles.view_share}>
                <Switch value={isSelected} setValue={setIsSelected} />
            </View>
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
      width: 230,
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

export default LocationSelectionItem;