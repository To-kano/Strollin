import React from 'react';
import {shallow} from 'enzyme';
import Comment from '../Components/Comment';

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

describe('Comment', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Comment data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});