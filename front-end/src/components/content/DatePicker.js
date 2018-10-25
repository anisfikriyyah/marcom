import { DateRangePicker, SingleDatePicker } from 'react-dates';
import { Component } from React.Component
import React from 'react'

class DateComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            focused: false,
            date: ''
        }
    }
    onDateChange(date) {
        this.setState({ date });
    }
    
    onFocusChange({ focused }) {
        this.setState({ focused });
    }

    componentDidMount() {
        this.setState({
            date: new Date()
        })
    }

    render() {
        return (
            <div>                
                <SingleDatePicker
                date={this.state.date} // momentPropTypes.momentObj or null
                onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                id="your_unique_id" // PropTypes.string.isRequired,
                />
            </div>            
        )
    }
}

export default DateComponent