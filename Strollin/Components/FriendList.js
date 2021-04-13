import React, { useState } from 'react';
import {
  Text, View, FlatList, TouchableOpacity, TextInput, StyleSheet, Image
} from 'react-native';
// import { connect } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import I18n from '../Translation/configureTrans';

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

export function getFriendList(filter = '') {
  const friendlist = [
    {
      name: 'tony',
      profil_picture: require('../images/TonyPP.jpg'),
      id: '3ad53abb28ba',
    },
    {
      name: 'Strollin',
      group: ['pierre', 'didier', 'thomas', 'hugo', 'basile', 'tony'],
      profil_picture: require('../images/TonyPP.jpg'),
      id: '3ad53hb28ba',
    },
    {
      name: 'pierre',
      profil_picture: require('../images/TonyPP.jpg'),
      id: '3ad53hbb28ba',
    },
    {
      name: 'didier',
      profil_picture: require('../images/TonyPP.jpg'),
      id: '3adg3abb28ba',
    },
    {
      name: 'thomas',
      profil_picture: require('../images/TonyPP.jpg'),
      id: '3ad53abb28ba9',
    },
    {
      name: 'basile',
      profil_picture: require('../images/TonyPP.jpg'),
      id: '3ad53abb28ba1',
    },
    {
      name: 'hugo',
      profil_picture: require('../images/TonyPP.jpg'),
      id: '3ad53abb28bab',
    }
  ];
  if (filter) {
    console.log('\n\n filtered !! \n\n');
    return (friendlist.filter((friend) => friend.name.includes(filter)));
  }
  return (friendlist);
}

export function Header({ props, defaultState = false }) {
  const [research, setresearch] = useState('');
  const [pressed, setpressed] = useState(defaultState);

  if (pressed === false) {
    return (
      <View style={styles.view_header}>
        <TouchableOpacity
          onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
          // onPress={() => props.navigation.navigate('Menu')}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.friends')}
        </Text>
        <TouchableOpacity
          onPress={() => { setpressed(!pressed); }}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/addFriend.png')} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.view_header}>
      <TextInput
        style={styles.textInput_header}
        placeholder={I18n.t('Header.add_friend')}
        onChangeText={(text) => setresearch(text)}
        value={research}
      />
      <TouchableOpacity
        onPress={() => { addFriend(research); setpressed(!pressed); setresearch(''); }}
      >
        <Image style={styles.img_header} source={require('../images/icons/black/addFriend.png')} />
      </TouchableOpacity>
    </View>
  );
}

export function addFriend(friend) {
  console.log('add friend function', friend);
}

export function DeleteFriend(id) {
  console.log('delete friend function', id);
}

export function FriendObject(props) {
  if (props.data.group) {
    let groupList = '';

    for (let index = 0; index < props.data.group.length; index += 1) {
      if (index + 1 < props.data.group.length) {
        groupList += `${props.data.group[index]}, `;
      } else {
        groupList += props.data.group[index];
      }
    }
    return (
      <View style={styles.view_friend}>
        <Image
          style={styles.img_friend}
          source={props.data.profil_picture}
        />
        <View style={styles.view_group}>
          <Text style={styles.text_group}>
            {props.data.name}
          </Text>
          <Text style={styles.text_groupMember}>
            {groupList}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.view_delete}
          onPress={() => { DeleteFriend(props.data.id); }}
        >
          <Image style={styles.img_delete} source={require('../images/icons/black/close.png')} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.view_friend}>
      <Image
        style={styles.img_friend}
        source={props.data.profil_picture}
      />
      <Text style={styles.text_friend}>
        {props.data.name}
      </Text>
      <TouchableOpacity
        style={styles.view_delete}
        onPress={() => { DeleteFriend(props.data.id); }}
      >
        <Image style={styles.img_delete} source={require('../images/icons/black/close.png')} />
      </TouchableOpacity>
    </View>
  );
}

function FriendList(props) {
  return (
    <View style={styles.view_back}>
      <Header props={props} />
      <View style={styles.view_list}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={getFriendList()}
          renderItem={({ item }) => (
            <FriendObject
              {...props}
              data={item}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view_back: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E1E2E7',
    paddingTop: '1.8%',
    paddingLeft: '3.3%',
    paddingRight: '3.3%',
    paddingBottom: '0%',
  },
  view_header: {
    flex: 50,
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
  text_header: {
    width: '77.8%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  view_partner: {
    height: 687,
    width: '100%',
  },
  view_list: {
    width: '100%',
    flex: 757,
  },
  view_friend: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    marginBottom: 5,
    borderRadius: 15,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  img_friend: {
    flex: 96,
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'contain',
    marginRight: 16,
  },
  text_friend: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'capitalize',
    flex: 257,
  },
  view_group: {
    flexDirection: 'column',
    flex: 257,
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
  view_delete: {
    flex: 32,
  },
  img_delete: {
    width: 25,
    resizeMode: 'contain',
  }
});

// const mapStateToProps = (state) => state;
// export default connect(mapStateToProps)(FriendList);
export default FriendList;
