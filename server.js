var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var path = require('path');
require('node-jsx').install();
var React = require('react');
var Axelerant = React.createFactory(require('./components/Axelerant'));
require('isomorphic-fetch');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.text({ type: 'text/html' }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var port = process.env.PORT || 8888;
var TOKEN = process.env.TOKEN;

app.get("/", function(req, res) {
    fetch("https://slack.com/api/users.list?" + TOKEN)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            var dummy = [];
            var a = _.filter(response.members, function(i) {
                return i.deleted === false && i.tz !== null;
            });

            a = _.groupBy(a, function(person) {
                return person.tz_offset;
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

            var reactHTML = React.renderToString(Axelerant({data: dummy}));
            res.render("index", {reactOutput: reactHTML});
        });
});

app.listen(port);
