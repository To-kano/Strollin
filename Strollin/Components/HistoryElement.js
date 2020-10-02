import React, { useState } from 'react';
import {
  Text, View, FlatList, Button
} from 'react-native';
import { connect } from 'react-redux';
import Map from './map';
import I18n from "../Translation/configureTrans";

function ElementHistoryNav({ data }) {
  const [showMap, setShowMap] = useState(false);

  const deltaView = {
    latitudeDelta: 0.1622,
    longitudeDelta: 0.1021,
  };

  if (showMap === false) {
    return (
      <View style={{
        margin: 20, paddingTop: 10, flex: 1, alignItems: 'center', justifyContent: 'space-evenly'
      }}
      >
        <View>
          <Button
            title={I18n.t("carte")}
            color="#89B3D9"
            onPress={() => setShowMap(!showMap)}
          />
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={{ margin: 10 }}>
              <Text>
                {I18n.t("")}
                {item.id}
              </Text>
              <Text>
                {I18n.t("name")}
                {item.name}
              </Text>
              <Text>
                {I18n.t("address")}
                {item.address}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
  return (
    <View style={{
      margin: 20, padding: 20, flex: 1, alignItems: 'center', justifyContent: 'space-evenly'
    }}
    >
      <View style={{ marginBottom: 10 }}>
        <Button
          title={I18n.t("step")}
          color="#89B3D9"
          onPress={() => setShowMap(!showMap)}
        />
      </View>

      <View>
        <Map height={250} width={200} deltaView={deltaView} waypoints={data} />
      </View>

    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ElementHistoryNav);
