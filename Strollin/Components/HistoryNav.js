import React from 'react';
import {
  Text, View, FlatList, Button
} from 'react-native';
import { connect } from 'react-redux';
import ElementHistoryNav from './HistoryElement';
import BackgroundImage from './backgroundImage';
import I18n from "../Translation/configureTrans";

function HistoryNav({ navigation, map }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title={I18n.t("logOut")}
          color="#89B3D9"
          onPress={() => navigation.navigate('userLogin')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', }}>
      <BackgroundImage />
      <View style={{
        flex: 1.5, marginHorizontal: '15%', marginTop: 20, backgroundColor: 'rgba(255,255,255, 0.9)', borderRadius: 10
      }}
      >
        <FlatList
          data={map.historic}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Text>
                {I18n.t("date")}
                {item.date}
              </Text>
              <Text>
                {I18n.t("duratrion")}
                {item.duration}
              </Text>
              <ElementHistoryNav data={item.waypoints} />
            </View>
          )}
        />

      </View>
      <View style={[{
        flex: 0.3, marginHorizontal: '15%', backgroundColor: 'rgba(0,0,0,0.0)', justifyContent: 'center'
      }]}
      >
        <Button
          color="#D99860"
          title={I18n.t("newTrip")}
          onPress={() => navigation.navigate('TripSuggestion')}
        />

      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(HistoryNav);
