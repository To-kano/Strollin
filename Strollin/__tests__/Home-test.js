import React from 'react';
import {shallow} from 'enzyme';
import Home from '../Components/Home';
import renderer from 'react-test-renderer';

const navigationTest = {
    navigate: (test) => jest.fn()
}


describe('Home', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Home navigation={navigationTest}/>)
            expect(component).toMatchSnapshot()
        });

        test('test render Home', () => {
            renderer.create(
                <Home navigation={navigationTest}/>,
            )      
          })
    });
});