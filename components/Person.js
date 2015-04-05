var React = require('react');

var Person = React.createClass({
	getDefaultProps: function() {
		return {
			name: "",
			avatar: "",
			username: "undefined"
		}
	},
	render: function() {
		return (
			<div>
				<img className="person__item__avatar" src={this.props.avatar}/>
				<p className="person__item__name">{this.props.name}</p>
				<p className="person__item__username">({this.props.username})</p>
			</div>
		)
	}
});

module.exports = Person;