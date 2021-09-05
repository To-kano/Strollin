import React, {useState} from 'react';
import {
   View, Text, Button, TouchableOpacity, ScrollView,
  StyleSheet, Image
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { DrawerActions } from '@react-navigation/native';


const tutorielTags = [
    {
        title : "Aller à la page des tags",
        description : "Vous pouvez aller à la page des tags en selectionnant 'Profile' dans le menu de navigation",
        image : require('../../images/guide/tags/Strollin_navigation_profile_done.jpg')
    },
    {
        title : "Voir mes tags",
        description : "Sur la page de profile les tags sont visible en dessous du mot 'tags'",
        image : require('../../images/guide/tags/Strollin_profile_tags.jpg')
    },
    {
        title : "Changer mes tags",
        description : "Vous pouvez changer vos tags en appuyant sur le bouton 'Choose my tags' dans la page de profile",
        image : require('../../images/guide/tags/Strollin_profile_choose_my_tags.jpg')

    },
    {
        title : "Valider mes tags",
        description : "Sur la page de selection des tags vous pouvez valider les tags selectionné en appuyant sur le bouton 'Confirmer mes Tags'",
        image : require('../../images/guide/tags/Strollin_tag_selection_confirmer.jpg')
    }
]

const tutorielNavigation = [
    {
        title : "Créer une nouvelle sortie",
        description : "Pour créer une nouvelle sortie vous devez aller à la page de configuration de sortie en selectionnant 'New trip' dans le menu de navigation",
        image : require('../../images/guide/navigation/Strollin_navigation_new_trip_navigation.jpg')

    },
    {
        title : "Configurer ma sortie",
        description : "Sur la page de configuration de sortie, vous pouvez selectionner votre budget, temps de sortie, la distance à parcourir, le nombre de lieu à visité et indiquer si vous souhaitez boire ou manger",
        image : require('../../images/guide/navigation/Strollin_trip_settings.jpg')

    },
    {
        title : "Valider la configuration de sortie",
        description : "Vous pouvez valider la configuration de sortie en appuyant sur le bouton 'Confirm my options'",
        image : require('../../images/guide/navigation/Strollin_trip_settings_confirme.jpg')
    },
    {
        title : "Vérifier votre sortie",
        description : "Après la génération de votre sortie vous pouvez vérifier vos destination avant de lancer le parcoure avec le bouton 'Lets Go!'",
        image : require('../../images/guide/navigation/Strollin_trip_suggestion_generate.jpg')
    },
    {
        title : "Régénéré une nouvelle sortie",
        description : "Avant de lancer le parcoure, si celui-ci ne vous convient pas, vous pouvez le régénérer avec la même configuration en appuyant sur le bouton 'New Trip'",
        image : require('../../images/guide/navigation/Strollin_trip_suggestion_new_generate.jpg')
    },
    {
        title : "Arrêter la navigation",
        description : "Vous pouvez à tout moment arrêter la navigation en appuyant sur la croix en au à droite",
        image : require('../../images/guide/navigation/Strollin_trip_navigation_navigation.jpg')
    },
    {
        title : "Noter le parcoure",
        description : "A la fin de la navigation vous pouvez choisir de noter et commenter la navigation ou non en appuyant sur le bouton 'Envoyer' ou sur la croix en haut à droite",
        image : require('../../images/guide/navigation/Strollin_trip_notation.jpg')
    },
]

const tutorielPartage = [
    {
        title : "Voir l'historique",
        description : "Vous pouvez voir l'historique de vos parcoures en allant sur la page de l'historique en cliquant sur le bouton historic dans le menu de navigation",
        image : require('../../images/guide/partage/Strollin_navigation_historic_nav.jpg')
    },
    {
        title : "Partager vos parcoure",
        description : "Vous pouvez partager vos parcoure en cliquant sur les bouton de partage sur l'un des trajet que vous avez effectuer",
        image : require('../../images/guide/partage/Strollin_historique_share.jpg')
    }
]

const tutorielCommunication = [
    {
        title : "Communiquer avec vos amie",
        description : "Vous pouvez aller communiquer avec vos amie en cliquant sur 'Chat' dans le menu de navigation",
        image : require('../../images/guide/message/Strollin_navigation_chat_nav.jpg')
    },
    {
        title : "Créer une conversation",
        description : "Sur la page des conversation vous pouvez en créer une nouvelle en cliquant sur le bouton en haut à droite",
        image : require('../../images/guide/message/Strollin_conversation_list_create.jpg')
    },
    {
        title : "Accéder à une conversation",
        description : "Vous pouvez accéder à une conversation en appuyant sur une conversation créé dans la page des conversation",
        image : require('../../images/guide/message/Strollin_conversation_list_get.jpg')
    }
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

    const _renderItem = ({item, index}) => {
        return (
            <View style={
                {
                    backgroundColor : 'red',
                    backgroundColor:'floralwhite',
                    borderRadius: 5,
                    height: 520,
                    padding: 50,
                    margin : 25,
                    //marginLeft: 25,
                    //marginRight: 25,
                }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    letterSpacing: 2,
                    textAlign: 'center',
                    color: '#000000',
                    marginBottom : 10,
                }}>{ item.title }</Text>
                <Image style={{width : 150, height : 300}} source={item.image} />
                <Text style={{
                    fontSize: 12,
                    letterSpacing: 1.4,
                    textAlign: 'center',
                    color: '#000000',
                    marginTop : 20,
                }}>{ item.description }</Text>
            </View>
        );

    }

    return (
        <View style={styles.view_back} >
            <Header props={props} />
            <ScrollView style={{
                backgroundColor : "blue",
                paddingVertical: 20,
                height : 600
            }} >
                <View
                style={
                    {
                        //backgroundColor : 'red',
                        backgroundColor:'white',
                        borderRadius: 5,
                        //height: 520,
                        paddingVertical: 20,
                        marginBottom : 25,
                        //marginLeft: 25,
                        //marginRight: 25,
                    }}
                >
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        letterSpacing: 2,
                        textAlign: 'center',
                        color: '#000000',
                    }}>Title</Text>
                    <Carousel
                      //ref={(c) => { this._carousel = c; }}
                      data={tutorielTags}
                      renderItem={_renderItem}
                      sliderWidth={400}
                      itemWidth={300}
                      layout={'default'}
                      layoutCardOffset={9}
                    />
                </View>
                <View
                style={
                    {
                        //backgroundColor : 'red',
                        backgroundColor:'white',
                        borderRadius: 5,
                        //height: 520,
                        paddingVertical: 20,
                        marginBottom : 25,
                        //marginLeft: 25,
                        //marginRight: 25,
                    }}
                >
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        letterSpacing: 2,
                        textAlign: 'center',
                        color: '#000000',
                    }}>Title</Text>
                    <Carousel
                      //ref={(c) => { this._carousel = c; }}
                      data={tutorielNavigation}
                      renderItem={_renderItem}
                      sliderWidth={400}
                      itemWidth={300}
                      layout={'default'}
                      //layoutCardOffset={9}
                    />
                </View>
                <View
                style={
                    {
                        //backgroundColor : 'red',
                        backgroundColor:'white',
                        borderRadius: 5,
                        //height: 520,
                        paddingVertical: 20,
                        marginBottom : 25,
                        //marginLeft: 25,
                        //marginRight: 25,
                }}
                >
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        letterSpacing: 2,
                        textAlign: 'center',
                        color: '#000000',
                    }}>Title</Text>
                    <Carousel
                      //ref={(c) => { this._carousel = c; }}
                      data={tutorielPartage}
                      renderItem={_renderItem}
                      sliderWidth={400}
                      itemWidth={300}
                      layout={'default'}
                      layoutCardOffset={9}
                    />
                </View>
                <View
                style={
                    {
                        //backgroundColor : 'red',
                        backgroundColor:'white',
                        borderRadius: 5,
                        //height: 520,
                        paddingVertical: 20,
                        marginBottom : 25,
                        //marginLeft: 25,
                        //marginRight: 25,
                    }}
                >
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        letterSpacing: 2,
                        textAlign: 'center',
                        color: '#000000',
                    }}>Title</Text>
                    <Carousel
                      //ref={(c) => { this._carousel = c; }}
                      data={tutorielCommunication}
                      renderItem={_renderItem}
                      sliderWidth={400}
                      itemWidth={300}
                      layout={'default'}
                      layoutCardOffset={9}
                    />
                </View>
            </ScrollView>
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
      backgroundColor: '#E1E2E7',
    },
    view_header: {
      //flex: 50,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor : 'green',
      marginBottom: 10,
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