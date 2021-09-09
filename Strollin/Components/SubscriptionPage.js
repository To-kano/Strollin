import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground, FlatList,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import I18n from '../Translation/configureTrans';


function SubscriptionPage({navigation, profil}) {

  const [ confirmAction, setConfirmAction ] = useState(0);

  return (
    <View style={styles.view_back}>
      <View style={styles.view_header}>
  
        <TouchableOpacity onPress={() => {
          setConfirmAction(0);
          navigation.dispatch(DrawerActions.openDrawer())}}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {"Subscription"}
          {'   '}
        </Text>
      </View>

      {/* Page 0 + Non abonné */}
      {confirmAction === 0 && profil.partner === false && (<>
        <View style={styles.view_subscription_page}>
          <Text style={styles.subscription_text_price}>
            {"2€ / Month"}
          </Text>
          <Text style={styles.subscription_text}>
              {"\t\t\t\tStrollin' is a good way to give more promotion to your location and to get potentially new customers. Subscribing to Strollin' will give the next advantages:"}
              {"\n\n\t\t- Your location will be more often selected during courses generation"}
              {"\n\n\t\t- Your location will be promoted via pop up during courses when users pass near and have corresponding tags"}
          </Text>
          <Text style={styles.subscription_text_state}>
            {"You are not subscribed"}
          </Text>
        </View>
        <View style={styles.subscription_button_view}>
          <Button
            title="Go to Website"
            onPress={() => {
            }}
          />
        </View>
      </>)}


      {/* Page 0 + abonné */}
      {confirmAction === 0 && profil.partner === true && (<>
        <View style={styles.view_subscription_page}>
          <Text style={styles.subscription_text_price}>
            {"2€ / Month"}
          </Text>
          <Text style={styles.subscription_text}>
              {"\t\t\t\tStrollin' is a good way to give more promotion to your location and to get potentially new customers. Subscribing to Strollin' will give the next advantages:"}
              {"\n\n\t\t- Your location will be more often selected during courses generation"}
              {"\n\n\t\t- Your location will be promoted via pop up during courses when users pass near and have corresponding tags"}
          </Text>
          <Text style={styles.subscription_text_state}>
            {"You are subscribed"}
          </Text>
        </View>
        <View style={styles.subscription_button_view}>
          <Button
            title="Stop Subscription"
            onPress={() => {
              // createCustomer request
              // if answer === ok
              setConfirmAction(1);
            }}
          />
        </View>
      </>)}

      {/* Page 1 + abonné */}
      {confirmAction === 1 && profil.partner === true && (<>
        <View style={styles.view_subscription_page}>
          <Text style={styles.subscription_text_price}>
            {" "}
          </Text>
          <Text style={styles.subscription_text}>
              {"\t\t\t\tUnsubscribe to Strollin will stop debiting your account and you will still considerated as subscribed until the end of the last period you paid."}
              {"\nYou will stop getting the advantages given to your location"}
          </Text>
          <Text style={styles.subscription_text_state}>
            {"Are you sure you want to stop your subscription ?"}
          </Text>
        </View>
        <View style={styles.subscription_button_view}>
          <Button
            title="Confirm Unsubscription"
            onPress={() => {
              // createCustomer request
              // if answer === ok
              setConfirmAction(2);
            }}
          />
        </View>
      </>)}

      {/* Page 2 + abonné */}
      {confirmAction === 2 && profil.partner === true && (<>
        <View style={styles.view_subscription_page}>
          <Text style={styles.subscription_text_price}>
            {"2€ / Month"}
          </Text>
          <Text style={styles.subscription_text}>
              {"\t\t\t\tStrollin' is a good way to give more promotion to your location and to get potentially new customers. Subscribing to Strollin' will give the next advantages:"}
              {"\n\n\t\t- Your location will be more often selected during courses generation"}
              {"\n\n\t\t- Your location will be promoted via pop up during courses when users pass near and have corresponding tags"}
          </Text>
          <Text style={styles.subscription_text_state}>
            {"You are not subscribed"}
          </Text>
        </View>
        {/* <View style={styles.subscription_button_view}>
          <Button
            title="Subscribe"
            onPress={() => {
            }}
          />
        </View> */}
      </>)}


    </View>
  );
}

const mapStateToProps = (state) => {
  return (
    {
      profil: state.profil,
    }
  )
};
export default connect(mapStateToProps)(SubscriptionPage)

const styles = StyleSheet.create({
  view_back: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E1E2E7',
    paddingTop: '1.8%',
    paddingLeft: '3.3%',
    paddingRight: '3.3%',
    paddingBottom: '0%',
  },
  view_header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  img_header: {
    width: 34,
    resizeMode: 'contain',
  },
  text_header: {
    width: '87.6%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  view_subscription_page: {
    marginTop: 50,
    width: '90%',
    height: '70%',
  },
  subscription_text: {
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 15,
  },
  subscription_text_price: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 50,
  },
  subscription_text_state: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 80,
  },
  subscription_button_view: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    width: '80%',
  },
});
  