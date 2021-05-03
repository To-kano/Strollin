import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
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
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(FriendList);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    // backgroundColor: '#DDDDDD',
    padding: 10,
    width: '100%',
    borderColor: "#000000"
  },
  selected_button: {
    alignItems: 'center',
    backgroundColor: '#595959',
    padding: 10,
    borderColor: "#000000",
    width: '100%',
  },
  previewTitle: {
    fontWeight: '800',
    width: '100%',
    fontSize: 20
  },
  previewContent: {
    fontWeight: '300',
    fontSize: 12
  },
});
