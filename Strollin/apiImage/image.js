import {launchImageLibrary} from 'react-native-image-picker';


function chooseImageInStorage(setImage) {
    launchImageLibrary({ noData: true }, (response) => {
        if (response) {
          setImage(response);
        }
    });
}

exports.chooseImageInStorage = chooseImageInStorage;