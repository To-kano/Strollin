import React from 'react';
import {shallow} from 'enzyme';
import ProfileScreen from '../Components/ProfileScreen';

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
            const component = shallow(<ProfileScreen 
                navigation={navigationTest}
                profil={profilTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});