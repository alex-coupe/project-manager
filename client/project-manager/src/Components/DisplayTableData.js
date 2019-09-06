import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'


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
                        //Any nulls aren't rendered
                        if (String (element[i]) !== 'null'){
                            //Capitalise first letter
                            const lower = String (element[i]);
                            const upper = lower.charAt(0).toUpperCase() + lower.substring(1);
                            items.push(<td key={id}><Link to={`/project/${element[0]}`}>{upper}</Link></td>);

                            id++;
                        } else {
                            items.push(<td key={id}></td>);
                            id++;
                        }
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



