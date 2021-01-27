import React from 'react';
import {shallow} from 'enzyme';
import TendanceSearchBar from '../Components/TendanceSearchBar';
import ButtonIcon from '../Components/ButtonIcon';

import renderer from 'react-test-renderer';

import { StyleSheet, TextInput, View } from 'react-native';



const onPresstest = (test) => jest.fn();


describe('TendanceSearchBar', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<TendanceSearchBar onPress={onPresstest}/>)
            expect(component).toMatchSnapshot()
        });
    });

    test('test render TendanceSearchBar', () => {
        renderer.create(
            <TendanceSearchBar onPress={onPresstest}/>,
        )      
      })

      it('handles button', () => {

        const wrapper =  shallow(
                <TendanceSearchBar onPress={onPresstest}/>
        );

        expect(wrapper.find(ButtonIcon).length).toBe(1);

        wrapper
        .find(ButtonIcon)
        .at(0)
        .props()
        .onPress()

        expect(wrapper.find(TextInput).length).toBe(1);

        wrapper
        .find(TextInput)
        .at(0)
        .props()
        .onChangeText()
  
      });
    
});