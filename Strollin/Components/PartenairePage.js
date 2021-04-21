import React from 'react';
import { connect } from 'react-redux';
import {
  View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground, FlatList,
} from 'react-native';
import BackgroundImage from './backgroundImage';
import { SceneView } from 'react-navigation';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import I18n from '../Translation/configureTrans';

function randPic() {
  const rand = (Math.floor(Math.random() * 2) + 1);

  if (rand === 1) {
    return (require('../ressources/street2.jpg'));
  }
  return (require('../ressources/street1.jpg'));
}

const initialList = [
  {
    id: 1,
    name: 'Foot',
  },
  {
    id: 2,
    name: 'Tennis',
  },
  {
    id: 3,
    name: 'Piscine',
  },
  {
    id: 4,
    name: 'Cinéma',
  },
];

function PartenaireScreen(props) {
  const [list, setList] = React.useState(initialList);
  console.log(props.map.locations, "\n\n\n", props.profil, "\n\n\n", props.route)

  return (
    <View style={styles.view_back}>
      <View style={styles.view_header}>
          
        <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.partner')}
          {'   '}
        </Text>
      </View>
      <ScrollView
        style={styles.view_partner}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.view_box}
          onPress={() => props.navigation.navigate('SettingPartenaire')}
        >
          <ImageBackground
            style={styles.img_boxBack}
            imageStyle={styles.img_boxBack}
            source={randPic()}
            // source={require(props.data.image)}
          >
            <View style={styles.view_boxIn}>
              <View style={styles.view_information}>
                <Image style={styles.img_location} source={require('../images/icons/white/location.png')}/>
                <Text style={styles.text_location}>Adresse de l entreprise</Text>
              </View>
              <Text style={styles.text_name}>Nom entreprise</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {I18n.t('Partner.number_of_popup')}
          </Text>
          <View style={styles.view_number}>
            <Text style={styles.text_number}>9057</Text>
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {I18n.t('Partner.number_of_accepted_popup')}
          </Text>
          <View style={styles.view_number}>
            <Text style={styles.text_number}>53</Text>
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {I18n.t('Partner.appearances_in_the_algorithm')}
          </Text>
          <View style={styles.view_number}>
            <Text style={styles.text_number}>1061</Text>
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {I18n.t('Partner.acceptance_in_the_algorithm')}
          </Text>
          <View style={styles.view_number}>
            <Text style={styles.text_number}>322</Text>
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {I18n.t('Partner.number_of_visitors')}
          </Text>
          <View style={styles.view_number}>
            <Text style={styles.text_number}>310</Text>
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {I18n.t('Partner.appearance_by_tags')}
          </Text>
          <FlatList
            numColumns={3}
            style={styles.view_tagIn}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={list}
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.text_tagIn}>{item.name}</Text>
            )}
          />
        </View>
      </ScrollView>
    </View>
    // <View style={styles.back}>
    //   <BackgroundImage />
    //   <View style={styles.fill}>
    //     <View style={styles.logo}>
    //       <Image style={{ resizeMode: 'center' }} source={require('../ressources/profile.png')} />
    //     </View>
    //     <View style={styles.name}>
    //       <Text style={{ fontSize: 40 }}>
    //         Nom Entreprise
    //         {' '}
    //         {/* nom de l'entreprise */}
    //       </Text>
    //     </View>
    //     <View style={styles.infos}>
    //       <View style={styles.textLine}>
    //         <Text style={styles.textInfos}>Popup affiché : </Text>
    //         <Text style={styles.textNumber}>9057</Text>
    //       </View>
    //       <View style={styles.textLine}>
    //         <Text style={styles.textInfos}>Popup accepté : </Text>
    //         <Text style={styles.textNumber}>4397</Text>
    //       </View>
    //       <View style={styles.textLine}>
    //         <Text style={styles.textInfos}>Apparu dans l'algorythme : </Text>
    //         <Text style={styles.textNumber}>4918</Text>
    //       </View>
    //       <View style={styles.textLine}>
    //         <Text style={styles.textInfos}>Accepté dans l'algorythme : </Text>
    //         <Text style={styles.textNumber}>627</Text>
    //       </View>
    //       <View style={styles.textLine}>
    //         <Text style={styles.textInfos}>Visiteurs : </Text>
    //         <Text style={styles.textNumber}>65</Text>
    //       </View>
    //     </View>
    //   </View>
    // </View>
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
  img_header: {
    width: 34,
    resizeMode: 'contain',
  },
  text_header: {
    width: '87.6%',
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
  view_box: {
    backgroundColor: '#000000',
    borderRadius: 12,
    width: '100%',
    height: 235,
    marginBottom: 30,
  },
  img_boxBack: {
    flex: 1,
    borderRadius: 12,
  },
  view_boxIn: {
    flex: 1,
    flexDirection: 'column-reverse',
    borderRadius: 12,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  view_information: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img_information: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_information: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  img_location: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_location: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  text_name: {
    fontSize: 28,
    letterSpacing: 2,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  view_stat: {
    width: '100%',
    marginBottom: 15,
    alignContent: 'flex-start',
  },
  text_stat: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  view_number: {
    flexDirection: 'row-reverse',
    width: '100%',
    padding: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  text_number: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0092A7',
  },
  view_tagIn: {
    flex: 304,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    paddingTop: 7.5,
  },
  text_tagIn: {
    alignSelf: 'flex-start',
    textAlign: 'center',
    width: '30%',
    marginLeft: 7.5,
    marginBottom: 7.5,
    paddingTop: 7,
    paddingLeft: 2,
    paddingRight: 2,
    color: '#0091A7',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    borderRadius: 20,
    borderColor: '#0091A7',
    borderWidth: 4,
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(PartenaireScreen);
