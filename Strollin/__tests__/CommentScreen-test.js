import React from 'react';
import {shallow} from 'enzyme';
import CommentScreen from '../Components/CommentScreen';
import renderer from 'react-test-renderer';

describe('CommentScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<CommentScreen />)
            expect(component).toMatchSnapshot()
        });

        test('test render CommentScreen-test', () => {
            renderer.create(
                <CommentScreen />,
            )      
          })
    });
});