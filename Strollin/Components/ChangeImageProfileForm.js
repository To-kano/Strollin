import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonIcon from './ButtonIcon.js';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';


//import { connect } from 'react-redux';
import { StyleSheet, Image,Button, View } from 'react-native';

function ChangeImageProfileForm() {

    const [image, setImage] = useState(null);

    const createFormData = (image, body = {}) => {
        const data = new FormData();
      
        data.append('image', {
          name: image.fileName,
          type: image.type,
          uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
        });
      
        Object.keys(body).forEach((key) => {
          data.append(key, body[key]);
        });
      
        return data;
    };

    const handleChooseImage = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response) {
                setImage(response);
            }
        });
    };

    const handleUploadImage = () => {
        fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/add_image_profile`, {
            method: 'POST',
            body: createFormData(image, { userId: '123' }),
        })
            .then((response) => response.json())
            .then((response) => {
                setImage(null);
                if (response["image"]) {
                    setImageName(response["image"]);
                    sendImage(response["image"]);
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
    const cancelImage = () => {
        setImage(null);
    };

    return (
        <View>
            {image && (
                <>
                    <Image
                        source={{ uri: image.uri }}
                        style={{ width: 300, height: 300, borderRadius: 15, marginLeft: "20%" }}
                    />
                    <Button title="Change profile image"
                        onPress={() => {
                            if (image) {
                                handleUploadImage();
                            }
                        }} />
                    <Button title="Cancel" onPress={cancelImage} />
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

//const mapStateToProps = (state) => state;
//export default connect(mapStateToProps)(ButtonIcon);
export default ChangeImageProfileForm;