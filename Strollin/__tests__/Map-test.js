import React from 'react';
import {shallow} from 'enzyme';
import Map from '../Components/map';

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

describe('Map', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Map data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});