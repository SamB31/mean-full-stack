const Mongoose = require('./db.js');
const Trip = require('./travlr.js');

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('../data/travel.json', 'utf8'));

// delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips)
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});