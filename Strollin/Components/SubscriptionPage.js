import React from 'react';
import { connect } from 'react-redux';
import {
  View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground, FlatList,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import I18n from '../Translation/configureTrans';


function SubscriptionPage({route, navigation}) {
    const {location} = route.params;
    console.log("Location Infos: \n", location);
  
    return (
      <View style={styles.view_back}>
        <View style={styles.view_header}>
  
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
          </TouchableOpacity>
          <Text style={styles.text_header}>
            {I18n.t('Header.partner')}
            {'   '}
          </Text>
        </View>
        <View style={styles.view_subscription_page}>
          <Text style={styles.subscription_title}>{"Subscription Page"}</Text>

          {/* Check si déjà partenaire ou non :
          Si oui afficher message de confirmation + potentiellement date de fin,
          si Non, afficher les avantages */}
          <View style={styles.subscription_text_view}>
            <Text style={styles.subscription_text}>
              {"Strollin' is a good way to give more promotion to your location and to get potentially new customers. Subscribing to Strollin' will give the next advantages:"}
              {"\t- Your location will be more often selected during courses generation"}
              {"\t- Your location will be promoted via pop up during courses when users pass near and have corresponding tags"}
            </Text>
          </View>

          {/* Si oui, mettre bouton stopper l'abonnement
          Si Non, mettre un bouton s'abonner qui change la page en page de préparation d'abonnement*/}
        </View>
      </View>
    );
}
  
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
    flex: 50,
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
    // height: 687,
    width: '100%',
  },
  subscription_title: {
    textAlign: 'center',
    fontSize: 18,
  },
  subscription_text_view: {
    width: '100%',
    marginLeft: 10,
    flex: 1
  },
  subscription_text: {
    textAlign: 'justify',
    fontSize: 12,
  },
});
  
  const mapStateToProps = (state) => state;
  export default connect(mapStateToProps)(SubscriptionPage);
  