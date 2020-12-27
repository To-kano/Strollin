import React from 'react';
import {shallow} from 'enzyme';
import HomePage from '../Components/HomePage';

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

describe('HomePage', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<HomePage data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});