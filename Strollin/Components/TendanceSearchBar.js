import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, TextInput, View, Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import I18n from '../Translation/configureTrans';

function SearchBar(props) {
  const [research, setresearch] = useState('');
  // const { imagePath } = props;
  return (
    <View style={styles.view_header}>
      <TextInput
        style={styles.textInput_header}
        placeholder={I18n.t('TendanceSearchBar.searchTag')}
        onChangeText={(text) => setresearch(text)}
        value={research}
      />
      <TouchableOpacity
        onPress={() => {
          props.onPress(research);
          setresearch('');
        }}
      >
        <Image style={styles.img_header} source={require('../images/icons/black/search.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view_header: {
    flex: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput_header: {
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

  // container: {
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  //   padding: 10,
  // },
  // box: {
  //   flex: 1,
  // },
  // horizontalDisplay: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // textInput: {
  //   width: '85%',
  //   height: 40,
  //   borderRadius: 21,
  //   backgroundColor: '#FFFFFF',
  //   marginRight: 10,
  //   paddingLeft: 15,
  // },
  // img_header: {
  //   width: 34,
  //   resizeMode: 'contain',
  // },
});

// const mapStateToProps = (state) => state;
// export default connect(mapStateToProps)(SearchBar);
export default SearchBar;
