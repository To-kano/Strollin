import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonIcon from './ButtonIcon.js';


import { connect } from 'react-redux';
import { StyleSheet, Image,Button, View } from 'react-native';

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