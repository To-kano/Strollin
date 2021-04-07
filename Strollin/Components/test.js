/* eslint-disable react/jsx-closing-bracket-location */
import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
/*
    Build a form dynamically from jsonData
    see examples/sampleform.json file
*/

const defineFormFields = (data) => {
  /*
    Define the state to use along with default values.
  */
  const stateData = {};
  data.forEach((e) => {
  
      stateData[e.id] = e.defaultValue || '';

  });
  return stateData;
};

const MyComponent = ({ jsonData }) => {
  const [formFields, updateFormFields] = useState(defineFormFields(jsonData));
  const [currentSegmentElements, updateCurrentViewElements] = useState([]);

  const updateFormData = (fieldName, value) => {
    const updatedValue = {};
    updatedValue[fieldName] = value;
    updateFormFields({
      ...formFields,
      ...updatedValue
    });
  };

  const elementTypes = {
    text(label, id) {
      return (
        <TextInput
          key={id}
          accessibilityHint={label}
          label={label}
          defaultValue={formFields[id]}
          value={formFields[id]}
          placeholder={label}
          onChangeText={(value) => updateFormData(id, value)}
        />
      );
    }
  };

  const buildSegment = () => {
    /*
        Which segment/portion of the json to show
      */
   
    const uiElements = [];
    jsonData.forEach((e) => {
      const definition = elementTypes[e.type](
        e.label,
        e.id
      );
      uiElements.push(definition);
    });
    updateCurrentViewElements(uiElements);
  };

  useEffect(() => {
    buildSegment();
  }, []);

  return (
    <ScrollView>
        <View>
          <View>
            {currentSegmentElements.map((m) => m)}
          </View>
        </View>
    </ScrollView>
  );
};

const FormBuilder = React.memo(MyComponent);
export default FormBuilder;