import React from 'react';
import {shallow} from 'enzyme';
import CommentScreen from '../Components/CommentScreen';

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

describe('CommentScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<CommentScreen data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});