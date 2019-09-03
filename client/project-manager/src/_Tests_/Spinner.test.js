import React from 'react'
import Spinner from '../Components/Spinner'
import {shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});

test('Spinner component renders to the DOM', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.html()).toMatchSnapshot();
});