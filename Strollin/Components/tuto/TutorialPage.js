import React, {useState} from 'react';
import {
   View, Text, Button, TouchableOpacity, ScrollView,
  StyleSheet, Image
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import TutorialItem from './TutorialItem';
import { DrawerActions } from '@react-navigation/native';

import GifImage from '@lowkey/react-native-gif';

const globalStyles = require('../../Styles');


const tutorielTags = [
    {
        title : "Aller à la page des tags",
        description : "Vous pouvez aller à la page des tags en selectionnant 'Profile' dans le menu de navigation",
        image : require('../../images/guide/tags/go_to_tags.gif')
    },
    {
        title : "Voir mes tags",
        description : "Sur la page de profile les tags sont visible en dessous du mot 'tags'",
        image : require('../../images/guide/tags/tag_selection.gif')
    },
    {
        title : "Changer mes tags",
        description : "Vous pouvez changer vos tags en appuyant sur le bouton 'Choose my tags' dans la page de profile",
        image : require('../../images/guide/tags/tag_change.gif')

    },
    {
        title : "Valider mes tags",
        description : "Sur la page de selection des tags vous pouvez valider les tags selectionné en appuyant sur le bouton 'Confirmer mes Tags'",
        image : require('../../images/guide/tags/tag_validation.gif')
    },
    {
        title : "Valider mes tags",
        description : "Sur la page de selection des tags vous pouvez valider les tags selectionné en appuyant sur le bouton 'Confirmer mes Tags'",
        image : require('../../images/guide/tags/tag_validation.gif')
    }
]

const tutorielNavigation = [
    {
        title : "Créer une nouvelle sortie",
        description : "Créer une nouvelle sortie en selectionnant 'New trip' dans le menu de navigation",
        image : require('../../images/guide/navigation/nouvel_navigation.gif')

    },
    {
        title : "Configurer ma sortie",
        description : "Sur la page de configuration de sortie, vous pouvez selectionner vos besoin pour ce parcoure",
        image : require('../../images/guide/navigation/config_navigation.gif')

    },
    {
        title : "Vérifier votre sortie",
        description : "Après la génération de votre sortie vous pouvez vérifier vos destination avant de lancer le parcoure avec le bouton 'Lets Go!'",
        image : require('../../images/guide/navigation/check_navigation.gif')
    },
    {
        title : "Arrêter la navigation",
        description : "Vous pouvez à tout moment arrêter la navigation en appuyant sur la croix en au à droite",
        image : require('../../images/guide/navigation/end_navigation.gif')
    },
    {
        title : "Arrêter la navigation",
        description : "Vous pouvez à tout moment arrêter la navigation en appuyant sur la croix en au à droite",
        image : require('../../images/guide/navigation/end_navigation.gif')
    },
]

const tutorielPartage = [
    {
        title : "Voir l'historique",
        description : "Vous pouvez voir l'historique de vos parcoures cliquant sur le bouton historic dans le menu de navigation",
        image : require('../../images/guide/partage/historique.gif')
    },
    {
        title : "Voir l'historique",
        description : "Vous pouvez voir l'historique de vos parcoures cliquant sur le bouton historic dans le menu de navigation",
        image : require('../../images/guide/partage/historique.gif')
    },
]

function Header({ props, defaultState = false }) {
    
      return (
        <View style={styles.view_header}>
          <TouchableOpacity
            onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Image style={styles.img_header} source={require('../../images/icons/black/menu.png')} />
          </TouchableOpacity>
          <Text style={styles.text_header}>
          Guide
          </Text>
        </View>
      );
  }

function TutorialPage(props) {

    const [index, setIndex] = useState(0);

    const [guide1, setGuide1] = useState(false);
    const [guide2, setGuide2] = useState(false);
    const [guide3, setGuide3] = useState(false);
    const [guide4, setGuide4] = useState(false);

    return (
        <View style={styles.view_back} >
            <Header props={props} />
            <View  style={{flexDirection : "row", justifyContent: 'space-around',width :  "100%", alignItems : 'center'}}>
                <TouchableOpacity
                    style={{backgroundColor : guide1 ? 'green' : undefined, flex: 1, alignItems : 'center', borderWidth : 1}}
                    onPress={() => setIndex(0)}
                    >
                    <Text style={[globalStyles.subparagraphs, { marginVertical: 16 }]}>
                        Tags
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{backgroundColor : guide2 ? 'green' : undefined, flex: 1,  alignItems : 'center', borderWidth : 1}}
                    onPress={() => setIndex(1)}
                >
                    <Text style={[globalStyles.subparagraphs, { marginVertical: 16 }]}>
                        Navigation
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{backgroundColor : guide3 ? 'green' : undefined, flex: 1,  alignItems : 'center', borderWidth : 1}}
                    onPress={() => setIndex(2)}
                >
                    <Text style={[globalStyles.subparagraphs, { marginVertical: 16 }]}>
                        historic
                    </Text>
                </TouchableOpacity>
            </View>
            {index === 0 && <TutorialItem title={'Tags'} data={tutorielTags} callbackFull={() => {
                setGuide1(true)
                setIndex(1)
            }} /> }
            {index === 1 && <TutorialItem title={'Navigation'} data={tutorielNavigation} callbackFull={() => {
                setIndex(2)
                setGuide2(true)
            }}/> }
            {index === 2 && <TutorialItem title={'Partage'} data={tutorielPartage} callbackFull={() => {
                setIndex(0)
                setGuide3(true)
            }}/> }
        </View>
    )
}

export default TutorialPage;

const styles = StyleSheet.create({
    view_back: {
      //flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      //backgroundColor: '#E1E2E7',
    },
    view_header: {
      //flex: 50,
      flexDirection: 'row',
      alignItems: 'center',
      //backgroundColor : 'green',
      //marginBottom: 10,
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
  });