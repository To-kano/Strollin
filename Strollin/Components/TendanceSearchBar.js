import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View } from 'react-native';

import ButtonIcon from './ButtonIcon.js';

function SearchBar(props) {
  const [research, setresearch] = useState('');
  const { imagePath } = props;
  return (
    <View style={styles.container}>
      <View style={styles.horizontalDisplay}>
        <View style={styles.box}>
          <TextInput
            style={styles.textInput}
            placeholder="Search with tag"
            onChangeText={(text) => setresearch(text)}
            value={research}
          />
        </View>
        <ButtonIcon
          icon={require('../images/search.png')}
          onPress={() => {
            props.onPress(research);
            setresearch('');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  box: {
    flex: 1,
  },
  horizontalDisplay: {
    width: '1000%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    marginRight: 10
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SearchBar);
