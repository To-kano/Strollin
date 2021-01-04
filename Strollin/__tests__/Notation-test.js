import React from 'react';
import {shallow} from 'enzyme';
import Notation from '../Components/Notation';
import renderer from 'react-test-renderer';


const navigationTest = {
    navigate: (test) => jest.fn()
}


describe('Notation', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Notation navigation={navigationTest}/>)
            expect(component).toMatchSnapshot()
        });

        test('test render Notation', () => {
            renderer.create(
                <Notation navigation={navigationTest}/>,
            )      
          })
    });
});