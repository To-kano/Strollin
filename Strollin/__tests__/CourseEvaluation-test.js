import React from 'react';
import {shallow} from 'enzyme';
import ConnectedCourseEvaluation, {CourseEvaluation} from '../Components/CourseEvaluation';
import renderer from 'react-test-renderer';
import Store from '../Store/configureStore';
import { Provider } from 'react-redux';
import { View,  TouchableOpacity, TextInput} from 'react-native';
import Stars from 'react-native-stars';

describe('CourseEvaluation', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <ConnectedCourseEvaluation />
            </Provider>)
            expect(component).toMatchSnapshot()
        });

        test('test render CourseEvauation', () => {
            renderer.create(
                <Provider store={Store}>
                    <ConnectedCourseEvaluation />
                </Provider>)
          })

          global.fetch = jest.fn(() =>
              Promise.resolve({
                json: () => Promise.resolve({ status: true }),
              })
            );
          
            beforeEach(() => {
              fetch.mockClear();
            });

          it('handles onChangetext', () => {
            // Create a mock function to pass as a handler
            //const onChangeText = (test) => jest.fn();
        
            // Render our button with an image inside
            const wrapper =  shallow(
                    <CourseEvaluation />
            );
        
            // Find a TouchableOpacity and press it

            expect(wrapper.find(View).at(4).find(TouchableOpacity).length).toBe(1);
            //expect(wrapper.find(CourseEvaluation).shallow().find(View)).toBe(1);

            wrapper
            .find(View)
            .at(4)
            .find(TouchableOpacity)
            .first()
            .props()
            .onPress()
      
          });

          it('handles change star', () => {
            // Create a mock function to pass as a handler
            //const onChangeText = (test) => jest.fn();
        
            // Render our button with an image inside
            const wrapper =  shallow(
                    <CourseEvaluation />
            );
        
            // Find a TouchableOpacity and press it

            expect(wrapper.find(View).at(2).find(Stars).length).toBe(1);
            //expect(wrapper.find(CourseEvaluation).shallow().find(View)).toBe(1);

            wrapper
            .find(View)
            .at(2)
            .find(Stars)
            .first()
            .props()
            .update()
      
          });


          it('handles text input', () => {
            // Create a mock function to pass as a handler
            //const onChangeText = (test) => jest.fn();
        
            // Render our button with an image inside
            const wrapper =  shallow(
                    <CourseEvaluation />
            );
        
            // Find a TouchableOpacity and press it

            expect(wrapper.find(View).at(3).find(TextInput).length).toBe(1);
            //expect(wrapper.find(CourseEvaluation).shallow().find(View)).toBe(1);

            wrapper
            .find(View)
            .at(3)
            .find(TextInput)
            .first()
            .props()
            .onChangeText()
      
          });
    });
});