import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonIcon from './ButtonIcon.js';


import { connect } from 'react-redux';
import { StyleSheet, Image,Button, View } from 'react-native';
import I18n from '../Translation/configureTrans';

import { uploadImageProfile } from '../apiServer/image';

function ChangeImageProfileForm({profil, dispatch}) {

    const [image, setImage] = useState(null);

    const handleChooseImage = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response) {
                setImage(response);
            }
        });
    };

    return (
        <View style={{
            //backgroundColor: "red",
            alignItems: 'center',
            }} >
            {image && (
                <>
                    <Image
                        source={{ uri: image.uri }}
                        style={{ width: 250, height: 250, borderRadius: 15}}
                    />
                    <Button title={I18n.t("ProfileScreen.ok")}
                        onPress={() => {
                            if (image) {
                              //console.log(" image ", image);
                                uploadImageProfile(profil.access_token, image).then((answer) => {
                                    if (answer.image) {
                                        const action = { type: 'SET_IMAGE_PROFILE', value: answer.image?.id };
                                        dispatch(action);
                                    }
                                });
                            }
                        }} />
                    <Button title={I18n.t("ProfileScreen.remove")} onPress={() => {setImage(null)}} />
                </>
            )}

            {!image && (
                <Button
                title={I18n.t("ProfileScreen.pic")}
                onPress={handleChooseImage}
            />
            )}
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
