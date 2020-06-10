import React, {useState} from 'react';
import {StyleSheet ,Text , View, Image, TextInput, Button} from "react-native";
import {connect} from 'react-redux';

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

function LoginPage(props) {

  const [value, onChangeText] = React.useState('');
  const [valuePass, onChangePass] = React.useState('');
  const [Img, onChangeImg] = React.useState(RandPic());

  return (
      <View style={styles.back}>
        <Image style={{width: '100%', height: '100%', resizeMode: 'cover', position: 'absolute'}}
          source={Img} />
          <View style={styles.form}>
            <View style={styles.logo}>
              <Image source={require('../ressources/logo3.png')} />
            </View>
            <View style={styles.textInput}>
              <TextInput
                underlineColorAndroid={'purple'}
                style={{ height: 50, width: '70%', fontSize: 20}}
                onChangeText={text => onChangeText(text)}
                value={value}
                textAlign={'center'}
                placeholder={'Username'}
                autoCompleteType={'username'}
              />
            </View>
            <View style={styles.textInput}>
              <TextInput
                underlineColorAndroid={'purple'}
                style={{ height: 50, width: '70%', fontSize: 20}}
                onChangeText={text => onChangePass(text)}
                value={valuePass}
                textAlign={'center'}
                placeholder={'Password'}
                autoCompleteType={'password'}
                secureTextEntry={true}
              />
            </View>
            <View style={{flex: 0.1, flexDirection: 'column', marginTop: '0%'}}>
              <Button
                onPress={() => props.navigation.navigate('HomePage')}
                title="Confirm"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
            <View style={{flex: 0.4, flexDirection: 'column'}}>
              <Text style={styles.textLink}>
                Forgot Password ?
              </Text>
              <Text style={styles.textLink} onPress={()=> { props.navigation.navigate('userRegister');}}>
                Dont have an account ?
              </Text>
            </View>
          </View>

      </View>
  )
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: 'pink',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    form: {
        backgroundColor: '#FFC300',
        flex: 0.9,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: '60%',
        height: '100%',
        marginTop: '25%',
        opacity: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textInput: {
        flex: 0.2,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textLink: {
        color: '#671478',
        fontSize: 20,
        marginTop: 20,
        textDecorationLine: 'underline',
        justifyContent: 'center',
        textAlign: 'center'
    },
    logo: {
      flex: 0.1,
      justifyContent: 'center',
      marginTop: 50,
      marginBottom: 70
    }
})

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(LoginPage);
