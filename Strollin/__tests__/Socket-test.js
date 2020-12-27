import React from 'react';
import {shallow} from 'enzyme';
import Socket from '../Components/Socket';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';

const profilTest = {
    access_token : "vjwhvjhkvjhwkvhjgdkw"
}

const dispatchTest = (test) => jest.fn();

describe('Socket', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <Socket profil={profilTest} dispatch={dispatchTest}/>
            </Provider>)
            expect(component).toMatchSnapshot()
        });
    });
});