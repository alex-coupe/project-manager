import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort} from '@fortawesome/free-solid-svg-icons'
import {sortType} from '../Util/Enums'
import {sortAscending, sortDescending} from '../Util/Sorting'
import { PropTypes } from 'prop-types';
import DisplayTableData from './DisplayTableData';

export default class TableHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sortedData: this.props.paginatedData,
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.paginatedData !== this.props.paginatedData) {
          this.setState({sortedData: this.props.paginatedData,});
        }
      }

    doSort = (propertyName) => {
        const sorted = [...this.state.sortedData];
        switch ( this.state[propertyName]) {
            case sortType.DEFAULT:
                this.setState({
                  sortedData: this.props.paginatedData,
                  [propertyName]: sortType.ASCENDING
                });
                break;
            case sortType.ASCENDING:
                sortAscending(sorted, propertyName);
                this.setState({
                    sortedData: sorted,
                    [propertyName]: sortType.DESECENDING
                });
                break;
            case sortType.DESECENDING:
                sortDescending(sorted, propertyName);
                this.setState({
                    sortedData: sorted,
                    [propertyName]: sortType.DEFAULT
                });
                break;
            default:
                sortAscending(sorted, propertyName);
                this.setState({
                    sortedData: sorted,
                    [propertyName]: sortType.DESECENDING
                });
                break;

        }
    }

    handleClick = (event) => {
        this.doSort(event.currentTarget.name);
    }

    render() {
        return (
            <React.Fragment>
            <thead data-testid="tableHeader">
                <tr>
                    {this.props.tableHeaderOptions && this.props.tableHeaderOptions.map((option,i) => {
                        return (<th scope="col" key={i}>{option} <button id={`id-${i}`} name={option.toLowerCase()} onClick={this.handleClick.bind(this)} 
                        style={{border: '0', padding: '0', background: 'none'}} data-toggle="tooltip" data-placement="top" title={`Sort By ${option}`}>
                        <FontAwesomeIcon icon={faSort}/></button></th>)
                    })}
                </tr>
            </thead>
               <DisplayTableData finalData={this.state.sortedData}/>  
            </React.Fragment>
        )
    }
}

TableHeader.propTypes = {
    paginatedData: PropTypes.array
}
