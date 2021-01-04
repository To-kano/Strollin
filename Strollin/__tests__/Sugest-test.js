import React from 'react';
import {shallow} from 'enzyme';
import Sugest from '../Components/sugest';
import renderer from 'react-test-renderer';


describe('Sugest', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Sugest />)
            expect(component).toMatchSnapshot()
        });

        test('test render Sugest', () => {
            renderer.create(
                <Sugest />,
            )      
          })
    });
});