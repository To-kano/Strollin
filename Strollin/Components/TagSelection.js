import React, { useState } from 'react';

import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput,
} from 'react-native';

import I18n from '../Translation/configureTrans';
import { getTimeZone } from 'react-native-localize';

export function Header({ navigation, defaultState = false }) {
  const [pressed, setpressed] = useState(defaultState);

  if (pressed === false) {
    return (
      <View style={styles.view_header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Menu')}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.tags')}
        </Text>
        <TouchableOpacity
          onPress={() => { setpressed(!pressed); }}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/search.png')} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.view_header}>
      <TextInput
        style={styles.textInput_header}
        placeholder={I18n.t('Header.search_tag')}
      />
      <TouchableOpacity
        // onPress={setSortedTendanceData}
        onPress={() => { setpressed(!pressed); }}
      >
        <Image style={styles.img_header} source={require('../images/icons/black/search.png')} />
      </TouchableOpacity>
    </View>
  );
}

export function Tag({ name, defaultState = false }) {
  const [pressed, setpressed] = useState(defaultState);

  return (
    <View style={styles.view_tags}>
      {pressed === false && (
      <TouchableOpacity
        style={styles.view_tagOff}
        onPress={() => { setpressed(!pressed); }}
      >
        <Text style={styles.text_tagOff}>{name}</Text>
      </TouchableOpacity>
      )}
      {pressed === true && (
      <TouchableOpacity
        style={styles.view_tagOn}
        onPress={() => { setpressed(!pressed); }}
      >
        <Image style={styles.img_tagOn} source={require('../images/icons/white/checked.png')}/>
        <Text style={styles.text_tagOn}>{name}</Text>
      </TouchableOpacity>
      )}
    </View>
  );
}

export function TagSelection({ navigation, profil }) {
  const data = [
    {
      id: '1',
      name: 'vidéo game',
    },
    {
      id: '2',
      name: 'restaurant',
    },
    {
      id: '3',
      name: 'cinéma',
    },
    {
      id: '4',
      name: 'magie',
    }, {
      id: '5',
      name: 'compétition',
    },
  ];

  return (
    <View style={styles.view_back}>
      <Header navigation={navigation} />
      <View style={styles.viex_list}>
        <Text style={styles.text_field}>
          {I18n.t('Tags.select_our_tags')}
          <Text style={styles.text_star}> *</Text>
        </Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Tag name={item.name} pressed={item.pressed} />
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.view_button}
        onPress={() => {
          navigation.navigate('Profile');
        }}
      >
        <Text style={styles.text_button}>
          {I18n.t('Tags.confirm_my_tags')}
        </Text>
      </TouchableOpacity>
    </View>
    // <View style={styles.back}>
    //   <BackgroundImage />
    //   <View style={styles.fill}>
    //     <Text style={[{ textAlign: 'left', color: 'black', fontSize: 25 }]}>
    //       {I18n.t('welcome')}
    //     </Text>
    //     <Text style={[
    //       {
    //         textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 25
    //       }
    //     ]}
    //     >
    //       {profil.pseudo}
    //     </Text>
    //     <Text style={[{
    //       textAlign: 'left',
    //       color: 'black',
    //       fontSize: 18,
    //       marginTop: 18,
    //       fontWeight: 'normal',
    //     }]}
    //     >
    //       {I18n.t('chooseTags')}
    //     </Text>
    //     <View style={{ flex: 2, margin: 10, marginTop: 40 }}>
    //       <FlatList
    //         data={data}
    //         renderItem={({ item }) => (
    //           <Tag name={item.name} pressed={item.pressed} />
    //         )}
    //       />
    //       <TouchableOpacity
    //         style={styles.newTrip}
    //         onPress={() => navigation.navigate('Profile')}
    //         // onPress={() =>
    //         //  // this.NextPage(navigation.getParam('uid'))
    //         // }
    //       >
    //         <Text style={{ fontSize: 16, color: '#FFFFFF' }}>{I18n.t('next')}</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(TagSelection);

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
  viex_list: {
    flex: 703,
    width: '100%',
  },
  text_field: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 12.5,
  },
  text_star: {
    fontWeight: 'bold',
    color: '#FF0000',
    fontSize: 16,
  },
  view_tags: {
    marginBottom: 9,
  },
  view_tagOff: {
    borderRadius: 25,
    borderWidth: 3,
    padding: 9,
    borderColor: '#000000',
    backgroundColor: '#E1E2E7',
  },
  text_tagOff: {
    textTransform: 'capitalize',
    width: '100%',
    height: 22,
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  view_tagOn: {
    flexDirection: 'row',
    borderRadius: 25,
    borderWidth: 3,
    padding: 9,
    borderColor: '#0092A7',
    backgroundColor: '#0092A7',
  },
  img_tagOn: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  text_tagOn: {
    textTransform: 'capitalize',
    width: '86%',
    height: 22,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  view_button: {
    flex: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 45,
    marginTop: 12.5,
    marginBottom: 12.5,
    backgroundColor: '#0092A7',
  },
  text_button: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // back: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 1,
  //   backgroundColor: '#fff',
  // },
  // fill: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   flex: 1,
  //   backgroundColor: '#FFFFFF',
  //   padding: 5,
  //   paddingTop: 25,
  //   margin: 10,
  //   width: '95%',
  //   borderRadius: 5,
  //   opacity: 0.9,
  // },
  // header: {
  //   backgroundColor: '#FFFFFF',
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 0.1,
  //   width: '100%',
  // },
  // newTrip: {
  //   alignItems: 'center',
  //   backgroundColor: '#F07323',
  //   paddingVertical: '5%',
  //   paddingHorizontal: '30%',
  //   borderRadius: 5,
  // },
});
