import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'

export default function ResetPassword(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Step, setStep] = useState(props.route.params.step ? props.route.params.step : 1);

  return (
    <View style={styles.container}>
      {Step === 1 &&
        <>
          <Text style={[{fontSize: 25, fontWeight: 'bold', color: '#000', marginBottom: 16, alignSelf: 'flex-start'}]}>Récupérer mon {"\n"}mot de passe</Text>
          <Text style={[{fontSize: 17, fontWeight: 'normal', color: '#000', marginBottom: 32, alignSelf: 'flex-start'}]}>Entrer l'email associé avec votre compte et nous vous enverrons un email avec les instructions a suivre pour récupérer votre mot de passe.</Text>
          <TextInput
            style={{marginVertical: 8,
              padding: 10,
              fontSize: 17,
              borderWidth: 1,
              borderColor: '#B0B0B4',
              borderRadius: 4,
              color: '#000',
              backgroundColor: '#fff',
              width: '100%',
              maxWidth: 400,
            }}
            onChangeText={setEmail}
            value={Email}
            placeholder={"Email"}
            keyboardType='email-address'
          />
          <TouchableOpacity style={[{marginVertical: 10, paddingVertical: 12, backgroundColor: "#0092A7", borderRadius: 4, width: "100%", maxWidth: 400}]} onPress={() => setStep(2)}>
            <Text style={[{fontSize: 17, fontWeight: 'bold', color: '#fff', textAlign: 'center', } ]}>Envoyer les instructions</Text>
          </TouchableOpacity>
        </>
      }
      {Step === 2 &&
        <>
          <View style={{backgroundColor: '#f1f1f2', borderRadius: 24, marginBottom: 32, padding: 16}}><Image source={require('../images/icons/black/mail.png')} style={{width: 64, height: 64, tintColor: '#000'}}/></View>
          <Text style={[{fontSize: 25, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 16}]}>Vérifier vos mails</Text>
          <Text style={[{fontSize: 17, fontWeight: 'normal', color: '#000', marginBottom: 32, textAlign: 'center'}]}>Nous vous avons envoyer un mail {'\n'} contenant les instructions pour {'\n'} récupérer votre mot de passe.</Text>
          <TouchableOpacity style={[{marginVertical: 10, paddingVertical: 12, backgroundColor: "#0092A7", borderRadius: 4, width: "100%", maxWidth: 400}]} onPress={() => setStep(3)}>
            <Text style={[{fontSize: 17, fontWeight: 'bold', color: '#fff', textAlign: 'center', } ]}>Ouvrir ma boite mail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{position: 'absolute', bottom: 16, right: 64, left: 64}} onPress={() => setStep(1)}><Text style={[{fontSize: 12,
        color: '#000', textAlign: 'center'},]}>Vous n'avez pas reçu d'email ? Vérifier vos spam ou <Text style={[{fontSize: 12,
        color: '#000',}, {color: '#0092A7'}]}>essayer avec un autre email</Text></Text></TouchableOpacity>
        </>
      }
      {Step === 3 &&
        <>
          <Text style={[{fontSize: 25, fontWeight: 'bold', color: '#000', marginBottom: 16, alignSelf: 'flex-start'}]}>Créer un nouveau mot de passe</Text>
          <Text style={[{fontSize: 17, fontWeight: 'normal', color: '#000', marginBottom: 32, alignSelf: 'flex-start'}]}>Votre mot de passe doit être différent de l'ancien mot de passe.</Text>
          <TextInput
            style={{marginVertical: 8,
              padding: 10,
              fontSize: 17,
              borderWidth: 1,
              borderColor: '#B0B0B4',
              borderRadius: 4,
              color: '#000',
              backgroundColor: '#fff',
              width: '100%',
              maxWidth: 400,
            }}
            onChangeText={setPassword}
            value={Password}
            secureTextEntry={true}
            placeholder={"Nouveau mot de passe"}
          />
          <TouchableOpacity style={{alignSelf: 'center', maxWidth: 400, width: '100%', marginTop: -8, marginBottom: 4, marginLeft: 4 }}>
            <Text style={[{fontSize: 10, color: '#000',}, {color: '#c3c3c6',}]}>ⓘ 8 caractères minimum, 1 Majuscule, 1 Minuscule, 1 chiffre</Text>
          </TouchableOpacity>
          <TextInput
            style={{marginVertical: 8,
              padding: 10,
              fontSize: 17,
              borderWidth: 1,
              borderColor: '#B0B0B4',
              borderRadius: 4,
              color: '#000',
              backgroundColor: '#fff',
              width: '100%',
              maxWidth: 400,
            }}
            onChangeText={setConfirmPassword}
            value={ConfirmPassword}
            secureTextEntry={true}
            placeholder={"Confirmer mot de passe"}
          />
          <TouchableOpacity style={[{marginVertical: 10, paddingVertical: 12, backgroundColor: "#0092A7", borderRadius: 4, width: "100%", maxWidth: 400}, {marginTop: 32}]} onPress={() => navigation.navigate('Home', {searchText: ""})}>
            <Text style={[{fontSize: 17, fontWeight: 'bold', color: '#fff', textAlign: 'center', } ]}>Récupérer le mot de passe</Text>
          </TouchableOpacity>
        </>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  }
});