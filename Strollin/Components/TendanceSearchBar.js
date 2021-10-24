import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, TextInput, View, Image, TouchableOpacity
} from 'react-native';
import I18n from '../Translation/configureTrans';
import Icon from './components/Icon';

const globalStyles = require('../Styles');

function SearchBar(props) {
  const [pressed, setpressed] = useState(false);
  const [research, setresearch] = useState('');

  return (
    <>
      {!pressed 
        ? <TouchableOpacity
          onPress={() => setpressed(!pressed)}
          style={{
              backgroundColor: "#ffffff",
              position: "absolute",
              top: 16,
              right: 16,
              padding: 16,
              borderRadius: 32,
              shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
          }}
        >
          <Icon name="search" size={29} color="#1C1B1C" />
        </TouchableOpacity>
        : <View 
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: "#ffffff",
            position: "absolute",
            top: 16,
            right: 16,
            padding: 16,
            borderRadius: 32,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            width: '76%',
            justifyContent: 'space-between',
            elevation: 10,
          }}>
            <TextInput
              autoCapitalize={'none'}
              style={[
                globalStyles.subparagraphs, { padding: 0, }]}
              placeholder={I18n.t('TendanceSearchBar.searchTag')}
              onChangeText={(text) => setresearch(text)}
              value={research}
            />
          <TouchableOpacity
            onPress={() => {
              if (research) {
                props.onPress(research);
                setresearch('');
              }
              setpressed(!pressed);
            }}
          >
            <Icon name="search" size={29} color="#1C1B1C" />
          </TouchableOpacity>
        </View>
      }
    </>
  );
}

export default SearchBar;
