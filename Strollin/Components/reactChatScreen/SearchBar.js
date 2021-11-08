import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, TextInput, View, Image,
  TouchableOpacity
} from 'react-native';

import ButtonIcon from '../ButtonIcon.js';
import Icon from '../components/Icon.js';
import I18n from '../../Translation/configureTrans';

const globalStyles = require('../../Styles');

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
          width: '70%',
          justifyContent: 'space-between',
          elevation: 10,
        }}>
          <TextInput
            autoCapitalize={'none'}
            style={[
              globalStyles.subparagraphs, { padding: 0, }]}
            placeholder={'Rechercher une conversation'}
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

    // <View style={styles.view_searchBar}>
    //   <TextInput
    //       autoCapitalize={'none'}
    //     style={styles.textInput_searchBar}
    //     placeholder="Search a friend or a group"
    //     onChangeText={(text) => setresearch(text)}
    //     value={research}
    //   />
    //   <TouchableOpacity
    //     style={styles.button_searchBar}
    //     onPress={() => {
    //       props.onPress(research);
    //       setresearch('');
    //     }}
    //   >
    //     <Image style={styles.img_header} source={require('../../images/icons/black/search.png')} />
    //   </TouchableOpacity>
    // </View>
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
