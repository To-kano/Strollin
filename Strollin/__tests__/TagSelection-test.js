import React from 'react';
import {shallow} from 'enzyme';
import TagSelection from '../Components/TagSelection';

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
            const component = shallow(<TagSelection navigation={navigationTest} profil={profilTest} />)
            expect(component).toMatchSnapshot()
        });
    });
});