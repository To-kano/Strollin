import React from 'react';
import {shallow} from 'enzyme';
import ButtonIcon from '../Components/ButtonIcon';

const iconTest = require('../images/left_arrow.png')
const onPressTest = () => jest.fn();

describe('ButtonIcon', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<ButtonIcon icon={iconTest} onPress={onPressTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});