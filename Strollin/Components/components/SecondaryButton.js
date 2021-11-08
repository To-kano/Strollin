import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
const globalStyles = require('../../Styles');

export default function SecondaryButton({text, onPressFct}) {

    return (
      <TouchableOpacity
        onPress={onPressFct}
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: 16,
          marginTop: 16,
          borderColor: "#9B979B",
          borderWidth: 1,
          justifyContent: "center",
          alignContent: "center",
          borderRadius: 32,
        }}
      >
        <Text
          style={[
            globalStyles.paragraphs,
            { color: "#0989FF", textAlign: "center" },
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
}