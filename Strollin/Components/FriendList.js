import React, { useState, useEffect } from 'react';
import {
  Text, View, FlatList, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView
} from 'react-native';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import { DrawerActions } from '@react-navigation/native';
import I18n from '../Translation/configureTrans';
import { profileUser, getUserProfile } from '../apiServer/user';
import { connect } from 'react-redux';
import Store from '../Store/configureStore';
import MenuButton from './components/MenuButton';
import AddFriendsButton from './components/AddFriendsButton';
import ReturnButton from './components/ReturnButton';
import ImageProfile from './components/ImageProfile';
import ImageUser from './components/ImageUser';
import Icon from './components/Icon';
import AddButton from './components/AddFriendsButton';

const globalStyles = require('../Styles');

// import BackgroundImage from './backgroundImage';
// import stylesHomepage from '../../styles/homepage'
// import stylesGeneric from '../../styles/genericStyle'
// import { RondFormeText } from "../../features/geoForme/rondForm"

// const User = [
//   {
//     name: 'tony',
//     id: '3ad53abb28ba',
//   },
//   {
//     name: 'pierre',
//     id: '3ad53hbb28ba',
//   },
//   {
//     name: 'didier',
//     id: '3adg3abb28ba',
//   },
//   {
//     name: 'thomas',
//     id: '3ad53abb28ba9',
//   },
//   {
//     name: 'basile',
//     id: '3ad53abb28ba1',
//   },
//   {
//     name: 'hugo',
//     id: '3ad53abb28bab',
//   }
// ];

// const group = [
//   {
//     id: '232131',
//     name: 'work',
//     friend: ['3ad53abb28ba9', '3adg3abb28ba']
//   },
//   {
//     id: '23123123',
//     name: 'play',
//     friend: ['3ad53abb28ba9']
//   },
//   {
//     id: '2132131',
//     name: 'friend',
//     friend: ['3ad53abb28ba1', '3ad53abb28ba9', '3adg3abb28ba', '3ad53hbb28ba', '3ad53abb28ba']
//   },
//   {
//     id: '21321312',
//     name: 'family',
//     friend: ['3ad53abb28ba1', '3ad53abb28ba']
//   }
// ];

// export function getFriend(group, friend) {
//   const userAdd = [];
//   for (let i = 0; i < group.friend.length; i += 1) {
//     for (let j = 0; j < friend.length; j += 1) {
//       if (group.friend[i] === friend[j].id) {
//         userAdd.push(friend[j]);
//         /* //console.log("friend add")
//         //console.log(friend[j].name)
//         //console.log(userAdd[0].name)
//         //console.log(group.name)
//         //console.log("           ") */
//       }
//     }
//   }
//   return userAdd;

/*  var userAdd = group.friend.filter(function(item) {
    var userTmp = []
    var i = 0
    for (var j = 0; j < friend.length; j += 1) {
      if (item == friend[j].id) {
        i = 1
        userTmp.push(friend[j])
        //console.log("friend add")
        //console.log(friend[j].name)
        //console.log(userTmp[0].name)
        //console.log(group.name)
        //console.log("           ")
      }
    }
    return userTmp
  })
  if (userAdd) {
    return userAdd
  } */

/* for (var j = 0; j < friend.length; j += 1) {
      if (group.friend[i] == friend[j].id) {
        userAdd.prototype.push(friend[j])
        //console.log("friend add")
        //console.log(friend[j].name)
        //console.log(userAdd[0].name)
        //console.log(group.name)
        //console.log("           ")
      }
    } */
/* var userAdd = []
  group.friend.forEach(item => {
    var userTmp = friend.filter(function(item2) {
      return item == item2.id
    })
    userAdd += userTmp
  })
  //console.log("stop")
  //console.log(userAdd[0])
  return userAdd */
// }

// const ItemFriend = ({ friend, func, group }) => (
//   <View>
//     <FlatList
//       pagingEnabled
//       showsHorizontalScrollIndicator={false}
//       legacyImplementation={false}
//       data={getFriend(group, friend)}
//       renderItem={({ item }) => <Item title={item.name} friend={friend} func={func} />}
//       keyExtractor={(item) => item.id}
//     />
//   </View>
// );

// export const Item = ({ title, friend, func }) => (
//   <View style={{ width: 300, flexDirection: 'row', marginTop: 10 }}>
//     <Text style={{ fontSize: 18, textAlign: 'center', width: '55%' }}>{title}</Text>
//     <Button
//       title={I18n.t('FriendList.deleteFriend')}
//       color="#89B3D9"
//       onPress={() => {
//         deleteFriend(title, friend, func);
//       }}
//     />
//   </View>
// );

// export function deleteFriend(title, friend, func) {
//   const userAdd = friend.filter((item) => title != item.name);

//   //console.log(userAdd);

//   func(userAdd);
// }

// export function addFriend(value, friend, func) {
//   const userAdd = User.filter((item) => value == item.name);

//   //console.log(userAdd);

//   if (userAdd.length > 0) {
//     func([...friend, userAdd[0]]);
//   }
// }

// function Header({ props, defaultState = false }) {
//   const [research, setresearch] = useState('');
//   const [pressed, setpressed] = useState(defaultState);

//   if (pressed === false) {
//     return (
//       <View style={styles.view_header}>
//         <TouchableOpacity
//           onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
//           // onPress={() => props.navigation.navigate('Menu')}
//         >
//           <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
//         </TouchableOpacity>
//         <Text style={styles.text_header}>
//           {I18n.t('Header.friends')}
//         </Text>
//         <TouchableOpacity
//           onPress={() => { setpressed(!pressed); }}
//         >
//           <Image style={styles.img_header} source={require('../images/icons/black/addFriend.png')} />
//         </TouchableOpacity>
//       </View>
//     );
//   }
//   return (
//     <View style={styles.view_header}>
//       <TextInput
//           autoCapitalize={'none'}
//         style={styles.textInput_header}
//         placeholder={I18n.t('Header.add_friend')}
//         onChangeText={(text) => setresearch(text)}
//         value={research}
//       />
//       <TouchableOpacity
//         onPress={() => { addFriend(research); setpressed(!pressed); setresearch(''); }}
//       >
//         <Image style={styles.img_header} source={require('../images/icons/black/addFriend.png')} />
//       </TouchableOpacity>
//     </View>
//   );
// }

async function AddFriend(props, store, mail) {
  const bodyRequest = JSON.stringify({
    friend_mail: mail
  });

  await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/add_friend`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access_token': store.profil.access_token,
    },
    method: 'post',
    body: bodyRequest
    })
    .then(res => res.json())
    .then(json => {
    //console.log("Friend added successfuly !");
      profileUser(props, store.profil.access_token);
    }).catch((error) => {
      console.error('error :', error);
    });
}

async function DeleteFriend(props, store, id) {
  const bodyRequest = JSON.stringify({
    friend_id: id
  });

  await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/remove_friend`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access_token': store.profil.access_token,
    },
    method: 'post',
    body: bodyRequest
    })
    .then(res => res.json())
    .then(json => {
    //console.log("Friend removed successfuly !");
      profileUser(props, store.profil.access_token);
    }).catch((error) => {
      console.error('error :', error);
    });
}

function isAlreadyFriend(id) {
  const store = Store.getState();

  for (let i in store.profil.friends_list) {
    if (id == store.profil.friends_list[i]) {
      return (true);
    }
  }
  return (false);
}

function checkSearch(id) {
  const store = Store.getState();

  if (store.search.searchFriendList.length == 0) {
    return (true);
  }
  for (let i in store.search.searchFriendList) {
    if (id == store.search.searchFriendList[i]) {
      return (true);
    }
  }
  return (false);
}

export function FriendObject(props) {
  const [showBin, setshowBin] = useState(false);

  const [user, setUser] = useState({})

  useEffect(() => {
      getUserProfile(props.profil.access_token, props.id).then(answer => {
              setUser(answer);
      })
}, [props.id]);


  return (
    <TouchableOpacity style={styles.view_friend} onLongPress={() => setshowBin(state => !state)}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <ImageUser
            style={{height: 64, width: 64, borderRadius: 16}}
            user={user}
           />
        <Text style={[globalStyles.paragraphs, {marginLeft: 16}]}>
          {props.store.profil.friends_pseudo_list[props.id]}
        </Text>
      </View>
      {showBin &&
        <TouchableOpacity
          onPress={() => { DeleteFriend(props, props.store, props.id); }}
        >
          <Icon name="bin" size={29} color="#F8333C"/>
        </TouchableOpacity>
      }
    </TouchableOpacity>
  );
}

export function UsersObject(props) {
  let isFriend = false;

  for (let index = 0; index < props.store.profil.friends_list.length; index++) {
    if (props.store.profil.friends_list[index] == props.id) {
      isFriend = true;
    }
  }

  console.log("user :", props.user);

  if (props.id != props.store.profil.id && checkSearch(props.id) == true && isAlreadyFriend(props.id) == false) {
    return (
      <View style={styles.view_friend}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ImageUser
            style={{height: 64, width: 64, borderRadius: 16}}
            user={props.user}
           />
          <Text style={[globalStyles.paragraphs, {marginLeft: 16}]}>
            {props.pseudo}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.view_delete}
          onPress={() => { AddFriend(props, props.store, props.mail); }}
        >
          <Text style={[globalStyles.paragraphs, {color: '#0989FF'}]}>Ajouter</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View></View>
  );
}

async function getUserList(store, setUserList) {
  await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/get_users`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access_token': store.profil.access_token,
    },
    method: 'get',
    })
    .then(res => res.json())
    .then(json => {
    //console.log("users_list = ", json.users_list);
      if (json.users_list) {
        setUserList(json.users_list);
      }
    }).catch((error) => {
      console.error('userList :', error);
    });
}

function sortFriendList(key) {
  const store = Store.getState();
  let found = false;

  if (key == '') {
    //console.log("nothing in search");
    const action = {type: 'SET_SEARCH_FRIEND_LIST', value: store.profil.friends_list};
    Store.dispatch(action);
  } else {
    for (let i in store.profil.friends_list) {
      if (key == store.profil.friends_pseudo_list[store.profil.friends_list[i]]) {
        const action = {type: 'SET_SEARCH_FRIEND_LIST', value: [store.profil.friends_list[i]]};
        Store.dispatch(action);
        found = true;
        break;
      }
    }
    if (found == false) {
      //console.log("not found in search");
    }
  }
}

function FriendList(props) {
  const store = Store.getState();
  const [userList, setUserList] = useState(null);
  const [pressed, setpressed] = useState(true);
  const [AddFriendPage, setAddFriendPage] = useState(false);

  if (!userList) {
    getUserList(store, setUserList);
  }

  console.log("store.profil.friends_list : ", store.profil.friends_list)

  return (
    <View style={[globalStyles.container, {paddingHorizontal: 0}]}>
      {!AddFriendPage ?
        <>
          <View style={{ marginTop: 96, marginBottom: 16, width: "100%", flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 16}}>
            <View>
              <Text style={globalStyles.subtitles}>Tes amis sont ici</Text>
              <Text style={[globalStyles.subparagraphs, {color: '#9B979B'}]}>{store.profil.friends_list.length} ami{store.profil.friends_list.length > 1 ? "s" : ""}</Text>
            </View>
            <ImageProfile style={{height: 64, width: 64, borderRadius: 16}} />
          </View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16}}
            style={{width: '100%' }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={store.profil.friends_list}
            renderItem={({ item }) => (
              <FriendObject
                {...props}
                store={store}
                id={item}
              />
            )}
            keyExtractor={(item, index) => {
              item;
            }}
          />
          <MenuButton props={props}/>
          <AddButton iconName="add_friend" onPressFct={() => setAddFriendPage(true)}/>
        </>
        :
        <>
          <FlatList
            contentContainerStyle={{ paddingVertical: 96, paddingHorizontal: 16 }}
            style={{width: '100%'}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={userList}
            renderItem={({ item }) => (
              <UsersObject
                {...props}
                user={item}
                store={store}
                pseudo={item.pseudo}
                mail={item.mail}
                id={item.id}
              />
            )}
            keyExtractor={(item, index) => {
              item.id;
            }}
          />
          <ReturnButton onPressFct={() => setAddFriendPage(false)}/>
        </>
      }

      {/* <Header props={props} /> */}
      {/* <View style={styles.view_header}>
        <TouchableOpacity
          onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
          // onPress={() => props.navigation.navigate('Menu')}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.friends')}
        </Text>
        {pressed === true &&
          <TouchableOpacity
            onPress={() => { setpressed(!pressed); }}
          >
            <Image style={styles.img_header} source={require('../images/icons/black/addFriend.png')} />
          </TouchableOpacity>
        }
        {pressed === false &&
          <TouchableOpacity
            onPress={() => { setpressed(!pressed); }}
          >
            <Image style={styles.img_header} source={require('../images/icons/black/friends.png')} />
          </TouchableOpacity>
        }
      </View> */}

      {/* {pressed === true &&
        <View style={styles.view_list}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={store.profil.friends_list}
            renderItem={({ item }) => (
              <FriendObject
                {...props}
                store={store}
                id={item}
              />
            )}
            keyExtractor={(item, index) => {
              item;
            }}
          />
        </View>
      }
      {pressed === false &&
        <View style={styles.view_list}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={userList}
            renderItem={({ item }) => (
              <UsersObject
                {...props}
                store={store}
                pseudo={item.pseudo}
                mail={item.mail}
                id={item.id}
              />
            )}
            keyExtractor={(item, index) => {
              item.id;
            }}
          />
        </View>
      } */}
    </View>
  );
}

const styles = StyleSheet.create({
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
  text_header: {
    width: '77.8%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  view_switchPage: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 10,
  },
  text_switchPageOn: {
    fontSize: 22,
    color: '#0092a7',
    fontWeight: 'bold'
  },
  text_switchPageOff: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold'
  },
  view_partner: {
    height: 687,
    width: '100%',
  },
  view_friend: {
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
  text_group: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  text_groupMember: {
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'capitalize',
    color: '#A2A2A2',
  },
  img_delete: {
    width: 30,
    resizeMode: 'contain',
  }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(FriendList);
