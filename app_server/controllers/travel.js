var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/travel.json', 'utf8'));

exports.renderTravel = (req, res) => {
    res.render('travel', { title: 'Travel', trips });
  };