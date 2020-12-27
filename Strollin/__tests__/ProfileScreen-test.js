import React from 'react';
import {shallow} from 'enzyme';
import ProfileScreen from '../Components/ProfileScreen';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';

const navigationTest = {
    navigate: (test) => jest.fn(),
    setOptions: (test) => jest.fn()
}

const profilTest = {
    pseudo: "pierre",
    mail: "test@test.com"
}

describe('ProfileScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
            <ProfileScreen 
                navigation={navigationTest}
                profil={profilTest}/>
            </Provider>
            )
            expect(component).toMatchSnapshot()
        });
    });
});