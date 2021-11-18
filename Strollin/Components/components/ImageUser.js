
import React, { useState, useEffect } from 'react';

import { IP_SERVER, PORT_SERVER } from '../../env/Environement';
import { Image, View, ActivityIndicator } from 'react-native';

import { getImageId } from '../../apiServer/image';

function ImageUser({user, style}) {

    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(true);

    console.log('user.id_image_profile', user.id_image_profile)

    useEffect(() => {
        if (user?.id_image_profile) {
            setLoading(true);
            getImageId(user.id_image_profile).then(answer => {
            setLoading(false);
                if (answer?.uri) {
                    let pathImage = `http://${IP_SERVER}:${PORT_SERVER}/images/${answer.uri}`;
                    setImage(pathImage);
                }
            })
        } else {
            setLoading(false);
        }
    }, [user?.id_image_profile]);

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
    return (<Image style={style} source={require('../../assets/images/default_profile_picture.png')} />);

}

export default ImageUser;