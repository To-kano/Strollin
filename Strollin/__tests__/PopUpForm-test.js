import React from 'react';
import {shallow} from 'enzyme';
import {PopUpForm} from '../Components/PopUpForm';
import renderer from 'react-test-renderer';


describe('PopUpForm', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<PopUpForm />)
            expect(component).toMatchSnapshot()
        });

        test('test render PopupForm', () => {
            renderer.create(
                <PopUpForm />,
            )      
          })
    });
});