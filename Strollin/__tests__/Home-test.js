import React from 'react';
import {shallow} from 'enzyme';
import Home from '../Components/Home';

const navigationTest = {
    navigate: (test) => jest.fn()
}


describe('Home', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Home navigation={navigationTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});