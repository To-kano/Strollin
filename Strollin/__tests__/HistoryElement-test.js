import React from 'react';
import {shallow} from 'enzyme';
import HistoryElement from '../Components/HistoryElement';

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

describe('HistoryElement', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<HistoryElement data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});