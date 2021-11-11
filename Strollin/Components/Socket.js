import React, { useEffect, useState, useContext} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View } from 'react-native';
import socketIOClient from 'socket.io-client';
import { createContext } from "react";
import Store from '../Store/configureStore';
import profileReducer from '../Store/Reducers/profileReducer';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import PushNotification, {Importance} from 'react-native-push-notification';

const SocketContext = createContext();
const ENDPOINT = `http://${IP_SERVER}:${PORT_SERVER}`;//3000 pour Tony
import AsyncStorage from '@react-native-community/async-storage';



export async function getProfilCache(dispatch) {
  try {
    let jsonValue = await AsyncStorage.getItem('cache_profile');

    if (jsonValue) {
      jsonValue = JSON.parse(jsonValue);

      const action = { type: 'SET_USER', value: jsonValue };
      dispatch(action);
    }
  } catch (e) {
  //console.log('echec store profile ', e);
  }
};

function getMessage(store, message_id) {
  if (store.message[message_id].type == "message") {
    return (store.message[message_id].message);
  } else if (store.message[message_id].type == "image") {
    if (store.message[message_id].expeditor_id == store.profil.id) {
      return ("You sent an image!");
    } else if (store.message[message_id].expeditor_id != store.profil.id) {
      return (store.profil.friends_pseudo_list[store.message[message_id].expeditor_id] + " sent an image!")
    }
  } else if (store.message[message_id].type == "course") {
    if (store.message[message_id].expeditor_id == store.profil.id) {
      return ("You sent a course!");
    } else if (store.message[message_id].expeditor_id != store.profil.id) {
      return (store.profil.friends_pseudo_list[store.message[message_id].expeditor_id] + " sent a course!")
    }
  }
  return ("Vous avez reçu un message");
}

function Socket({children, profil, dispatch}) {
  const [socket, setSocket] = useState(null);
  const store = Store.getState();

  if (socket == null) {
    setSocket(socketIOClient(ENDPOINT));
  }

  if (!profil.access_token) {
    getProfilCache(dispatch);
    //console.log('nav props: ', profil);
  }

  useEffect(() => {
    if (socket != null) {
      socket.on('receiveMessage', (data) => {
      const store = Store.getState();

      //console.log("received msg = " + JSON.stringify(data));

      const action = { type: 'ADD_MESSAGE', value: data };
      Store.dispatch(action);

      const action2 = {
        type: 'ADD_MESSAGE_ID',
        value: { id: data.conversation, message_id : data.id}
      };
      Store.dispatch(action2);
      console.log("msg pseu= " + data.expeditor_id, "my pseudo = " + store.profil.id);
      if (data.expeditor_id != store.profil.id) {
        PushNotification.localNotification({
          /* Android Only Properties */
          channelId: "channel-id", // (required) channelId, if the channel doesn't exist, notification will not trigger.
          ticker: "My Notification Ticker", // (optional)
          showWhen: true, // (optional) default: true
          autoCancel: true, // (optional) default: true
          largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
          largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
          smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
          bigText: data.message, // (optional) default: "message" prop
          bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
          bigLargeIcon: "ic_launcher", // (optional) default: undefined
          bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
          color: "red", // (optional) default: system default
          vibrate: true, // (optional) default: true
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
          tag: "some_tag", // (optional) add tag to message
          group: "group", // (optional) add group to message
          groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
          ongoing: false, // (optional) set whether this is an "ongoing" notification
          priority: "high", // (optional) set notification priority, default: high
          visibility: "private", // (optional) set notification visibility, default: private
          ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
          shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
          onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

          when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
          usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
          timeoutAfter: 1, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
        
          messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
        
          invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
        
          /* iOS only properties */
          //category: "", // (optional) default: empty string
          //subtitle: "My Notification Subtitle", // (optional) smaller title below notification title
        
          /* iOS and Android properties */
          id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
          title: "Vous avez reçu un message de " + data.expeditor_pseudo + " !", // (optional)
          message: data.message, // (required)
          picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
          userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
          playSound: false, // (optional) default: true
          soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
          number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
          repeatType: null, // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        });
      
        //PushNotification.getChannels(function (channel_ids) {
        //  console.log(channel_ids); // ['channel_id_1']
        //});
      }

      });
      socket.on('identification', (data) => {
        //console.log("identification = ", data);
      });
      socket.on('newConversation', (data) => {
        const store = Store.getState();

        const action = { type: 'ADD_CONVERSATION', value: data };
        Store.dispatch(action);
        const action2 = { type: 'RESET_PARTICIPANT_OF_CONVERSATION'};
        Store.dispatch(action2);
        const action3 = { type: 'ADD_TO_SEARCH_CONV', value: data };
        Store.dispatch(action3);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (profil.access_token) {
      //console.log("access_token = ", profil.access_token);
      socket.emit('login', { access_token: profil.access_token });
      socket.emit('sendMessage', "Bienvenue !");
    }

  }, [profil.access_token])

  const sendMessage = (message) => {
    //console.log('sending message ', message);


    socket.emit('sendMessage', { access_token: store.profil.access_token,
      conversation: store.conversation.currentConversation, type: "message", message: message});
  };

  const sendImage = (image) => {
  //console.log('sending image', image);

    socket.emit('sendMessage', { access_token: store.profil.access_token,
      conversation: store.conversation.currentConversation, type: "image", message: image});
  };

  const sendCourse = (courseId) => {
  //console.log('sending course', courseId);

    socket.emit('sendMessage', { access_token: store.profil.access_token,
      conversation: store.conversation.currentConversation, type: "course", message: courseId});
  };

  const createConversation = (participantsID) => {
  //console.log('creating conversation', participantsID);
    let convName = store.profil.pseudo;

    for (let i in participantsID) {
      let tmp = ", " + store.profil.friends_pseudo_list[participantsID[i]];
      convName += tmp;
    }
    var object = { access_token: store.profil.access_token, participants: participantsID, name: convName }
    socket.emit('createConversation', object);
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage, createConversation, sendImage, sendCourse }}>
      {children}
    </SocketContext.Provider>
  );
}

export const contextSocket = () => useContext(SocketContext);

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Socket);
