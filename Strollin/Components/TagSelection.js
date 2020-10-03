import React, { useState } from 'react';

import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, Button, ImageBackground, FlatList, Dimensions
} from 'react-native';

import { RondFormeText } from './rondForm';
import I18n from "../Translation/configureTrans";

const imageLondon = require('../images/london2.jpg');

function Tag({ name }) {
  const [pressed, setpressed] = useState(false);

  return (
    <View style={{ margin: 5 }}>
      {pressed === false && (
      <Button
        color="rgba(255,192,203, 1)"
        title={name}
        onPress={() => {
          setpressed(!pressed);
        }}
      />
      )}
      {pressed === true && (
      <Button
        color="rgba(130, 38, 98, 1)"
        title={name}
        onPress={() => {
          setpressed(!pressed);
        }}
      />
      )}
    </View>
  );
}

function TageSelection({ navigation, profil }) {
  const data = [
    {
      id: '1',
      name: 'vidéo game',
    },
    {
      id: '2',
      name: 'restaurant',
    },
    {
      id: '3',
      name: 'cinéma',
    },
    {
      id: '4',
      name: 'magie',
    }, {
      id: '5',
      name: 'compétition',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ImageBackground source={imageLondon} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width / 2.2 - 10, }} />
      </View>
      <View style={{ marginLeft: '35%', marginTop: '3%', position: 'absolute' }}>
        <RondFormeText text="Strollin'" size={120} />
      </View>
      <View style={{
        flex: 1.1, marginHorizontal: 10, marginTop: 20, borderWidth: 0, padding: 5, backgroundColor: 'rgba(255, 255, 255, 0.0)'
      }}
      >
        <Text style={[{ textAlign: 'left', color: 'grey', fontSize: 30 }]}>{I18n.t("welcome")}</Text>
        <Text style={[{ textAlign: 'center', fontWeight: 'bold', fontSize: 35 }]}>{profil.FirstName}</Text>
        <Text style={[{
          textAlign: 'center', color: 'grey', fontSize: 20, marginTop: 20, fontWeight: 'normal'
        }]}
        >
        {I18n.t("chooseTags")}
        </Text>
      </View>
      <View style={{ flex: 2, margin: 10, marginTop: 20 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Tag name={item.name} pressed={item.pressed} />
          )}
        />
        <Button
          color="#89B3D9"
          title={I18n.t("next")}
          onPress={() => navigation.navigate('HomePage')}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(TageSelection);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
