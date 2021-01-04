import React from 'react';
import {shallow} from 'enzyme';
import TagSelection from '../Components/TagSelection';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';



const navigationTest = {
    navigate: (test) => jest.fn(),
    setOptions: (test) => jest.fn()
}

const profilTest = {
    pseudo: "pierre",
    mail: "test@test.com"
}

describe('TagSelection', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <TagSelection navigation={navigationTest} profil={profilTest} />
            </Provider>
            )
            expect(component).toMatchSnapshot()
        });

        test('test render TagSelection', () => {
            renderer.create(
                <Provider store={Store}>
                    <TagSelection navigation={navigationTest} profil={profilTest} />
                </Provider>
                )
          })
    });
});