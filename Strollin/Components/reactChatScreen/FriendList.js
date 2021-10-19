import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import Store from '../../Store/configureStore';
import Icon from '../components/Icon';

const globalStyles = require('../../Styles');

function addParticipant(props) {
  //console.log('adding participant');
  const action = { type: 'ADD_PARTICIPANT_TO_CONVERSATION', value: {participant: props.id} };

  props.dispatch(action);
  //console.log('participant = ', props.createConversation);

}

function deleteParticipant(props) {
  //console.log('deleting participant');
  const action = { type: 'DELETE_PARTICIPANT_OF_CONVERSATION', value: {participant: props.id} };

  props.dispatch(action);
  //console.log('participant = ', props.createConversation);
}

function FriendList(props) {
  for (let i in props.createConversation.conversationParticipants) {
    if (props.createConversation.conversationParticipants[i] == props.id) {
      return (
        <TouchableOpacity
          style={styles.selected_button}
          onPress={() => deleteParticipant(props)}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{height: 64, width: 64, borderRadius: 16}}
              source={require('../../assets/images/default_profile_picture.png')}
            />
            <Text style={[globalStyles.paragraphs, {marginLeft: 16}]}>
              {props.profil.friends_pseudo_list[props.id]}
            </Text>
          </View>
          <Icon name='checked' size={29} color="#0989FF"/>
        </TouchableOpacity>
      );
    }
  }
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => addParticipant(props)}
    >
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{height: 64, width: 64, borderRadius: 16}}
          source={require('../../assets/images/default_profile_picture.png')}
        />
        <Text style={[globalStyles.paragraphs, {marginLeft: 16}]}>
          {props.profil.friends_pseudo_list[props.id]}
        </Text>
      </View>
      <Icon name='add' size={29} color="#0989FF"/>
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(FriendList);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  selected_button: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  previewTitle: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 18,
    color: "#000",
  },
  img_checked: {
    width: 29,
    height: 29,
  }
});
