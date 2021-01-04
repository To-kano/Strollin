import React from 'react';
import {shallow} from 'enzyme';
import ConnectedCourseEvaluation, {CourseEvaluation} from '../Components/CourseEvaluation';
import renderer from 'react-test-renderer';
import Store from '../Store/configureStore';
import { Provider } from 'react-redux';
import { View,  TouchableOpacity} from 'react-native';

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
    });
});