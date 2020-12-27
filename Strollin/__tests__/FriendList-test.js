import React from 'react';
import {shallow} from 'enzyme';
import FriendList from '../Components/FriendList';

describe('FriendList', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<FriendList />)
            expect(component).toMatchSnapshot()
        });
    });
});