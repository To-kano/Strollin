
import React, {useState} from 'react';
import { Image} from 'react-native';

function RandPic() {
    var nb = Math.floor(Math.random() * 3) + 1;
    var img = '';
  
    if (nb == 1)
      img = require('../ressources/street1.jpg');
    if (nb == 2)
      img = require('../ressources/street2.jpeg');
    if (nb == 3)
      img = require('../ressources/plum2.jpg');
    //console.log(nb)
    return img;
}

function BackgroundImage(props) {

  const [Img, onChangeImg] = useState(RandPic());

  return (
    <Image style={{width: '100%', height: '100%', resizeMode: 'cover', position: 'absolute'}}
    source={Img} />
  );

}

export default BackgroundImage;