import React, {useState} from 'react';
import {
   View, Text, Button,
  StyleSheet, Image
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

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


function TutorialPage() {

    const _renderItem = ({item, index}) => {
        return (
            <View style={{}}>
                <Image style={{}} source={item.image} />
                <Text style={{}}>{ item.title }</Text>
                <Text style={{}}>{ item.description }</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>TutorialPage</Text>
            <Carousel
              //ref={(c) => { this._carousel = c; }}
              data={tutorielCommunication}
              renderItem={_renderItem}
              sliderWidth={400}
              itemWidth={400}
            />
        </View>
    )
}

export default TutorialPage;