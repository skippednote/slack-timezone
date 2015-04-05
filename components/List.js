var React = require('react');
var Person = require('./Person');
var moment = require('moment-timezone');

var List = React.createClass({
    getDefaultProps: function() {
        return {
            zone: "",
            meta: [],
            date: Date.now()
        }
    },

    componentDidMount: function() {
        setInterval(function() {
            this.forceUpdate(), 100
        }.bind(this))
    },

    render: function() {
        var currentTime = moment(this.props.date).tz(this.props.zone).format("hh:mm a");
        var currentDate = moment(this.props.date).tz(this.props.zone).format("dddd");
        var hour = moment(this.props.date).tz(this.props.zone).format("HHMM");
        var hourClass = "zone__list ";
        if (hour >= 800 && hour <= 2000) {
            hourClass += "day";
        } else {
            hourClass += "night";
        }
        return (
                <ul className={hourClass}>
                    <div className="zone__time">
                        <div className="container">{currentDate}<br/>{currentTime}</div>
                    </div>

                    {this.props.meta.map(function(item, key) {
                        return (
                            <li className="zone__list__item">
                                <div className="container">
                                    <Person username={item.name} name={item.profile.real_name_normalized} avatar={item.profile.image_48} key={key}/>
                                </div>
                            </li>
                        )
                    })}
                </ul>
           )
    }
})

module.exports = List;
