import React from 'react';
import {shallow} from 'enzyme';
import CourseEvaluation from '../Components/CourseEvaluation';
import renderer from 'react-test-renderer';
import Store from '../Store/configureStore';
import { Provider } from 'react-redux';

describe('CourseEvaluation', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <CourseEvaluation />
            </Provider>)
            expect(component).toMatchSnapshot()
        });

        test('test render CourseEvauation', () => {
            renderer.create(
                <Provider store={Store}>
                    <CourseEvaluation />
                </Provider>)
          })
    });
});