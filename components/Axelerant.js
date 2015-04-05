var React = require('react');
var List = require('./List');
var _ = require("lodash");
require('isomorphic-fetch');

var Axelerant = React.createClass({

    getInitialState: function() {
        return {
            // data: [],
            url: ""
        }
    },

    getDefaultProps: function() {
        return {
            data: [],
        }
    },

    componentDidMount: function() {
        fetch(this.url)
            .then(function(res) {
                return res.json();
            })
        .then(function(res) {
            var dummy = [];
            var a = _.filter(res.members, function(i) {
                return i.deleted === false && i.tz !== null;
            });

            a = _.groupBy(a, function(person) {
                return person.tz;
            });

            var sa = Object.keys(a)

                var s = Object.keys(a).sort(function(first, second) {
                    return parseInt(a[first][0].tz_offset) - parseInt(a[second][0].tz_offset);
                });

            s.forEach(function(k) {
                var tmp = {};
                tmp[k] = a[k];
                tmp["tzn"] = a[k][0].tz;
                dummy.push(tmp);
            });
            this.setState({data: dummy});
        });

    },

    render: function() {
        var list = this.props.data.map(function(item, key) {
            var k = Object.keys(item);
            var store = [];
            var i = item[k[0]];
            var tz = item[k[1]];

            return (
                <List zone={tz} key={key} meta={i}/>
           )
        });
        return (
            <div className="bassam">
                {list}
            </div>
       )
    }
});

module.exports = Axelerant;
