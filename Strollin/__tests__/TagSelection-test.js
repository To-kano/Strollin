import React from 'react';
import {shallow} from 'enzyme';
import ConnectedTagSelection, {Tag, TagSelection} from '../Components/TagSelection';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import {
    StyleSheet, Text, View, Button, FlatList, TouchableOpacity
} from 'react-native';


const navigationTest = {
    navigate: (test) => jest.fn(),
    setOptions: (test) => jest.fn()
}

const profilTest = {
    pseudo: "pierre",
    mail: "test@test.com"
}

describe('TagSelection', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <ConnectedTagSelection navigation={navigationTest} profil={profilTest} />
            </Provider>
            )
            expect(component).toMatchSnapshot()
        });

        test('test render TagSelection', () => {
            renderer.create(
                <Provider store={Store}>
                    <ConnectedTagSelection navigation={navigationTest} profil={profilTest} />
                </Provider>
                )
          })

          it('handles button', () => {

            const wrapper =  shallow(
                    <Tag />
            );

            expect(wrapper.find(Button).length).toBe(1);

            wrapper
            .find(Button)
            .at(0)
            .props()
            .onPress()

            const wrapper2 =  shallow(
                <Tag defaultState={true}/>
            );

            expect(wrapper2.find(Button).length).toBe(1);

            wrapper2
            .find(Button)
            .at(0)
            .props()
            .onPress()


            const wrapper3 =  shallow(
                <TagSelection 
                navigation={navigationTest} 
                profil={profilTest}/>
            );

            expect(wrapper3.find(TouchableOpacity).length).toBe(1);

            wrapper3
            .find(TouchableOpacity)
            .at(0)
            .props()
            .onPress()
      
          });
    });
});