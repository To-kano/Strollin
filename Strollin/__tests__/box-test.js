import React from 'react';
import {shallow} from 'enzyme';
import Box from '../Components/box';

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

describe('Box', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Box data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});