const Publish = require("../models/PublishModel");

// Endpoint for Host to publish
publishByHost = async (req, res) => {
  try {
    const {
      fromLocation,
      toLocation,
      departureDate,
      departureTime,
      publisherId,
      price,
      vehicleId,
      amenities = [],
      totalAvailableSeats,
      remainingAvailableSeats,
      bookedSeats = [],
    } = req.body;

    // Validate required hostFields
    if (
      !price ||
      !vehicleId ||
      !totalAvailableSeats ||
      !remainingAvailableSeats
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields in hostFields" });
    }



    // Create a new publish record for the host, omitting commuterFields
    const publishData = new Publish({
      fromLocation,
      toLocation,
      departureDate,
      departureTime,
      publisherRole: "host",
      publisherId,
      hostFields: {
        price,
        vehicleId,
        amenities,
        totalAvailableSeats,
        remainingAvailableSeats,
        bookedSeats,
      },
    });

    // Save the publish data
    await publishData.save();
    res.status(201).json({ message: "Successfully Published!", publishData });
  } catch (error) {
    res.status(500).json({
      message: "Error creating publish by host",
      error: error.message,
    });
  }
};



// Endpoint for Commuter to publish
const publishByCommuter = async (req, res) => {
  try {
    const {
      fromLocation,
      toLocation,
      departureDate,
      departureTime,
      publisherId,
      status, 
      numberOfRequiredSeats, 
      gender, 
    } = req.body;

    // Validate required commuterFields
    if (!status || !numberOfRequiredSeats || !gender) {
      return res
        .status(400)
        .json({ message: "Missing required fields in commuterFields" });
    }

    // Creating a new publish record with commuterFields and hostFields set to null
    const publishData = new Publish({
      fromLocation,
      toLocation,
      departureDate,
      departureTime,
      publisherRole: "commuter",
      publisherId,
      commuterFields: {
        status,
        numberOfRequiredSeats,
        gender,
      },
    });

    await publishData.save();
    res
      .status(201)
      .json({ message: "Successfully Published!", publishData });
  } catch (error) {
    res.status(500).json({
      message: "Error creating publish by commuter",
      error: error.message,
    });
  }
};




// Endpoint to get publishes by host 
const getPublishesByHost = async (req, res) => {
  try {
    const hostPublishes = await Publish.find({ publisherRole: "host" });
    res.status(200).json(hostPublishes);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving host publishes",
      error: error.message,
    });
  }
};


// Endpoint to get publishes by commuter
const getPublishesByCommuter = async (req, res) => {
  try {
    const commuterPublishes = await Publish.find({ publisherRole: "commuter" });
    res.status(200).json(commuterPublishes);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving commuter publishes",
      error: error.message,
    });
  }
};





module.exports = { publishByHost, publishByCommuter, getPublishesByHost, getPublishesByCommuter };
