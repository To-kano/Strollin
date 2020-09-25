import React, { useState } from 'react';
import {
  Text, View, FlatList, Button
} from 'react-native';

import { connect } from 'react-redux';
import Map from './map';

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
            title="Carte"
            color="#89B3D9"
            onPress={() => setShowMap(!showMap)}
          />
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={{ margin: 10 }}>
              <Text>
                Step:
                {item.id}
              </Text>
              <Text>
                Name:
                {item.name}
              </Text>
              <Text>
                Adress
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
          title="Step"
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
