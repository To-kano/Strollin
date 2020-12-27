import React from 'react';
import {shallow} from 'enzyme';
import { RondFormeText } from '../Components/rondForm';

describe('RondForm', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<RondFormeText />)
            expect(component).toMatchSnapshot()
        });
    });
});