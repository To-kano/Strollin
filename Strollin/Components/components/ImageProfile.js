import React, { useState, useEffect } from 'react';

import { IP_SERVER, PORT_SERVER } from '../../env/Environement';



import { connect } from 'react-redux';
import { Image, View, ActivityIndicator } from 'react-native';

import { getImageId } from '../../apiServer/image';

function ImageProfile({profil, style}) {

    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(true);

    console.log('profil.id_image_profile', profil.id_image_profile)

    useEffect(() => {
        setLoading(true);
        getImageId(profil.id_image_profile).then(answer => {
            setLoading(false);
            if (answer?.uri) {
                let pathImage = `http://${IP_SERVER}:${PORT_SERVER}/images/${answer.uri}`;
                setImage(pathImage);
            }
        })

    }, [profil.id_image_profile]);

    if (loading) {
        return (<View style={{...style, justifyContent : 'center'}} >
                    <ActivityIndicator/>
                </View>)
    }

    if (image) {
        return (
            <Image source={{uri: image}} style={style} />
        )
    }
    return (<Image style={style} source={require('../../images/happy_man.jpg')} />);

}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ImageProfile);
