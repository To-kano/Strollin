import React, { useState, useEffect } from 'react';

import { IP_SERVER, PORT_SERVER } from '../env/Environement';



import { connect } from 'react-redux';
import { Image } from 'react-native';

import { getImageId } from '../apiServer/image';

function ImageProfile({profil, style}) {

    const [image, setImage] = useState(null);

    useEffect(() => {
        getImageId(profil.id_image_profile).then(answer => {
            if (answer.uri) {
                let pathImage = `http://${IP_SERVER}:${PORT_SERVER}/images/${answer.uri}`;
                setImage(pathImage);
            }
        })
    }, [profil.id_image_profile]);

    if (image) {
        return (
            <Image source={{uri: image}} style={style} />
        )
    }
    return (<Image style={style} source={require('../images/TonyPP.jpg')} />);
    
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
export default connect(mapStateToProps)(ImageProfile);