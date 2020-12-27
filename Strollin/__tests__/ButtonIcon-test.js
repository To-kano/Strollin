import React from 'react';
import {shallow} from 'enzyme';
import ButtonIcon from '../Components/ButtonIcon';

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

describe('ButtonIcon', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<ButtonIcon data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});