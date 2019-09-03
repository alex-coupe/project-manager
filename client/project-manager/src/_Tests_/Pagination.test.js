import Pagination from '../Components/Pagination';
import {shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

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

