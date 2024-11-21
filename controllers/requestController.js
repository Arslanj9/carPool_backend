const Request = require('../models/RequestModel');
const Publish = require('../models/PublishModel');


// Function to create a request from a Host
const requestByHost = async (req, res) => {
  const { publishId, reqFromId, message } = req.body;
  
  try {

    // Find the Publish model to retrieve the publisher's data (publisherId and publisherRole)
    const publish = await Publish.findById(publishId);
    
    if (!publish) {
      return res.status(404).json({ error: 'Publish model not found.' });
    }
    
    // Ensure that the publisherId is not the same as the reqFromId (the host cannot send a request to their own published ride)
    if (publish.publisherId.toString() === reqFromId.toString()) {
      return res.status(400).json({ error: 'You cannot send a request to your own ride.' });
    }
    
    // Create the request
    const request = new Request({
      status: 'pending',
      reqFromId, // The user who is sending the request
      publishId,
      message: message || '', // Provide default value if message is not provided
      requestDate: new Date().toISOString(),
      requestTime: new Date().toLocaleTimeString(),
    });

    await request.save();

    return res.status(201).json({ success: 'Request sent successfully', request });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while sending the request.' });
  }
};




// Function to create a request from a Commuter
const requestByCommuter = async (req, res) => {
  const { publishId, reqFromId, message, requiredSeats } = req.body;
  
  try {

    // Find the Publish model to retrieve the publisher's data (publisherId and publisherRole)
    const publish = await Publish.findById(publishId);

    
    if (!publish) {
      return res.status(404).json({ error: 'Publish model not found.' });
    }
    
    // Ensure that the publisherId is not the same as the reqFromId (the commuter cannot request a ride from themselves)
    if (publish.publisherId.toString() === reqFromId.toString()) {
      return res.status(400).json({ error: 'You cannot request a ride from yourself.' });
    }
    
    // Create the request
    const request = new Request({
      status: 'pending',
      reqFromId, // The user who is sending the request
      publishId,
      message: message || '',
      requiredSeats,
      requestDate: new Date().toISOString(),
      requestTime: new Date().toLocaleTimeString(),
    });

    await request.save();

    return res.status(201).json({ success: 'Request sent successfully', request });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while sending the request.' });
  }
};




// Function to fetch requests based on user ID
const getRequestsData = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Find requests where the user is the sender (reqFromId)
    const sentRequests = await Request.find({ reqFromId: userId });

    // Find requests where the user is the publisher (publishId.publisherId)
    const publishIds = await Publish.find({ publisherId: userId }).select('_id');
    const receivedRequests = await Request.find({
      publishId: { $in: publishIds.map((p) => p._id) },
    });

    res.status(200).json({ sentRequests, receivedRequests, });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};




module.exports = {
  requestByHost,
  requestByCommuter,
  getRequestsData,
};
