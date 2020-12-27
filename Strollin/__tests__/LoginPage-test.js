import React from 'react';
import {shallow} from 'enzyme';
import LoginPage from '../Components/LoginPage';

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

describe('LoginPage', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<LoginPage data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});