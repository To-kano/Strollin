import React from 'react';
import {shallow} from 'enzyme';
import Notation from '../Components/Notation';

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

describe('Notation', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Notation data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});