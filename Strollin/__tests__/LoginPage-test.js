import React from 'react';
import {shallow} from 'enzyme';
import LoginPage from '../Components/LoginPage';

const navigationTest = {
    navigate: (test) => jest.fn()
}


describe('LoginPage', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<LoginPage navigation={navigationTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});