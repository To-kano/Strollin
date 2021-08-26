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
        <ScrollView
          style={styles.view_partner}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            
          </View>
        </ScrollView>
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
  view_partner: {
    height: 687,
    width: '100%',
  },
});
  
  const mapStateToProps = (state) => state;
  export default connect(mapStateToProps)(SubscriptionPage);
  