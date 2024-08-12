const mongoose = require("mongoose");
const Trip = require("../models/travlr");
const Model = mongoose.model("trips");

const tripsList = async (req, res) => {
  const q = await Model.find({}).exec();
  if (!q) {
    return res.status(404).json(err);
  } else {
    return res.status(200).json(q);
  }
};

const tripsAddTrip = async (req, res) => {
  try {
    // Correct way to instantiate the Trip model
    const newTrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    });

    const savedTrip = await newTrip.save();

    if (!savedTrip) {
      return res.status(400).json({ message: "Failed to save the trip" });
    } else {
      return res.status(201).json(savedTrip);
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// GET: /trips/:tripCode - return a single trip
const tripsFindCode = async (req, res) => {
    Trip
        .find({ "code": req.params.tripCode })
        .exec((err, trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips)
            }
        });
};

// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
  // Uncomment for debugging
  console.log(req.params);
  console.log(req.body);
  const q = await Model.findOneAndUpdate(
    { code: req.params.tripCode },
    {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    }
  ).exec();
  if (!q) {
    // Database returned no data
    return res.status(400).json(err);
  } else {
    // Return resulting updated trip
    return res.status(201).json(q);
  }
  // Uncomment the following line to show results of
  operation;
  // on the console
  // console.log(q);
};

module.exports = { tripsList, tripsAddTrip, tripsUpdateTrip, tripsFindCode };
