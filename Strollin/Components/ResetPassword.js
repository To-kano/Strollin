import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import PrimaryButton from './components/PrimaryButton';
import Step from './components/Step';

import {resetUserPassword} from '../apiServer/user';

const globalStyles = require('../Styles');


export default function ResetPassword(props) {
  const [email, setEmail] = useState("test");
  const [ResetPasswordStep, setResetPasswordStep] = useState(1);

  useEffect(() => {
    console.log("mail", email);
  }, [email]);

  // console.log('type = ',typeof(Step))

  return (
    <View style={globalStyles.container}>
      <Step actualStep={ResetPasswordStep} finishStep={2} onPressFct={() => setResetPasswordStep(ResetPasswordStep-1)}/>
      {ResetPasswordStep === 1 && (
        <>
          <Text style={[globalStyles.titles, { marginBottom: 16 }]}>
            Récupérer ton mot de passe
          </Text>
          <Text style={[globalStyles.subparagraphs, { marginBottom: 16 }]}>
            Entrer l'email associé avec votre compte et nous vous enverrons un
            email avec les instructions a suivre pour récupérer votre mot de
            passe.
          </Text>
          <TextInput
            style={[globalStyles.textInput, { marginBottom: 48 }]}
            placeholder={"Adresse Email"}
            textContentType="emailAddress"
            autoCompleteType="email"
            value={email}
            onChangeText={(valueText) => { 
              console.log("value", valueText)
              setEmail(valueText); }}
            keyboardType="email-address"
          />
          <PrimaryButton
            text="Envoyer les instructions"
            onPressFct={() => {
              setResetPasswordStep(2);
              resetUserPassword(email);
            }}
          />
        </>
      )}
      {ResetPasswordStep === 2 && (
        <>
          <Text style={[globalStyles.titles, { marginBottom: 16 }]}>
            Vérifier vos mails
          </Text>
          <Text style={[globalStyles.subparagraphs, { marginBottom: 32 }]}>
            Nous vous avons envoyer un mail contenant les instructions pour
            récupérer votre mot de passe.
          </Text>
          <PrimaryButton
            text="Retour"
            onPressFct={() => setResetPasswordStep(1)}
          />
          
          <TouchableOpacity
            style={{ position: "absolute", bottom: 16, right: 32, left: 32 }}
            onPress={() => setResetPasswordStep(1)}
          >
            <Text style={[globalStyles.subparagraphs, {textAlign: 'center'}]}>
              Vous n'avez pas reçu d'email ? Vérifier vos spam ou {" "}
              <Text style={[globalStyles.subparagraphs, { color: "#0989FF" }]}>
                essayer avec un autre email
              </Text>
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
};