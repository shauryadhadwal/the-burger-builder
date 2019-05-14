import React from 'React';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Toolbar from './Toolbar';
import { NavLink } from 'react-router-dom';

configure({adapter: new Adapter()});


describe('<Toolbar />', () => {
    it('should render 2 <Navink /> if not authenticated', () => {
        const wrapper = shallow(<Toolbar />);
        expect(wrapper.find(NavLink).toHaveLength(2));
    });
});
