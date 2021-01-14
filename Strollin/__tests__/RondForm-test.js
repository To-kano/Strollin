import React from 'react';
import {shallow} from 'enzyme';
import { RondFormeText } from '../Components/rondForm';
import renderer from 'react-test-renderer';


describe('RondForm', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<RondFormeText />)
            expect(component).toMatchSnapshot()
        });

        test('test render RondFormeText', () => {
            renderer.create(
                <RondFormeText />,
            )      
          })
    });
});