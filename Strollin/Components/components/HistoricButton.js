import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from './Icon'

import I18n from '../../Translation/configureTrans';

export default function HistoricButton({props}) {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate(I18n.t("Menu.historic"))}
        style={{
            backgroundColor: "#ffffff",
            position: "absolute",
            top: 16,
            right: 16,
            padding: 16,
            borderRadius: 32,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        }}
      >
        <Icon name="historic" size={29} color="#1C1B1C" />
      </TouchableOpacity>
    );
}