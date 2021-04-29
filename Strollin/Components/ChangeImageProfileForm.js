import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonIcon from './ButtonIcon.js';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';


import { connect } from 'react-redux';
import { StyleSheet, Image,Button, View } from 'react-native';

import { uploadImageProfile } from '../apiServer/image';

function ChangeImageProfileForm({profil, dispatch}) {

    const [image, setImage] = useState(null);

    //const createFormData = (image, body = {}) => {
    //    const data = new FormData();
    //  
    //    data.append('image', {
    //      name: image.fileName,
    //      type: image.type,
    //      uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
    //    });
    //  
    //    Object.keys(body).forEach((key) => {
    //      data.append(key, body[key]);
    //    });
    //  
    //    return data;
    //};
//
    const handleChooseImage = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response) {
                setImage(response);
            }
        });
    };

    //const handleUploadImage = () => {
    //    fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/add_image_profile`, {
    //        method: 'POST',
    //        access_token: access_token,
//
    //        body: createFormData(image, { userId: '123' }),
    //    })
    //        .then((response) => response.json())
    //        .then((response) => {
    //            setImage(null);
    //            if (response["image"]) {
    //                setImageName(response["image"]);
    //                sendImage(response["image"]);
    //            }
    //        })
    //        .catch((error) => {
    //            console.log('error', error);
    //        });
    //};

    return (
        <View>
            {image && (
                <>
                    <Image
                        source={{ uri: image.uri }}
                        style={{ width: 300, height: 300, borderRadius: 15, marginLeft: "20%" }}
                    />
                    <Button title="set image profile"
                        onPress={() => {
                            if (image) {
                                uploadImageProfile(profil.access_token, image).then((answer) => {
                                    if (answer.image) {
                                        const action = { type: 'SET_IMAGE_PROFILE', value: answer.image?.id };
                                        dispatch(action);
                                    }
                                });
                            }
                        }} />
                    <Button title="Cancel" onPress={() => {setImage(null)}} />
                </>
            )}

            <ButtonIcon
                icon={require('../images/picture.png')}
                onPress={handleChooseImage}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        backgroundColor: 'white',
        borderColor: 'gray'
    },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ChangeImageProfileForm);
//export default ChangeImageProfileForm;