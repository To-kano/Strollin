import React from 'react';
import {shallow} from 'enzyme';
import Home from '../Components/Home';
import renderer from 'react-test-renderer';

import {
    View, Button
  } from 'react-native';

const navigationTest = {
    navigate: (test) => jest.fn()
}


describe('Home', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Home navigation={navigationTest}/>)
            expect(component).toMatchSnapshot()
        });

        test('test render Home', () => {
            renderer.create(
                <Home navigation={navigationTest}/>,
            )      
          })

          it('handles button', () => {

            const wrapper =  shallow(
                    <Home navigation={navigationTest} />
            );

            expect(wrapper.find(Button).length).toBe(3);

            wrapper
            .find(Button)
            .at(0)
            .props()
            .onPress()

            wrapper
            .find(Button)
            .at(1)
            .props()
            .onPress()

            wrapper
            .find(Button)
            .at(2)
            .props()
            .onPress()
      
          });
          
    });
});