import React from 'react';
import {shallow} from 'enzyme';
import RondForm from '../Components/rondForm';

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

describe('RondForm', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<RondForm data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});