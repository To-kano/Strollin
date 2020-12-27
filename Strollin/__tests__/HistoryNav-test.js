import React from 'react';
import {shallow} from 'enzyme';
import HistoryNav from '../Components/HistoryNav';

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

describe('HistoryNav', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<HistoryNav data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});