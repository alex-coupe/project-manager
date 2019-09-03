import TopBar from '../Components/TopBar'
import React from 'react'
import {shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});

test('TopBar component renders to the DOM', () => {
    const wrapper = shallow(<TopBar user={"Test User"}/>);
    expect(wrapper.html()).toMatchSnapshot();
});