import React, { useState, useEffect } from 'react';
import {
   View, FlatList, Button, Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import {getloc} from '../../apiServer/locations';
import Store from '../../Store/configureStore';

import LocationSelectionItem from './LocationSelectionItem';


function FormLocationSelection({setSelectedLocation}) {

    const [locations, setLocation] = useState([]);
    const store = Store.getState();
    const access_token = store.profil.access_token;

    const actionSelectedItem = (itemId) => {
        setSelectedLocation((value) => {
            const result = [...value, itemId];
            return result;
        })
    }

    const actionRemoveItem = (itemId) => {
        setSelectedLocation((value) => {
            const result = value.filter(function(value, index, arr){ 
                return value != itemId;
            });
            return result;
        })
    }

    useEffect(() => {
        getloc(access_token)
        .then((result) => {
            if (result) {
                setLocation(result);
            }
        })
        .catch((error) => {
            console.error('error FormLocationSelection:', error);
        });
    }, [])

    return (
        <View style={styles.view_list} >
            <FlatList
                //style={styles.view_list}
                data={locations}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                   <LocationSelectionItem 
                    item={item}
                    actionSelectedItem={actionSelectedItem}
                    actionRemoveItem={actionRemoveItem}
                    />
                )}
            />
        </View>
    )

}

export default FormLocationSelection;

const styles = StyleSheet.create({
    view_back: {
      flex: 1,
      maxHeight: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#E1E2E7',
      paddingTop: '1.8%',
      paddingLeft: '0%',
      paddingRight: '0%',
      paddingBottom: '1.8%',
    },
    view_list: {
      //flex: 1,
      //marginBottom: 12.5,
      //width: 330,
      height: 379,
  
      //borderRadius: 12,
    },
  });