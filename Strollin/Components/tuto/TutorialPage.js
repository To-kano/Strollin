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
    },
    {
        title : "Voir mes tags",
        description : "Sur la page de profile les tags sont visible en dessous du mot 'tags'",
    },
    {
        title : "Changer mes tags",
        description : "Vous pouvez changer vos tags en appuyant sur le bouton 'Choose my tags' dans la page de profile",
    },
    {
        title : "Valider mes tags",
        description : "Sur la page de selection des tags vous pouvez valider les tags selectionné en appuyant sur le bouton 'Confirmer mes Tags'",
    }
]

const tutorielNavigation = [
    {
        title : "Créer une nouvelle sortie",
        description : "Pour créer une nouvelle sortie vous devez aller à la page de configuration de sortie en selectionnant 'New trip' dans le menu de navigation",
    },
    {
        title : "Configurer ma sortie",
        description : "Sur la page de configuration de sortie, vous pouvez selectionner votre budget, temps de sortie, la distance à parcourir, le nombre de lieu à visité et indiquer si vous souhaitez boire ou manger",
    },
    {
        title : "Valider la configuration de sortie",
        description : "Vous pouvez valider la configuration de sortie en appuyant sur le bouton 'Confirm my options'",
    },
    {
        title : "Vérifier votre sortie",
        description : "Après la génération de votre sortie vous pouvez vérifier vos destination avant de lancer le parcoure avec le bouton 'Lets Go!'",
    },
    {
        title : "Régénéré une nouvelle sortie",
        description : "Avant de lancer le parcoure, si celui-ci ne vous convient pas, vous pouvez le régénérer avec la même configuration en appuyant sur le bouton 'New Trip'",
    },
    {
        title : "Arrêter la navigation",
        description : "Vous pouvez à tout moment arrêter la navigation en appuyant sur la croix en au à droite",
    },
    {
        title : "Noter le parcoure",
        description : "A la fin de la navigation vous pouvez choisir de noter et commenter la navigation ou non en appuyant sur le bouton 'Envoyer' ou sur la croix en haut à droite",
    },
]

const tutorielPartage = [
    {
        title : "Voir l'historique",
        description : "Vous pouvez voir l'historique de vos parcoures en allant sur la page de l'historique en cliquant sur le bouton historic dans le menu de navigation",
    },
    {
        title : "Partager vos parcoure",
        description : "Vous pouvez partager vos parcoure en cliquant sur les bouton de partage sur l'un des trajet que vous avez effectuer",
    }
]

const tutorielCommunication = [
    {
        title : "Communiquer avec vos amie",
        description : "Vous pouvez aller communiquer avec vos amie en cliquant sur 'Chat' dans le menu de navigation",
    },
    {
        title : "Créer une conversation",
        description : "Sur la page des conversation vous pouvez en créer une nouvelle en cliquant sur le bouton en haut à droite",
    },
    {
        title : "Accéder à une conversation",
        description : "Vous pouvez accéder à une conversation en appuyant sur une conversation créé dans la page des conversation",
    }
]


function TutorialPage() {

    _renderItem = ({item, index}) => {
        return (
            <View style={{}}>
                <Image style={{}} source={require('../../images/TonyPP.jpg')} />
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
              data={tutorielTags}
              renderItem={this._renderItem}
              sliderWidth={400}
              itemWidth={400}
            />
        </View>
    )
}

export default TutorialPage;