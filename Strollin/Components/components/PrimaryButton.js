import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
const globalStyles = require('../../Styles');

export default function PrimaryButton({ text, onPressFct, color }) {

  if (!color) {
    color = "#0989FF";
  }

  return (
    <TouchableOpacity
      onPress={onPressFct}
      style={{
        width: "100%",
        backgroundColor: color,
        padding: 16,
        marginTop: 16,
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 32,
      }}
    >
      <Text
        style={[
          globalStyles.paragraphs,
          { color: "#fff", textAlign: "center" },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}