// api/publish/index.js

const { 
    publishByHost, 
    publishByCommuter, 
    getPublishesByHost, 
    getPublishesByCommuter 
  } = require('../../controllers/publishController'); // Update path as needed
  
  module.exports = async (req, res) => {
    switch (req.method) {
      case 'POST':
        // Check the role of the publisher (either 'host' or 'commuter')
        if (req.body.publisherRole === 'host') {
          return publishByHost(req, res); // Call the publishByHost controller
        } else if (req.body.publisherRole === 'commuter') {
          return publishByCommuter(req, res); // Call the publishByCommuter controller
        } else {
          return res.status(400).json({ message: 'Invalid publisher role' });
        }
      case 'GET':
        // Handle GET requests for publishes based on role
        if (req.query.role === 'host') {
          return getPublishesByHost(req, res); // Get publishes by host
        } else if (req.query.role === 'commuter') {
          return getPublishesByCommuter(req, res); // Get publishes by commuter
        } else {
          return res.status(400).json({ message: 'Invalid role specified' });
        }
      default:
        return res.status(405).json({ message: 'Method Not Allowed' }); // Handle unsupported methods
    }
  };
  