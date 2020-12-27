import React from 'react';
import {shallow} from 'enzyme';
import Comment from '../Components/Comment';

const pseudoTest = "pierre";

const commentTest = "good";

const noteTest = "5";

describe('Comment', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Comment pseudo={pseudoTest} comment={commentTest} note={noteTest} />)
            expect(component).toMatchSnapshot()
        });
    });
});