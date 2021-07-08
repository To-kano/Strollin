import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Store from '../../Store/configureStore';

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
          <Text style={styles.previewTitle}>
            { props.profil.friends_pseudo_list[props.id] }
          </Text>
          <Image style={styles.img_checked} source={require('../../images/icons/black/friend.png')} />
        </TouchableOpacity>
      );
    }
  }
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => addParticipant(props)}
    >
      <Text style={styles.previewTitle}>
        { props.profil.friends_pseudo_list[props.id] }
      </Text>
      <Image style={styles.img_checked} source={require('../../images/icons/black/addFriend.png')} />
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(FriendList);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  selected_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  previewTitle: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 18,
    color: "#000",
  },
  img_checked: {
    width: 24,
    height: 24,
  }
});
