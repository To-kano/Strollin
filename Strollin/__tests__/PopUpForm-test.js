import React from 'react';
import {shallow} from 'enzyme';
import PopUpForm from '../Components/PopUpForm';

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

describe('PopUpForm', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<PopUpForm data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});