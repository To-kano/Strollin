import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, TextInput, View, Image,
  TouchableOpacity
} from 'react-native';

import ButtonIcon from '../ButtonIcon.js';

function SearchBar(props) {
  const [research, setresearch] = useState('');
  return (
    <View style={styles.view_searchBar}>
      <TextInput
          autoCapitalize={'none'}
        style={styles.textInput_searchBar}
        placeholder="Search a friend or a group"
        onChangeText={(text) => setresearch(text)}
        value={research}
      />
      <TouchableOpacity
        style={styles.button_searchBar}
        onPress={() => {
          props.onPress(research);
          setresearch('');
        }}
      >
        <Image style={styles.img_header} source={require('../../images/icons/black/search.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view_searchBar: {
    flex: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput_searchBar: {
    height: 40,
    width: '85%',
    borderRadius: 21,
    marginRight: 12.5,
    paddingLeft: 12.5,
    backgroundColor: '#FFFFFF',
  },
  img_header: {
    width: 34,
    resizeMode: 'contain',
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SearchBar);
