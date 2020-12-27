import React from 'react';
import {shallow} from 'enzyme';
import CommentScreen from '../Components/CommentScreen';

describe('CommentScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<CommentScreen />)
            expect(component).toMatchSnapshot()
        });
    });
});