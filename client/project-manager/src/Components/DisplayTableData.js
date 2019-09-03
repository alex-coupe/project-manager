import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class DisplayTableData extends Component {

    constructor(props) {
        super(props)

        if (this.props.finalData) {
            this.state = {
                data: this.refreshData()
            }  
        }
    }

    refreshData = () => {
        const output = this.props.finalData.map(function(obj) {
            return Object.keys(obj).map(function(key) { 
              return obj[key];
            });
        }); 
        return output;
    }

    componentDidUpdate(prevProps) {
        if(prevProps.finalData !== this.props.finalData) {
            this.setState({data: this.refreshData()})
        }
      }

    render() {
        const {data} = this.state;
        let items = [];
        let id = 0;
        return (
            <tbody>
                {data.map(element => {
                    items = [];
                    for (let i = 1; i < element.length; i++)
                    {
                        items.push(<td key={id}>{element[i]}</td>);
                        id++;
                    }
                    return (<tr key={id}>{items}</tr>)
                })}
            </tbody>   
        )
    }
}

DisplayTableData.propTypes = {
    finalData: PropTypes.arrayOf(Object)
}



