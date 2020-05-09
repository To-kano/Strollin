import React, {useState} from 'react';
import {connect} from 'react-redux';

import {StyleSheet ,Text , View, Image, TextInput} from "react-native";


function LoginPage(props) {

  const [value, onChangeText] = React.useState('Username');
  const [valuePass, onChangePass] = React.useState('Password');

  return (
      <View style={styles.back}>
        <View style={styles.logo}>
          <Image 
          //source={require('../ressources/logo3.png')} 
          />
        </View>
        <View style={styles.textInput}>
          <View style={{flex: 0.2, flexDirection: 'row'}}>
            <Image style={{width: '80%', height: '75%', resizeMode: 'contain'}}
             //source={require('../ressources/login_icon.png')} 
             />
          </View>
          <View style={{flex: 0.7, flexDirection: 'row'}}>
            <TextInput
              underlineColorAndroid={'purple'}
              style={{ height: 80, width: '100%', fontSize: 40}}
              onChangeText={text => onChangeText(text)}
              value={value}
              textAlign={'left'}
              Placeholder={'Username'}
              placeholderTextColor={'purple'}
            />
          </View>
        </View>
        <View style={styles.textInput}>
          <View style={{flex: 0.2, flexDirection: 'row'}}>
            <Image style={{width: '80%', height: '80%', resizeMode: 'contain'}}
             //source={require('../ressources/padlock.png')} 
             />
          </View>
          <View style={{flex: 0.7, flexDirection: 'row'}}>
            <TextInput
              underlineColorAndroid={'purple'}
              style={{ height: 80, width: '100%', fontSize: 40}}
              onChangeText={text => onChangePass(text)}
              value={valuePass}
              textAlign={'left'}
              Placeholder={'Password'}
              placeholderTextColor={'purple'}
            />
          </View>
        </View>
        <View style={{flex: 0.4, flexDirection: 'column'}}>
          <Text style={styles.textLink} onPress={()=> console.log("ok")}>
            Forgot Password ?
          </Text>
          <Text style={styles.textLink} onPress={()=> {
              props.navigation.navigate('userRegister');
              //console.log("ok");
              }}>
            Dont have an account ?
          </Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: 'pink',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    logo: {
        flex: 0.3,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    textInput: {
        flex: 0.2,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textLink: {
        color: '#671478',
        fontSize: 20,
        marginTop: 40,
        textDecorationLine: 'underline'
    }
})

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(LoginPage);