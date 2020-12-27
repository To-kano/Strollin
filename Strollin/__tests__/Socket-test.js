import React from 'react';
import {shallow} from 'enzyme';
import Socket from '../Components/Socket';

const profilTest = {
    access_token : "vjwhvjhkvjhwkvhjgdkw"
}

const dispatchTest = (test) => jest.fn();

describe('Socket', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Socket profil={profilTest} dispatch={dispatchTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});