import React from 'react';

import Pagination from './../Components/Core/Pagination';
import {shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const  taskList = [
    {
        id: 1,
        taskName: 'Review New Claim',
        claimSpecNo: '5500001',
        type: 'Claim', 
        assignedTo: 'Alex Coupe',
        priority: 'Normal',
        dueDate: '01-09-2019'
    },
    {
        id: 2,
        taskName: 'Review New Invoice',
        claimSpecNo: '5500000',
        type: 'Claim', 
        assignedTo: 'Alex Coupe',
        priority: 'Normal',
        dueDate: '01-09-2019'
    },
    {
        id: 3,
        taskName: 'Diary Review',
        claimSpecNo: '5500244',
        type: 'Claim', 
        assignedTo: 'Donald Duck',
        priority: 'Urgent',
        dueDate: '29-09-2019'
    },
    {
        id: 4,
        taskName: 'Loss Adjustor Report Received',
        claimSpecNo: '5500044',
        type: 'Claim', 
        assignedTo: 'Peter Parker',
        priority: 'Urgent',
        dueDate: '05-09-2019'
    },
]
test('Pagination Renders to the DOM', () => {
    let wrapper = shallow(<Pagination filteredData={taskList} totalRecords={taskList.length} recordsPerPage={3} />);
    expect(wrapper.instance()).toMatchSnapshot();  
});


test('Clicking Next Page Calls Handle Change', () => {
    const spy = jest.fn();
    let wrapper = shallow(<Pagination filteredData={taskList} totalRecords={taskList.length} recordsPerPage={3} />);
    wrapper.instance().handleClick = spy;
    wrapper.instance().forceUpdate();
    expect(wrapper.instance().handleClick).not.toHaveBeenCalled();
    wrapper.find('#nextPage').simulate('click',{currentTarget: {
        name: 'nextPage'
      }});
    expect(wrapper.instance().handleClick).toHaveBeenCalled();
    expect(wrapper.instance().handleClick).toHaveBeenCalledTimes(1);
    wrapper.unmount();
});

test('Clicking Previous Page Calls Handle Change', () => {
    const spy = jest.fn();
    let wrapper = shallow(<Pagination filteredData={taskList} totalRecords={taskList.length} recordsPerPage={3} />);
    wrapper.instance().handleClick = spy;
    wrapper.instance().forceUpdate();
    expect(wrapper.instance().handleClick).not.toHaveBeenCalled();
    wrapper.find('#previousPage').simulate('click',{currentTarget: {
        name: 'previousPage'
      }});
    expect(wrapper.instance().handleClick).toHaveBeenCalled();
    expect(wrapper.instance().handleClick).toHaveBeenCalledTimes(1);
    wrapper.unmount();
});

test('Clicking Next Goes To Next Page', () => {
    let wrapper = shallow(<Pagination filteredData={taskList} totalRecords={taskList.length} recordsPerPage={3} />);
    wrapper.instance().forceUpdate();
    
    wrapper.unmount();
});

