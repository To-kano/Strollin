import React, { useState, useEffect } from 'react';

import { IP_SERVER, PORT_SERVER } from '../../env/Environement';



import { connect } from 'react-redux';
import { Image, Text } from 'react-native';

import { getLocationByID } from '../../apiServer/locations';

function DestinationItem({locationId, style, profil}) {

    const [location, setLocation] = useState(null);

    useEffect(() => {
        getLocationByID(profil.access_token, locationId).then(answer => {
            if (answer) {
                setLocation(answer);
            }
        })
    }, [locationId]);

    if (location) {
        return (
            <Text style={{ fontSize: 22 }}> - {location.name} </Text>
        )
    }
    return (<Text style={{ fontSize: 22 }}>Loading...</Text>);
    
}

//const styles = StyleSheet.create({
//    icon: {
//        width: 35,
//        height: 35,
//        resizeMode: 'contain',
//        backgroundColor: 'white',
//        borderColor: 'gray'
//    },
//});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(DestinationItem);