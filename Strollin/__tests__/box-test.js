import React from 'react';
import {shallow} from 'enzyme';
import Box from '../Components/box';

import {
    Button, Image, View, StyleSheet, Text, ScrollView, FlatList
  } from 'react-native';

const dataTest = {
    name: 'test',
    budget: '10',
    period: '10 am to 10 pm',
    destinations: [
        '1',
        '2',
        '3',
    ]
}

const navigationTest = {
    navigate: (test) => jest.fn(),
    setParams: (test) => jest.fn()
    
}

describe('Box', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Box data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });

        it('handles button', () => {

            const wrapper =  shallow(
                    <Box data={dataTest} navigation={navigationTest}/>
            );

            expect(wrapper.find(Button).length).toBe(1);

            wrapper
            .find(Button)
            .at(0)
            .props()
            .onPress()
      
          });
    });
});