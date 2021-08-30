import React, { useState, useEffect } from 'react';
import {
   View, FlatList, Button,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import {getloc} from '../../apiServer/locations';
import Store from '../../Store/configureStore';


function FormLocationSelection({}) {

    const [locations, setLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const store = Store.getState();
    const access_token = store.profil.access_token;

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
        <View></View>
    )

}

export default FormLocationSelection;