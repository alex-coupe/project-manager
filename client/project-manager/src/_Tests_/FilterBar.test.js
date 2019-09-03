import React from 'react';
import FilterBar from './../Components/Core/FilterBar';
import {shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {tasksFilterOptions, tasksTableOptions} from '../Components/Util/TasksConfig'

configure({adapter: new Adapter()});

const  taskList = [
    {
        id: 1,
        taskName: 'Review New Claim',
        claimSpecNo: '5500001',
        type: 'Claim', 
        assigned: 'Alex Coupe',
        priority: 'Normal',
        dueDate: '01-09-2019'
    },
    {
        id: 2,
        name: 'Review New Invoice',
        claimSpecNo: '5500000',
        type: 'Claim', 
        assigned: 'Alex Coupe',
        priority: 'Normal',
        dueDate: '01-09-2019'
    },
    {
        id: 3,
        name: 'Diary Review',
        claimSpecNo: '5500244',
        type: 'Specification', 
        assigned: 'Donald Duck',
        priority: 'Urgent',
        dueDate: '29-09-2019'
    },
    {
        id: 4,
        name: 'Loss Adjustor Report Received',
        claimSpecNo: '5500044',
        type: 'Claim', 
        assigned: 'Peter Parker',
        priority: 'Urgent',
        dueDate: '05-09-2019'
    },
]

test('FilterBar Renders To The Dom', () => {
    const wrapper = shallow(<FilterBar  fetching={false} data={taskList} recordsPerPage={2} filterOptions={tasksFilterOptions} tableHeaderOptions={tasksTableOptions} />);
    expect(wrapper.instance()).toMatchSnapshot();
});

test('handleChange Called On Select Change', () => {
    const spy = jest.fn();
    let wrapper = shallow(<FilterBar  fetching={false} recordsPerPage={2} data={taskList} filterOptions={tasksFilterOptions} tableHeaderOptions={tasksTableOptions} />);
    wrapper.instance().handleChange = spy;
    wrapper.instance().forceUpdate();
    console.log(wrapper.debug());
    expect(wrapper.instance().handleChange).not.toHaveBeenCalled();
    wrapper.find('#Type').simulate('change', {target: { name: 'Type', value: 'Claim'}});
    expect(wrapper.instance().handleChange).toHaveBeenCalled();
    expect(wrapper.instance().handleChange).toHaveBeenCalledTimes(1);
    wrapper.find('#Assigned').simulate('change', {target: { name: 'Assigned', value: 'Alex Coupe'}});
    expect(wrapper.instance().handleChange).toHaveBeenCalled();
    expect(wrapper.instance().handleChange).toHaveBeenCalledTimes(2);
    wrapper.find('#Assigned').simulate('change', {target: { name: 'Priority', value: 'Normal'}});
    expect(wrapper.instance().handleChange).toHaveBeenCalled();
    expect(wrapper.instance().handleChange).toHaveBeenCalledTimes(3);
    wrapper.unmount();
});


// test('Single Filter Returns Excected Results', () => {
    
//     const wrapper = shallow(<FilterBar fetching={false} data={taskList} filterOptions={tasksFilterOptions} tableHeaderOptions={tasksTableOptions} />);
//     const input = wrapper.find('#Type');
//     input.simulate('change', {target: { name: 'Type', value: 'Claim'}});
//     wrapper.update();
//     expect(wrapper.state().Type).toEqual('Claim');
//     expect(wrapper.state().filteredData).toEqual([
//         {
//             id: 1,
//             taskName: 'Review New Claim',
//             claimSpecNo: '5500001',
//             type: 'Claim', 
//             assigned: 'Alex Coupe',
//             priority: 'Normal',
//             dueDate: '01-09-2019'
//         },
//         {
//             id: 2,
//             name: 'Review New Invoice',
//             claimSpecNo: '5500000',
//             type: 'Claim', 
//             assigned: 'Alex Coupe',
//             priority: 'Normal',
//             dueDate: '01-09-2019'
//         },
//         {
//             id: 4,
//             name: 'Loss Adjustor Report Received',
//             claimSpecNo: '5500044',
//             type: 'Claim', 
//             assigned: 'Peter Parker',
//             priority: 'Urgent',
//             dueDate: '05-09-2019'
//         },
//     ]);
//     input.simulate('change', {target: { name: 'Type', value: 'Specification'}});
//     wrapper.update();
//     expect(wrapper.state().Type).toEqual('Specification');
//     expect(wrapper.state().filteredData).toEqual([{
//         id: 3,
//         name: 'Diary Review',
//         claimSpecNo: '5500244',
//         type: 'Specification', 
//         assigned: 'Donald Duck',
//         priority: 'Urgent',
//         dueDate: '29-09-2019'
//     }]);
//     input.simulate('change', {target: { name: 'Type', value: ''}});
//     wrapper.update();
//     expect(wrapper.state().Type).toEqual('');
//     expect(wrapper.state().filteredData).toEqual([
//         {
//             id: 1,
//             taskName: 'Review New Claim',
//             claimSpecNo: '5500001',
//             type: 'Claim', 
//             assigned: 'Alex Coupe',
//             priority: 'Normal',
//             dueDate: '01-09-2019'
//         },
//         {
//             id: 2,
//             name: 'Review New Invoice',
//             claimSpecNo: '5500000',
//             type: 'Claim', 
//             assigned: 'Alex Coupe',
//             priority: 'Normal',
//             dueDate: '01-09-2019'
//         },
//         {
//             id: 3,
//             name: 'Diary Review',
//             claimSpecNo: '5500244',
//             type: 'Specification', 
//             assigned: 'Donald Duck',
//             priority: 'Urgent',
//             dueDate: '29-09-2019'
//         },
//         {
//             id: 4,
//             name: 'Loss Adjustor Report Received',
//             claimSpecNo: '5500044',
//             type: 'Claim', 
//             assigned: 'Peter Parker',
//             priority: 'Urgent',
//             dueDate: '05-09-2019'
//         },
//     ]);
//     wrapper.unmount();
// });

// test('Two Filters Returns Excected Results', () => {
//     const wrapper = shallow(<FilterBar fetching={false} data={taskList} filterOptions={tasksFilterOptions} tableHeaderOptions={tasksTableOptions} />);
//     const input = wrapper.find('#Priority');
//     const inputTwo = wrapper.find('#Type');
//     input.simulate('change', {target: { name: 'Priority', value: 'Urgent'}});
//     expect(wrapper.state().Priority).toEqual('Urgent');
//     expect(wrapper.state().filteredData).toEqual([
//         {
//             id: 3,
//             name: 'Diary Review',
//             claimSpecNo: '5500244',
//             type: 'Specification', 
//             assigned: 'Donald Duck',
//             priority: 'Urgent',
//             dueDate: '29-09-2019'
//         },
//         {
//             id: 4,
//             name: 'Loss Adjustor Report Received',
//             claimSpecNo: '5500044',
//             type: 'Claim', 
//             assigned: 'Peter Parker',
//             priority: 'Urgent',
//             dueDate: '05-09-2019'
//         }]);
//     inputTwo.simulate('change', {target: { name: 'Type', value: 'Claim'}});
//     expect(wrapper.state().Type).toEqual('Claim');
//     wrapper.update();
//     expect(wrapper.state().filteredData).toEqual([{
//         id: 4,
//         name: 'Loss Adjustor Report Received',
//         claimSpecNo: '5500044',
//         type: 'Claim', 
//         assigned: 'Peter Parker',
//         priority: 'Urgent',
//         dueDate: '05-09-2019'
//     }]);
//     inputTwo.simulate('change', {target: { name: 'Type', value: 'Specification'}});
//     wrapper.update();
//     expect(wrapper.state().Type).toEqual('Specification');
//     expect(wrapper.state().filteredData).toEqual([
//         {
//             id: 3,
//             name: 'Diary Review',
//             claimSpecNo: '5500244',
//             type: 'Specification', 
//             assigned: 'Donald Duck',
//             priority: 'Urgent',
//             dueDate: '29-09-2019'
//         }]);
//     inputTwo.simulate('change', {target: { name: 'Type', value: ''}});
//     wrapper.update();
//     expect(wrapper.state().filteredData).toEqual([
//         {
//             id: 3,
//             name: 'Diary Review',
//             claimSpecNo: '5500244',
//             type: 'Specification', 
//             assigned: 'Donald Duck',
//             priority: 'Urgent',
//             dueDate: '29-09-2019'
//         },
//         {
//             id: 4,
//             name: 'Loss Adjustor Report Received',
//             claimSpecNo: '5500044',
//             type: 'Claim', 
//             assigned: 'Peter Parker',
//             priority: 'Urgent',
//             dueDate: '05-09-2019'
//         }]);
//     wrapper.unmount();
// });

// test('Three Filters Returns Excected Results', () => {
//     const wrapper = shallow(<FilterBar fetching={false} data={taskList} filterOptions={tasksFilterOptions} tableHeaderOptions={tasksTableOptions} />);
//     const inputThree = wrapper.find('#Priority');
//     const inputTwo = wrapper.find('#Assigned');
//     const input = wrapper.find('#Type');
//     inputThree.simulate('change', {target: { name: 'Priority', value: 'Urgent'}});
//     expect(wrapper.state().Priority).toEqual('Urgent');
//     expect(wrapper.state().filteredData).toEqual([
//         {
//             id: 3,
//             name: 'Diary Review',
//             claimSpecNo: '5500244',
//             type: 'Specification', 
//             assigned: 'Donald Duck',
//             priority: 'Urgent',
//             dueDate: '29-09-2019'
//         },
//         {
//             id: 4,
//             name: 'Loss Adjustor Report Received',
//             claimSpecNo: '5500044',
//             type: 'Claim', 
//             assigned: 'Peter Parker',
//             priority: 'Urgent',
//             dueDate: '05-09-2019'
//         }]);
//     inputTwo.simulate('change', {target: { name: 'Assigned', value: 'Donald Duck'}});
//     expect(wrapper.state().Assigned).toEqual('Donald Duck');
//     wrapper.update();
//     expect(wrapper.state().filteredData).toEqual([{
//         id: 3,
//         name: 'Diary Review',
//         claimSpecNo: '5500244',
//         type: 'Specification', 
//         assigned: 'Donald Duck',
//         priority: 'Urgent',
//         dueDate: '29-09-2019'
//     }]);
//     input.simulate('change', {target: { name: 'Type', value: 'Claim'}});
//     wrapper.update();
//     expect(wrapper.state().Type).toEqual('Claim');
//     expect(wrapper.state().filteredData).toEqual([]);
//     input.simulate('change', {target: { name: 'Type', value: ''}});
//     wrapper.update();
//     expect(wrapper.state().Type).toEqual('');
//     expect(wrapper.state().filteredData).toEqual([{
//         id: 3,
//         name: 'Diary Review',
//         claimSpecNo: '5500244',
//         type: 'Specification', 
//         assigned: 'Donald Duck',
//         priority: 'Urgent',
//         dueDate: '29-09-2019'
//     }]);
//     input.simulate('change', {target: { name: 'Assigned', value: ''}});
//     wrapper.update();
//     expect(wrapper.state().Assigned).toEqual('');
//     expect(wrapper.state().filteredData).toEqual([
//         {
//             id: 3,
//             name: 'Diary Review',
//             claimSpecNo: '5500244',
//             type: 'Specification', 
//             assigned: 'Donald Duck',
//             priority: 'Urgent',
//             dueDate: '29-09-2019'
//         },
//         {
//             id: 4,
//             name: 'Loss Adjustor Report Received',
//             claimSpecNo: '5500044',
//             type: 'Claim', 
//             assigned: 'Peter Parker',
//             priority: 'Urgent',
//             dueDate: '05-09-2019'
//         }]);
//     input.simulate('change', {target: { name: 'Priority', value: ''}});
//     wrapper.update();
//     expect(wrapper.state().Priority).toEqual('');
//     expect(wrapper.state().filteredData).toEqual([
//         {
//             id: 1,
//             taskName: 'Review New Claim',
//             claimSpecNo: '5500001',
//             type: 'Claim', 
//             assigned: 'Alex Coupe',
//             priority: 'Normal',
//             dueDate: '01-09-2019'
//         },
//         {
//             id: 2,
//             name: 'Review New Invoice',
//             claimSpecNo: '5500000',
//             type: 'Claim', 
//             assigned: 'Alex Coupe',
//             priority: 'Normal',
//             dueDate: '01-09-2019'
//         },
//         {
//             id: 3,
//             name: 'Diary Review',
//             claimSpecNo: '5500244',
//             type: 'Specification', 
//             assigned: 'Donald Duck',
//             priority: 'Urgent',
//             dueDate: '29-09-2019'
//         },
//         {
//             id: 4,
//             name: 'Loss Adjustor Report Received',
//             claimSpecNo: '5500044',
//             type: 'Claim', 
//             assigned: 'Peter Parker',
//             priority: 'Urgent',
//             dueDate: '05-09-2019'
//         },
//     ]);
//     wrapper.unmount();
// });