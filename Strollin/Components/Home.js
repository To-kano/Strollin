import React from 'react';
import {
  View, Button
} from 'react-native';
import { connect } from 'react-redux';
import I18n from '../Translation/configureTrans';

function Home(props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={[{ flex: 1, backgroundColor: 'white' }]} />
      <View style={{ flex: 1.5, marginHorizontal: '35%', backgroundColor: 'white' }}>
        <Button
          title={I18n.t('Home.historic')}
          color="#89B3D9"
          onPress={() => props.navigation.navigate('historicUser')}
        />
        <Button
          title={I18n.t('Home.logOut')}
          color="#89B3D9"
          onPress={() => props.navigation.navigate('userLogin')}
        />
      </View>
      <View style={[{ flex: 0.5, backgroundColor: 'white', justifyContent: 'center' }]}>
        <Button
          color="#D99860"
          title={I18n.t('Home.newTrip')}
          onPress={() => props.navigation.navigate('TripSuggestion')}
        />
      </View>
    </View>
  );
}

//const mapStateToProps = (state) => state;

//export default connect(mapStateToProps)(Home);
export default Home;
