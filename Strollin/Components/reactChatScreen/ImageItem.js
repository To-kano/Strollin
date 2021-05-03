import React, { useState, useEffect } from 'react';

import { IP_SERVER, PORT_SERVER } from '../../env/Environement';



import { connect } from 'react-redux';
import { Image } from 'react-native';

import { getImageId } from '../../apiServer/image';

function ImageItem({imageId, style}) {

    const [image, setImage] = useState(null);

    useEffect(() => {
        getImageId(imageId).then(answer => {
            if (answer?.uri) {
                let pathImage = `http://${IP_SERVER}:${PORT_SERVER}/images/${answer.uri}`;
                setImage(pathImage);
            }
        })
    }, [imageId]);

    if (image) {
        return (
            <Image source={{uri: image}} style={style} />
        )
    }
    return (<Image style={style} source={require('../../images/loading.jpg')} />);
    
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

//const mapStateToProps = (state) => state;
//export default connect(mapStateToProps)(ImageItem);
export default ImageItem